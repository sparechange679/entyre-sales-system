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
        Schema::create('parts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('parts_categories')->onDelete('cascade');
            $table->string('sku')->unique(); // Stock Keeping Unit
            $table->string('name'); // e.g., Michelin Primacy 4
            $table->text('description')->nullable();
            $table->string('brand'); // e.g., Michelin, Goodyear

            // Tire-specific fields
            $table->string('tire_size')->nullable(); // e.g., 195/65R15
            $table->string('load_index')->nullable(); // e.g., 91
            $table->string('speed_rating')->nullable(); // e.g., V
            $table->string('tire_type')->nullable(); // all-season, summer, winter
            $table->string('tread_pattern')->nullable();

            // General part specifications
            $table->json('specifications')->nullable(); // Additional specs as JSON

            // Pricing and inventory
            $table->decimal('price', 10, 2);
            $table->decimal('cost_price', 10, 2)->nullable(); // For profit calculation
            $table->integer('stock_quantity')->default(0);
            $table->integer('min_stock_level')->default(5);

            // Status
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parts');
    }
};
