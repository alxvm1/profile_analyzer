import type { SteamProfile, SteamBans, SteamPlaytime } from '../types/steam.js'
import type { FaceitPlayer, FaceitStats } from '../types/faceit.js'
import type { LeetifyProfile } from '../types/leetify.js'

export type TrustTier = 'low' | 'mid' | 'high'

export type TrustScore = {
  score: number
  tier: TrustTier
  flags: string[]
}

export type TrustInput = {
  profile: SteamProfile
  bans: SteamBans
  playtime: SteamPlaytime
  faceit: FaceitPlayer | null
  faceitStats: FaceitStats | null
  leetify: LeetifyProfile
}

export function calculateTrust(input: TrustInput): TrustScore {
  const { profile, bans, playtime, faceit, faceitStats, leetify } = input
  const flags: string[] = []
  let score = 0

  // === ACCOUNT AGE (0–30) ===
  const ageDays = profile.timecreated
    ? (Date.now() / 1000 - profile.timecreated) / 86400
    : 0

  if (ageDays >= 4 * 365)      score += 30
  else if (ageDays >= 2 * 365) score += 22
  else if (ageDays >= 365)     score += 12
  else if (ageDays >= 90)      score += 5
  // < 90 дней: 0
  if (ageDays < 90)        flags.push('ACCOUNT_AGE_UNDER_90_DAYS')
  else if (ageDays < 365)  flags.push('ACCOUNT_AGE_UNDER_1_YEAR')

  // === CS2 HOURS (0–30) ===
  const hours = playtime.hoursCs2

  if (hours >= 2000)      score += 30
  else if (hours >= 1000) score += 24
  else if (hours >= 500)  score += 17
  else if (hours >= 200)  score += 10
  else if (hours >= 50)   score += 4
  // < 50: 0
  if (hours < 50)        flags.push('HOURS_UNDER_50')
  else if (hours < 200)  flags.push('HOURS_UNDER_200')

  // === FACEIT LEVEL (0–25) ===
  const faceitLevel = faceit?.games?.cs2?.skill_level ?? 0

  if (faceitLevel >= 9)      score += 25
  else if (faceitLevel >= 7) score += 18
  else if (faceitLevel >= 5) score += 12
  else if (faceitLevel >= 3) score += 6
  else if (faceitLevel >= 1) score += 3

  // === LEETIFY (0–15) ===
  const aimRating = leetify.recentGameRatings?.aim ?? null

  if (aimRating !== null) {
    if (aimRating >= 30 && aimRating <= 78) score += 15
    else if (aimRating < 30)               score += 5
    else {
      flags.push('SUSPICIOUS_AIM_RATING')
      score += 5
    }
  }

  // === BAN PENALTIES ===
  if (bans.VACBanned) {
    score -= 60
    flags.push('VAC_BANNED')
    if (bans.DaysSinceLastBan < 365) {
      score -= 10
      flags.push('VAC_BAN_RECENT')
    }
  }
  if (bans.NumberOfVACBans > 1) {
    score -= 10 * (bans.NumberOfVACBans - 1)
  }
  if (bans.NumberOfGameBans > 0) {
    score -= Math.min(bans.NumberOfGameBans, 2) * 20
    flags.push(`GAME_BANNED:${bans.NumberOfGameBans}`)
  }
  if (bans.CommunityBanned) {
    score -= 10
    flags.push('COMMUNITY_BANNED')
  }

  // === SUSPICIOUS COMBOS ===
  const kd = faceitStats ? parseFloat(faceitStats.lifetime.average_kd_ratio) : null
  const hs = faceitStats ? parseFloat(faceitStats.lifetime.average_headshots_percent) : null

  if (kd !== null && kd > 3.0 && hours < 500) {
    score -= 20
    flags.push('SUSPICIOUS_KD_LOW_HOURS')
  }
  if (hs !== null && hs > 75) {
    score -= 10
    flags.push('SUSPICIOUS_HEADSHOT_RATE')
  }

  const finalScore = Math.max(0, Math.min(100, Math.round(score)))
  const tier: TrustTier = finalScore >= 75 ? 'high' : finalScore >= 45 ? 'mid' : 'low'

  return { score: finalScore, tier, flags }
}
