import { env } from '../lib/env.js'
import type { SteamProfile, SteamBans, SteamPlaytime } from '../types/steam.js'

const BASE = 'https://api.steampowered.com'

function parseSteamInput(input: string): { type: 'id64' | 'vanity'; value: string } {
  const decoded = decodeURIComponent(input)

  // steamcommunity.com/profiles/76561198...
  const profileMatch = decoded.match(/profiles\/(\d{17})/)
  if (profileMatch) return { type: 'id64', value: profileMatch[1] }

  // steamcommunity.com/id/vanityname
  const vanityMatch = decoded.match(/\/id\/([^/]+)/)
  if (vanityMatch) return { type: 'vanity', value: vanityMatch[1] }

  // raw SteamID64 (17-digit number starting with 7656)
  if (/^7656\d{13}$/.test(decoded)) return { type: 'id64', value: decoded }

  // assume vanity name
  return { type: 'vanity', value: decoded }
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

  const summaryData = await summaryRes.json() as { response: { players: SteamProfile[] } }
  const bansData = await bansRes.json() as { players: SteamBans[] }

  const profile = summaryData.response.players[0]
  const bans = bansData.players[0]

  if (!profile) throw new Error('STEAM_PROFILE_NOT_FOUND')

  return { steamId, profile, bans }
}

export async function getSteamPlaytime(steamId: string): Promise<SteamPlaytime> {
  const res = await fetch(
    `${BASE}/IPlayerService/GetOwnedGames/v1/?key=${env.STEAM_API_KEY}&steamid=${steamId}&appids_filter[0]=730&include_appinfo=false`
  )
  const data = await res.json() as { response: { games?: { appid: number; playtime_forever: number }[] } }
  const cs2 = data.response.games?.find(g => g.appid === 730)
  return { hoursCs2: cs2 ? Math.round(cs2.playtime_forever / 60) : 0 }
}
