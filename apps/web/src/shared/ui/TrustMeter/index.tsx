import './style.css'
import type { TrustRingProps, TrustMeterProps } from './types'

export const TrustRing = ({ value, color }: TrustRingProps) => (
  <div className="ring" style={{ '--val': value, '--ring-color': color } as React.CSSProperties}>
    <div className="ring__bg" />
    <div className="ring__label">
      <span className="ring__num">{value}</span>
      <span className="ring__cap">trust</span>
    </div>
  </div>
)

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