<?php

namespace Database\Seeders;

use App\Models\ServiceType;
use Illuminate\Database\Seeder;

class ServiceTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $serviceTypes = [
            [
                'name' => 'Emergency Tire Change',
                'slug' => 'emergency-tire-change',
                'description' => 'Fast tire replacement service when you have a flat or damaged tire. Our mechanics will replace your tire with a spare or new tire on-site.',
                'base_price' => 5000.00,
                'requires_parts' => true,
                'estimated_duration' => 30,
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Battery Jump Start',
                'slug' => 'battery-jump-start',
                'description' => 'Quick battery jump start service to get your vehicle running again. Includes battery testing and recommendations.',
                'base_price' => 3000.00,
                'requires_parts' => false,
                'estimated_duration' => 20,
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Battery Replacement',
                'slug' => 'battery-replacement',
                'description' => 'Complete battery replacement service with installation. We bring the right battery for your vehicle and install it on-site.',
                'base_price' => 4500.00,
                'requires_parts' => true,
                'estimated_duration' => 30,
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Vehicle Towing',
                'slug' => 'vehicle-towing',
                'description' => 'Professional towing service to transport your vehicle to a repair shop or your preferred location. Price varies by distance.',
                'base_price' => 15000.00,
                'requires_parts' => false,
                'estimated_duration' => 60,
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Fuel Delivery',
                'slug' => 'fuel-delivery',
                'description' => 'Emergency fuel delivery service when you run out of gas. We deliver enough fuel to get you to the nearest station.',
                'base_price' => 3500.00,
                'requires_parts' => false,
                'estimated_duration' => 25,
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'Tire Pressure Check & Inflation',
                'slug' => 'tire-pressure-check',
                'description' => 'Professional tire pressure check and inflation service. Ensures all tires are at the correct pressure for safe driving.',
                'base_price' => 2000.00,
                'requires_parts' => false,
                'estimated_duration' => 15,
                'is_active' => true,
                'sort_order' => 6,
            ],
            [
                'name' => 'Engine Diagnosis',
                'slug' => 'engine-diagnosis',
                'description' => 'On-site engine diagnostic service to identify issues. Includes basic troubleshooting and recommendations for repairs.',
                'base_price' => 6000.00,
                'requires_parts' => false,
                'estimated_duration' => 45,
                'is_active' => true,
                'sort_order' => 7,
            ],
            [
                'name' => 'Lockout Service',
                'slug' => 'lockout-service',
                'description' => 'Professional vehicle lockout assistance when you\'re locked out of your car. Safe unlocking without damage to your vehicle.',
                'base_price' => 4000.00,
                'requires_parts' => false,
                'estimated_duration' => 20,
                'is_active' => true,
                'sort_order' => 8,
            ],
            [
                'name' => 'Minor Mechanical Repair',
                'slug' => 'minor-mechanical-repair',
                'description' => 'On-site minor mechanical repairs such as belt replacement, hose repairs, or small fixes to get you back on the road.',
                'base_price' => 7500.00,
                'requires_parts' => true,
                'estimated_duration' => 60,
                'is_active' => true,
                'sort_order' => 9,
            ],
            [
                'name' => 'Winch-Out Service',
                'slug' => 'winch-out-service',
                'description' => 'Professional winch-out service to recover your vehicle from a ditch, mud, or other difficult situations.',
                'base_price' => 8000.00,
                'requires_parts' => false,
                'estimated_duration' => 45,
                'is_active' => true,
                'sort_order' => 10,
            ],
        ];

        foreach ($serviceTypes as $serviceType) {
            ServiceType::create($serviceType);
        }
    }
}
