<?php

namespace App\Http\Controllers;

use App\Models\Part;
use Inertia\Inertia;
use Inertia\Response;

class PartController extends Controller
{
    /**
     * Display the specified part
     */
    public function show(Part $part): Response
    {
        $part->load(['category', 'images', 'primaryImage']);

        $partData = [
            'id' => $part->id,
            'name' => $part->name,
            'description' => $part->description,
            'category' => $part->category?->name ?? 'Part',
            'brand' => $part->brand,
            'sku' => $part->sku,
            'tireSize' => $part->tire_size,
            'loadIndex' => $part->load_index,
            'speedRating' => $part->speed_rating,
            'tireType' => $part->tire_type,
            'treadPattern' => $part->tread_pattern,
            'specifications' => $part->specifications,
            'price' => floatval($part->price),
            'costPrice' => $part->cost_price ? floatval($part->cost_price) : null,
            'stockQuantity' => $part->stock_quantity,
            'isInStock' => $part->isInStock(),
            'images' => $part->images->map(function ($image) {
                return [
                    'id' => $image->id,
                    'url' => $image->image_url,
                    'isPrimary' => $image->is_primary,
                ];
            }),
            'primaryImage' => $part->primaryImage?->image_url ?? 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop',
        ];

        return Inertia::render('parts/show', [
            'part' => $partData,
        ]);
    }
}
