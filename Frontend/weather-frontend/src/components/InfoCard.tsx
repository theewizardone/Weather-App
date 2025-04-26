interface InfoCardProps {
    temp?: number;
    condition?: string;
    date?: string;
    city?: string;
    icon?: string;
    unit?: 'metric' | 'imperial';
    title?: string;
    value?: string;
    barPercentage?: number;
    extra?: string; // ✅ Added this
  }
  
  export default function InfoCard({
    temp,
    condition,
    date,
    city,
    icon,
    unit,
    title,
    value,
    barPercentage,
    extra // ✅ Added this
  }: InfoCardProps) {
    // If title and value are passed, render a small info card
    if (title && value) {
      return (
        <div className="bg-white p-6 rounded shadow-md text-center">
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          <p className="text-2xl mb-1">{value}</p>
          {extra && <p className="text-sm text-gray-500">{extra}</p>} {/* ✅ Render extra */}
          {typeof barPercentage === 'number' && (
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${barPercentage}%` }}
              ></div>
            </div>
          )}
        </div>
      );
    }
  
    // Otherwise, render main weather card
    return (
      <div className="bg-white p-6 rounded shadow-md flex flex-col items-center mb-6 w-full max-w-lg">
        {icon && (
          <img
            src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
            alt="Weather Icon"
            className="h-24 mb-2"
          />
        )}
        {temp !== undefined && (
          <div className="text-3xl font-bold">
            {Math.round(temp)}°{unit === 'metric' ? 'C' : 'F'}
          </div>
        )}
        {condition && <div className="text-lg">{condition}</div>}
        {(date || city) && (
          <div className="text-gray-600 mt-2 text-center">
            {date && <div>{date}</div>}
            {city && <div>{city}</div>}
          </div>
        )}
      </div>
    );
  }
  