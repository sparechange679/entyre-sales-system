<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PartImage extends Model
{
    protected $fillable = [
        'part_id',
        'image_path',
        'image_url',
        'is_primary',
        'sort_order',
    ];

    protected $casts = [
        'is_primary' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Get the part
     */
    public function part(): BelongsTo
    {
        return $this->belongsTo(Part::class);
    }
}
