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
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('vehicle_make_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('vehicle_model_id')->nullable()->constrained()->onDelete('set null');
            $table->integer('vehicle_year')->nullable();
            $table->string('vehicle_license_plate')->nullable();
            $table->string('phone')->nullable()->after('email');
            $table->text('address')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['vehicle_make_id']);
            $table->dropForeign(['vehicle_model_id']);
            $table->dropColumn([
                'vehicle_make_id',
                'vehicle_model_id',
                'vehicle_year',
                'vehicle_license_plate',
                'phone',
                'address',
            ]);
        });
    }
};
