import * as RadixProgress from '@radix-ui/react-progress'
import './style.css'
import type { ProgressProps } from './types'

export const Progress = ({ value, max = 100 }: ProgressProps) => (
  <RadixProgress.Root className="progress" value={value} max={max}>
    <RadixProgress.Indicator
      className="progress__bar"
      style={{ width: `${(value / max) * 100}%` }}
    />
  </RadixProgress.Root>
)