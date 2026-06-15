import { Hono } from 'hono'
import { getSteamProfile, getSteamPlaytime } from '../services/steam.js'
import { getFaceitPlayer, getFaceitStats } from '../services/faceit.js'
import { getLeetifyProfile } from '../services/leetify.js'
import { calculateTrust } from '../services/trust.js'
import { env } from '../lib/env.js'

export const playerRouter = new Hono()

playerRouter.get('/:input', async (c) => {
  if (!env.STEAM_API_KEY) {
    return c.json({ error: 'STEAM_API_KEY not configured' }, 503)
  }

  const input = c.req.param('input')

  try {
    const steamData = await getSteamProfile(input)

    if (steamData.profile.communityvisibilitystate !== 3) {
      return c.json({ error: 'Данные недоступны', reason: 'private_profile' }, 403)
    }

    const [playtime, faceit, leetify] = await Promise.all([
      getSteamPlaytime(steamData.steamId).catch(() => ({ hoursCs2: 0 })),
      getFaceitPlayer(steamData.steamId).catch(() => null),
      getLeetifyProfile(steamData.steamId).catch(() => null),
    ])

    if (!leetify) {
      return c.json({ error: 'Данные недоступны', reason: 'no_leetify_profile' }, 404)
    }

    const faceitStats = faceit
      ? await getFaceitStats(faceit.player_id).catch(() => null)
      : null

    const trust = calculateTrust({
      profile: steamData.profile,
      bans: steamData.bans,
      playtime,
      faceit,
      faceitStats,
      leetify,
    })

    return c.json({
      steamId: steamData.steamId,
      steam: steamData.profile,
      bans: steamData.bans,
      playtime,
      faceit,
      faceitStats,
      leetify,
      trust,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return c.json({ error: message }, 404)
  }
})
