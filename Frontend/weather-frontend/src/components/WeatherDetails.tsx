interface Props {
    windSpeed: number
    windDirection: string
    humidity: number
  }
  
  export default function WeatherDetails({ windSpeed, windDirection, humidity }: Props) {
    return (
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <div className="text-gray-500">Wind Status</div>
          <div className="text-2xl font-bold">{windSpeed} km/h</div>
          <div className="text-sm">{windDirection}</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 text-center">
          <div className="text-gray-500">Humidity</div>
          <div className="text-2xl font-bold">{humidity}%</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${humidity}%` }}></div>
          </div>
        </div>
      </div>
    )
  }
  