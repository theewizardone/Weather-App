<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeatherController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Example default route (optional)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Weather API Routes
Route::get('/geocode', [WeatherController::class, 'geocode']);
Route::get('/weather', [WeatherController::class, 'getWeather']);
Route::get('/forecast', [WeatherController::class, 'getForecast']);

