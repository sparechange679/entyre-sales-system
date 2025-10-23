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
        Schema::create('parts_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g., Tires, Batteries, Brakes, Towing
            $table->string('slug')->unique(); // e.g., tires, batteries
            $table->text('description')->nullable();
            $table->string('icon')->nullable(); // icon path or class
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parts_categories');
    }
};
