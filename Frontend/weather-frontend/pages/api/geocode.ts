// pages/api/geocode.ts

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { city } = req.query
  const apiKey = process.env.OPENWEATHER_API_KEY

  console.log('Incoming request for city:', city)
  console.log('Using API Key:', apiKey?.slice(0, 4) + '...') // Don't log full key

  if (!city || typeof city !== 'string') {
    return res.status(400).json({ error: 'City parameter is required' })
  }

  if (!apiKey) {
    console.error('❌ Missing OPENWEATHER API key')
    return res.status(500).json({ error: 'Missing API Key' })
  }

  try {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`
    console.log('Fetching:', url)

    const response = await fetch(url)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ OpenWeather error:', errorText)
      return res.status(response.status).json({ error: 'Failed to fetch geolocation data' })
    }

    const data = await response.json()

    if (!Array.isArray(data) || data.length === 0) {
      console.error('❌ No geocode result returned')
      return res.status(404).json({ error: 'No matching city found' })
    }

    res.status(200).json(data)
  } catch (error) {
    console.error('❌ Caught geocode API error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
