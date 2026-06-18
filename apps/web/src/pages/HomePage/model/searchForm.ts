import { createEffect, createEvent, createStore, sample } from 'effector'
import { createForm } from 'effector-forms'
import { ApiError } from '@cs/shared-types'
import { checkPlayer } from '@entities/Player'
import { normalizeRoute } from '../lib/normalizeForRoute'

const searchForm = createForm({
  fields: {
    playerId: {
      init: '',
      rules: [
        { name: 'required', validator: (v: string) => v.trim().length > 0 },
      ],
    },
  },
  validateOn: ['submit'],
})

const searchPlayer = createEvent<string>()
const searchPlayerFx = createEffect<string, string, ApiError>(async (input) => {
  await checkPlayer(input)
  return input
})

const resetSearch = createEvent()

const $error = createStore<ApiError | null>(null)
const $isLoading = createStore<boolean>(false)

const $targetUrl = createStore<string | null>(null)
  .on(searchPlayerFx.doneData, (_, input) => `/${encodeURIComponent(input)}`)
  .reset(resetSearch)

sample({ clock: searchPlayer, target: searchPlayerFx })

sample({
  clock: searchForm.formValidated,
  fn: ({ playerId }) => normalizeRoute(playerId),
  target: searchPlayerFx,
})

sample({ clock: searchPlayerFx, fn: () => null, target: [$error, $targetUrl] })

sample({ clock: searchPlayerFx.pending, target: $isLoading })

sample({ clock: searchPlayerFx.failData, target: $error })

export const searchFormModel = {
  searchForm,
  events: { resetSearch },
  stores: {
    $error,
    $isLoading,
    $targetUrl,
  },
}
