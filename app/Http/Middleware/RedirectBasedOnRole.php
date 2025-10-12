<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectBasedOnRole
{
    /**
     * Handle an incoming request.
     *
     * Redirects users to role-specific dashboards based on their role.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            $user = Auth::user();

            // Only redirect if user is accessing the generic dashboard
            if ($request->is('dashboard')) {
                return match($user->role) {
                    'admin' => redirect()->route('dashboard.admin'),
                    'accountant' => redirect()->route('dashboard.accountant'),
                    'mechanic' => redirect()->route('dashboard.mechanic'),
                    'customer' => redirect()->route('dashboard.customer'),
                    default => redirect()->route('dashboard.customer'),
                };
            }
        }

        return $next($request);
    }
}
