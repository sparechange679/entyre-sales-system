<?php

namespace Database\Seeders;

use App\Models\VehicleMake;
use App\Models\VehicleModel;
use App\Models\PartsCategory;
use App\Models\Part;
use App\Models\PartFitment;
use App\Models\PartImage;
use Illuminate\Database\Seeder;

class PartsCatalogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Parts Categories
        $categories = [
            [
                'name' => 'Tires',
                'slug' => 'tires',
                'description' => 'All types of vehicle tires including all-season, summer, and winter tires',
                'icon' => 'tire-icon',
            ],
            [
                'name' => 'Batteries',
                'slug' => 'batteries',
                'description' => 'Car batteries and battery accessories',
                'icon' => 'battery-icon',
            ],
            [
                'name' => 'Brake Parts',
                'slug' => 'brake-parts',
                'description' => 'Brake pads, rotors, and brake system components',
                'icon' => 'brake-icon',
            ],
            [
                'name' => 'Towing Services',
                'slug' => 'towing',
                'description' => 'Vehicle towing and recovery services',
                'icon' => 'tow-truck-icon',
            ],
        ];

        foreach ($categories as $category) {
            PartsCategory::create($category);
        }

        // Create Vehicle Makes
        $makes = [
            ['name' => 'Toyota'],
            ['name' => 'Honda'],
            ['name' => 'Nissan'],
            ['name' => 'Ford'],
            ['name' => 'Mazda'],
            ['name' => 'Hyundai'],
            ['name' => 'Kia'],
            ['name' => 'Volkswagen'],
        ];

        foreach ($makes as $makeData) {
            VehicleMake::create($makeData);
        }

        // Create Vehicle Models
        $models = [
            // Toyota models
            ['vehicle_make_id' => 1, 'name' => 'Corolla', 'year_start' => 2015, 'year_end' => null, 'body_type' => 'Sedan'],
            ['vehicle_make_id' => 1, 'name' => 'Camry', 'year_start' => 2015, 'year_end' => null, 'body_type' => 'Sedan'],
            ['vehicle_make_id' => 1, 'name' => 'RAV4', 'year_start' => 2015, 'year_end' => null, 'body_type' => 'SUV'],
            ['vehicle_make_id' => 1, 'name' => 'Hilux', 'year_start' => 2015, 'year_end' => null, 'body_type' => 'Truck'],

            // Honda models
            ['vehicle_make_id' => 2, 'name' => 'Civic', 'year_start' => 2015, 'year_end' => null, 'body_type' => 'Sedan'],
            ['vehicle_make_id' => 2, 'name' => 'Accord', 'year_start' => 2015, 'year_end' => null, 'body_type' => 'Sedan'],
            ['vehicle_make_id' => 2, 'name' => 'CR-V', 'year_start' => 2015, 'year_end' => null, 'body_type' => 'SUV'],

            // Nissan models
            ['vehicle_make_id' => 3, 'name' => 'Altima', 'year_start' => 2015, 'year_end' => null, 'body_type' => 'Sedan'],
            ['vehicle_make_id' => 3, 'name' => 'Rogue', 'year_start' => 2015, 'year_end' => null, 'body_type' => 'SUV'],

            // Ford models
            ['vehicle_make_id' => 4, 'name' => 'Ranger', 'year_start' => 2015, 'year_end' => null, 'body_type' => 'Truck'],
            ['vehicle_make_id' => 4, 'name' => 'Focus', 'year_start' => 2015, 'year_end' => 2020, 'body_type' => 'Sedan'],
        ];

        foreach ($models as $modelData) {
            VehicleModel::create($modelData);
        }

        // Get categories
        $tiresCategory = PartsCategory::where('slug', 'tires')->first();
        $batteriesCategory = PartsCategory::where('slug', 'batteries')->first();

        // Create Tire Parts (Common sizes in Malawi)
        $tireParts = [
            [
                'category_id' => $tiresCategory->id,
                'sku' => 'TIRE-MICH-195-65-15',
                'name' => 'Michelin Primacy 4 195/65R15',
                'description' => 'High-performance all-season tire with excellent wet grip and long-lasting tread life.',
                'brand' => 'Michelin',
                'tire_size' => '195/65R15',
                'load_index' => '91',
                'speed_rating' => 'V',
                'tire_type' => 'all-season',
                'tread_pattern' => 'Asymmetric',
                'price' => 45000.00,
                'cost_price' => 35000.00,
                'stock_quantity' => 24,
                'min_stock_level' => 8,
                'is_featured' => true,
            ],
            [
                'category_id' => $tiresCategory->id,
                'sku' => 'TIRE-GOOD-205-55-16',
                'name' => 'Goodyear EfficientGrip 205/55R16',
                'description' => 'Fuel-efficient tire with superior braking performance and comfort.',
                'brand' => 'Goodyear',
                'tire_size' => '205/55R16',
                'load_index' => '94',
                'speed_rating' => 'W',
                'tire_type' => 'all-season',
                'tread_pattern' => 'Symmetric',
                'price' => 52000.00,
                'cost_price' => 40000.00,
                'stock_quantity' => 18,
                'min_stock_level' => 6,
                'is_featured' => true,
            ],
            [
                'category_id' => $tiresCategory->id,
                'sku' => 'TIRE-BRID-215-60-16',
                'name' => 'Bridgestone Turanza T005 215/60R16',
                'description' => 'Premium touring tire for sedans with exceptional wet performance.',
                'brand' => 'Bridgestone',
                'tire_size' => '215/60R16',
                'load_index' => '95',
                'speed_rating' => 'H',
                'tire_type' => 'all-season',
                'tread_pattern' => 'Asymmetric',
                'price' => 55000.00,
                'cost_price' => 43000.00,
                'stock_quantity' => 20,
                'min_stock_level' => 8,
                'is_featured' => true,
            ],
            [
                'category_id' => $tiresCategory->id,
                'sku' => 'TIRE-CONT-225-65-17',
                'name' => 'Continental CrossContact LX2 225/65R17',
                'description' => 'SUV tire with excellent off-road capability and on-road comfort.',
                'brand' => 'Continental',
                'tire_size' => '225/65R17',
                'load_index' => '102',
                'speed_rating' => 'H',
                'tire_type' => 'all-season',
                'tread_pattern' => 'Symmetric',
                'price' => 68000.00,
                'cost_price' => 52000.00,
                'stock_quantity' => 16,
                'min_stock_level' => 6,
                'is_featured' => true,
            ],
            [
                'category_id' => $tiresCategory->id,
                'sku' => 'TIRE-PIRE-265-70-16',
                'name' => 'Pirelli Scorpion ATR 265/70R16',
                'description' => 'All-terrain tire for pickup trucks with robust construction.',
                'brand' => 'Pirelli',
                'tire_size' => '265/70R16',
                'load_index' => '112',
                'speed_rating' => 'T',
                'tire_type' => 'all-terrain',
                'tread_pattern' => 'Aggressive',
                'price' => 78000.00,
                'cost_price' => 60000.00,
                'stock_quantity' => 12,
                'min_stock_level' => 4,
                'is_featured' => true,
            ],
            [
                'category_id' => $tiresCategory->id,
                'sku' => 'TIRE-YOKH-185-60-15',
                'name' => 'Yokohama BluEarth 185/60R15',
                'description' => 'Eco-friendly tire with low rolling resistance and good fuel economy.',
                'brand' => 'Yokohama',
                'tire_size' => '185/60R15',
                'load_index' => '84',
                'speed_rating' => 'H',
                'tire_type' => 'all-season',
                'tread_pattern' => 'Symmetric',
                'price' => 38000.00,
                'cost_price' => 28000.00,
                'stock_quantity' => 30,
                'min_stock_level' => 10,
                'is_featured' => false,
            ],
            [
                'category_id' => $tiresCategory->id,
                'sku' => 'TIRE-DUNO-205-70-15',
                'name' => 'Dunlop Grandtrek AT3 205/70R15',
                'description' => 'Versatile all-terrain tire for light SUVs and crossovers.',
                'brand' => 'Dunlop',
                'tire_size' => '205/70R15',
                'load_index' => '96',
                'speed_rating' => 'T',
                'tire_type' => 'all-terrain',
                'tread_pattern' => 'Block',
                'price' => 48000.00,
                'cost_price' => 36000.00,
                'stock_quantity' => 14,
                'min_stock_level' => 5,
                'is_featured' => false,
            ],
        ];

        foreach ($tireParts as $tireData) {
            Part::create($tireData);
        }

        // Create Battery Parts
        $batteryParts = [
            [
                'category_id' => $batteriesCategory->id,
                'sku' => 'BAT-BOSCH-S4-55AH',
                'name' => 'Bosch S4 Silver 55Ah Battery',
                'description' => '12V 55Ah car battery for small to medium sedans.',
                'brand' => 'Bosch',
                'specifications' => json_encode(['voltage' => '12V', 'capacity' => '55Ah', 'cca' => '530A']),
                'price' => 25000.00,
                'cost_price' => 18000.00,
                'stock_quantity' => 15,
                'min_stock_level' => 5,
                'is_featured' => true,
            ],
            [
                'category_id' => $batteriesCategory->id,
                'sku' => 'BAT-VARTA-75AH',
                'name' => 'Varta Blue Dynamic 75Ah Battery',
                'description' => '12V 75Ah battery for SUVs and larger vehicles.',
                'brand' => 'Varta',
                'specifications' => json_encode(['voltage' => '12V', 'capacity' => '75Ah', 'cca' => '680A']),
                'price' => 35000.00,
                'cost_price' => 26000.00,
                'stock_quantity' => 10,
                'min_stock_level' => 4,
                'is_featured' => true,
            ],
        ];

        foreach ($batteryParts as $batteryData) {
            Part::create($batteryData);
        }

        // Create Part Fitments (linking tires to vehicles)
        $fitments = [
            // 195/65R15 fits Toyota Corolla, Honda Civic
            ['part_id' => 1, 'vehicle_model_id' => 1, 'fitment_type' => 'exact'],
            ['part_id' => 1, 'vehicle_model_id' => 5, 'fitment_type' => 'exact'],

            // 205/55R16 fits Toyota Camry, Honda Accord
            ['part_id' => 2, 'vehicle_model_id' => 2, 'fitment_type' => 'exact'],
            ['part_id' => 2, 'vehicle_model_id' => 6, 'fitment_type' => 'exact'],

            // 215/60R16 fits Nissan Altima
            ['part_id' => 3, 'vehicle_model_id' => 8, 'fitment_type' => 'exact'],

            // 225/65R17 fits Toyota RAV4, Honda CR-V, Nissan Rogue
            ['part_id' => 4, 'vehicle_model_id' => 3, 'fitment_type' => 'exact'],
            ['part_id' => 4, 'vehicle_model_id' => 7, 'fitment_type' => 'exact'],
            ['part_id' => 4, 'vehicle_model_id' => 9, 'fitment_type' => 'exact'],

            // 265/70R16 fits Toyota Hilux, Ford Ranger
            ['part_id' => 5, 'vehicle_model_id' => 4, 'fitment_type' => 'exact'],
            ['part_id' => 5, 'vehicle_model_id' => 10, 'fitment_type' => 'exact'],
        ];

        foreach ($fitments as $fitmentData) {
            PartFitment::create($fitmentData);
        }

        $this->command->info('Parts catalog seeded successfully!');
    }
}
