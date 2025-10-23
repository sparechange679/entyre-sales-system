<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PartsCategory;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PartsCategoriesController extends Controller
{
    /**
     * Display all categories
     */
    public function index(): JsonResponse
    {
        $categories = PartsCategory::active()
            ->withCount('parts')
            ->get();

        return response()->json($categories);
    }

    /**
     * Display the specified category
     */
    public function show(string $slug): JsonResponse
    {
        $category = PartsCategory::where('slug', $slug)
            ->with('parts')
            ->firstOrFail();

        return response()->json($category);
    }
}
