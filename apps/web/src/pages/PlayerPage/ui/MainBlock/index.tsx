import SightlineIcon from './assets/sightlineIcon.svg?react'
import FaceitIcon from './assets/faceitIcon.svg?react'
import LeetifyIcon from './assets/leetifyIcon.svg?react'
import { TrustRing } from '@shared/ui'
import { MetricBar } from './ui/MetricBar'
import type { TMainBlockProps } from './types'
import './style.css'

export const MainBlock = ({ player }: TMainBlockProps) => {
  console.log('[breakdown]', player.trust.breakdown) // TODO: remove
  return (
  <>
    <div className="main-block__slider-wrapper">
      <button className="main-block__slider-button glass">
        <SightlineIcon />
      </button>
      <button className="main-block__slider-button glass">
        <FaceitIcon />
      </button>
      <button className="main-block__slider-button glass">
        <LeetifyIcon />
      </button>
    </div>
    <div className="main-block__information-wrapper">
      <p className="main-block__information-title">Player Information</p>
      <div className="flex flex-row gap-12">
        <TrustRing value={player.trust.score} tier={player.trust.tier} />
        <div>
          <MetricBar
            label="Time to Damage"
            metric={player.trust.breakdown.timeToDamage}
            formatValue={(v) => `${Math.round(v)}ms`}
          />
          <MetricBar
            label="Crosshair Placement"
            metric={player.trust.breakdown.crosshairPlacement}
            formatValue={(v) => `${v.toFixed(1)}°`}
          />
          <MetricBar
            label="K/D Ratio"
            metric={player.trust.breakdown.kd}
            formatValue={(v) => v.toFixed(2)}
          />
          <MetricBar
            label="Aim Accuracy"
            metric={player.trust.breakdown.aim}
            formatValue={(v) => `${v.toFixed(1)}%`}
          />
        </div>
        <div>
          <MetricBar
            label="Reaction Time"
            metric={player.trust.breakdown.reactionTime}
            formatValue={(v) => `${Math.round(v)}ms`}
          />
          <MetricBar
            label="Preaim"
            metric={player.trust.breakdown.preaim}
            formatValue={(v) => `${v.toFixed(1)}°`}
          />
          <MetricBar
            label="ADR"
            metric={player.trust.breakdown.adr}
            formatValue={(v) => v.toFixed(1)}
          />
          <MetricBar
            label="Head Accuracy"
            metric={player.trust.breakdown.hs}
            formatValue={(v) => `${v.toFixed(1)}%`}
          />
          <MetricBar
            label="KAST"
            metric={player.trust.breakdown.kast}
            formatValue={(v) => `${v.toFixed(1)}%`}
          />
        </div>
      </div>
    </div>
  </>
  )
}
