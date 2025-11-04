<?php

namespace App\Notifications;

use App\Models\ServiceRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class QuotationReady extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public ServiceRequest $serviceRequest)
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
        return (new MailMessage)
            ->subject('Your Quotation is Ready - ENTYRE')
            ->line('Your quotation for service request #'.$this->serviceRequest->request_number.' is ready.')
            ->line('Total Cost: '.number_format($this->serviceRequest->total_cost, 2).' MWK')
            ->action('View Quotation and Pay', route('service-requests.show', $this->serviceRequest))
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
