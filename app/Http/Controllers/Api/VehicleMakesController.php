<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\VehicleMake;
use Illuminate\Http\JsonResponse;

class VehicleMakesController extends Controller
{
    /**
     * Display all vehicle makes
     */
    public function index(): JsonResponse
    {
        $makes = VehicleMake::active()
            ->withCount('vehicleModels')
            ->orderBy('name')
            ->get();

        return response()->json($makes);
    }

    /**
     * Display the specified make with its models
     */
    public function show(string $id): JsonResponse
    {
        $make = VehicleMake::with('vehicleModels')
            ->findOrFail($id);

        return response()->json($make);
    }
}
