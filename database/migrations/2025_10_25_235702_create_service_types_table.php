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
        Schema::create('service_types', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g., "Fast Tire Change", "Towing Service", "Battery Jump-Start"
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('icon')->nullable(); // Icon class or image path
            $table->decimal('base_price', 10, 2)->default(0); // Base service price
            $table->boolean('requires_parts')->default(false); // Whether this service typically needs parts
            $table->integer('estimated_duration')->nullable(); // Estimated duration in minutes
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0); // For display ordering
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_types');
    }
};
