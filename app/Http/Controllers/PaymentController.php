<?php

namespace App\Http\Controllers;

use App\Models\ServiceRequest;
use App\Models\User;
use App\Notifications\AdminPaymentNotification;
use App\Notifications\PaymentReceipt;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    public function show(ServiceRequest $serviceRequest): Response
    {
        $serviceRequest->load(['serviceType', 'mechanic', 'parts.part.primaryImage', 'user']);

        return Inertia::render('service-requests/payment', [
            'serviceRequest' => [
                'id' => $serviceRequest->id,
                'request_number' => $serviceRequest->request_number,
                'status' => $serviceRequest->status,
                'service_type' => [
                    'name' => $serviceRequest->serviceType->name,
                    'description' => $serviceRequest->serviceType->description,
                ],
                'total_cost' => floatval($serviceRequest->total_cost),
            ],
        ]);
    }

    public function store(ServiceRequest $serviceRequest): RedirectResponse
    {
        // Simulate payment processing
        $serviceRequest->update([
            'payment_status' => 'paid',
            'status' => 'in_progress',
            'paid_at' => now(),
        ]);

        // Notify customer
        $serviceRequest->user->notify(new PaymentReceipt($serviceRequest));

        // Notify admins
        $admins = User::where('role', 'admin')->get();
        Notification::send($admins, new AdminPaymentNotification($serviceRequest));

        return redirect()->route('service-requests.show', $serviceRequest)->with('success', 'Payment successful!');
    }
}
