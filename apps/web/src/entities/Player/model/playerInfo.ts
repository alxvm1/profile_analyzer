import { createEffect, createEvent, createStore, sample } from 'effector'
import { ApiError } from '@cs/shared-types'
import { getPlayer } from '../api'
import type { TPlayerResponse } from '../types'

const fetchPlayerFx = createEffect<string, TPlayerResponse, ApiError>(getPlayer)

const searchSubmitted = createEvent<string>()

const $player = createStore<TPlayerResponse | null>(null)
const $error = createStore<ApiError | null>(null)

sample({ clock: searchSubmitted, target: fetchPlayerFx })
sample({
  clock: searchSubmitted,
  fn: () => null,
  target: [$player, $error],
})
sample({ clock: fetchPlayerFx.doneData, target: $player })
sample({ clock: fetchPlayerFx.failData, target: $error })

export const playerInfoModel = {
  events: { searchSubmitted },
  stores: {
    $player,
    $error,
    $loading: fetchPlayerFx.pending,
  },
}
