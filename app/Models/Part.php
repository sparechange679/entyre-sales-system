<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Part extends Model
{
    protected $fillable = [
        'category_id',
        'sku',
        'name',
        'description',
        'brand',
        'tire_size',
        'load_index',
        'speed_rating',
        'tire_type',
        'tread_pattern',
        'specifications',
        'price',
        'cost_price',
        'stock_quantity',
        'min_stock_level',
        'is_active',
        'is_featured',
    ];

    protected $casts = [
        'specifications' => 'array',
        'price' => 'decimal:2',
        'cost_price' => 'decimal:2',
        'stock_quantity' => 'integer',
        'min_stock_level' => 'integer',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
    ];

    /**
     * Get the category
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(PartsCategory::class, 'category_id');
    }

    /**
     * Get all images for this part
     */
    public function images(): HasMany
    {
        return $this->hasMany(PartImage::class);
    }

    /**
     * Get the primary image
     */
    public function primaryImage()
    {
        return $this->hasOne(PartImage::class)->where('is_primary', true);
    }

    /**
     * Get compatible vehicle models
     */
    public function vehicleModels(): BelongsToMany
    {
        return $this->belongsToMany(VehicleModel::class, 'part_fitments')
            ->withPivot('fitment_type', 'notes')
            ->withTimestamps();
    }

    /**
     * Scope to get only active parts
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to get featured parts
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope to get parts in stock
     */
    public function scopeInStock($query)
    {
        return $query->where('stock_quantity', '>', 0);
    }

    /**
     * Scope to get low stock parts
     */
    public function scopeLowStock($query)
    {
        return $query->whereColumn('stock_quantity', '<=', 'min_stock_level');
    }

    /**
     * Check if part is in stock
     */
    public function isInStock(): bool
    {
        return $this->stock_quantity > 0;
    }

    /**
     * Check if part is low on stock
     */
    public function isLowStock(): bool
    {
        return $this->stock_quantity <= $this->min_stock_level;
    }
}
