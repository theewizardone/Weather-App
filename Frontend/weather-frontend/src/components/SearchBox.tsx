'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface Props {
  onSearch: (city: string) => void
}

export default function SearchBox({ onSearch }: Props) {
  const [city, setCity] = useState("")

  const handleSearch = () => {
    if (city.trim()) onSearch(city)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch()
  }

  return (
    <div className="flex items-center gap-2 p-4">
      <Input
        placeholder="Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleSearch}>GO</Button>
    </div>
  )
}
