import { hc } from 'hono/client'
import type { AppType } from '@api/app'

export const apiClient = hc<AppType>(import.meta.env.VITE_API_URL ?? 'https://api.sight-line.ru')
