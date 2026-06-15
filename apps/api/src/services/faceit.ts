import { env } from '../lib/env.js'
import type { FaceitPlayer, FaceitStats, FaceitLifetimeStats } from '../types/faceit.js'

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

type RawFaceitStats = {
  player_id: string
  game_id: string
  lifetime: Record<string, string>
}

function mapLifetime(raw: Record<string, string>): FaceitLifetimeStats {
  return {
    average_kd_ratio: raw['Average K/D Ratio'] ?? '0',
    win_rate: raw['Win Rate %'] ?? '0',
    matches: raw['Matches'] ?? '0',
    average_headshots_percent: raw['Average Headshots %'] ?? '0',
    adr: raw['ADR'],
    kast: raw['KAST'],
  }
}

export async function getFaceitStats(playerId: string): Promise<FaceitStats | null> {
  if (!env.FACEIT_API_KEY) return null

  const res = await fetch(
    `${BASE}/players/${playerId}/stats/cs2`,
    { headers: { Authorization: `Bearer ${env.FACEIT_API_KEY}` } }
  )

  if (!res.ok) return null

  const raw = await res.json() as RawFaceitStats

  return {
    player_id: raw.player_id,
    game_id: raw.game_id,
    lifetime: mapLifetime(raw.lifetime),
  }
}
