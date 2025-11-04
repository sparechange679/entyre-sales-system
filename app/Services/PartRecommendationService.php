<?php

namespace App\Services;

use App\Models\Part;
use App\Models\ServiceType;
use App\Models\VehicleModel;

class PartRecommendationService
{
    /**
     * Recommend parts based on service type and vehicle
     */
    public function recommendParts(ServiceType $serviceType, ?VehicleModel $vehicleModel = null): array
    {
        // If service doesn't require parts, return empty array
        if (! $serviceType->requires_parts) {
            return [];
        }

        $recommendedParts = [];

        // Service-specific part recommendations
        switch ($serviceType->slug) {
            case 'tire-change':
            case 'fast-tire-change':
                $recommendedParts = $this->recommendTires($vehicleModel);
                break;

            case 'battery-replacement':
            case 'battery-jump-start':
                $recommendedParts = $this->recommendBatteries($vehicleModel);
                break;

            case 'oil-change':
                $recommendedParts = $this->recommendOilAndFilters($vehicleModel);
                break;

            case 'brake-service':
                $recommendedParts = $this->recommendBrakeParts($vehicleModel);
                break;

            default:
                // For other services, recommend based on vehicle compatibility
                if ($vehicleModel) {
                    $recommendedParts = $this->recommendByVehicleCompatibility($vehicleModel);
                }
                break;
        }

        return $recommendedParts;
    }

    /**
     * Recommend tires based on vehicle model
     */
    protected function recommendTires(?VehicleModel $vehicleModel): array
    {
        $query = Part::active()
            ->inStock()
            ->whereHas('category', function ($q) {
                $q->where('name', 'LIKE', '%Tire%')
                    ->orWhere('name', 'LIKE', '%Tyre%');
            });

        // If vehicle model is provided, filter by compatible parts
        if ($vehicleModel) {
            $query->whereHas('vehicleModels', function ($q) use ($vehicleModel) {
                $q->where('vehicle_model_id', $vehicleModel->id);
            });
        }

        return $query->with(['primaryImage', 'category'])
            ->limit(10)
            ->get()
            ->map(fn ($part) => $this->formatPart($part))
            ->toArray();
    }

    /**
     * Recommend batteries based on vehicle model
     */
    protected function recommendBatteries(?VehicleModel $vehicleModel): array
    {
        $query = Part::active()
            ->inStock()
            ->whereHas('category', function ($q) {
                $q->where('name', 'LIKE', '%Battery%')
                    ->orWhere('name', 'LIKE', '%Batteries%');
            });

        if ($vehicleModel) {
            $query->whereHas('vehicleModels', function ($q) use ($vehicleModel) {
                $q->where('vehicle_model_id', $vehicleModel->id);
            });
        }

        return $query->with(['primaryImage', 'category'])
            ->limit(5)
            ->get()
            ->map(fn ($part) => $this->formatPart($part))
            ->toArray();
    }

    /**
     * Recommend oil and filters
     */
    protected function recommendOilAndFilters(?VehicleModel $vehicleModel): array
    {
        $query = Part::active()
            ->inStock()
            ->whereHas('category', function ($q) {
                $q->where('name', 'LIKE', '%Oil%')
                    ->orWhere('name', 'LIKE', '%Filter%');
            });

        if ($vehicleModel) {
            $query->whereHas('vehicleModels', function ($q) use ($vehicleModel) {
                $q->where('vehicle_model_id', $vehicleModel->id);
            });
        }

        return $query->with(['primaryImage', 'category'])
            ->limit(8)
            ->get()
            ->map(fn ($part) => $this->formatPart($part))
            ->toArray();
    }

    /**
     * Recommend brake parts
     */
    protected function recommendBrakeParts(?VehicleModel $vehicleModel): array
    {
        $query = Part::active()
            ->inStock()
            ->whereHas('category', function ($q) {
                $q->where('name', 'LIKE', '%Brake%');
            });

        if ($vehicleModel) {
            $query->whereHas('vehicleModels', function ($q) use ($vehicleModel) {
                $q->where('vehicle_model_id', $vehicleModel->id);
            });
        }

        return $query->with(['primaryImage', 'category'])
            ->limit(8)
            ->get()
            ->map(fn ($part) => $this->formatPart($part))
            ->toArray();
    }

    /**
     * Recommend parts by vehicle compatibility
     */
    protected function recommendByVehicleCompatibility(VehicleModel $vehicleModel): array
    {
        return Part::active()
            ->inStock()
            ->whereHas('vehicleModels', function ($q) use ($vehicleModel) {
                $q->where('vehicle_model_id', $vehicleModel->id);
            })
            ->with(['primaryImage', 'category'])
            ->limit(10)
            ->get()
            ->map(fn ($part) => $this->formatPart($part))
            ->toArray();
    }

    /**
     * Format part data for API response
     */
    protected function formatPart(Part $part): array
    {
        return [
            'id' => $part->id,
            'name' => $part->name,
            'description' => $part->description,
            'brand' => $part->brand,
            'sku' => $part->sku,
            'price' => floatval($part->price),
            'stock_quantity' => $part->stock_quantity,
            'category' => $part->category?->name,
            'image' => $part->primaryImage?->image_url ?? 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop',
            'specifications' => $part->specifications,
        ];
    }
}
