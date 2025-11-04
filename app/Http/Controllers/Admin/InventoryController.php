<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Part;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InventoryController extends Controller
{
    /**
     * Display inventory list
     */
    public function index(): Response
    {
        $parts = Part::with(['category', 'primaryImage'])
            ->orderBy('name')
            ->get()
            ->map(function ($part) {
                return [
                    'id' => $part->id,
                    'sku' => $part->sku,
                    'name' => $part->name,
                    'category' => $part->category?->name,
                    'price' => floatval($part->price),
                    'cost_price' => floatval($part->cost_price),
                    'stock_quantity' => $part->stock_quantity,
                    'min_stock_level' => $part->min_stock_level,
                    'is_low_stock' => $part->isLowStock(),
                    'is_active' => $part->is_active,
                    'image_url' => $part->primaryImage?->image_url,
                ];
            });

        return Inertia::render('admin/inventory/index', [
            'parts' => $parts,
        ]);
    }

    /**
     * Show form for editing inventory
     */
    public function edit(Part $part): Response
    {
        $part->load(['category', 'primaryImage']);

        return Inertia::render('admin/inventory/edit', [
            'part' => [
                'id' => $part->id,
                'sku' => $part->sku,
                'name' => $part->name,
                'category' => $part->category?->name,
                'price' => floatval($part->price),
                'cost_price' => floatval($part->cost_price),
                'stock_quantity' => $part->stock_quantity,
                'min_stock_level' => $part->min_stock_level,
                'is_low_stock' => $part->isLowStock(),
                'is_active' => $part->is_active,
                'image_url' => $part->primaryImage?->image_url,
            ],
        ]);
    }

    /**
     * Update part inventory
     */
    public function update(Request $request, Part $part): RedirectResponse
    {
        $validated = $request->validate([
            'stock_quantity' => ['required', 'integer', 'min:0'],
            'min_stock_level' => ['required', 'integer', 'min:0'],
            'cost_price' => ['nullable', 'numeric', 'min:0'],
            'price' => ['nullable', 'numeric', 'min:0'],
        ]);

        $part->update($validated);

        return redirect()->route('admin.inventory.index')
            ->with('success', 'Inventory updated successfully!');
    }
}
