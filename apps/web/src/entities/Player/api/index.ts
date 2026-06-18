import { ApiError, type ApiErrorCode } from '@cs/shared-types'
import { apiClient } from '@shared/api/client'

export const checkPlayer = async (input: string): Promise<void> => {
  const res = await apiClient.api.player[':input'].check.$get({ param: { input: encodeURIComponent(input) } })
  if (!res.ok) {
    const { error } = (await res.json()) as { error: ApiErrorCode }
    throw new ApiError(error)
  }
}

export const getPlayer = async (input: string) => {
  const res = await apiClient.api.player[':input'].$get({ param: { input: encodeURIComponent(input) } })

  if (!res.ok) {
    const { error } = (await res.json()) as { error: ApiErrorCode }
    throw new ApiError(error)
  }

  return res.json()
}
