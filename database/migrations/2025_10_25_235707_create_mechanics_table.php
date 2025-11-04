<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mechanics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null'); // Link to users table
            $table->string('name');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->string('license_number')->unique()->nullable(); // Mechanic license/certification number

            // Location information
            $table->string('branch')->nullable(); // Blantyre, Lilongwe, Salima, Nkhotakota
            $table->decimal('current_latitude', 10, 7)->nullable();
            $table->decimal('current_longitude', 10, 7)->nullable();

            // Availability and status
            $table->enum('status', ['available', 'busy', 'offline'])->default('available');
            $table->json('specializations')->nullable(); // Array of service types they specialize in
            $table->decimal('rating', 3, 2)->default(5.00); // Average rating out of 5
            $table->integer('completed_services')->default(0);

            // Working hours
            $table->time('shift_start')->nullable();
            $table->time('shift_end')->nullable();

            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mechanics');
    }
};
