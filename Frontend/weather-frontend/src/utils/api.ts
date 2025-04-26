import { Coordinates, CurrentWeatherData, ForecastDay } from "@/types/weather"

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

export async function fetchCoordinates(city: string): Promise<Coordinates | null> {
  const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`)
  const data = await res.json()
  if (!data.length) return null

  const { lat, lon, name, country } = data[0]
  return { lat, lon, name, country }
}

export async function fetchWeather(lat: number, lon: number, isFahrenheit: boolean): Promise<{ current: CurrentWeatherData, forecast: ForecastDay[] }> {
  const units = isFahrenheit ? "imperial" : "metric"
  const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=${units}&appid=${API_KEY}`)
  const data = await res.json()

  const current: CurrentWeatherData = {
    temperature: data.current.temp,
    description: data.current.weather[0].description,
    iconCode: data.current.weather[0].icon,
    windSpeed: data.current.wind_speed,
    windDirection: degToCompass(data.current.wind_deg),
    humidity: data.current.humidity,
    date: new Date(data.current.dt * 1000).toLocaleDateString(),
    location: "" // will be filled by caller
  }

  const forecast: ForecastDay[] = data.daily.slice(1, 4).map((day: any) => ({
    date: new Date(day.dt * 1000).toLocaleDateString(undefined, { day: "2-digit", month: "short" }),
    iconCode: day.weather[0].icon,
    minTemp: day.temp.min,
    maxTemp: day.temp.max,
  }))

  return { current, forecast }
}

function degToCompass(num: number): string {
  const val = Math.floor((num / 22.5) + 0.5)
  const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
               "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
  return arr[val % 16]
}
