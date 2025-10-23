<?php

use App\Http\Controllers\Api\PartsController;
use App\Http\Controllers\Api\PartsCategoriesController;
use App\Http\Controllers\Api\VehicleMakesController;
use App\Http\Controllers\Api\VehicleModelsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes for Parts Catalog System
|--------------------------------------------------------------------------
|
| These routes are for the Entyre car parts catalog system.
| They provide endpoints for browsing parts, searching by vehicle,
| and managing the parts inventory.
|
*/

// Public API routes (no authentication required)
Route::prefix('v1')->group(function () {

    // Parts Categories
    Route::get('/categories', [PartsCategoriesController::class, 'index']);
    Route::get('/categories/{slug}', [PartsCategoriesController::class, 'show']);

    // Vehicle Makes
    Route::get('/vehicle-makes', [VehicleMakesController::class, 'index']);
    Route::get('/vehicle-makes/{id}', [VehicleMakesController::class, 'show']);

    // Vehicle Models
    Route::get('/vehicle-models', [VehicleModelsController::class, 'index']);
    Route::get('/vehicle-models/{id}', [VehicleModelsController::class, 'show']);

    // Parts - Public endpoints
    Route::get('/parts', [PartsController::class, 'index']);
    Route::get('/parts/featured', [PartsController::class, 'featured']);
    Route::get('/parts/{id}', [PartsController::class, 'show']);
    Route::get('/parts/category/{categorySlug}', [PartsController::class, 'byCategory']);
    Route::post('/parts/search-by-vehicle', [PartsController::class, 'searchByVehicle']);

});

// Protected API routes (require authentication)
Route::prefix('v1')->middleware('auth:sanctum')->group(function () {

    // Parts Management (Admin/Manager only)
    Route::post('/parts', [PartsController::class, 'store']);
    Route::put('/parts/{id}', [PartsController::class, 'update']);
    Route::delete('/parts/{id}', [PartsController::class, 'destroy']);

    // Inventory Management
    Route::get('/parts/low-stock', [PartsController::class, 'lowStock']);

});
