<?php

namespace Database\Seeders;

use App\Models\Mechanic;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class MechanicsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $mechanics = [
            [
                'name' => 'John Banda',
                'email' => 'john.banda@entyre.com',
                'phone' => '+265991234567',
                'latitude' => -15.7861,
                'longitude' => 35.0058,
                'specializations' => ['Tire Change', 'Battery Service', 'General Repair'],
            ],
            [
                'name' => 'Grace Tembo',
                'email' => 'grace.tembo@entyre.com',
                'phone' => '+265998765432',
                'latitude' => -15.8000,
                'longitude' => 35.0200,
                'specializations' => ['Towing', 'Engine Diagnosis', 'Battery Service'],
            ],
            [
                'name' => 'Patrick Phiri',
                'email' => 'patrick.phiri@entyre.com',
                'phone' => '+265991122334',
                'latitude' => -15.7700,
                'longitude' => 34.9900,
                'specializations' => ['Tire Change', 'Lockout Service', 'Minor Repairs'],
            ],
            [
                'name' => 'Mary Mbewe',
                'email' => 'mary.mbewe@entyre.com',
                'phone' => '+265997788990',
                'latitude' => -15.8100,
                'longitude' => 35.0300,
                'specializations' => ['Battery Service', 'Fuel Delivery', 'Tire Pressure Check'],
            ],
            [
                'name' => 'James Zulu',
                'email' => 'james.zulu@entyre.com',
                'phone' => '+265993344556',
                'latitude' => -15.7600,
                'longitude' => 35.0100,
                'specializations' => ['Towing', 'Winch-Out', 'Minor Repairs'],
            ],
            [
                'name' => 'Sarah Kachale',
                'email' => 'sarah.kachale@entyre.com',
                'phone' => '+265995566778',
                'latitude' => -15.7950,
                'longitude' => 34.9850,
                'specializations' => ['Tire Change', 'Battery Replacement', 'Engine Diagnosis'],
            ],
            [
                'name' => 'Moses Chisale',
                'email' => 'moses.chisale@entyre.com',
                'phone' => '+265992233445',
                'latitude' => -15.7750,
                'longitude' => 35.0250,
                'specializations' => ['General Repair', 'Lockout Service', 'Fuel Delivery'],
            ],
            [
                'name' => 'Elizabeth Mvula',
                'email' => 'elizabeth.mvula@entyre.com',
                'phone' => '+265999988776',
                'latitude' => -15.8050,
                'longitude' => 35.0050,
                'specializations' => ['Tire Change', 'Tire Pressure Check', 'Battery Service'],
            ],
        ];

        foreach ($mechanics as $mechanicData) {
            // Create user account for the mechanic
            $user = User::firstOrCreate(
                ['email' => $mechanicData['email']],
                [
                    'name' => $mechanicData['name'],
                    'password' => Hash::make('password'),
                    'role' => 'mechanic',
                    'email_verified_at' => now(),
                ]
            );

            // Create mechanic profile if it doesn't exist
            Mechanic::firstOrCreate(
                ['user_id' => $user->id],
                [
                    'name' => $mechanicData['name'],
                    'phone' => $mechanicData['phone'],
                    'email' => $mechanicData['email'],
                    'current_latitude' => $mechanicData['latitude'],
                    'current_longitude' => $mechanicData['longitude'],
                    'specializations' => $mechanicData['specializations'],
                    'status' => 'available',
                    'rating' => rand(40, 50) / 10, // Random rating between 4.0 and 5.0
                    'completed_services' => rand(50, 500),
                ]
            );
        }
    }
}
