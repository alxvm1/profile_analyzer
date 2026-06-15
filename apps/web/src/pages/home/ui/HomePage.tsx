import { useState } from 'react'
import {
  Avatar, Badge, Button, Card,
  StatTile, Tabs, TrustRing, TrustMeter,
} from '@shared/ui'

const tabs = [
  {
    value: 'overview',
    label: 'Обзор',
    content: (
      <div className="flex flex-col gap-6 pt-6">
        <div className="flex flex-wrap gap-4">
          <StatTile label="K/D Ratio"   value="1.42" delta="+0.08" deltaDir="up"   footer="за 90 дней" />
          <StatTile label="Headshot %"  value="58%"  delta="+3%"   deltaDir="up"   footer="за 90 дней" />
          <StatTile label="Win Rate"    value="54%"  delta="-1%"   deltaDir="down" footer="за 90 дней" />
          <StatTile label="Матчей"      value="312"                                footer="всего" />
        </div>
        <Card>
          <p className="t-overline mb-3">Trust Score</p>
          <TrustMeter value={74} />
        </Card>
      </div>
    ),
  },
  {
    value: 'history',
    label: 'История',
    content: (
      <p className="t-muted pt-6">История матчей появится здесь</p>
    ),
  },
]

export const HomePage = () => {
  const [analyzed, setAnalyzed] = useState(false)

  return (
    <main className="page-container py-10">
      {!analyzed ? (
        <div className="flex flex-col items-center justify-center gap-6 min-h-[60vh]">
          <Badge variant='glass'>title</Badge>
          <TrustRing value={0} color="var(--c-surface-3)" />
          <div className="flex flex-col items-center gap-2">
            <h1 className="t-h1">Анализ профиля CS2</h1>
            <p className="t-body t-muted">Введи Steam URL или никнейм для анализа</p>
          </div>
          <div className="flex gap-3 w-full max-w-[480px]">
            <div className="input-group grow">
              <input placeholder="steamcommunity.com/id/..." />
            </div>
            <Button variant="primary" onClick={() => setAnalyzed(true)}>
              Анализировать
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <Card>
            <div className="flex gap-5 items-center">
              <TrustRing value={74} />
              <div className="flex flex-col gap-3 grow">
                <div className="flex items-center gap-3">
                  <Avatar fallback="MK" size="lg" ring />
                  <div className="flex flex-col gap-1">
                    <span className="t-h3">m1kha1l_k</span>
                    <div className="flex gap-2">
                      <Badge variant="positive" dot>Надёжный</Badge>
                      <span className="intg intg--faceit">FACEIT 8</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button variant="ghost" onClick={() => setAnalyzed(false)}>← Назад</Button>
            </div>
          </Card>
          <Tabs tabs={tabs} />
        </div>
      )}
    </main>
  )
}
