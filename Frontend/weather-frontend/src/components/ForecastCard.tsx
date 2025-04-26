export interface ForecastCardProps {
    date: string;
    icon: string;
    tempRange: string;
  }
  
  export default function ForecastCard({ date, icon, tempRange }: ForecastCardProps) {
    return (
      <div className="bg-white p-4 rounded shadow-md flex flex-col items-center w-28">
        <div className="text-sm font-semibold">{date}</div>
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="Forecast Icon"
          className="h-12 my-2"
        />
        <div className="text-sm">{tempRange}</div>
      </div>
    );
  }
  