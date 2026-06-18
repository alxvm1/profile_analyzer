import { Hono } from 'hono'
import type { ApiErrorCode } from '@cs/shared-types'
import { getSteamProfile, getSteamPlaytime } from '../services/steam.js'
import { getFaceitPlayer, getFaceitStats } from '../services/faceit.js'
import { getLeetifyProfile } from '../services/leetify.js'
import { calculateTrust } from '../services/trust.js'
import { env } from '../lib/env.js'

const KNOWN_ERRORS: ApiErrorCode[] = [
  'STEAM_PROFILE_NOT_FOUND',
  'STEAM_API_KEY_NOT_CONFIGURED',
  'STEAM_API_UNAVAILABLE',
  'INVALID_INPUT',
]

export const playerRouter = new Hono()
  .get('/:input/check', async (c) => {
    if (!env.STEAM_API_KEY) {
      return c.json({ error: 'STEAM_API_KEY_NOT_CONFIGURED' as ApiErrorCode }, 503)
    }
    const input = c.req.param('input')
    if (!input?.trim()) {
      return c.json({ error: 'INVALID_INPUT' as ApiErrorCode }, 400)
    }
    try {
      await getSteamProfile(input)
      return c.json({ exists: true })
    } catch (err) {
      const raw = err instanceof Error ? err.message : ''
      const code: ApiErrorCode = KNOWN_ERRORS.includes(raw as ApiErrorCode)
        ? (raw as ApiErrorCode)
        : 'UNKNOWN_ERROR'
      return c.json({ error: code }, code === 'STEAM_PROFILE_NOT_FOUND' ? 404 : 500)
    }
  })
  .get('/:input', async (c) => {
  if (!env.STEAM_API_KEY) {
    return c.json({ error: 'STEAM_API_KEY_NOT_CONFIGURED' as ApiErrorCode }, 503)
  }

  const input = c.req.param('input')

  if (!input?.trim()) {
    return c.json({ error: 'INVALID_INPUT' as ApiErrorCode }, 400)
  }

  try {
    const steamData = await getSteamProfile(input)

    const [playtime, faceit, leetify] = await Promise.all([
      getSteamPlaytime(steamData.steamId).catch(() => null),
      getFaceitPlayer(steamData.steamId).catch(() => null),
      getLeetifyProfile(steamData.steamId).catch(() => null),
    ])

    const faceitStats = faceit ? await getFaceitStats(faceit.player_id).catch(() => null) : null

    const premierRating = leetify?.games
      .filter(g => g.dataSource === 'matchmaking' && g.rankType === 11 && g.skillLevel > 0)
      .sort((a, b) => new Date(b.gameFinishedAt).getTime() - new Date(a.gameFinishedAt).getTime())
      .at(0)?.skillLevel ?? null

    const trust = calculateTrust({
      profile: steamData.profile,
      bans: steamData.bans,
      playtime,
      faceit,
      faceitStats,
      leetify,
      premierRating,
    })

    const invertedScore = trust.tier === 'insufficient_data' ? 0 : 100 - trust.score

    return c.json({
      steamId: steamData.steamId,
      steam: steamData.profile,
      bans: steamData.bans,
      playtime,
      faceit,
      faceitStats,
      premierRating,
      trust: { ...trust, score: invertedScore },
    })
  } catch (err) {
    const raw = err instanceof Error ? err.message : ''
    const code: ApiErrorCode = KNOWN_ERRORS.includes(raw as ApiErrorCode)
      ? (raw as ApiErrorCode)
      : 'UNKNOWN_ERROR'
    const status =
      code === 'STEAM_PROFILE_NOT_FOUND' ? 404
      : code === 'STEAM_API_KEY_NOT_CONFIGURED' ? 503
      : code === 'STEAM_API_UNAVAILABLE' ? 502
      : code === 'INVALID_INPUT' ? 400
      : 500
    return c.json({ error: code }, status)
  }
})
