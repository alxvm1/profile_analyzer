import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useUnit } from 'effector-react'
import { playerModel } from '@entities/Player'
import { playerPageModel } from './model'

export const PlayerPage = () => {
  const { input } = useParams<{ input: string }>()

  const pageLoaded = useUnit(playerPageModel.events.pageLoaded)
  const player = useUnit(playerModel.stores.$player)
  const error = useUnit(playerModel.stores.$error)
  const isLoading = useUnit(playerModel.stores.$loading)

  useEffect(() => {
    if (input) pageLoaded(decodeURIComponent(input))
  }, [input, pageLoaded])

  if (isLoading) return <p className="t-muted">Loading...</p>
  if (error) return <p className="t-muted">{error.message}</p>
  if (!player) return null

  return (
    <main className="page-container py-10">
      <h1 className="t-h1">{player.steam?.personaname}</h1>
    </main>
  )
}
