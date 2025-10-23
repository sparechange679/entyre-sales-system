<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class VehicleModel extends Model
{
    protected $fillable = [
        'vehicle_make_id',
        'name',
        'year_start',
        'year_end',
        'body_type',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'year_start' => 'integer',
        'year_end' => 'integer',
    ];

    /**
     * Get the vehicle make
     */
    public function vehicleMake(): BelongsTo
    {
        return $this->belongsTo(VehicleMake::class);
    }

    /**
     * Get compatible parts through fitments
     */
    public function parts(): BelongsToMany
    {
        return $this->belongsToMany(Part::class, 'part_fitments')
            ->withPivot('fitment_type', 'notes')
            ->withTimestamps();
    }

    /**
     * Scope to get only active models
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
