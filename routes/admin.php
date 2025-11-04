<?php

use App\Http\Controllers\Admin\IncomeController;
use App\Http\Controllers\Admin\InventoryController;
use App\Http\Controllers\Admin\PartsController;
use App\Http\Controllers\Admin\ReportController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
    Route::get('/reports/download', [ReportController::class, 'download'])->name('reports.download');
    Route::get('/income', [IncomeController::class, 'index'])->name('income.index');

    // Parts management routes (full CRUD)
    Route::get('/parts', [PartsController::class, 'index'])->name('parts.index');
    Route::get('/parts/create', [PartsController::class, 'create'])->name('parts.create');
    Route::post('/parts', [PartsController::class, 'store'])->name('parts.store');
    Route::get('/parts/{part}', [PartsController::class, 'show'])->name('parts.show');
    Route::get('/parts/{part}/edit', [PartsController::class, 'edit'])->name('parts.edit');
    Route::patch('/parts/{part}', [PartsController::class, 'update'])->name('parts.update');
    Route::delete('/parts/{part}', [PartsController::class, 'destroy'])->name('parts.destroy');

    // Inventory management routes (legacy - can be removed if not needed)
    Route::get('/inventory', [InventoryController::class, 'index'])->name('inventory.index');
    Route::get('/inventory/{part}/edit', [InventoryController::class, 'edit'])->name('inventory.edit');
    Route::patch('/inventory/{part}', [InventoryController::class, 'update'])->name('inventory.update');
});
