import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useUnit } from 'effector-react'
import { playerModel } from '@entities/Player'
import { playerPageModel } from './model'
import { Avatar, Card, FaceitLevel, TrustRing } from '@shared/ui'
import { StatsCard } from './ui/StatsCard'
import CrosshairIcon from '@shared/assets/svg/crosshair.svg?react'
import FlameIcon from '@shared/assets/svg/flame.svg?react'
import TrophyIcon from '@shared/assets/svg/trophy.svg?react'
import ActivityIcon from '@shared/assets/svg/activity.svg?react'
import './style.css'

const DataField = ({ label, value }: { label: string; value: string | number | null | undefined }) => (
  <div className="flex flex-row gap-2">
    <span className="player-page__overview-title">{label}:</span>
    <span className={value != null ? 'player-page__overview-value' : 'player-page__overview-value t-muted'}>
      {value ?? 'No Data'}
    </span>
  </div>
)

export const PlayerPage = () => {
  const { input } = useParams<{ input: string }>()

  const pageLoaded = useUnit(playerPageModel.events.pageLoaded)
  const [player, error, isLoading] = useUnit([
    playerModel.stores.$player,
    playerModel.stores.$error,
    playerModel.stores.$loading,
  ])

  useEffect(() => {
    if (input) pageLoaded(input)
  }, [input, pageLoaded])

  if (isLoading) return <p className="t-muted">Loading...</p>
  if (error) return <p className="t-muted">{error.message}</p>
  if (!player) return null

  return (
    <main className="page-container py-10">
      <section>
        <Card variant="accent" className="player-page__card">
          <h1 className="t-h1">{player.steam?.personaname}</h1>
          <div className="flex flex-row gap-4">
            <Card className="w-full flex flex-row gap-4">
              <Avatar
                src={player.steam?.avatarfull}
                fallback={player.steam?.personaname ?? '?'}
                size="lg"
                ring
              />
              <div>
                <DataField
                  label="Playtime"
                  value={player.playtime != null ? `${player.playtime.hoursCs2} hrs` : null}
                />
                <DataField label="Premier Rating" value={player.premierRating} />
                <div className="flex flex-row gap-2 items-center">
                  <DataField label="Faceit ELO" value={player.faceit?.games?.cs2?.faceit_elo} />
                  {player.faceit?.games?.cs2 != null && (
                    <FaceitLevel level={player.faceit.games.cs2.skill_level} size={36} />
                  )}
                </div>
              </div>
            </Card>
            <div className="flex flex-row gap-4">
              <StatsCard
                icon={CrosshairIcon}
                title="K/D"
                value={player.faceitStats?.lifetime.average_kd_ratio}
              />
              <StatsCard
                icon={FlameIcon}
                title="HS %"
                value={
                  player.faceitStats?.lifetime.average_headshots_percent != null
                    ? `${player.faceitStats.lifetime.average_headshots_percent}%`
                    : null
                }
              />
              <StatsCard
                icon={TrophyIcon}
                title="Win Rate"
                value={
                  player.faceitStats?.lifetime.win_rate != null
                    ? `${player.faceitStats.lifetime.win_rate}%`
                    : null
                }
              />
              <StatsCard
                icon={ActivityIcon}
                title="ADR"
                value={player.faceitStats?.lifetime.adr}
              />
            </div>
          </div>
          <Card>
            <TrustRing value={player.trust.score} tier={player.trust.tier} />
            {player.trust.tier === 'insufficient_data' && (
              <p className="t-caption t-muted" style={{ textAlign: 'center', marginTop: 8 }}>
                {player.trust.flags.includes('NO_LEETIFY_PROFILE')
                  ? 'Connect Leetify for full analysis'
                  : 'Not enough match data'}
              </p>
            )}
            {player.trust.confidence === 'low' && player.trust.tier !== 'insufficient_data' && (
              <p className="t-caption t-muted" style={{ textAlign: 'center', marginTop: 8 }}>
                Low confidence — limited data available
              </p>
            )}
          </Card>
        </Card>
      </section>
    </main>
  )
}
