import type { FC } from 'react'
import type { TRankTier, TPremierBadgeProps, TSizeConfig } from './types'
import './style.css'

const RANK_TIERS: TRankTier[] = [
  { min: 0,     max: 4999,  color: '#8a8f99', bg: '#1a1c20' },
  { min: 5000,  max: 9999,  color: '#5eb4d4', bg: '#0a1e28' },
  { min: 10000, max: 14999, color: '#4a7fd4', bg: '#0a1228' },
  { min: 15000, max: 19999, color: '#9b6fd4', bg: '#180a28' },
  { min: 20000, max: 24999, color: '#d44a9b', bg: '#280a1e' },
  { min: 25000, max: 29999, color: '#d44a4a', bg: '#280a0a' },
  { min: 30000, max: null,  color: '#d4aa4a', bg: '#28200a' },
]

const SIZE_MAP: Record<string, TSizeConfig> = {
  sm: { height: 28, viewW: 125, viewH: 40, mainSize: 11, decSize: 9 },
  md: { height: 32, viewW: 125, viewH: 40, mainSize: 13, decSize: 10 },
  lg: { height: 40, viewW: 125, viewH: 40, mainSize: 16, decSize: 12 },
}

const getRankTier = (rating: number): TRankTier =>
  RANK_TIERS.find(
    (t) => rating >= t.min && (t.max === null || rating <= t.max),
  ) ?? RANK_TIERS[0]

const formatRating = (rating: number): { main: string; decimal: string } => {
  const str = rating.toLocaleString('en-US')
  const lastComma = str.lastIndexOf(',')
  if (lastComma === -1) return { main: str, decimal: '' }
  return {
    main: str.slice(0, lastComma + 1),
    decimal: str.slice(lastComma + 1),
  }
}

export const PremierBadge: FC<TPremierBadgeProps> = ({ rating, size = 'md' }) => {
  const tier = getRankTier(rating)
  const { main, decimal } = formatRating(rating)
  const { height, viewW, viewH, mainSize, decSize } = SIZE_MAP[size]
  const width = Math.round(height * (viewW / viewH))

  return (
    <div className="premier-badge" style={{ width, height }}>
      <svg
        className="premier-badge__svg"
        viewBox={`0 0 ${viewW} ${viewH}`}
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M10.5449 1H118.411C121.468 1.0002 123.809 3.71928 123.355 6.74219L119.155 34.7422C118.788 37.1895 116.686 38.9999 114.211 39H6.34473C3.28805 38.9998 0.946954 36.2807 1.40039 33.2578L5.60059 5.25781C5.96793 2.81051 8.07017 1.00006 10.5449 1Z"
          fill={tier.bg}
          stroke={tier.color}
          strokeWidth="2"
        />
        <path
          d="M4.84496 3.40663C5.13867 1.44855 6.82072 0 8.80071 0H13.356L7.35596 40H4.00071C1.55523 40 -0.317801 37.8251 0.0449613 35.4066L4.84496 3.40663Z"
          fill={tier.color}
        />
        <path
          d="M17.2617 0H26.2617L20.2617 40H11.2617L17.2617 0Z"
          fill={tier.color}
        />
      </svg>

      <div className="premier-badge__text">
        <div className="premier-badge__number">
          <span style={{ fontSize: mainSize, color: tier.color }}>{main}</span>
          <span style={{ fontSize: decSize, color: tier.color }}>{decimal}</span>
        </div>
      </div>
    </div>
  )
}
