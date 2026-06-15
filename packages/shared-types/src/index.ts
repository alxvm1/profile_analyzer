export type TRiskTier = 'low' | 'medium' | 'high'

export interface IPlayerAnalysis {
  input: string
  riskPercent: number
  riskTier: TRiskTier
}

export type ApiErrorCode =
  | 'STEAM_PROFILE_NOT_FOUND'
  | 'STEAM_API_KEY_NOT_CONFIGURED'
  | 'PROFILE_PRIVATE'
  | 'LEETIFY_PROFILE_NOT_FOUND'
  | 'UNKNOWN_ERROR'

export class ApiError extends Error {
  readonly code: ApiErrorCode

  constructor(code: ApiErrorCode) {
    super(code)
    this.name = 'ApiError'
    this.code = code
  }
}
