<?php

namespace App\Console\Commands;

use App\Models\Part;
use App\Models\User;
use App\Notifications\LowStockAlert;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Notification;

class CheckLowStockParts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'inventory:check-low-stock';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check for low stock parts and send alerts to admins';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('Checking for low stock parts...');

        // Get all parts with low stock
        $lowStockParts = Part::lowStock()
            ->active()
            ->get();

        if ($lowStockParts->isEmpty()) {
            $this->info('No low stock parts found. All parts are well stocked.');

            return Command::SUCCESS;
        }

        $this->warn("Found {$lowStockParts->count()} part(s) with low stock:");

        foreach ($lowStockParts as $part) {
            $this->line("  • {$part->name} (SKU: {$part->sku}) - Stock: {$part->stock_quantity}, Min: {$part->min_stock_level}");
        }

        // Get all admin users
        $admins = User::where('role', 'admin')->get();

        if ($admins->isEmpty()) {
            $this->error('No admin users found to send notifications.');

            return Command::FAILURE;
        }

        // Send notification to all admins
        Notification::send($admins, new LowStockAlert($lowStockParts));

        $this->info("Low stock alert sent to {$admins->count()} admin(s).");

        return Command::SUCCESS;
    }
}
