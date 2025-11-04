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
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
