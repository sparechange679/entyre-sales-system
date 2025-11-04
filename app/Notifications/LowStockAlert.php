<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Collection;

class LowStockAlert extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public Collection $lowStockParts) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $message = (new MailMessage)
            ->error()
            ->subject('Low Stock Alert - Action Required')
            ->greeting('Low Stock Alert!')
            ->line('The following parts are running low on stock and need to be restocked:');

        foreach ($this->lowStockParts as $part) {
            $message->line("• {$part->name} (SKU: {$part->sku}) - Current Stock: {$part->stock_quantity}, Min Level: {$part->min_stock_level}");
        }

        $message->action('Manage Inventory', url('/admin/inventory'))
            ->line('Please restock these items as soon as possible to avoid service disruptions.');

        return $message;
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'message' => 'Low stock alert for '.count($this->lowStockParts).' part(s)',
            'parts_count' => count($this->lowStockParts),
            'parts' => $this->lowStockParts->map(function ($part) {
                return [
                    'id' => $part->id,
                    'name' => $part->name,
                    'sku' => $part->sku,
                    'stock_quantity' => $part->stock_quantity,
                    'min_stock_level' => $part->min_stock_level,
                ];
            }),
        ];
    }
}
