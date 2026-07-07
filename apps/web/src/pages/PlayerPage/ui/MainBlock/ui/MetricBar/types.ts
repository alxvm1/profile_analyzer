import type { MetricResult } from '@cs/shared-types'

export type TMetricBarProps = {
  label: string
  metric: MetricResult | null
  formatValue: (value: number) => string
}
