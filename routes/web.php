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

Route::middleware(['auth', 'verified'])->group(function () {
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
