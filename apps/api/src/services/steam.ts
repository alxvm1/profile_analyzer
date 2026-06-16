import { env } from '../lib/env.js'
import type { SteamProfile, SteamBans, SteamPlaytime } from '../types/steam.js'

const BASE = 'https://api.steampowered.com'

function parseSteamInput(input: string): { type: 'id64' | 'vanity'; value: string } {
  const s = decodeURIComponent(input).trim().replace(/\/$/, '')

  const profileMatch = s.match(/profiles\/(\d{17})/)
  if (profileMatch) return { type: 'id64', value: profileMatch[1] }

  const vanityMatch = s.match(/\/id\/([^/?]+)/)
  if (vanityMatch) return { type: 'vanity', value: vanityMatch[1] }

  if (/^7656\d{13}$/.test(s)) return { type: 'id64', value: s }

  // STEAM_0:Y:Z or STEAM_1:Y:Z
  const steam2Match = s.match(/^STEAM_[01]:([01]):(\d+)$/i)
  if (steam2Match) {
    const id64 = (BigInt('76561197960265728') + BigInt(steam2Match[2]) * 2n + BigInt(steam2Match[1])).toString()
    return { type: 'id64', value: id64 }
  }

  // [U:1:XXXXXXXX]
  const steam3Match = s.match(/^\[U:1:(\d+)\]$/)
  if (steam3Match) {
    const id64 = (BigInt('76561197960265728') + BigInt(steam3Match[1])).toString()
    return { type: 'id64', value: id64 }
  }

  // 32-bit AccountID
  if (/^\d{1,10}$/.test(s)) {
    const accountId = BigInt(s)
    if (accountId > 0n && accountId < 4294967296n) {
      const id64 = (BigInt('76561197960265728') + accountId).toString()
      return { type: 'id64', value: id64 }
    }
  }

  return { type: 'vanity', value: s }
}

async function resolveToSteamId(input: string): Promise<string> {
  const parsed = parseSteamInput(input)
  if (parsed.type === 'id64') return parsed.value

  const url = `${BASE}/ISteamUser/ResolveVanityURL/v1/?key=${env.STEAM_API_KEY}&vanityurl=${parsed.value}`
  const res = await fetch(url)
  const data = await res.json() as { response: { success: number; steamid?: string; message?: string } }

  if (data.response.success !== 1 || !data.response.steamid) {
    throw new Error('STEAM_PROFILE_NOT_FOUND')
  }
  return data.response.steamid
}

export async function getSteamProfile(input: string): Promise<{ steamId: string; profile: SteamProfile; bans: SteamBans }> {
  const steamId = await resolveToSteamId(input)

  const [summaryRes, bansRes] = await Promise.all([
    fetch(`${BASE}/ISteamUser/GetPlayerSummaries/v2/?key=${env.STEAM_API_KEY}&steamids=${steamId}`),
    fetch(`${BASE}/ISteamUser/GetPlayerBans/v1/?key=${env.STEAM_API_KEY}&steamids=${steamId}`),
  ])

  if (!summaryRes.ok || !bansRes.ok) throw new Error('STEAM_API_UNAVAILABLE')

  const summaryData = await summaryRes.json() as { response: { players: SteamProfile[] } }
  const bansData = await bansRes.json() as { players: SteamBans[] }

  const profile = summaryData.response.players[0]
  const bans = bansData.players[0]

  if (!profile || !bans) throw new Error('STEAM_PROFILE_NOT_FOUND')

  return { steamId, profile, bans }
}

export async function getSteamPlaytime(steamId: string): Promise<SteamPlaytime | null> {
  const res = await fetch(
    `${BASE}/IPlayerService/GetOwnedGames/v1/?key=${env.STEAM_API_KEY}&steamid=${steamId}&appids_filter[0]=730&include_appinfo=false`
  )
  if (!res.ok) throw new Error('STEAM_API_UNAVAILABLE')
  const data = await res.json() as { response: { games?: { appid: number; playtime_forever: number }[] } }
  if (!data.response.games) return null
  const cs2 = data.response.games.find(g => g.appid === 730)
  return { hoursCs2: cs2 ? Math.round(cs2.playtime_forever / 60) : 0 }
}
