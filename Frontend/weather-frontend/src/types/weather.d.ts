export interface Coordinates {
    lat: number
    lon: number
    name: string
    country: string
  }
  
  export interface CurrentWeatherData {
    temperature: number
    description: string
    iconCode: string
    windSpeed: number
    windDirection: string
    humidity: number
    date: string
    location: string
  }
  
  export interface ForecastDay {
    date: string
    iconCode: string
    minTemp: number
    maxTemp: number
  }
  