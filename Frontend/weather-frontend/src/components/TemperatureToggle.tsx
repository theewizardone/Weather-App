'use client'

import { Switch } from "@/components/ui/switch"

interface Props {
  isFahrenheit: boolean
  toggleUnit: () => void
}

export default function TemperatureToggle({ isFahrenheit, toggleUnit }: Props) {
  return (
    <div className="flex items-center gap-2 p-4">
      <span>°C</span>
      <Switch checked={isFahrenheit} onCheckedChange={toggleUnit} />
      <span>°F</span>
    </div>
  )
}
