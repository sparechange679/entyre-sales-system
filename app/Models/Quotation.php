<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Quotation extends Model
{
    protected $fillable = [
        'quotation_number',
        'service_request_id',
        'created_by',
        'service_description',
        'labor_cost',
        'parts_cost',
        'total_amount',
        'valid_from',
        'valid_until',
        'estimated_duration_hours',
        'status',
        'sent_at',
        'terms_and_conditions',
        'notes',
    ];

    protected $casts = [
        'labor_cost' => 'decimal:2',
        'parts_cost' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'valid_from' => 'datetime',
        'valid_until' => 'datetime',
        'sent_at' => 'datetime',
        'estimated_duration_hours' => 'integer',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($quotation) {
            if (! $quotation->quotation_number) {
                $quotation->quotation_number = static::generateQuotationNumber();
            }
        });
    }

    public static function generateQuotationNumber(): string
    {
        $year = date('Y');
        $lastQuotation = static::whereYear('created_at', $year)
            ->orderBy('id', 'desc')
            ->first();

        $number = $lastQuotation ? ((int) substr($lastQuotation->quotation_number, -5)) + 1 : 1;

        return 'QT-'.$year.'-'.str_pad($number, 5, '0', STR_PAD_LEFT);
    }

    public function serviceRequest(): BelongsTo
    {
        return $this->belongsTo(ServiceRequest::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
