// pages/api/weather.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lat, lon } = req.query
  const apiKey = process.env.OPENWEATHER_API_KEY

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude are required' })
  }

  try {
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          lat,
          lon,
          appid: apiKey,
          units: 'metric'
        }
      }
    )

    res.status(200).json(response.data)
  } catch (error: any) {
    console.error('Weather API error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

