import type { SteamProfile, SteamBans, SteamPlaytime } from '../types/steam.js'
import type { FaceitPlayer, FaceitStats } from '../types/faceit.js'
import type { LeetifyProfile } from '../types/leetify.js'
import type { TrustTier, TrustScore, MetricResult } from '@cs/shared-types'

export type { TrustTier, TrustScore, MetricResult }

export const TRUST_THRESHOLDS = {
  highlySuspicious: 60,
  suspicious: 25,
} as const

export type TrustInput = {
  profile: SteamProfile
  bans: SteamBans
  playtime: SteamPlaytime | null
  faceit: FaceitPlayer | null
  faceitStats: FaceitStats | null
  leetify: LeetifyProfile | null
  premierRating: number | null
}

// ─── ТАБЛИЦА НОРМ ПО УРОВНЮ ───────────────────────────────────────────────

type RangeTable = Record<number, { min: number; max: number }>

const NORMS: Record<string, RangeTable> = {
  kd: {
    0:  { min: 0.6, max: 1.8 },
    1:  { min: 0.7, max: 1.8 },
    2:  { min: 0.7, max: 2.0 },
    3:  { min: 0.8, max: 2.2 },
    4:  { min: 0.8, max: 2.3 },
    5:  { min: 0.9, max: 2.5 },
    6:  { min: 0.9, max: 2.8 },
    7:  { min: 1.0, max: 3.0 },
    8:  { min: 1.0, max: 3.5 },
    9:  { min: 1.1, max: 4.0 },
    10: { min: 1.1, max: 4.5 },
  },
  hs: {
    0:  { min: 20, max: 65 },
    1:  { min: 20, max: 65 },
    2:  { min: 22, max: 65 },
    3:  { min: 22, max: 68 },
    4:  { min: 25, max: 68 },
    5:  { min: 25, max: 70 },
    6:  { min: 27, max: 70 },
    7:  { min: 27, max: 72 },
    8:  { min: 28, max: 72 },
    9:  { min: 28, max: 75 },
    10: { min: 30, max: 78 },
  },
  aim: {
    0:  { min: 5,  max: 75 },
    1:  { min: 10, max: 78 },
    2:  { min: 15, max: 80 },
    3:  { min: 20, max: 82 },
    4:  { min: 25, max: 85 },
    5:  { min: 30, max: 88 },
    6:  { min: 35, max: 90 },
    7:  { min: 40, max: 93 },
    8:  { min: 50, max: 96 },
    9:  { min: 55, max: 98 },
    10: { min: 60, max: 100 },
  },
  reactionTime: {
    0:  { min: 180, max: 450 },
    1:  { min: 170, max: 430 },
    2:  { min: 160, max: 420 },
    3:  { min: 155, max: 400 },
    4:  { min: 150, max: 380 },
    5:  { min: 145, max: 370 },
    6:  { min: 140, max: 360 },
    7:  { min: 135, max: 350 },
    8:  { min: 130, max: 340 },
    9:  { min: 125, max: 330 },
    10: { min: 120, max: 320 },
  },
  preaim: {
    0:  { min: 8,  max: 60 },
    1:  { min: 7,  max: 55 },
    2:  { min: 6,  max: 52 },
    3:  { min: 5,  max: 50 },
    4:  { min: 4,  max: 48 },
    5:  { min: 3,  max: 45 },
    6:  { min: 2,  max: 42 },
    7:  { min: 2,  max: 40 },
    8:  { min: 1,  max: 38 },
    9:  { min: 1,  max: 35 },
    10: { min: 1,  max: 32 },
  },
}

function normalizeMetric(
  value: number,
  level: number,
  metricKey: string,
  inverted = false,
): MetricResult {
  const table = NORMS[metricKey]
  const clampedLevel = Math.max(0, Math.min(10, level))
  const { min, max } = table[clampedLevel]

  let suspicion: number
  if (inverted) {
    suspicion = value < min ? Math.min(1, (min - value) / min) : 0
  } else {
    suspicion = value > max ? Math.min(1, (value - max) / (max * 0.5)) : 0
  }

  return {
    value,
    expected: { min, max },
    suspicion: Math.round(suspicion * 100) / 100,
    flagged: suspicion > 0.3,
  }
}

function calcAccountReputation(
  profile: SteamProfile,
  bans: SteamBans,
  playtime: SteamPlaytime | null,
): { score: number; flags: string[] } {
  const repFlags: string[] = []
  let rep = 100

  const ageDays = profile.timecreated
    ? (Date.now() / 1000 - profile.timecreated) / 86400
    : null

  if (ageDays !== null) {
    if (ageDays < 90) {
      rep -= 40
      repFlags.push('ACCOUNT_AGE_UNDER_90_DAYS')
    } else if (ageDays < 365) {
      rep -= 20
      repFlags.push('ACCOUNT_AGE_UNDER_1_YEAR')
    } else if (ageDays < 2 * 365) {
      rep -= 5
    }
  }

  if (playtime !== null) {
    const hours = playtime.hoursCs2
    if (hours < 50) {
      rep -= 30
      repFlags.push('HOURS_UNDER_50')
    } else if (hours < 200) {
      rep -= 15
      repFlags.push('HOURS_UNDER_200')
    } else if (hours < 500) {
      rep -= 5
    }
  }

  if (profile.communityvisibilitystate !== 3) {
    rep -= 10
    repFlags.push('PRIVATE_PROFILE')
  }

  if (bans.VACBanned) {
    rep -= 60
    repFlags.push('VAC_BANNED')
    if (bans.DaysSinceLastBan < 365) repFlags.push('VAC_BAN_RECENT')
  } else if (bans.DaysSinceLastBan > 0 && bans.DaysSinceLastBan < 180) {
    repFlags.push('BAN_HISTORY_AMBIGUOUS')
  }

  if (bans.NumberOfVACBans > 1) {
    rep -= 20
    repFlags.push('MULTIPLE_VAC_BANS')
  }

  if (bans.NumberOfGameBans > 0) {
    rep -= Math.min(bans.NumberOfGameBans, 3) * 15
    repFlags.push(`GAME_BANNED:${bans.NumberOfGameBans}`)
  }

  if (bans.CommunityBanned) {
    rep -= 10
    repFlags.push('COMMUNITY_BANNED')
  }

  return { score: Math.max(0, Math.min(100, rep)), flags: repFlags }
}

export function calculateTrust(input: TrustInput): TrustScore {
  const { profile, bans, playtime, faceit, faceitStats, leetify, premierRating } = input
  const flags: string[] = []

  const faceitLevel = faceit?.games?.cs2?.skill_level ?? 0

  const accountReputation = calcAccountReputation(profile, bans, playtime)
  flags.push(...accountReputation.flags)

  // ─── PERFORMANCE МЕТРИКИ ─────────────────────────────────────────────────

  if (!leetify) flags.push('NO_LEETIFY_PROFILE')

  const ratings = leetify?.recentGameRatings ?? null
  const games = leetify?.games ?? []

  const aimResult = ratings?.aim != null
    ? normalizeMetric(ratings.aim, faceitLevel, 'aim')
    : null

  const kd = faceitStats ? parseFloat(faceitStats.lifetime.average_kd_ratio) : null
  const hs = faceitStats ? parseFloat(faceitStats.lifetime.average_headshots_percent) : null

  const kdResult = kd != null ? normalizeMetric(kd, faceitLevel, 'kd') : null
  // HS: Faceit stats приоритет, fallback — среднее accuracyHead из Leetify (доля → %)
  const hsFromLeetify = (() => {
    const samples = games
      .filter(g => g.dataSource === 'matchmaking')
      .map(g => g.accuracyHead)
      .filter((v): v is number => v != null && v > 0)
      .map(v => v * 100)
    return samples.length >= 5
      ? samples.reduce((a, b) => a + b, 0) / samples.length
      : null
  })()
  const hsValue = hs ?? hsFromLeetify
  const hsResult = hsValue != null ? normalizeMetric(hsValue, faceitLevel, 'hs') : null

  // Фильтруем только Premier матчи для reaction/preaim
  const premierGames = games.filter(g => g.dataSource === 'matchmaking')

  const reactionSamples = premierGames
    .map(g => g.reactionTime)
    .filter((v): v is number => v != null && v > 0)
    .map(v => v * 1000)

  const preaimSamples = premierGames
    .map(g => g.preaim)
    .filter((v): v is number => v != null && v > 0)

  const avgReaction = reactionSamples.length >= 5
    ? reactionSamples.reduce((a, b) => a + b, 0) / reactionSamples.length
    : null

  const avgPreaim = preaimSamples.length >= 5
    ? preaimSamples.reduce((a, b) => a + b, 0) / preaimSamples.length
    : null

  const reactionResult = avgReaction != null
    ? normalizeMetric(avgReaction, faceitLevel, 'reactionTime', true)
    : null

  const preaimResult = avgPreaim != null
    ? normalizeMetric(avgPreaim, faceitLevel, 'preaim', true)
    : null

  const hasBannedPlayerInHistory = games.some(g => g.hasBannedPlayer === true)
  const suspiciousMatchCount = games.filter(g => g.hasBannedPlayer === true).length

  if (hasBannedPlayerInHistory) flags.push('PLAYED_WITH_BANNED_PLAYER')

  // ─── АГРЕГАЦИЯ ───────────────────────────────────────────────────────────

  const metricWeights: Array<{ result: MetricResult | null; weight: number; flagKey: string }> = [
    { result: aimResult,      weight: 2.5, flagKey: 'SUSPICIOUS_AIM_RATING' },
    { result: reactionResult, weight: 2.5, flagKey: 'SUSPICIOUS_REACTION_TIME' },
    { result: preaimResult,   weight: 2.0, flagKey: 'SUSPICIOUS_PREAIM' },
    { result: kdResult,       weight: 1.5, flagKey: 'SUSPICIOUS_KD_FOR_RANK' },
    { result: hsResult,       weight: 1.5, flagKey: 'SUSPICIOUS_HEADSHOT_RATE' },
  ]

  let totalWeight = 0
  let weightedSuspicion = 0

  for (const { result, weight, flagKey } of metricWeights) {
    if (result == null) continue
    totalWeight += weight
    weightedSuspicion += result.suspicion * weight
    if (result.flagged) flags.push(flagKey)
  }

  if (premierRating !== null && faceitLevel > 0) {
    const expectedMinFaceit =
      premierRating >= 20000 ? 8
      : premierRating >= 15000 ? 6
      : premierRating >= 10000 ? 4
      : 0

    if (expectedMinFaceit > 0 && faceitLevel < expectedMinFaceit - 2) {
      flags.push('RANK_MISMATCH_PREMIER_FACEIT')
      weightedSuspicion += 0.4 * 1.5
      totalWeight += 1.5
    }
  }

  const hasPerfData = totalWeight > 0

  const perfSuspicion = hasPerfData
    ? Math.round((weightedSuspicion / totalWeight) * 100)
    : 0

  // Низкая репутация усиливает подозрение, но не создаёт его из воздуха
  const repModifier = hasPerfData
    ? (1 - accountReputation.score / 100) * 15
    : 0

  const finalScore = Math.min(100, Math.round(perfSuspicion + repModifier))

  // ─── ТИР ─────────────────────────────────────────────────────────────────

  let tier: TrustTier
  if (!hasPerfData) {
    tier = 'insufficient_data'
  } else if (finalScore >= TRUST_THRESHOLDS.highlySuspicious) {
    tier = 'highly_suspicious'
  } else if (finalScore >= TRUST_THRESHOLDS.suspicious) {
    tier = 'suspicious'
  } else {
    tier = 'normal'
  }

  // ─── CONFIDENCE ──────────────────────────────────────────────────────────

  const metricCount = metricWeights.filter(m => m.result != null).length
  const confidence =
    metricCount >= 4 ? 'high'
    : metricCount >= 2 ? 'medium'
    : 'low'

  if (confidence === 'low') flags.push('LOW_CONFIDENCE_SCORE')

  return {
    score: finalScore,
    tier,
    flags,
    confidence,
    breakdown: {
      aim: aimResult,
      hs: hsResult,
      kd: kdResult,
      reactionTime: reactionResult,
      preaim: preaimResult,
      accountReputation,
      matchContext: { hasBannedPlayerInHistory, suspiciousMatchCount },
      rankMismatch: premierRating !== null && faceitLevel > 0
        ? { premierRating, faceitLevel, flagged: flags.includes('RANK_MISMATCH_PREMIER_FACEIT') }
        : null,
    },
  }
}
