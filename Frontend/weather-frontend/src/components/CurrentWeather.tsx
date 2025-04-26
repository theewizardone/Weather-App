interface Props {
    iconCode: string
    temperature: number
    description: string
  }
  
  export default function CurrentWeather({ iconCode, temperature, description }: Props) {
    return (
      <div className="flex items-center gap-4 p-4">
        <img
          src={`https://openweathermap.org/img/wn/${iconCode}@4x.png`}
          alt="Weather Icon"
          className="w-20 h-20"
        />
        <div>
          <div className="text-3xl font-bold">{Math.round(temperature)} °</div>
          <div className="text-lg capitalize">{description}</div>
        </div>
      </div>
    )
  }
  