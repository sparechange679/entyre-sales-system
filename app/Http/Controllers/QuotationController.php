<?php

namespace App\Http\Controllers;

use App\Models\Quotation;
use App\Models\ServiceRequest;
use App\Notifications\QuotationReady;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class QuotationController extends Controller
{
    /**
     * Display a listing of quotations
     */
    public function index(): Response
    {
        $quotations = Quotation::with(['serviceRequest.user', 'serviceRequest.serviceType', 'createdBy'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($quotation) {
                return [
                    'id' => $quotation->id,
                    'quotation_number' => $quotation->quotation_number,
                    'service_request_number' => $quotation->serviceRequest->request_number,
                    'customer_name' => $quotation->serviceRequest->user->name,
                    'service_type' => $quotation->serviceRequest->serviceType->name,
                    'total_amount' => floatval($quotation->total_amount),
                    'status' => $quotation->status,
                    'valid_until' => $quotation->valid_until?->format('M d, Y'),
                    'created_at' => $quotation->created_at->format('M d, Y'),
                    'created_by' => $quotation->createdBy->name,
                ];
            });

        return Inertia::render('admin/quotations/index', [
            'quotations' => $quotations,
        ]);
    }

    /**
     * Show the form for creating a new quotation
     */
    public function create(): Response
    {
        $serviceRequests = ServiceRequest::with(['user', 'serviceType'])
            ->whereIn('status', ['pending', 'mechanic_assigned', 'accepted'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($request) {
                return [
                    'id' => $request->id,
                    'request_number' => $request->request_number,
                    'customer_name' => $request->user->name,
                    'service_type' => $request->serviceType->name,
                    'status' => $request->status,
                ];
            });

        return Inertia::render('admin/quotations/create', [
            'serviceRequests' => $serviceRequests,
        ]);
    }

    /**
     * Store a newly created quotation
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'service_request_id' => ['required', 'exists:service_requests,id'],
            'service_description' => ['required', 'string'],
            'labor_cost' => ['required', 'numeric', 'min:0'],
            'parts_cost' => ['required', 'numeric', 'min:0'],
            'valid_from' => ['nullable', 'date'],
            'valid_until' => ['nullable', 'date', 'after:valid_from'],
            'estimated_duration_hours' => ['nullable', 'integer', 'min:1'],
            'terms_and_conditions' => ['nullable', 'string'],
            'notes' => ['nullable', 'string'],
        ]);

        $validated['created_by'] = auth()->id();
        $validated['total_amount'] = $validated['labor_cost'] + $validated['parts_cost'];

        Quotation::create($validated);

        return redirect()->route('admin.quotations.index')
            ->with('success', 'Quotation created successfully!');
    }

    /**
     * Display the specified quotation
     */
    public function show(Quotation $quotation): Response
    {
        $quotation->load(['serviceRequest.user', 'serviceRequest.serviceType', 'createdBy']);

        return Inertia::render('admin/quotations/show', [
            'quotation' => [
                'id' => $quotation->id,
                'quotation_number' => $quotation->quotation_number,
                'service_request' => [
                    'request_number' => $quotation->serviceRequest->request_number,
                    'service_type' => $quotation->serviceRequest->serviceType->name,
                ],
                'customer' => [
                    'name' => $quotation->serviceRequest->user->name,
                    'email' => $quotation->serviceRequest->user->email,
                    'phone' => $quotation->serviceRequest->user->phone,
                ],
                'service_description' => $quotation->service_description,
                'labor_cost' => floatval($quotation->labor_cost),
                'parts_cost' => floatval($quotation->parts_cost),
                'total_amount' => floatval($quotation->total_amount),
                'valid_from' => $quotation->valid_from?->format('F j, Y'),
                'valid_until' => $quotation->valid_until?->format('F j, Y'),
                'estimated_duration_hours' => $quotation->estimated_duration_hours,
                'status' => $quotation->status,
                'terms_and_conditions' => $quotation->terms_and_conditions,
                'notes' => $quotation->notes,
                'created_by' => $quotation->createdBy->name,
                'created_at' => $quotation->created_at->format('F j, Y g:i A'),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified quotation
     */
    public function edit(Quotation $quotation): Response
    {
        $quotation->load(['serviceRequest.user', 'serviceRequest.serviceType']);

        $serviceRequests = ServiceRequest::with(['user', 'serviceType'])
            ->whereIn('status', ['pending', 'mechanic_assigned', 'accepted'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($request) {
                return [
                    'id' => $request->id,
                    'request_number' => $request->request_number,
                    'customer_name' => $request->user->name,
                    'service_type' => $request->serviceType->name,
                    'status' => $request->status,
                ];
            });

        return Inertia::render('admin/quotations/edit', [
            'quotation' => [
                'id' => $quotation->id,
                'quotation_number' => $quotation->quotation_number,
                'service_request_id' => $quotation->service_request_id,
                'service_description' => $quotation->service_description,
                'labor_cost' => floatval($quotation->labor_cost),
                'parts_cost' => floatval($quotation->parts_cost),
                'valid_from' => $quotation->valid_from?->format('Y-m-d'),
                'valid_until' => $quotation->valid_until?->format('Y-m-d'),
                'estimated_duration_hours' => $quotation->estimated_duration_hours,
                'status' => $quotation->status,
                'terms_and_conditions' => $quotation->terms_and_conditions,
                'notes' => $quotation->notes,
            ],
            'serviceRequests' => $serviceRequests,
        ]);
    }

    /**
     * Update the specified quotation
     */
    public function update(Request $request, Quotation $quotation): RedirectResponse
    {
        $validated = $request->validate([
            'service_request_id' => ['required', 'exists:service_requests,id'],
            'service_description' => ['required', 'string'],
            'labor_cost' => ['required', 'numeric', 'min:0'],
            'parts_cost' => ['required', 'numeric', 'min:0'],
            'valid_from' => ['nullable', 'date'],
            'valid_until' => ['nullable', 'date', 'after:valid_from'],
            'estimated_duration_hours' => ['nullable', 'integer', 'min:1'],
            'status' => ['required', 'in:draft,sent,accepted,rejected,expired'],
            'terms_and_conditions' => ['nullable', 'string'],
            'notes' => ['nullable', 'string'],
        ]);

        $validated['total_amount'] = $validated['labor_cost'] + $validated['parts_cost'];

        $quotation->update($validated);

        return redirect()->route('admin.quotations.index')
            ->with('success', 'Quotation updated successfully!');
    }

    /**
     * Send quotation to customer
     */
    public function send(Quotation $quotation): RedirectResponse
    {
        // Only send if quotation is in draft status
        if ($quotation->status !== 'draft') {
            return back()->with('error', 'Only draft quotations can be sent to customers.');
        }

        // Load the service request and user
        $quotation->load(['serviceRequest.user']);

        // Update service request with quotation costs
        $quotation->serviceRequest->update([
            'labor_cost' => $quotation->labor_cost,
            'parts_cost' => $quotation->parts_cost,
            'total_cost' => $quotation->total_amount,
        ]);

        // Send notification to customer
        $quotation->serviceRequest->user->notify(new QuotationReady($quotation->serviceRequest));

        // Update quotation status to sent
        $quotation->update([
            'status' => 'sent',
            'sent_at' => now(),
        ]);

        return back()->with('success', 'Quotation sent to customer successfully!');
    }

    /**
     * Remove the specified quotation
     */
    public function destroy(Quotation $quotation): RedirectResponse
    {
        $quotation->delete();

        return redirect()->route('admin.quotations.index')
            ->with('success', 'Quotation deleted successfully!');
    }
}
