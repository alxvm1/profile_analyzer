import { ApiError, type ApiErrorCode } from '@cs/shared-types'
import { apiClient } from '@shared/api/client'

export const getPlayer = async (input: string) => {
  const res = await apiClient.api.player[':input'].$get({ param: { input } })

  if (!res.ok) {
    const { error } = (await res.json()) as { error: ApiErrorCode }
    throw new ApiError(error)
  }

  return res.json()
}
