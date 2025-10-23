<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Part;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PartsController extends Controller
{
    /**
     * Display a listing of parts (for homepage & catalog)
     */
    public function index(Request $request): JsonResponse
    {
        $query = Part::with(['category', 'images', 'primaryImage'])
            ->active();

        // Filter by category
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Filter by tire size
        if ($request->has('tire_size')) {
            $query->where('tire_size', $request->tire_size);
        }

        // Filter by brand
        if ($request->has('brand')) {
            $query->where('brand', $request->brand);
        }

        // Filter by price range
        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // Filter by stock status
        if ($request->has('in_stock') && $request->in_stock) {
            $query->inStock();
        }

        // Get featured parts only
        if ($request->has('featured') && $request->featured) {
            $query->featured();
        }

        // Search by name or SKU
        if ($request->has('search')) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('sku', 'like', '%' . $request->search . '%')
                  ->orWhere('brand', 'like', '%' . $request->search . '%');
            });
        }

        // Sort options
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $parts = $query->paginate($request->get('per_page', 15));

        return response()->json($parts);
    }

    /**
     * Get featured parts for homepage
     */
    public function featured(): JsonResponse
    {
        $parts = Part::with(['category', 'primaryImage'])
            ->active()
            ->featured()
            ->inStock()
            ->limit(8)
            ->get();

        return response()->json($parts);
    }

    /**
     * Display the specified part
     */
    public function show(string $id): JsonResponse
    {
        $part = Part::with(['category', 'images', 'vehicleModels.vehicleMake'])
            ->findOrFail($id);

        return response()->json($part);
    }

    /**
     * Search parts by vehicle
     */
    public function searchByVehicle(Request $request): JsonResponse
    {
        $request->validate([
            'vehicle_model_id' => 'required|exists:vehicle_models,id',
        ]);

        $parts = Part::with(['category', 'primaryImage'])
            ->active()
            ->inStock()
            ->whereHas('vehicleModels', function($query) use ($request) {
                $query->where('vehicle_model_id', $request->vehicle_model_id);
            })
            ->paginate(15);

        return response()->json($parts);
    }

    /**
     * Get parts by category slug
     */
    public function byCategory(string $categorySlug): JsonResponse
    {
        $parts = Part::with(['category', 'primaryImage'])
            ->active()
            ->inStock()
            ->whereHas('category', function($query) use ($categorySlug) {
                $query->where('slug', $categorySlug);
            })
            ->paginate(15);

        return response()->json($parts);
    }

    /**
     * Get low stock parts (for admin)
     */
    public function lowStock(): JsonResponse
    {
        $parts = Part::with(['category'])
            ->lowStock()
            ->get();

        return response()->json($parts);
    }

    /**
     * Store a newly created part (admin only)
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:parts_categories,id',
            'sku' => 'required|unique:parts,sku',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'brand' => 'required|string|max:255',
            'tire_size' => 'nullable|string',
            'load_index' => 'nullable|string',
            'speed_rating' => 'nullable|string',
            'tire_type' => 'nullable|string',
            'tread_pattern' => 'nullable|string',
            'specifications' => 'nullable|array',
            'price' => 'required|numeric|min:0',
            'cost_price' => 'nullable|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'min_stock_level' => 'required|integer|min:0',
            'is_featured' => 'boolean',
        ]);

        $part = Part::create($validated);

        return response()->json($part, 201);
    }

    /**
     * Update the specified part (admin only)
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $part = Part::findOrFail($id);

        $validated = $request->validate([
            'category_id' => 'sometimes|exists:parts_categories,id',
            'sku' => 'sometimes|unique:parts,sku,' . $id,
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'brand' => 'sometimes|string|max:255',
            'tire_size' => 'nullable|string',
            'load_index' => 'nullable|string',
            'speed_rating' => 'nullable|string',
            'tire_type' => 'nullable|string',
            'tread_pattern' => 'nullable|string',
            'specifications' => 'nullable|array',
            'price' => 'sometimes|numeric|min:0',
            'cost_price' => 'nullable|numeric|min:0',
            'stock_quantity' => 'sometimes|integer|min:0',
            'min_stock_level' => 'sometimes|integer|min:0',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
        ]);

        $part->update($validated);

        return response()->json($part);
    }

    /**
     * Remove the specified part (admin only)
     */
    public function destroy(string $id): JsonResponse
    {
        $part = Part::findOrFail($id);
        $part->delete();

        return response()->json(['message' => 'Part deleted successfully']);
    }
}
