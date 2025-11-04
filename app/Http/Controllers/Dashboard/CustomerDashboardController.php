<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\ServiceRequest;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class CustomerDashboardController extends Controller
{
    public function index(): Response
    {
        $customerId = auth()->id();

        // Total service requests
        $totalServiceRequests = ServiceRequest::where('user_id', $customerId)->count();

        // Service requests by status
        $serviceRequestsByStatus = ServiceRequest::where('user_id', $customerId)
            ->select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get()
            ->pluck('count', 'status');

        // Total spent on services
        $totalServiceSpent = ServiceRequest::where('user_id', $customerId)
            ->where('payment_status', 'paid')
            ->sum('total_cost');

        // Total spent on parts
        $totalPartsSpent = Order::where('user_id', $customerId)
            ->where('status', 'completed')
            ->sum('total_amount');

        // Total spent
        $totalSpent = $totalServiceSpent + $totalPartsSpent;

        // Recent service requests
        $recentServiceRequests = ServiceRequest::with(['serviceType', 'mechanic'])
            ->where('user_id', $customerId)
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($request) {
                return [
                    'id' => $request->id,
                    'request_number' => $request->request_number,
                    'service_type' => $request->serviceType->name,
                    'status' => $request->status,
                    'mechanic_name' => $request->mechanic?->name,
                    'total_cost' => floatval($request->total_cost),
                    'payment_status' => $request->payment_status,
                    'created_at' => $request->created_at->format('M d, Y'),
                ];
            });

        // Recent orders
        $recentOrders = Order::where('user_id', $customerId)
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'order_number' => $order->order_number,
                    'status' => $order->status,
                    'total_amount' => floatval($order->total_amount),
                    'created_at' => $order->created_at->format('M d, Y'),
                ];
            });

        return Inertia::render('dashboard/customer', [
            'stats' => [
                'total_service_requests' => $totalServiceRequests,
                'total_spent' => floatval($totalSpent),
                'total_orders' => Order::where('user_id', $customerId)->count(),
                'pending_requests' => $serviceRequestsByStatus['pending'] ?? 0,
            ],
            'serviceRequestsByStatus' => [
                'pending' => $serviceRequestsByStatus['pending'] ?? 0,
                'mechanic_assigned' => $serviceRequestsByStatus['mechanic_assigned'] ?? 0,
                'accepted' => $serviceRequestsByStatus['accepted'] ?? 0,
                'in_progress' => $serviceRequestsByStatus['in_progress'] ?? 0,
                'completed' => $serviceRequestsByStatus['completed'] ?? 0,
                'rejected' => $serviceRequestsByStatus['rejected'] ?? 0,
            ],
            'recentServiceRequests' => $recentServiceRequests,
            'recentOrders' => $recentOrders,
        ]);
    }
}
