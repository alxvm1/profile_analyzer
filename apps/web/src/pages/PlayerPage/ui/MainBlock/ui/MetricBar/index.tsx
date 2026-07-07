import type { TMetricBarProps } from './types'
import './style.css'

export const MetricBar = ({ label, metric, formatValue }: TMetricBarProps) => {
  if (!metric) return null

  const { value, expected, flagged } = metric
  const progress = Math.min(
    100,
    Math.max(0, ((value - expected.min) / (expected.max - expected.min)) * 100),
  )

  return (
    <div className="metric-bar">
      <span
        className={`metric-bar__badge ${flagged ? 'metric-bar__badge--flagged' : ''}`}
      >
        {formatValue(value)}
      </span>
      <div className="metric-bar__content">
        <span className="metric-bar__label">{label}</span>
        <div className="metric-bar__track">
          <div
            className={`metric-bar__fill ${flagged ? 'metric-bar__fill--flagged' : ''}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
