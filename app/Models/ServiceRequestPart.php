<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceRequestPart extends Model
{
    protected $fillable = [
        'service_request_id',
        'part_id',
        'quantity',
        'unit_price',
        'subtotal',
        'status',
    ];

    protected $casts = [
        'quantity' => 'integer',
        'unit_price' => 'decimal:2',
        'subtotal' => 'decimal:2',
    ];

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($serviceRequestPart) {
            $serviceRequestPart->subtotal = $serviceRequestPart->quantity * $serviceRequestPart->unit_price;
        });
    }

    public function serviceRequest(): BelongsTo
    {
        return $this->belongsTo(ServiceRequest::class);
    }

    public function part(): BelongsTo
    {
        return $this->belongsTo(Part::class);
    }

    public function markConfirmed(): void
    {
        $this->update(['status' => 'confirmed']);
    }

    public function markInstalled(): void
    {
        $this->update(['status' => 'installed']);
    }
}
