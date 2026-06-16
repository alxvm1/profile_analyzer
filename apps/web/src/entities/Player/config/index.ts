import type { ApiErrorCode } from '@cs/shared-types'

export const ERROR_MESSAGES: Record<ApiErrorCode, string> = {
  STEAM_PROFILE_NOT_FOUND: 'Player not found',
  STEAM_API_KEY_NOT_CONFIGURED: 'Service unavailable',
  STEAM_API_UNAVAILABLE: 'Steam is unavailable, try again later',
  INVALID_INPUT: 'Invalid Steam ID or URL',
  UNKNOWN_ERROR: 'Something went wrong',
}
