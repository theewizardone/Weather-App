<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\JsonResponse;

class WeatherController extends Controller
{
    /**
     * The OpenWeatherMap API key.
     *
     * @var string
     */
    protected string $apiKey;

    /**
     * Initialize the controller with the API key.
     */
    public function __construct()
    {
        // ✅ Fixed the environment variable name
        $this->apiKey = env('OPENWEATHER_API_KEY');
    }

    /**
     * Geocode a city name to get latitude and longitude.
     */
    public function geocode(Request $request): JsonResponse
    {
        $city = $request->query('city');

        if (!$city) {
            return response()->json(['error' => 'City parameter is required'], 400);
        }

        $response = Http::get("http://api.openweathermap.org/geo/1.0/direct", [
            'q'     => $city,
            'limit' => 1,
            'appid' => $this->apiKey,
        ]);

        return response()->json($response->json(), $response->status());
    }

    /**
     * Get current weather for a specific location.
     */
    public function getWeather(Request $request): JsonResponse
    {
        $lat = $request->query('lat');
        $lon = $request->query('lon');
        $units = $request->query('units', 'metric');

        if (!$lat || !$lon) {
            return response()->json(['error' => 'Latitude and longitude are required'], 400);
        }

        $response = Http::get("https://api.openweathermap.org/data/2.5/weather", [
            'lat'   => $lat,
            'lon'   => $lon,
            'units' => $units,
            'appid' => $this->apiKey,
        ]);

        return response()->json($response->json(), $response->status());
    }

    /**
     * Get 3-day forecast for a specific location (8 entries/day × 3 = 24).
     */
    public function getForecast(Request $request): JsonResponse
    {
        $lat = $request->query('lat');
        $lon = $request->query('lon');
        $units = $request->query('units', 'metric');

        if (!$lat || !$lon) {
            return response()->json(['error' => 'Latitude and longitude are required'], 400);
        }

        $response = Http::get("https://api.openweathermap.org/data/2.5/forecast", [
            'lat'   => $lat,
            'lon'   => $lon,
            'units' => $units,
            'cnt'   => 24,
            'appid' => $this->apiKey,
        ]);

        return response()->json($response->json(), $response->status());
    }
}

