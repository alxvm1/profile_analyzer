import './style.css'
import type { StatTileProps } from './types'

export const StatTile = ({ label, value, delta, deltaDir = 'up', footer }: StatTileProps) => (
  <div className="stat">
    <span className="stat__label">{label}</span>
    <span className="stat__value">{value}</span>
    {(delta || footer) && (
      <div className="stat__foot">
        {delta && <span className={`delta delta--${deltaDir}`}>{delta}</span>}
        {footer && <span>{footer}</span>}
      </div>
    )}
  </div>
)