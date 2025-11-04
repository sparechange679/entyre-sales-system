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
        Schema::create('quotations', function (Blueprint $table) {
            $table->id();
            $table->string('quotation_number')->unique(); // Auto-generated unique identifier (e.g., QT-2025-00001)

            // Relationships
            $table->foreignId('service_request_id')->constrained()->onDelete('cascade');
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade'); // Admin who created it

            // Quotation Details
            $table->text('service_description');
            $table->decimal('labor_cost', 10, 2)->default(0);
            $table->decimal('parts_cost', 10, 2)->default(0);
            $table->decimal('total_amount', 10, 2)->default(0);

            // Validity Period
            $table->timestamp('valid_from')->nullable();
            $table->timestamp('valid_until')->nullable();
            $table->integer('estimated_duration_hours')->nullable(); // How long it will take to complete

            // Status
            $table->enum('status', ['draft', 'sent', 'accepted', 'rejected', 'expired'])->default('draft');

            // Notes
            $table->text('terms_and_conditions')->nullable();
            $table->text('notes')->nullable();

            $table->timestamps();

            // Indexes
            $table->index(['service_request_id', 'status']);
            $table->index('created_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quotations');
    }
};
