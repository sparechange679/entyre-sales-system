<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ServiceRequest extends Model
{
    protected $fillable = [
        'request_number',
        'user_id',
        'service_type_id',
        'mechanic_id',
        'vehicle_make_id',
        'vehicle_model_id',
        'vehicle_year',
        'vehicle_license_plate',
        'vehicle_problem_description',
        'customer_latitude',
        'customer_longitude',
        'customer_address',
        'location_notes',
        'status',
        'priority',
        'scheduled_at',
        'accepted_at',
        'started_at',
        'completed_at',
        'labor_cost',
        'parts_cost',
        'total_cost',
        'payment_status',
        'payment_method',
        'payment_transaction_id',
        'paid_at',
        'customer_rating',
        'customer_feedback',
        'mechanic_notes',
    ];

    protected $casts = [
        'customer_latitude' => 'decimal:7',
        'customer_longitude' => 'decimal:7',
        'vehicle_year' => 'integer',
        'scheduled_at' => 'datetime',
        'accepted_at' => 'datetime',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
        'paid_at' => 'datetime',
        'labor_cost' => 'decimal:2',
        'parts_cost' => 'decimal:2',
        'total_cost' => 'decimal:2',
        'customer_rating' => 'integer',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($serviceRequest) {
            if (! $serviceRequest->request_number) {
                $serviceRequest->request_number = static::generateRequestNumber();
            }
        });
    }

    public static function generateRequestNumber(): string
    {
        $year = date('Y');
        $lastRequest = static::whereYear('created_at', $year)
            ->orderBy('id', 'desc')
            ->first();

        $number = $lastRequest ? ((int) substr($lastRequest->request_number, -5)) + 1 : 1;

        return 'SR-'.$year.'-'.str_pad($number, 5, '0', STR_PAD_LEFT);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function serviceType(): BelongsTo
    {
        return $this->belongsTo(ServiceType::class);
    }

    public function mechanic(): BelongsTo
    {
        return $this->belongsTo(User::class, 'mechanic_id');
    }

    public function vehicleMake(): BelongsTo
    {
        return $this->belongsTo(VehicleMake::class);
    }

    public function vehicleModel(): BelongsTo
    {
        return $this->belongsTo(VehicleModel::class);
    }

    public function parts(): HasMany
    {
        return $this->hasMany(ServiceRequestPart::class);
    }

    public function calculateTotalCost(): void
    {
        $this->parts_cost = $this->parts()->sum('subtotal');
        $this->total_cost = $this->labor_cost + $this->parts_cost;
        $this->save();
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeAccepted($query)
    {
        return $query->where('status', 'accepted');
    }

    public function scopeInProgress($query)
    {
        return $query->where('status', 'in_progress');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }
}
