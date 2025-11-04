<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OrderItem;
use App\Models\Part;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class IncomeController extends Controller
{
    public function index(): Response
    {
        // Calculate total income from sales
        $totalIncome = OrderItem::query()->sum(DB::raw('quantity * price'));

        // Calculate total products sold
        $totalProductsSold = OrderItem::query()->sum('quantity');

        // Get product sales details with inventory
        $productsSold = OrderItem::with('part')
            ->selectRaw('part_id, sum(quantity) as total_quantity, sum(quantity * price) as total_revenue')
            ->groupBy('part_id')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->part_id,
                    'name' => $item->part->name,
                    'sku' => $item->part->sku,
                    'quantity_sold' => $item->total_quantity,
                    'revenue' => floatval($item->total_revenue),
                    'stock_remaining' => $item->part->stock_quantity,
                    'price' => floatval($item->part->price),
                ];
            });

        // Get inventory summary
        $totalInventoryValue = Part::query()->sum(DB::raw('stock_quantity * price'));
        $totalItemsInStock = Part::query()->sum('stock_quantity');
        $lowStockItems = Part::query()
            ->whereColumn('stock_quantity', '<=', 'min_stock_level')
            ->count();

        return Inertia::render('admin/income/index', [
            'totalIncome' => floatval($totalIncome),
            'totalProductsSold' => $totalProductsSold,
            'productsSold' => $productsSold,
            'inventory' => [
                'total_value' => floatval($totalInventoryValue),
                'total_items' => $totalItemsInStock,
                'low_stock_count' => $lowStockItems,
            ],
        ]);
    }
}
