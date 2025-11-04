<?php

namespace App\Notifications;

use App\Models\ServiceRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ServiceRequestAssigned extends Notification implements ShouldQueue
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
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $this->serviceRequest->load(['serviceType', 'user', 'vehicleMake', 'vehicleModel', 'parts.part']);

        $message = (new MailMessage)
            ->subject('New Service Request Assigned - '.$this->serviceRequest->request_number)
            ->greeting('Hello '.$notifiable->name.',')
            ->line('You have been assigned a new service request.')
            ->line('')
            ->line('**Request Details:**')
            ->line('Request Number: **'.$this->serviceRequest->request_number.'**')
            ->line('Service Type: **'.$this->serviceRequest->serviceType->name.'**')
            ->line('')
            ->line('**Customer Information:**')
            ->line('Name: '.$this->serviceRequest->user->name)
            ->line('Phone: '.$this->serviceRequest->user->phone)
            ->line('Email: '.$this->serviceRequest->user->email)
            ->line('')
            ->line('**Vehicle Details:**')
            ->line('Make: '.($this->serviceRequest->vehicleMake?->name ?? 'Not specified'))
            ->line('Model: '.($this->serviceRequest->vehicleModel?->name ?? 'Not specified'))
            ->line('Year: '.($this->serviceRequest->vehicle_year ?? 'Not specified'))
            ->line('License Plate: '.($this->serviceRequest->vehicle_license_plate ?? 'Not specified'))
            ->line('')
            ->line('**Problem Description:**')
            ->line($this->serviceRequest->vehicle_problem_description)
            ->line('')
            ->line('**Service Location:**')
            ->line($this->serviceRequest->customer_address ?? 'Location: '.$this->serviceRequest->customer_latitude.', '.$this->serviceRequest->customer_longitude);

        if ($this->serviceRequest->location_notes) {
            $message->line('Notes: '.$this->serviceRequest->location_notes);
        }

        $message->line('')
            ->line('**Cost Breakdown:**')
            ->line('Labor Cost: MWK '.number_format($this->serviceRequest->labor_cost, 2));

        if ($this->serviceRequest->parts->isNotEmpty()) {
            $message->line('Parts:');
            foreach ($this->serviceRequest->parts as $part) {
                $message->line('- '.$part->part->name.' (x'.$part->quantity.') - MWK '.number_format($part->subtotal, 2));
            }
        }

        $message->line('**Total: MWK '.number_format($this->serviceRequest->total_cost, 2).'**')
            ->line('')
            ->action('View Request Details', route('service-requests.show', $this->serviceRequest))
            ->line('')
            ->line('Please review the request and accept or decline as soon as possible.')
            ->line('Thank you for your service!');

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
            'service_request_id' => $this->serviceRequest->id,
            'request_number' => $this->serviceRequest->request_number,
            'service_type' => $this->serviceRequest->serviceType->name,
            'customer_name' => $this->serviceRequest->user->name,
            'total_cost' => $this->serviceRequest->total_cost,
        ];
    }
}
