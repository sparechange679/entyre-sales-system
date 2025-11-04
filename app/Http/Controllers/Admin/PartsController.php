<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Part;
use App\Models\PartsCategory;
use App\Models\User;
use App\Notifications\LowStockAlert;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;
use Inertia\Response;

class PartsController extends Controller
{
    /**
     * Display all parts
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
                    'brand' => $part->brand,
                    'price' => floatval($part->price),
                    'cost_price' => floatval($part->cost_price),
                    'stock_quantity' => $part->stock_quantity,
                    'min_stock_level' => $part->min_stock_level,
                    'is_low_stock' => $part->isLowStock(),
                    'is_active' => $part->is_active,
                    'is_featured' => $part->is_featured,
                    'image_url' => $part->primaryImage?->image_url,
                ];
            });

        $categories = PartsCategory::active()->orderBy('name')->get();

        return Inertia::render('admin/parts/index', [
            'parts' => $parts,
            'categories' => $categories,
        ]);
    }

    /**
     * Show form to create new part
     */
    public function create(): Response
    {
        $categories = PartsCategory::active()
            ->orderBy('name')
            ->get()
            ->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                ];
            });

        return Inertia::render('admin/parts/create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store new part
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => ['required', 'exists:parts_categories,id'],
            'sku' => ['required', 'string', 'unique:parts,sku'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'brand' => ['nullable', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'cost_price' => ['nullable', 'numeric', 'min:0'],
            'stock_quantity' => ['required', 'integer', 'min:0'],
            'min_stock_level' => ['required', 'integer', 'min:0'],
            'is_active' => ['boolean'],
            'is_featured' => ['boolean'],
        ]);

        Part::create($validated);

        return redirect()->route('admin.parts.index')
            ->with('success', 'Part created successfully!');
    }

    /**
     * Show single part
     */
    public function show(Part $part): Response
    {
        $part->load(['category', 'primaryImage', 'images']);

        return Inertia::render('admin/parts/show', [
            'part' => [
                'id' => $part->id,
                'sku' => $part->sku,
                'name' => $part->name,
                'description' => $part->description,
                'category' => $part->category?->name,
                'brand' => $part->brand,
                'tire_size' => $part->tire_size,
                'load_index' => $part->load_index,
                'speed_rating' => $part->speed_rating,
                'tire_type' => $part->tire_type,
                'tread_pattern' => $part->tread_pattern,
                'specifications' => $part->specifications,
                'price' => floatval($part->price),
                'cost_price' => floatval($part->cost_price),
                'stock_quantity' => $part->stock_quantity,
                'min_stock_level' => $part->min_stock_level,
                'is_low_stock' => $part->isLowStock(),
                'is_active' => $part->is_active,
                'is_featured' => $part->is_featured,
                'image_url' => $part->primaryImage?->image_url,
                'images' => $part->images->map(fn ($image) => [
                    'id' => $image->id,
                    'image_url' => $image->image_url,
                    'is_primary' => $image->is_primary,
                ]),
            ],
        ]);
    }

    /**
     * Show form to edit part
     */
    public function edit(Part $part): Response
    {
        $part->load(['category', 'primaryImage']);

        $categories = PartsCategory::active()
            ->orderBy('name')
            ->get()
            ->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                ];
            });

        return Inertia::render('admin/parts/edit', [
            'part' => [
                'id' => $part->id,
                'category_id' => $part->category_id,
                'sku' => $part->sku,
                'name' => $part->name,
                'description' => $part->description,
                'brand' => $part->brand,
                'price' => floatval($part->price),
                'cost_price' => floatval($part->cost_price),
                'stock_quantity' => $part->stock_quantity,
                'min_stock_level' => $part->min_stock_level,
                'is_active' => $part->is_active,
                'is_featured' => $part->is_featured,
                'image_url' => $part->primaryImage?->image_url,
            ],
            'categories' => $categories,
        ]);
    }

    /**
     * Update part
     */
    public function update(Request $request, Part $part): RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => ['required', 'exists:parts_categories,id'],
            'sku' => ['required', 'string', 'unique:parts,sku,'.$part->id],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'brand' => ['nullable', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'cost_price' => ['nullable', 'numeric', 'min:0'],
            'stock_quantity' => ['required', 'integer', 'min:0'],
            'min_stock_level' => ['required', 'integer', 'min:0'],
            'is_active' => ['boolean'],
            'is_featured' => ['boolean'],
        ]);

        // Check if stock was updated and is now low
        $wasLowStock = $part->isLowStock();
        $part->update($validated);
        $isNowLowStock = $part->fresh()->isLowStock();

        // Send email alert if stock just became low or is still low after update
        if ($isNowLowStock && $part->is_active) {
            $admins = User::where('role', 'admin')->get();
            if ($admins->isNotEmpty()) {
                Notification::send($admins, new LowStockAlert(collect([$part])));
            }
        }

        return redirect()->route('admin.parts.index')
            ->with('success', 'Part updated successfully!'.($isNowLowStock ? ' Low stock alert sent to admins.' : ''));
    }

    /**
     * Delete part
     */
    public function destroy(Part $part): RedirectResponse
    {
        $part->delete();

        return redirect()->route('admin.parts.index')
            ->with('success', 'Part deleted successfully!');
    }
}
