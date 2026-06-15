import { createEvent, sample } from 'effector'
import { playerModel } from '@entities/Player'

const pageLoaded = createEvent<string>()

sample({
  clock: pageLoaded,
  target: playerModel.events.searchSubmitted,
})

export const playerPageModel = {
  events: { pageLoaded },
}
