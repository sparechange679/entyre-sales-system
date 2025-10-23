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
        Schema::create('part_fitments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('part_id')->constrained()->onDelete('cascade');
            $table->foreignId('vehicle_model_id')->constrained()->onDelete('cascade');
            $table->enum('fitment_type', ['exact', 'compatible', 'optional'])->default('exact');
            $table->text('notes')->nullable(); // Additional fitment information
            $table->timestamps();

            // Ensure unique combinations
            $table->unique(['part_id', 'vehicle_model_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('part_fitments');
    }
};
