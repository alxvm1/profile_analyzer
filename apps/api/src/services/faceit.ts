import { env } from '../lib/env.js'
import type { FaceitPlayer, FaceitStats } from '../types/faceit.js'

const BASE = 'https://open.faceit.com/data/v4'

export async function getFaceitPlayer(steamId: string): Promise<FaceitPlayer | null> {
  if (!env.FACEIT_API_KEY) return null

  const res = await fetch(
    `${BASE}/players?game=cs2&game_player_id=${steamId}`,
    { headers: { Authorization: `Bearer ${env.FACEIT_API_KEY}` } }
  )

  if (!res.ok) return null

  return res.json() as Promise<FaceitPlayer>
}

export async function getFaceitStats(playerId: string): Promise<FaceitStats | null> {
  if (!env.FACEIT_API_KEY) return null

  const res = await fetch(
    `${BASE}/players/${playerId}/stats/cs2`,
    { headers: { Authorization: `Bearer ${env.FACEIT_API_KEY}` } }
  )

  if (!res.ok) return null

  return res.json() as Promise<FaceitStats>
}
