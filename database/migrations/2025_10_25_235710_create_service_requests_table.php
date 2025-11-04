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
        Schema::create('service_requests', function (Blueprint $table) {
            $table->id();
            $table->string('request_number')->unique(); // Auto-generated unique identifier (e.g., SR-2025-00001)

            // Relationships
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Customer
            $table->foreignId('service_type_id')->constrained()->onDelete('restrict');
            $table->foreignId('mechanic_id')->nullable()->constrained()->onDelete('set null');

            // Vehicle Information
            $table->foreignId('vehicle_make_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('vehicle_model_id')->nullable()->constrained()->onDelete('set null');
            $table->integer('vehicle_year')->nullable();
            $table->string('vehicle_license_plate')->nullable();
            $table->text('vehicle_problem_description');

            // Location Information
            $table->decimal('customer_latitude', 10, 7);
            $table->decimal('customer_longitude', 10, 7);
            $table->string('customer_address')->nullable(); // Human-readable address
            $table->text('location_notes')->nullable(); // Additional location instructions

            // Service Details
            $table->enum('status', [
                'pending',           // Just created, waiting for mechanic assignment
                'mechanic_assigned', // Mechanic has been selected but not accepted
                'accepted',          // Mechanic accepted the request
                'in_progress',       // Mechanic is working on the service
                'completed',         // Service completed
                'cancelled',         // Cancelled by customer or system
                'rejected',           // Rejected by mechanic
            ])->default('pending');

            $table->enum('priority', ['low', 'medium', 'high', 'urgent'])->default('medium');
            $table->timestamp('scheduled_at')->nullable(); // When service is scheduled for
            $table->timestamp('accepted_at')->nullable(); // When mechanic accepted
            $table->timestamp('started_at')->nullable(); // When service actually started
            $table->timestamp('completed_at')->nullable(); // When service was completed

            // Pricing
            $table->decimal('labor_cost', 10, 2)->default(0);
            $table->decimal('parts_cost', 10, 2)->default(0);
            $table->decimal('total_cost', 10, 2)->default(0);

            // Payment
            $table->enum('payment_status', ['pending', 'paid', 'failed', 'refunded'])->default('pending');
            $table->string('payment_method')->nullable(); // 'stripe', 'cash', 'mpamba', 'airtel_money'
            $table->string('payment_transaction_id')->nullable();
            $table->timestamp('paid_at')->nullable();

            // Feedback
            $table->integer('customer_rating')->nullable(); // 1-5 stars
            $table->text('customer_feedback')->nullable();
            $table->text('mechanic_notes')->nullable(); // Notes from the mechanic about the service

            $table->timestamps();

            // Indexes for better query performance
            $table->index(['status', 'created_at']);
            $table->index(['mechanic_id', 'status']);
            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_requests');
    }
};
