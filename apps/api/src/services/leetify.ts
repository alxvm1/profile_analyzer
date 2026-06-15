import { env } from '../lib/env.js'
import type { LeetifyProfile } from '../types/leetify.js'

const BASE = 'https://api.cs-prod.leetify.com'

export async function getLeetifyProfile(steamId: string): Promise<LeetifyProfile | null> {
  const headers: Record<string, string> = {}
  if (env.LEETIFY_API_KEY) {
    headers['Authorization'] = `Bearer ${env.LEETIFY_API_KEY}`
  }

  try {
    const res = await fetch(`${BASE}/api/profile/id/${steamId}`, { headers })
    if (!res.ok) return null
    return res.json() as Promise<LeetifyProfile>
  } catch {
    return null
  }
}
