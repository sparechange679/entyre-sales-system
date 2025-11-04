<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Part;
use App\Models\ServiceRequest;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AccountantDashboardController extends Controller
{
    public function index(): Response
    {
        // Total revenue from service requests
        $totalServiceRevenue = ServiceRequest::where('payment_status', 'paid')->sum('total_cost');

        // Total revenue from parts sales
        $totalPartsRevenue = Order::where('status', 'completed')->sum('total_amount');

        // Total revenue
        $totalRevenue = $totalServiceRevenue + $totalPartsRevenue;

        // Revenue breakdown
        $revenueBreakdown = [
            'service_revenue' => floatval($totalServiceRevenue),
            'parts_revenue' => floatval($totalPartsRevenue),
            'labor_revenue' => floatval(ServiceRequest::where('payment_status', 'paid')->sum('labor_cost')),
            'parts_cost_from_services' => floatval(ServiceRequest::where('payment_status', 'paid')->sum('parts_cost')),
        ];

        // Inventory value
        $totalInventoryValue = Part::sum(DB::raw('stock_quantity * price'));

        // Pending payments
        $pendingPayments = ServiceRequest::where('payment_status', 'pending')
            ->whereNotNull('total_cost')
            ->where('total_cost', '>', 0)
            ->sum('total_cost');

        // Recent transactions (service payments)
        $recentTransactions = ServiceRequest::with(['user', 'serviceType'])
            ->where('payment_status', 'paid')
            ->orderBy('paid_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($request) {
                return [
                    'id' => $request->id,
                    'type' => 'Service Payment',
                    'request_number' => $request->request_number,
                    'customer_name' => $request->user->name,
                    'service_type' => $request->serviceType->name,
                    'amount' => floatval($request->total_cost),
                    'paid_at' => $request->paid_at?->format('M d, Y H:i'),
                ];
            });

        // Top selling parts
        $topSellingParts = OrderItem::with('part')
            ->selectRaw('part_id, sum(quantity) as total_quantity, sum(quantity * price) as total_revenue')
            ->groupBy('part_id')
            ->orderBy('total_revenue', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($item) {
                return [
                    'name' => $item->part->name,
                    'quantity_sold' => $item->total_quantity,
                    'revenue' => floatval($item->total_revenue),
                ];
            });

        // Monthly revenue (current month)
        $currentMonthRevenue = ServiceRequest::where('payment_status', 'paid')
            ->whereMonth('paid_at', now()->month)
            ->whereYear('paid_at', now()->year)
            ->sum('total_cost');

        $currentMonthPartsRevenue = Order::where('status', 'completed')
            ->whereMonth('updated_at', now()->month)
            ->whereYear('updated_at', now()->year)
            ->sum('total_amount');

        return Inertia::render('dashboard/accountant', [
            'stats' => [
                'total_revenue' => floatval($totalRevenue),
                'total_inventory_value' => floatval($totalInventoryValue),
                'pending_payments' => floatval($pendingPayments),
                'current_month_revenue' => floatval($currentMonthRevenue + $currentMonthPartsRevenue),
            ],
            'revenueBreakdown' => $revenueBreakdown,
            'recentTransactions' => $recentTransactions,
            'topSellingParts' => $topSellingParts,
        ]);
    }
}
