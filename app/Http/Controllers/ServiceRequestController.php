<?php

namespace App\Http\Controllers;

use App\Models\ServiceRequest;
use App\Models\ServiceRequestPart;
use App\Models\ServiceType;
use App\Models\User;
use App\Models\VehicleMake;
use App\Models\VehicleModel;
use App\Notifications\ServiceRequestAssigned;
use App\Notifications\ServiceRequestStatusUpdated;
use App\Services\PartRecommendationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ServiceRequestController extends Controller
{
    public function __construct(protected PartRecommendationService $partRecommendationService) {}

    /**
     * Display a listing of service requests (customer view)
     */
    public function index(): Response
    {
        $serviceRequests = ServiceRequest::with(['serviceType', 'mechanic', 'parts.part'])
            ->where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($request) {
                return [
                    'id' => $request->id,
                    'request_number' => $request->request_number,
                    'service_type' => $request->serviceType->name,
                    'status' => $request->status,
                    'mechanic' => $request->mechanic ? [
                        'name' => $request->mechanic->name,
                        'phone' => $request->mechanic->phone,
                        'rating' => $request->mechanic->rating,
                    ] : null,
                    'total_cost' => floatval($request->total_cost),
                    'payment_status' => $request->payment_status,
                    'scheduled_at' => $request->scheduled_at?->format('M d, Y g:i A'),
                    'created_at' => $request->created_at->format('M d, Y'),
                ];
            });

        return Inertia::render('service-requests/index', [
            'serviceRequests' => $serviceRequests,
        ]);
    }

    /**
     * Show form for creating new service request
     */
    public function create(): Response
    {
        $serviceTypes = ServiceType::active()->ordered()->get();

        $vehicleMakes = VehicleMake::orderBy('name')->get();
        $user = auth()->user();

        return Inertia::render('service-requests/create', [
            'serviceTypes' => $serviceTypes,
            'vehicleMakes' => $vehicleMakes,
            'userVehicle' => [
                'make_id' => $user->vehicle_make_id,
                'model_id' => $user->vehicle_model_id,
                'year' => $user->vehicle_year,
                'license_plate' => $user->vehicle_license_plate,
            ],
        ]);
    }

    /**
     * Get recommended parts for a service
     */
    public function getRecommendedParts(Request $request)
    {
        $request->validate([
            'service_type_id' => ['required', 'exists:service_types,id'],
            'vehicle_model_id' => ['nullable', 'exists:vehicle_models,id'],
        ]);

        $serviceType = ServiceType::findOrFail($request->service_type_id);
        $vehicleModel = $request->vehicle_model_id
            ? VehicleModel::find($request->vehicle_model_id)
            : null;

        $recommendedParts = $this->partRecommendationService
            ->recommendParts($serviceType, $vehicleModel);

        return response()->json([
            'parts' => $recommendedParts,
        ]);
    }

    /**
     * Get available mechanics
     */
    public function getAvailableMechanics(Request $request)
    {
        $mechanics = User::where('role', 'mechanic')
            ->where('status', 'available')
            ->get();

        return response()->json([
            'mechanics' => $mechanics,
        ]);
    }

    /**
     * Store a newly created service request
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'service_type_id' => ['required', 'exists:service_types,id'],
            'vehicle_make_id' => ['nullable', 'exists:vehicle_makes,id'],
            'vehicle_model_id' => ['nullable', 'exists:vehicle_models,id'],
            'vehicle_year' => ['nullable', 'integer', 'min:1900', 'max:'.((int) date('Y') + 1)],
            'vehicle_license_plate' => ['nullable', 'string', 'max:255'],
            'vehicle_problem_description' => ['required', 'string'],
            'customer_latitude' => ['required', 'numeric'],
            'customer_longitude' => ['required', 'numeric'],
            'customer_address' => ['nullable', 'string'],
            'location_notes' => ['nullable', 'string'],
            'mechanic_id' => ['required', 'exists:users,id'],
            'selected_parts' => ['nullable', 'array'],
            'selected_parts.*.part_id' => ['required', 'exists:parts,id'],
            'selected_parts.*.quantity' => ['required', 'integer', 'min:1'],
        ]);

        DB::transaction(function () use ($validated) {
            $serviceType = ServiceType::findOrFail($validated['service_type_id']);

            // Create the service request
            $serviceRequest = ServiceRequest::create([
                'user_id' => auth()->id(),
                'service_type_id' => $validated['service_type_id'],
                'mechanic_id' => $validated['mechanic_id'],
                'vehicle_make_id' => $validated['vehicle_make_id'] ?? auth()->user()->vehicle_make_id,
                'vehicle_model_id' => $validated['vehicle_model_id'] ?? auth()->user()->vehicle_model_id,
                'vehicle_year' => $validated['vehicle_year'] ?? auth()->user()->vehicle_year,
                'vehicle_license_plate' => $validated['vehicle_license_plate'] ?? auth()->user()->vehicle_license_plate,
                'vehicle_problem_description' => $validated['vehicle_problem_description'],
                'customer_latitude' => $validated['customer_latitude'],
                'customer_longitude' => $validated['customer_longitude'],
                'customer_address' => $validated['customer_address'],
                'location_notes' => $validated['location_notes'],
                'labor_cost' => $serviceType->base_price,
                'status' => 'mechanic_assigned',
            ]);

            // Add selected parts to the request
            if (! empty($validated['selected_parts'])) {
                foreach ($validated['selected_parts'] as $partData) {
                    $part = \App\Models\Part::findOrFail($partData['part_id']);

                    ServiceRequestPart::create([
                        'service_request_id' => $serviceRequest->id,
                        'part_id' => $part->id,
                        'quantity' => $partData['quantity'],
                        'unit_price' => $part->price,
                        'status' => 'recommended',
                    ]);
                }
            }

            // Calculate total cost
            $serviceRequest->calculateTotalCost();

            // Notify the mechanic
            $mechanic = User::findOrFail($validated['mechanic_id']);
            $mechanic->notify(new ServiceRequestAssigned($serviceRequest));
        });

        return redirect()->route('service-requests.index')
            ->with('success', 'Service request created successfully! The mechanic has been notified.');
    }

    /**
     * Display the specified service request
     */
    public function show(ServiceRequest $serviceRequest): Response
    {
        // Ensure user can only view their own requests (or mechanic's assigned requests)
        $user = auth()->user();
        if ($user->role !== 'admin' && $serviceRequest->user_id !== $user->id && $serviceRequest->mechanic?->user_id !== $user->id) {
            abort(403);
        }

        $serviceRequest->load(['serviceType', 'mechanic', 'parts.part.primaryImage', 'user']);

        return Inertia::render('service-requests/show', [
            'serviceRequest' => [
                'id' => $serviceRequest->id,
                'request_number' => $serviceRequest->request_number,
                'status' => $serviceRequest->status,
                'service_type' => [
                    'name' => $serviceRequest->serviceType->name,
                    'description' => $serviceRequest->serviceType->description,
                ],
                'customer' => [
                    'name' => $serviceRequest->user->name,
                    'email' => $serviceRequest->user->email,
                    'phone' => $serviceRequest->user->phone,
                ],
                'mechanic' => $serviceRequest->mechanic ? [
                    'id' => $serviceRequest->mechanic->id,
                    'name' => $serviceRequest->mechanic->name,
                    'phone' => $serviceRequest->mechanic->phone,
                    'rating' => floatval($serviceRequest->mechanic->rating),
                ] : null,
                'vehicle' => [
                    'make' => $serviceRequest->vehicleMake?->name,
                    'model' => $serviceRequest->vehicleModel?->name,
                    'year' => $serviceRequest->vehicle_year,
                    'license_plate' => $serviceRequest->vehicle_license_plate,
                ],
                'problem_description' => $serviceRequest->vehicle_problem_description,
                'location' => [
                    'address' => $serviceRequest->customer_address,
                    'notes' => $serviceRequest->location_notes,
                    'latitude' => floatval($serviceRequest->customer_latitude),
                    'longitude' => floatval($serviceRequest->customer_longitude),
                ],
                'parts' => $serviceRequest->parts->map(function ($part) {
                    return [
                        'id' => $part->id,
                        'name' => $part->part->name,
                        'quantity' => $part->quantity,
                        'unit_price' => floatval($part->unit_price),
                        'subtotal' => floatval($part->subtotal),
                        'status' => $part->status,
                        'image' => $part->part->primaryImage?->image_url,
                    ];
                }),
                'labor_cost' => floatval($serviceRequest->labor_cost),
                'parts_cost' => floatval($serviceRequest->parts_cost),
                'total_cost' => floatval($serviceRequest->total_cost),
                'payment_status' => $serviceRequest->payment_status,
                'created_at' => $serviceRequest->created_at->format('F j, Y g:i A'),
                'scheduled_at' => $serviceRequest->scheduled_at?->format('F j, Y g:i A'),
                'accepted_at' => $serviceRequest->accepted_at?->format('F j, Y g:i A'),
                'completed_at' => $serviceRequest->completed_at?->format('F j, Y g:i A'),
            ],
        ]);
    }

    public function sendQuotation(ServiceRequest $serviceRequest): RedirectResponse
    {
        $customer = $serviceRequest->user;

        $customer->notify(new QuotationReady($serviceRequest));

        return back()->with('success', 'Quotation sent to customer successfully!');
    }

    /**
     * Mechanic accepts the service request
     */
    public function accept(ServiceRequest $serviceRequest): RedirectResponse
    {
        $mechanic = auth()->user();

        if ($serviceRequest->mechanic_id !== $mechanic->id) {
            abort(403);
        }

        if ($serviceRequest->status !== 'mechanic_assigned') {
            return back()->with('error', 'This request cannot be accepted at this time.');
        }

        DB::transaction(function () use ($serviceRequest, $mechanic) {
            $serviceRequest->update([
                'status' => 'accepted',
                'accepted_at' => now(),
            ]);

            // Set mechanic status to busy
            $mechanic->update(['status' => 'busy']);

            // Notify customer to make payment
            $serviceRequest->user->notify(new ServiceRequestStatusUpdated($serviceRequest, 'accepted'));
        });

        return back()->with('success', 'Service request accepted successfully!');
    }

    /**
     * Mechanic rejects the service request
     */
    public function reject(Request $request, ServiceRequest $serviceRequest): RedirectResponse
    {
        $mechanic = auth()->user();

        if ($serviceRequest->mechanic_id !== $mechanic->id) {
            abort(403);
        }

        $validated = $request->validate([
            'reason' => ['required', 'string', 'max:500'],
        ]);

        $serviceRequest->update([
            'status' => 'rejected',
            'mechanic_notes' => 'Rejection reason: '.$validated['reason'],
            'mechanic_id' => null,
        ]);

        // Notify customer
        $serviceRequest->user->notify(new ServiceRequestStatusUpdated($serviceRequest, 'rejected', $validated['reason']));

        return redirect()->route('mechanic.requests')
            ->with('success', 'Service request rejected.');
    }

    /**
     * Mark service as completed
     */
    public function complete(ServiceRequest $serviceRequest): RedirectResponse
    {
        $mechanic = auth()->user();

        if ($serviceRequest->mechanic_id !== $mechanic->id) {
            abort(403);
        }

        if ($serviceRequest->payment_status !== 'paid') {
            return back()->with('error', 'Service cannot be marked as completed until payment is received.');
        }

        DB::transaction(function () use ($serviceRequest, $mechanic) {
            $serviceRequest->update([
                'status' => 'completed',
                'completed_at' => now(),
            ]);

            // Set mechanic status back to available
            $mechanic->update(['status' => 'available']);

            // Notify customer
            $serviceRequest->user->notify(new ServiceRequestStatusUpdated($serviceRequest, 'completed'));
        });

        return back()->with('success', 'Service marked as completed!');
    }

    /**
     * Mechanic views their assigned requests
     */
    public function mechanicRequests(): Response
    {
        $mechanic = auth()->user();

        $requests = ServiceRequest::with(['serviceType', 'user', 'parts'])
            ->where('mechanic_id', $mechanic->id)
            ->whereIn('status', ['mechanic_assigned', 'accepted', 'in_progress'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($request) {
                return [
                    'id' => $request->id,
                    'request_number' => $request->request_number,
                    'service_type' => $request->serviceType->name,
                    'customer_name' => $request->user->name,
                    'customer_phone' => $request->user->phone,
                    'status' => $request->status,
                    'total_cost' => floatval($request->total_cost),
                    'created_at' => $request->created_at->format('M d, Y g:i A'),
                    'location' => [
                        'latitude' => floatval($request->customer_latitude),
                        'longitude' => floatval($request->customer_longitude),
                        'address' => $request->customer_address,
                    ],
                ];
            });

        return Inertia::render('mechanic/requests', [
            'requests' => $requests,
            'mechanicStatus' => 'available',
        ]);
    }
}
