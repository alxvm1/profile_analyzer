export type TrustTier = 'normal' | 'suspicious' | 'highly_suspicious' | 'insufficient_data'
export type Confidence = 'low' | 'medium' | 'high'

export type MetricResult = {
  value: number
  expected: { min: number; max: number }
  suspicion: number
  flagged: boolean
}

export type TrustScore = {
  score: number
  tier: TrustTier
  flags: string[]
  confidence: Confidence
  breakdown: {
    aim: MetricResult | null
    hs: MetricResult | null
    kd: MetricResult | null
    reactionTime: MetricResult | null
    preaim: MetricResult | null
    accountReputation: { score: number; flags: string[] }
    matchContext: { hasBannedPlayerInHistory: boolean; suspiciousMatchCount: number }
    rankMismatch: { premierRating: number; faceitLevel: number; flagged: boolean } | null
  }
}

export type ApiErrorCode =
  | 'STEAM_PROFILE_NOT_FOUND'
  | 'STEAM_API_KEY_NOT_CONFIGURED'
  | 'STEAM_API_UNAVAILABLE'
  | 'INVALID_INPUT'
  | 'UNKNOWN_ERROR'

export class ApiError extends Error {
  readonly code: ApiErrorCode

  constructor(code: ApiErrorCode) {
    super(code)
    this.name = 'ApiError'
    this.code = code
  }
}
