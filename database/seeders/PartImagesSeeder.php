<?php

namespace Database\Seeders;

use App\Models\Part;
use App\Models\PartImage;
use Illuminate\Database\Seeder;

class PartImagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing images
        PartImage::truncate();

        // Map product names to image filenames
        $imageMapping = [
            'Michelin Primacy 4 195/65R15' => 'Michelin-Primacy-4-195-65R15.jpg',
            'Goodyear EfficientGrip 205/55R16' => 'Goodyear-EfficientGrip-205-55R16.png',
            'Bridgestone Turanza T005 215/60R16' => 'Bridgestone-Turanza-T005-215-60R16.jpeg',
            'Continental CrossContact LX2 225/65R17' => 'Continental-CrossContact-LX2-225-65R17.jpg',
            'Pirelli Scorpion ATR 265/70R16' => 'Pirelli-Scorpion-ATR-265-70R16.jpg',
            'Yokohama BluEarth 185/60R15' => 'Yokohama-BluEarth-185-60R15.jpeg',
            'Dunlop Grandtrek AT3 205/70R15' => 'Dunlop-Grandtrek-AT3-205-70R15.jpg',
            'Bosch S4 Silver 55Ah Battery' => 'Bosch-S4-Silver-55Ah-Battery.jpg',
            'Varta Blue Dynamic 75Ah Battery' => 'Varta-Blue-Dynamic-75Ah-Battery.jpg',
        ];

        foreach ($imageMapping as $partName => $imageFilename) {
            // Find the part by name
            $part = Part::where('name', $partName)->first();

            if ($part) {
                // Create image record
                PartImage::create([
                    'part_id' => $part->id,
                    'image_path' => 'assets/images/'.$imageFilename,
                    'image_url' => '/assets/images/'.$imageFilename,
                    'is_primary' => true,
                    'sort_order' => 0,
                ]);

                $this->command->info("Image linked for: {$partName}");
            } else {
                $this->command->warn("Part not found: {$partName}");
            }
        }

        $this->command->info('Part images seeded successfully!');
    }
}
