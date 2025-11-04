<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\ServiceRequest;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function index(Request $request): Response
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        // Service Revenue - from paid service requests
        $servicesRevenue = ServiceRequest::query()
            ->where('payment_status', 'paid')
            ->when($startDate, fn ($q) => $q->whereDate('paid_at', '>=', $startDate))
            ->when($endDate, fn ($q) => $q->whereDate('paid_at', '<=', $endDate))
            ->sum('total_cost');

        // Parts Revenue - from completed orders
        $partsRevenue = Order::query()
            ->where('status', 'completed')
            ->when($startDate, fn ($q) => $q->whereDate('updated_at', '>=', $startDate))
            ->when($endDate, fn ($q) => $q->whereDate('updated_at', '<=', $endDate))
            ->sum('total_amount');

        // Total Revenue
        $totalRevenue = $servicesRevenue + $partsRevenue;

        // Service Metrics
        $totalServices = ServiceRequest::query()
            ->where('status', 'completed')
            ->when($startDate, fn ($q) => $q->whereDate('completed_at', '>=', $startDate))
            ->when($endDate, fn ($q) => $q->whereDate('completed_at', '<=', $endDate))
            ->count();

        $paidServices = ServiceRequest::query()
            ->where('payment_status', 'paid')
            ->when($startDate, fn ($q) => $q->whereDate('paid_at', '>=', $startDate))
            ->when($endDate, fn ($q) => $q->whereDate('paid_at', '<=', $endDate))
            ->count();

        $popularServices = ServiceRequest::with('serviceType')
            ->where('status', 'completed')
            ->when($startDate, fn ($q) => $q->whereDate('completed_at', '>=', $startDate))
            ->when($endDate, fn ($q) => $q->whereDate('completed_at', '<=', $endDate))
            ->select('service_type_id', DB::raw('count(*) as count'), DB::raw('sum(total_cost) as revenue'))
            ->groupBy('service_type_id')
            ->orderBy('count', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($item) {
                return [
                    'name' => $item->serviceType?->name ?? 'Unknown',
                    'count' => $item->count,
                    'revenue' => floatval($item->revenue),
                ];
            });

        $busiestMechanics = ServiceRequest::with('mechanic')
            ->where('status', 'completed')
            ->whereNotNull('mechanic_id')
            ->when($startDate, fn ($q) => $q->whereDate('completed_at', '>=', $startDate))
            ->when($endDate, fn ($q) => $q->whereDate('completed_at', '<=', $endDate))
            ->select('mechanic_id', DB::raw('count(*) as count'), DB::raw('sum(labor_cost) as earnings'))
            ->groupBy('mechanic_id')
            ->orderBy('count', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($item) {
                return [
                    'name' => $item->mechanic?->name ?? 'Unknown',
                    'count' => $item->count,
                    'earnings' => floatval($item->earnings),
                ];
            });

        // Recent Paid Services
        $recentServices = ServiceRequest::with(['user', 'serviceType', 'mechanic'])
            ->where('payment_status', 'paid')
            ->when($startDate, fn ($q) => $q->whereDate('paid_at', '>=', $startDate))
            ->when($endDate, fn ($q) => $q->whereDate('paid_at', '<=', $endDate))
            ->orderBy('paid_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($service) {
                return [
                    'request_number' => $service->request_number,
                    'customer' => $service->user->name,
                    'service_type' => $service->serviceType->name,
                    'mechanic' => $service->mechanic?->name ?? 'N/A',
                    'total_cost' => floatval($service->total_cost),
                    'paid_at' => $service->paid_at?->format('M d, Y'),
                ];
            });

        return Inertia::render('admin/reports/index', [
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ],
            'revenue' => [
                'total' => floatval($totalRevenue),
                'parts' => floatval($partsRevenue),
                'services' => floatval($servicesRevenue),
            ],
            'services' => [
                'total' => $totalServices,
                'paid' => $paidServices,
                'popular' => $popularServices,
                'busiest_mechanics' => $busiestMechanics,
                'recent' => $recentServices,
            ],
        ]);
    }

    public function download(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        // Service Revenue - from paid service requests
        $servicesRevenue = ServiceRequest::query()
            ->where('payment_status', 'paid')
            ->when($startDate, fn ($q) => $q->whereDate('paid_at', '>=', $startDate))
            ->when($endDate, fn ($q) => $q->whereDate('paid_at', '<=', $endDate))
            ->sum('total_cost');

        // Parts Revenue - from completed orders
        $partsRevenue = Order::query()
            ->where('status', 'completed')
            ->when($startDate, fn ($q) => $q->whereDate('updated_at', '>=', $startDate))
            ->when($endDate, fn ($q) => $q->whereDate('updated_at', '<=', $endDate))
            ->sum('total_amount');

        // Total Revenue
        $totalRevenue = $servicesRevenue + $partsRevenue;

        // Service Metrics
        $totalServices = ServiceRequest::query()
            ->where('status', 'completed')
            ->when($startDate, fn ($q) => $q->whereDate('completed_at', '>=', $startDate))
            ->when($endDate, fn ($q) => $q->whereDate('completed_at', '<=', $endDate))
            ->count();

        $paidServices = ServiceRequest::query()
            ->where('payment_status', 'paid')
            ->when($startDate, fn ($q) => $q->whereDate('paid_at', '>=', $startDate))
            ->when($endDate, fn ($q) => $q->whereDate('paid_at', '<=', $endDate))
            ->count();

        $popularServices = ServiceRequest::with('serviceType')
            ->where('status', 'completed')
            ->when($startDate, fn ($q) => $q->whereDate('completed_at', '>=', $startDate))
            ->when($endDate, fn ($q) => $q->whereDate('completed_at', '<=', $endDate))
            ->select('service_type_id', DB::raw('count(*) as count'), DB::raw('sum(total_cost) as revenue'))
            ->groupBy('service_type_id')
            ->orderBy('count', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($item) {
                return [
                    'name' => $item->serviceType?->name ?? 'Unknown',
                    'count' => $item->count,
                    'revenue' => floatval($item->revenue),
                ];
            });

        $busiestMechanics = ServiceRequest::with('mechanic')
            ->where('status', 'completed')
            ->whereNotNull('mechanic_id')
            ->when($startDate, fn ($q) => $q->whereDate('completed_at', '>=', $startDate))
            ->when($endDate, fn ($q) => $q->whereDate('completed_at', '<=', $endDate))
            ->select('mechanic_id', DB::raw('count(*) as count'), DB::raw('sum(labor_cost) as earnings'))
            ->groupBy('mechanic_id')
            ->orderBy('count', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($item) {
                return [
                    'name' => $item->mechanic?->name ?? 'Unknown',
                    'count' => $item->count,
                    'earnings' => floatval($item->earnings),
                ];
            });

        // Recent Paid Services
        $recentServices = ServiceRequest::with(['user', 'serviceType', 'mechanic'])
            ->where('payment_status', 'paid')
            ->when($startDate, fn ($q) => $q->whereDate('paid_at', '>=', $startDate))
            ->when($endDate, fn ($q) => $q->whereDate('paid_at', '<=', $endDate))
            ->orderBy('paid_at', 'desc')
            ->limit(20)
            ->get()
            ->map(function ($service) {
                return [
                    'request_number' => $service->request_number,
                    'customer' => $service->user->name,
                    'service_type' => $service->serviceType->name,
                    'mechanic' => $service->mechanic?->name ?? 'N/A',
                    'total_cost' => floatval($service->total_cost),
                    'paid_at' => $service->paid_at?->format('M d, Y'),
                ];
            });

        $data = [
            'start_date' => $startDate,
            'end_date' => $endDate,
            'revenue' => [
                'total' => floatval($totalRevenue),
                'parts' => floatval($partsRevenue),
                'services' => floatval($servicesRevenue),
            ],
            'services' => [
                'total' => $totalServices,
                'paid' => $paidServices,
                'popular' => $popularServices,
                'busiest_mechanics' => $busiestMechanics,
                'recent' => $recentServices,
            ],
        ];

        $pdf = Pdf::loadView('reports.sales', $data);

        $filename = 'sales-report-'.now()->format('Y-m-d').'.pdf';

        return $pdf->download($filename);
    }
}
