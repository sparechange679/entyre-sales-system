<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Define authorization gates for role-based dashboard access
        Gate::define('access-admin-dashboard', function ($user) {
            return $user->role === 'admin';
        });

        Gate::define('access-accountant-dashboard', function ($user) {
            return $user->role === 'accountant';
        });

        Gate::define('access-mechanic-dashboard', function ($user) {
            return $user->role === 'mechanic';
        });

        Gate::define('access-customer-dashboard', function ($user) {
            return $user->role === 'customer';
        });
    }
}
