<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\VehicleModel;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class VehicleModelsController extends Controller
{
    /**
     * Display all vehicle models
     */
    public function index(Request $request): JsonResponse
    {
        $query = VehicleModel::with('vehicleMake')->active();

        // Filter by make
        if ($request->has('make_id')) {
            $query->where('vehicle_make_id', $request->make_id);
        }

        $models = $query->orderBy('name')->get();

        return response()->json($models);
    }

    /**
     * Display the specified model
     */
    public function show(string $id): JsonResponse
    {
        $model = VehicleModel::with(['vehicleMake', 'parts'])
            ->findOrFail($id);

        return response()->json($model);
    }
}
