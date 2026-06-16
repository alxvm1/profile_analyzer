import type { TrustTier } from '@cs/shared-types'

export interface TrustRingProps {
  value: number
  tier: TrustTier
}

export interface TrustMeterProps {
  value: number
  min?: number
  max?: number
}
