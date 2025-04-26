Weather Forecast App
A beautiful full-stack Weather Forecast Application powered by:

Frontend: Next.js 14 + TailwindCSS + Ripple UI

Backend: Laravel 11 API

Weather Data: OpenWeatherMap API

Users can search for any city to view the current weather and a 3-day forecast.

Features
Search by city name.

Display current weather: temperature, conditions, wind, humidity.

3-day forecast with weather icons and temperature range.

Toggle between Celsius and Fahrenheit.

Fully responsive and modern UI using Ripple UI components.

Built with a Laravel backend API for security and easier future scaling.

🛠️ Tech Stack
Frontend:

Next.js 14

TypeScript

TailwindCSS

Ripple UI

Axios

Backend:

Laravel 11 (API-only)

PHP 8.2+

APIs:

OpenWeatherMap API

📂 Project Structure
/frontend
  ├── app/
  ├── components/
  ├── api/   # Axios calls to Laravel backend
  ├── public/
  ├── styles/
  ├── package.json
  └── next.config.js

/backend
  ├── app/Http/Controllers/
      ├── WeatherController.php
      ├── GeocodeController.php
  ├── routes/api.php
  ├── composer.json
  └── .env
Setup Instructions
📦 Backend (Laravel API)
1.Clone the repo and move into backend folder:
git clone https://github.com/your-username/weather-forecast-app.git
cd weather-forecast-app/backend
2.Install PHP dependencies:
composer install
Create environment file and configure database & OpenWeather API key:
cp .env.example .env
php artisan key:generate
Update .env:
OPENWEATHER_API_KEY=your_openweathermap_api_key

Run Laravel server:
php artisan serve
The backend API will run at http://127.0.0.1:8000.

🚀 Frontend (Next.js + Ripple UI)
Navigate into frontend folder:
cd ../frontend
Install Node dependencies:

npm install
# or
yarn install
Configure environment variables:

Create .env.local in /frontend:
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000/api

Install and setup Ripple UI:
Ripple UI is already integrated via TailwindCSS plugins.
If you need to set it up manually:
npm install rippleui
In your tailwind.config.js:
plugins: [
  require('rippleui')
]
Run the Next.js server:
npm run dev
# or
yarn dev
Frontend will be available at http://localhost:3000.

🛠️ How It Works
Frontend (frontend/) sends requests via Axios to the backend Laravel server (backend/).

Laravel handles routes like /api/weather, /api/forecast, /api/geocode, internally calling OpenWeather API.

Backend returns clean JSON responses to Next.js frontend.

Example Laravel route in api.php:

Route::get('/weather', [WeatherController::class, 'current']);
Route::get('/forecast', [WeatherController::class, 'forecast']);
Route::get('/geocode', [GeocodeController::class, 'search']);

📦 Build for Production
Frontend:
npm run build
npm run start
Backend:
Deploy Laravel on a server with PHP 8.2+, MySQL, and configure Nginx/Apache.
Or deploy easily using services like Laravel Forge, Vapor, Railway, or Render.

🔥 Future Improvements
Add weather alerts (storms, rain notifications).
Add user's geolocation auto-detect.
Dark Mode using Ripple UI built-in themes.
Save search history.
📄 License
This project is licensed under the MIT License



