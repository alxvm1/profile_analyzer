import type { getPlayer } from '../api'

export type TPlayerResponse = Awaited<ReturnType<typeof getPlayer>>
