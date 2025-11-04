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
        Schema::table('service_requests', function (Blueprint $table) {
            // Drop the old foreign key constraint if it exists
            $table->dropForeign(['mechanic_id']);

            // Add the correct foreign key pointing to users table
            $table->foreign('mechanic_id')
                ->references('id')
                ->on('users')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('service_requests', function (Blueprint $table) {
            // Drop the users foreign key
            $table->dropForeign(['mechanic_id']);

            // Restore the old mechanics foreign key
            $table->foreign('mechanic_id')
                ->references('id')
                ->on('mechanics')
                ->onDelete('set null');
        });
    }
};
