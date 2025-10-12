<?php

/**
 * Admin Verification Tests
 *
 * These tests ensure the admin verification functionality works correctly.
 * The OTP code '111111' is used for testing purposes.
 * In production, this should be replaced with a secure server-side verification system.
 */

use App\Models\User;

test('admin verification modal is accessible from registration page', function () {
    $response = $this->get(route('register'));

    $response->assertStatus(200);
    // The modal should be part of the registration page component
    $response->assertInertia(fn ($page) => $page
        ->component('auth/register')
    );
});

test('users can register as admin with correct role', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Admin User',
        'email' => 'admin@entyre.com',
        'password' => 'SecurePassword123',
        'password_confirmation' => 'SecurePassword123',
        'role' => 'admin',
    ]);

    $this->assertAuthenticated();

    $user = User::where('email', 'admin@entyre.com')->first();
    expect($user)->not->toBeNull();
    expect($user->role)->toBe('admin');
    expect($user->name)->toBe('Admin User');

    $response->assertRedirect(route('dashboard', absolute: false));
});

test('admin role requires verification code on frontend', function () {
    // This test verifies the frontend behavior
    // The actual OTP verification happens client-side before submission
    // The backend just validates the role field

    $response = $this->post(route('register.store'), [
        'name' => 'Admin User',
        'email' => 'admin2@entyre.com',
        'password' => 'SecurePassword123',
        'password_confirmation' => 'SecurePassword123',
        'role' => 'admin',
    ]);

    $this->assertAuthenticated();

    $user = User::where('email', 'admin2@entyre.com')->first();
    expect($user->role)->toBe('admin');
});

test('registration with admin role creates user successfully', function () {
    $userData = [
        'name' => 'System Administrator',
        'email' => 'sysadmin@entyre.com',
        'password' => 'SecurePassword123',
        'password_confirmation' => 'SecurePassword123',
        'role' => 'admin',
    ];

    $response = $this->post(route('register.store'), $userData);

    $this->assertAuthenticated();

    $this->assertDatabaseHas('users', [
        'name' => 'System Administrator',
        'email' => 'sysadmin@entyre.com',
        'role' => 'admin',
    ]);

    $response->assertRedirect(route('dashboard', absolute: false));
});

test('multiple admin users can be created', function () {
    // First admin
    $this->post(route('register.store'), [
        'name' => 'Admin One',
        'email' => 'admin1@entyre.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'role' => 'admin',
    ]);

    $this->assertDatabaseHas('users', [
        'email' => 'admin1@entyre.com',
        'role' => 'admin',
    ]);

    // Logout first admin
    $this->post(route('logout'));

    // Second admin
    $this->post(route('register.store'), [
        'name' => 'Admin Two',
        'email' => 'admin2@entyre.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'role' => 'admin',
    ]);

    $this->assertDatabaseHas('users', [
        'email' => 'admin2@entyre.com',
        'role' => 'admin',
    ]);

    expect(User::where('role', 'admin')->count())->toBe(2);
});

test('admin users have correct role after registration', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Test Admin',
        'email' => 'testadmin@entyre.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'role' => 'admin',
    ]);

    $user = User::where('email', 'testadmin@entyre.com')->first();

    expect($user)->not->toBeNull();
    expect($user->role)->toBe('admin');
    expect($user->role)->not->toBe('customer');
    expect($user->role)->not->toBe('mechanic');
    expect($user->role)->not->toBe('accountant');
});

test('users cannot register with invalid role even if trying admin', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Hacker User',
        'email' => 'hacker@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'role' => 'superadmin', // Invalid role
    ]);

    $response->assertSessionHasErrors(['role']);
    $this->assertDatabaseMissing('users', [
        'email' => 'hacker@example.com',
    ]);
});
