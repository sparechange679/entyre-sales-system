<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\ServiceRequest;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class MechanicDashboardController extends Controller
{
    public function index(): Response
    {
        $mechanicId = auth()->id();

        // Total assigned service requests
        $totalAssignedRequests = ServiceRequest::where('mechanic_id', $mechanicId)->count();

        // Service requests by status for this mechanic
        $serviceRequestsByStatus = ServiceRequest::where('mechanic_id', $mechanicId)
            ->select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get()
            ->pluck('count', 'status');

        // Total completed requests
        $totalCompletedRequests = $serviceRequestsByStatus['completed'] ?? 0;

        // Total earnings from completed service requests
        $totalEarnings = ServiceRequest::where('mechanic_id', $mechanicId)
            ->where('status', 'completed')
            ->where('payment_status', 'paid')
            ->sum('labor_cost');

        // Recent assigned service requests
        $recentServiceRequests = ServiceRequest::with(['user', 'serviceType'])
            ->where('mechanic_id', $mechanicId)
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($request) {
                return [
                    'id' => $request->id,
                    'request_number' => $request->request_number,
                    'customer_name' => $request->user->name,
                    'service_type' => $request->serviceType->name,
                    'status' => $request->status,
                    'labor_cost' => floatval($request->labor_cost),
                    'scheduled_at' => $request->scheduled_at?->format('M d, Y H:i'),
                    'created_at' => $request->created_at->format('M d, Y'),
                ];
            });

        // Pending/Accepted requests (awaiting action)
        $pendingRequests = ServiceRequest::where('mechanic_id', $mechanicId)
            ->whereIn('status', ['mechanic_assigned', 'accepted'])
            ->count();

        return Inertia::render('dashboard/mechanic', [
            'stats' => [
                'total_assigned_requests' => $totalAssignedRequests,
                'total_completed_requests' => $totalCompletedRequests,
                'total_earnings' => floatval($totalEarnings),
                'pending_requests' => $pendingRequests,
            ],
            'serviceRequestsByStatus' => [
                'mechanic_assigned' => $serviceRequestsByStatus['mechanic_assigned'] ?? 0,
                'accepted' => $serviceRequestsByStatus['accepted'] ?? 0,
                'in_progress' => $serviceRequestsByStatus['in_progress'] ?? 0,
                'completed' => $serviceRequestsByStatus['completed'] ?? 0,
                'rejected' => $serviceRequestsByStatus['rejected'] ?? 0,
            ],
            'recentServiceRequests' => $recentServiceRequests,
        ]);
    }
}
