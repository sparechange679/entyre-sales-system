<?php

use App\Models\User;

test('registration screen can be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertStatus(200);
});

test('new users can register', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'role' => 'customer',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));
});

test('new users can register as customer', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Customer User',
        'email' => 'customer@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'role' => 'customer',
    ]);

    $this->assertAuthenticated();
    $user = User::where('email', 'customer@example.com')->first();
    expect($user->role)->toBe('customer');
    $response->assertRedirect(route('dashboard', absolute: false));
});

test('new users can register as mechanic', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Mechanic User',
        'email' => 'mechanic@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'role' => 'mechanic',
    ]);

    $this->assertAuthenticated();
    $user = User::where('email', 'mechanic@example.com')->first();
    expect($user->role)->toBe('mechanic');
    $response->assertRedirect(route('dashboard', absolute: false));
});

test('new users can register as accountant', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Accountant User',
        'email' => 'accountant@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'role' => 'accountant',
    ]);

    $this->assertAuthenticated();
    $user = User::where('email', 'accountant@example.com')->first();
    expect($user->role)->toBe('accountant');
    $response->assertRedirect(route('dashboard', absolute: false));
});

test('new users can register as admin', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Admin User',
        'email' => 'admin@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'role' => 'admin',
    ]);

    $this->assertAuthenticated();
    $user = User::where('email', 'admin@example.com')->first();
    expect($user->role)->toBe('admin');
    $response->assertRedirect(route('dashboard', absolute: false));
});

test('role field is required during registration', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertSessionHasErrors(['role']);
});

test('role field must be valid', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'role' => 'invalid_role',
    ]);

    $response->assertSessionHasErrors(['role']);
});

test('default role is customer when not specified in database', function () {
    // This tests the database default value
    $user = User::create([
        'name' => 'Default User',
        'email' => 'default@example.com',
        'password' => bcrypt('password'),
    ]);

    $user->refresh();
    expect($user->role)->toBe('customer');
});