import React from "react";

interface WeatherSidebarProps {
  temp: number;
  condition: string;
  date: string;
  city: string;
}

export default function WeatherSidebar({ temp, condition, date, city }: WeatherSidebarProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="text-6xl font-bold">{temp}°C</div>
      <div className="text-2xl text-muted-foreground">{condition}</div>
      <div className="mt-4 text-sm">{date}</div>
      <div className="text-sm font-semibold">{city}</div>
    </div>
  );
}

  