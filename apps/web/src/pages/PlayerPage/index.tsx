import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useUnit } from 'effector-react'
import { playerModel } from '@entities/Player'
import { Loader } from '@shared/ui'
import { playerPageModel } from './model'
import { PreviewBlock } from './ui/PreviewBlock'
import './style.css'
import { MainBlock } from './ui/MainBlock'

export const PlayerPage = () => {
  const { input } = useParams<{ input: string }>()

  const pageLoaded = useUnit(playerPageModel.overviewModel.events.pageLoaded)
  const [player, error, isLoading] = useUnit([
    playerModel.playerInfoModel.stores.$player,
    playerModel.playerInfoModel.stores.$error,
    playerModel.playerInfoModel.stores.$loading,
  ])

  useEffect(() => {
    if (input) pageLoaded(input)
  }, [input, pageLoaded])

  if (isLoading) return <Loader />
  if (error) return <p className="t-muted">{error.message}</p>
  if (!player) return null

  return (
    <main className="page-container py-10">
      <section className="flex flex-row">
        <div className="player-page__left-container glass">
          <PreviewBlock player={player} />
        </div>
        <div className="player-page__right-container">
          <MainBlock player={player} />
        </div>
      </section>
    </main>
  )
}
