import { createEvent, sample } from 'effector'
import { playerModel } from '@entities/Player'

const pageLoaded = createEvent<string>()

sample({
  clock: pageLoaded,
  target: playerModel.playerInfoModel.events.searchSubmitted,
})

export const overviewModel = {
  events: { pageLoaded },
}
