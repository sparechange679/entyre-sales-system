<?php

namespace App\Notifications;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class OrderReceipt extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public Order $order)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $this->order->load('items');

        $message = (new MailMessage)
            ->subject('Order Confirmation - Order #'.$this->order->id)
            ->greeting('Thank you for your purchase!')
            ->line('Your order has been confirmed and is being processed.')
            ->line('**Order #'.$this->order->id.'**')
            ->line('Date: '.$this->order->created_at->format('F j, Y g:i A'));

        $message->line('**Order Details:**');

        foreach ($this->order->items as $item) {
            $message->line('- '.$item->part_name.' x'.$item->quantity.' - MWK '.number_format($item->price * $item->quantity, 0));
        }

        $message->line('---');
        $message->line('**Total: MWK '.number_format($this->order->total_amount, 0).'**');

        $message->line('We will notify you once your order has been shipped.');
        $message->line('If you have any questions, please don\'t hesitate to contact us.');

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
            'order_id' => $this->order->id,
            'total_amount' => $this->order->total_amount,
        ];
    }
}
