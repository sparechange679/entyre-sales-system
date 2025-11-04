<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Part;
use App\Models\ServiceRequest;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        // Total service requests
        $totalServiceRequests = ServiceRequest::count();

        // Service requests by status
        $serviceRequestsByStatus = ServiceRequest::select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get()
            ->pluck('count', 'status');

        // Total revenue from service requests
        $totalServiceRevenue = ServiceRequest::where('payment_status', 'paid')->sum('total_cost');

        // Total revenue from parts sales
        $totalPartsRevenue = Order::where('status', 'completed')->sum('total_amount');

        // Total revenue
        $totalRevenue = $totalServiceRevenue + $totalPartsRevenue;

        // Recent service requests
        $recentServiceRequests = ServiceRequest::with(['user', 'serviceType'])
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
                    'total_cost' => floatval($request->total_cost),
                    'created_at' => $request->created_at->format('M d, Y'),
                ];
            });

        // Low stock parts
        $lowStockParts = Part::whereColumn('stock_quantity', '<=', 'min_stock_level')
            ->orderBy('stock_quantity', 'asc')
            ->limit(5)
            ->get()
            ->map(function ($part) {
                return [
                    'id' => $part->id,
                    'name' => $part->name,
                    'sku' => $part->sku,
                    'stock_quantity' => $part->stock_quantity,
                    'min_stock_level' => $part->min_stock_level,
                ];
            });

        // Total customers
        $totalCustomers = User::where('role', 'customer')->count();

        // Total mechanics
        $totalMechanics = User::where('role', 'mechanic')->count();

        return Inertia::render('dashboard/admin', [
            'stats' => [
                'total_service_requests' => $totalServiceRequests,
                'total_revenue' => floatval($totalRevenue),
                'total_customers' => $totalCustomers,
                'total_mechanics' => $totalMechanics,
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
            'lowStockParts' => $lowStockParts,
        ]);
    }
}
