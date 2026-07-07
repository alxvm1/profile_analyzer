import { env } from '../lib/env.js'
import type { LeetifyProfile, LeetifyStats } from '../types/leetify.js'

const BASE = 'https://api.cs-prod.leetify.com'

function getHeaders(): Record<string, string> {
  if (env.LEETIFY_API_KEY) {
    return { Authorization: `Bearer ${env.LEETIFY_API_KEY}` }
  }
  return {}
}

export async function getLeetifyProfile(steamId: string): Promise<LeetifyProfile | null> {
  try {
    const res = await fetch(`${BASE}/api/profile/id/${steamId}`, { headers: getHeaders() })
    if (!res.ok) return null
    return res.json() as Promise<LeetifyProfile>
  } catch {
    return null
  }
}

export async function getLeetifyStats(steamId: string): Promise<LeetifyStats | null> {
  try {
    const res = await fetch(`${BASE}/v3/profile?steamId=${steamId}`, { headers: getHeaders() })
    if (!res.ok) return null
    const data = await res.json() as { stats?: LeetifyStats }
    return data.stats ?? null
  } catch {
    return null
  }
}
