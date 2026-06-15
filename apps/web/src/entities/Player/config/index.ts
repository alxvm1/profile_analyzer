import type { ApiErrorCode } from '@cs/shared-types'

export const ERROR_MESSAGES: Record<ApiErrorCode, string> = {
  STEAM_PROFILE_NOT_FOUND: 'Player not found',
  STEAM_API_KEY_NOT_CONFIGURED: 'Service unavailable',
  PROFILE_PRIVATE: 'Profile is private',
  LEETIFY_PROFILE_NOT_FOUND: 'No Leetify data for this player',
  UNKNOWN_ERROR: 'Something went wrong',
}
