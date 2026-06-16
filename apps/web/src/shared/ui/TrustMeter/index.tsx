import './style.css'
import type { TrustRingProps, TrustMeterProps } from './types'

const RADIUS = 45
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const TIER_COLOR: Record<string, string> = {
  normal: 'var(--c-trust-high)',
  suspicious: 'var(--c-trust-mid)',
  highly_suspicious: 'var(--c-trust-low)',
  insufficient_data: 'var(--c-text-muted)',
}

export const TrustRing = ({ value, tier }: TrustRingProps) => {
  const isNoData = tier === 'insufficient_data'
  const displayValue = isNoData ? 0 : value
  const progress = (displayValue / 100) * CIRCUMFERENCE
  const color = TIER_COLOR[tier] ?? 'var(--c-text-muted)'

  return (
    <svg
      className="ring"
      viewBox="0 0 100 100"
      style={{ '--ring-color': color } as React.CSSProperties}
    >
      <circle className="ring__track" cx="50" cy="50" r={RADIUS} />
      <circle
        className="ring__fill"
        cx="50"
        cy="50"
        r={RADIUS}
        strokeLinecap="round"
        style={{
          strokeDasharray: CIRCUMFERENCE,
          strokeDashoffset: CIRCUMFERENCE - progress,
        }}
      />
      <text x="50" y="44" className="ring__num">
        {isNoData ? '—' : `${value}%`}
      </text>
      <text x="50" y="66" className="ring__cap">
        TRUST
      </text>
    </svg>
  )
}

export const TrustMeter = ({ value, min = 0, max = 100 }: TrustMeterProps) => {
  const maskWidth = 100 - ((value - min) / (max - min)) * 100

  return (
    <div className="meter">
      <div className="meter__track">
        <div className="meter__mask" style={{ width: `${maskWidth}%` }} />
      </div>
      <div className="meter__scale">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}
