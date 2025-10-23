<?php

namespace App\Http\Controllers;

use App\Models\Part;
use App\Models\PartsCategory;
use Inertia\Inertia;
use Inertia\Response;

class WelcomeController extends Controller
{
    /**
     * Display the welcome page with featured parts
     */
    public function index(): Response
    {
        // Get featured parts (popular products)
        $featuredParts = Part::with(['category', 'primaryImage'])
            ->active()
            ->featured()
            ->inStock()
            ->limit(4)
            ->get()
            ->map(function ($part) {
                return [
                    'id' => $part->id,
                    'title' => $part->name,
                    'type' => $part->category->name ?? 'Part',
                    'image' => $part->primaryImage?->image_url ?? 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop',
                    'brand' => $part->brand,
                    'tireSize' => $part->tire_size,
                    'loadIndex' => $part->load_index,
                    'speedRating' => $part->speed_rating,
                    'stock' => $part->stock_quantity . ' units',
                    'price' => floatval($part->price),
                    'originalPrice' => $part->cost_price ? floatval($part->cost_price) : null,
                    'isFeatured' => $part->is_featured,
                ];
            });

        // Get recommended parts (all in-stock parts)
        $recommendedParts = Part::with(['category', 'primaryImage'])
            ->active()
            ->inStock()
            ->orderBy('created_at', 'desc')
            ->limit(8)
            ->get()
            ->map(function ($part) {
                return [
                    'id' => $part->id,
                    'title' => $part->name,
                    'type' => $part->category->name ?? 'Part',
                    'image' => $part->primaryImage?->image_url ?? 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop',
                    'brand' => $part->brand,
                    'tireSize' => $part->tire_size,
                    'loadIndex' => $part->load_index,
                    'speedRating' => $part->speed_rating,
                    'stock' => $part->stock_quantity . ' units',
                    'price' => floatval($part->price),
                    'originalPrice' => $part->cost_price ? floatval($part->cost_price) : null,
                    'isFeatured' => $part->is_featured,
                ];
            });

        // Get all categories
        $categories = PartsCategory::active()
            ->withCount('parts')
            ->get();

        return Inertia::render('welcome', [
            'featuredParts' => $featuredParts,
            'recommendedParts' => $recommendedParts,
            'categories' => $categories,
        ]);
    }
}
