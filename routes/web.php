<?php

use App\Http\Controllers\Dashboard\AccountantDashboardController;
use App\Http\Controllers\Dashboard\AdminDashboardController;
use App\Http\Controllers\Dashboard\CustomerDashboardController;
use App\Http\Controllers\Dashboard\MechanicDashboardController;
use App\Http\Controllers\WelcomeController;
use App\Http\Middleware\RedirectBasedOnRole;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [WelcomeController::class, 'index'])->name('home');

// Part routes (accessible to all)
Route::get('/parts/{part}', [App\Http\Controllers\PartController::class, 'show'])->name('parts.show');

Route::middleware(['auth', 'verified'])->group(function () {
    // Cart routes
    Route::get('/cart', [App\Http\Controllers\CartController::class, 'index'])->name('cart.index');
    Route::post('/cart', [App\Http\Controllers\CartController::class, 'add'])->name('cart.add');
    Route::patch('/cart/{cartItem}', [App\Http\Controllers\CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/{cartItem}', [App\Http\Controllers\CartController::class, 'destroy'])->name('cart.destroy');
    Route::delete('/cart', [App\Http\Controllers\CartController::class, 'clear'])->name('cart.clear');

    // Checkout routes
    Route::get('/checkout', [App\Http\Controllers\CheckoutController::class, 'checkout'])->name('checkout.index');
    Route::post('/checkout/buy-now', [App\Http\Controllers\CheckoutController::class, 'buyNow'])->name('checkout.buynow');
    Route::post('/checkout/success', [App\Http\Controllers\CheckoutController::class, 'success'])->name('checkout.success');
    Route::get('/checkout/thank-you', [App\Http\Controllers\CheckoutController::class, 'thankYou'])->name('checkout.thankyou');

    // Service Request routes (Customer)
    Route::middleware('customer')->group(function () {
        Route::get('/service-requests', [App\Http\Controllers\ServiceRequestController::class, 'index'])->name('service-requests.index');
        Route::get('/service-requests/create', [App\Http\Controllers\ServiceRequestController::class, 'create'])->name('service-requests.create');
        Route::post('/service-requests', [App\Http\Controllers\ServiceRequestController::class, 'store'])->name('service-requests.store');
        Route::get('/service-requests/{serviceRequest}', [App\Http\Controllers\ServiceRequestController::class, 'show'])->name('service-requests.show');
        Route::post('/service-requests/{serviceRequest}/send-quotation', [App\Http\Controllers\ServiceRequestController::class, 'sendQuotation'])->name('service-requests.send-quotation');
        Route::get('/service-requests/{serviceRequest}/payment', [App\Http\Controllers\PaymentController::class, 'show'])->name('service-requests.payment');
        Route::post('/service-requests/{serviceRequest}/payment', [App\Http\Controllers\PaymentController::class, 'store'])->name('service-requests.payment.store');
    });

    // Service Request API routes
    Route::middleware('customer')->group(function () {
        Route::post('/api/service-requests/recommended-parts', [App\Http\Controllers\ServiceRequestController::class, 'getRecommendedParts'])->name('api.service-requests.recommended-parts');
        Route::get('/api/service-requests/available-mechanics', [App\Http\Controllers\ServiceRequestController::class, 'getAvailableMechanics'])->name('api.service-requests.available-mechanics');
    });

    // Mechanic routes
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/mechanic/requests', [App\Http\Controllers\ServiceRequestController::class, 'mechanicRequests'])->name('mechanic.requests');
        Route::post('/mechanic/requests/{serviceRequest}/accept', [App\Http\Controllers\ServiceRequestController::class, 'accept'])->name('mechanic.requests.accept');
        Route::post('/mechanic/requests/{serviceRequest}/reject', [App\Http\Controllers\ServiceRequestController::class, 'reject'])->name('mechanic.requests.reject');
        Route::post('/mechanic/requests/{serviceRequest}/complete', [App\Http\Controllers\ServiceRequestController::class, 'complete'])->name('mechanic.requests.complete');
    });

    // Generic dashboard route - redirects based on role
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->middleware(RedirectBasedOnRole::class)->name('dashboard');

    // Role-specific dashboards
    Route::get('dashboard/admin', [AdminDashboardController::class, 'index'])
        ->middleware('can:access-admin-dashboard')
        ->name('dashboard.admin');

    Route::get('dashboard/accountant', [AccountantDashboardController::class, 'index'])
        ->middleware('can:access-accountant-dashboard')
        ->name('dashboard.accountant');

    Route::get('dashboard/mechanic', [MechanicDashboardController::class, 'index'])
        ->middleware('can:access-mechanic-dashboard')
        ->name('dashboard.mechanic');

    Route::get('dashboard/customer', [CustomerDashboardController::class, 'index'])
        ->middleware('can:access-customer-dashboard')
        ->name('dashboard.customer');

    // Admin Quotation routes
    Route::middleware('can:access-admin-dashboard')->prefix('admin')->group(function () {
        Route::post('quotations/{quotation}/send', [App\Http\Controllers\QuotationController::class, 'send'])
            ->name('admin.quotations.send');

        Route::resource('quotations', App\Http\Controllers\QuotationController::class)->names([
            'index' => 'admin.quotations.index',
            'create' => 'admin.quotations.create',
            'store' => 'admin.quotations.store',
            'show' => 'admin.quotations.show',
            'edit' => 'admin.quotations.edit',
            'update' => 'admin.quotations.update',
            'destroy' => 'admin.quotations.destroy',
        ]);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
