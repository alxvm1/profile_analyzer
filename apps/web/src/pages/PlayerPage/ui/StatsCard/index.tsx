import { Card } from '@shared/ui'
import type { TStatsCardProps } from './types'
import './style.css'

export const StatsCard = ({ icon: Icon, title, value }: TStatsCardProps) => (
  <Card>
    <div className="stats-card">
      <div className="flex flex-row gap-1 items-center justify-center">
        {Icon && <Icon />}
        <span className="stats-card__title">{title}</span>
      </div>
      <span className={value != null ? 't-h1' : 't-h1 t-muted'}>{value ?? 'No Data'}</span>
    </div>
  </Card>
)
