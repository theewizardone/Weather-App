<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // If you are using API routes, this is how you register them
        Route::middleware('api')
            ->prefix('api')
            ->group(base_path('routes/api.php'));
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // You can register bindings here
    }
}
