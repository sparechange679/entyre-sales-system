<?php

namespace App\Notifications;

use App\Models\ServiceRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ServiceRequestStatusUpdated extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public ServiceRequest $serviceRequest,
        public string $status,
        public ?string $reason = null
    ) {
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
        $this->serviceRequest->load(['serviceType', 'mechanic']);

        $message = (new MailMessage)
            ->subject('Service Request Update - '.$this->serviceRequest->request_number);

        match ($this->status) {
            'accepted' => $this->buildAcceptedMessage($message),
            'rejected' => $this->buildRejectedMessage($message),
            'in_progress' => $this->buildInProgressMessage($message),
            'completed' => $this->buildCompletedMessage($message),
            default => $this->buildDefaultMessage($message),
        };

        return $message;
    }

    protected function buildAcceptedMessage(MailMessage $message): MailMessage
    {
        return $message
            ->greeting('Great news, '.$this->serviceRequest->user->name.'!')
            ->line('Your service request **'.$this->serviceRequest->request_number.'** has been accepted!')
            ->line('')
            ->line('**Service Details:**')
            ->line('Service Type: '.$this->serviceRequest->serviceType->name)
            ->line('Request Number: '.$this->serviceRequest->request_number)
            ->line('')
            ->line('**Mechanic Information:**')
            ->line('Name: '.$this->serviceRequest->mechanic->name)
            ->line('Phone: '.$this->serviceRequest->mechanic->phone)
            ->line('Rating: '.number_format($this->serviceRequest->mechanic->rating, 1).' / 5.0')
            ->line('')
            ->line('The mechanic will contact you shortly to confirm the service appointment.')
            ->action('View Request Details', route('service-requests.show', $this->serviceRequest))
            ->line('Thank you for choosing our service!');
    }

    protected function buildRejectedMessage(MailMessage $message): MailMessage
    {
        $message = $message
            ->greeting('Hello '.$this->serviceRequest->user->name.',')
            ->line('Unfortunately, your service request **'.$this->serviceRequest->request_number.'** has been declined.')
            ->line('')
            ->line('**Service Details:**')
            ->line('Service Type: '.$this->serviceRequest->serviceType->name)
            ->line('Request Number: '.$this->serviceRequest->request_number);

        if ($this->reason) {
            $message->line('')
                ->line('**Reason:**')
                ->line($this->reason);
        }

        return $message
            ->line('')
            ->line('You can submit a new request or contact our support team for assistance.')
            ->action('Submit New Request', route('service-requests.create'))
            ->line('We apologize for any inconvenience.');
    }

    protected function buildInProgressMessage(MailMessage $message): MailMessage
    {
        return $message
            ->greeting('Hello '.$this->serviceRequest->user->name.',')
            ->line('Your service request **'.$this->serviceRequest->request_number.'** is now in progress!')
            ->line('')
            ->line('**Service Details:**')
            ->line('Service Type: '.$this->serviceRequest->serviceType->name)
            ->line('Mechanic: '.$this->serviceRequest->mechanic->name)
            ->line('')
            ->line('The mechanic is currently working on your vehicle.')
            ->action('Track Progress', route('service-requests.show', $this->serviceRequest))
            ->line('Thank you for your patience!');
    }

    protected function buildCompletedMessage(MailMessage $message): MailMessage
    {
        return $message
            ->greeting('Hello '.$this->serviceRequest->user->name.',')
            ->line('Your service request **'.$this->serviceRequest->request_number.'** has been completed!')
            ->line('')
            ->line('**Service Summary:**')
            ->line('Service Type: '.$this->serviceRequest->serviceType->name)
            ->line('Mechanic: '.$this->serviceRequest->mechanic->name)
            ->line('Total Cost: MWK '.number_format($this->serviceRequest->total_cost, 2))
            ->line('')
            ->line('We hope you are satisfied with the service provided.')
            ->action('View Receipt', route('service-requests.show', $this->serviceRequest))
            ->line('')
            ->line('Please consider leaving a review to help us improve our service.')
            ->line('Thank you for choosing us!');
    }

    protected function buildDefaultMessage(MailMessage $message): MailMessage
    {
        return $message
            ->greeting('Hello '.$this->serviceRequest->user->name.',')
            ->line('Your service request **'.$this->serviceRequest->request_number.'** status has been updated.')
            ->line('')
            ->line('**New Status:** '.ucfirst(str_replace('_', ' ', $this->status)))
            ->action('View Request Details', route('service-requests.show', $this->serviceRequest))
            ->line('Thank you!');
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
            'status' => $this->status,
            'reason' => $this->reason,
        ];
    }
}
