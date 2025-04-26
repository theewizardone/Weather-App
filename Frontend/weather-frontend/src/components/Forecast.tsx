interface DayForecast {
    date: string
    iconCode: string
    minTemp: number
    maxTemp: number
  }
  
  interface Props {
    forecast: DayForecast[]
  }
  
  export default function Forecast({ forecast }: Props) {
    return (
      <div className="flex gap-4 p-4">
        {forecast.map((day, idx) => (
          <div key={idx} className="bg-white shadow-md rounded-xl p-4 text-center w-28">
            <div className="font-semibold">{day.date}</div>
            <img src={`https://openweathermap.org/img/wn/${day.iconCode}@2x.png`} className="mx-auto" />
            <div className="text-sm">{day.minTemp}° / {day.maxTemp}°</div>
          </div>
        ))}
      </div>
    )
  }
  