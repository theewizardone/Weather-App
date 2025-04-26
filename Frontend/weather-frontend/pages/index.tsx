import { useState } from 'react';
import axios from 'axios';
import InfoCard from '@/components/InfoCard';
import ForecastCard from '@/components/ForecastCard';

export default function Home() {
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!city.trim()) return;
    try {
      setLoading(true);
      setError(null);

      const geocodeRes = await axios.get('/api/geocode', { params: { city } });
      const geo = Array.isArray(geocodeRes.data) ? geocodeRes.data[0] : geocodeRes.data;

      if (!geo || !geo.lat || !geo.lon) {
        setError('City not found. Please try again.');
        return;
      }

      const { lat, lon, name, country, state } = geo;

      const weatherRes = await axios.get('/api/weather', {
        params: { lat, lon, units: unit },
      });

      const forecastRes = await axios.get('/api/forecast', {
        params: { lat, lon, units: unit },
      });

      const forecastData = forecastRes.data.list
        .filter((item: any) => item.dt_txt.includes('12:00:00'))
        .slice(0, 3);

      setCurrentWeather({
        ...weatherRes.data,
        city: name,
        country,
        state,
      });

      setForecast(forecastData);
    } catch (error: any) {
      console.error('Error fetching weather data:', error);
      setError('Unable to fetch weather info. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">Weather Forecast App</h1>

      <div className="flex flex-wrap gap-2 mb-6 items-center justify-center">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter City"
          className="border rounded p-2 w-64"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value as 'metric' | 'imperial')}
          className="border rounded p-2"
        >
          <option value="metric">Celsius</option>
          <option value="imperial">Fahrenheit</option>
        </select>
      </div>

      {error && <p className="text-red-600 font-medium mb-4">{error}</p>}

      {currentWeather && (
        <InfoCard
          temp={currentWeather.main.temp}
          condition={currentWeather.weather[0]}
          date={new Date().toLocaleDateString('en-GB', {
            day: 'numeric', month: 'long', year: 'numeric',
          })}
          city={`${currentWeather.city}, ${currentWeather.country}`}
          icon={currentWeather.weather[0].icon}
          unit={unit}
        />
      )}

      {forecast.length > 0 && (
        <div className="flex space-x-4 mb-6">
          {forecast.map((day) => (
            <ForecastCard
            key={day.dt}
            date={new Date(day.dt_txt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
            })}
            icon={day.weather[0].icon}
            tempRange={`${Math.round(day.main.temp_min)}–${Math.round(day.main.temp_max)}°${unit === 'metric' ? 'C' : 'F'}`}
          />
          
          ))}
        </div>
      )}

      {currentWeather && (
        <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
          <InfoCard title="Wind Status" value={`${currentWeather.wind.speed} km/h`} />
          <InfoCard
            title="Humidity"
            value={`${currentWeather.main.humidity}%`}
            barPercentage={currentWeather.main.humidity}
          />
        </div>
      )}
    </div>
  );
}
