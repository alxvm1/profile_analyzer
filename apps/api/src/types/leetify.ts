export type LeetifyRecentGameRatings = {
  aim: number
  positioning: number
  utility: number
  gamesPlayed: number
  clutch: number
  ctLeetify: number
  leetify: number
  opening: number
  tLeetify: number
  leetifyRatingRounds: number
}

export type LeetifyGame = {
  gameId: string
  gameFinishedAt: string
  isCs2: boolean
  mapName: string
  matchResult: 'win' | 'loss' | 'tie'
  rankType: number | null
  skillLevel: number
  dataSource: string
  elo?: number
  scores?: number[]
  partySize?: number
  hasBannedPlayer?: boolean
  ctLeetifyRating?: number
  ctLeetifyRatingRounds?: number
  tLeetifyRating?: number
  tLeetifyRatingRounds?: number
  ownTeamSteam64Ids?: string[]
  enemyTeamSteam64Ids?: string[]
  preaim?: number
  reactionTime?: number
  accuracyHead?: number
  kills?: number
  deaths?: number
}

export type LeetifyMeta = {
  name: string
  steam64Id: string
  steamAvatarUrl?: string
  faceitNickname: string | null
  leetifyUserId: string
  isProPlan?: boolean
  isCollector?: boolean
  isLeetifyStaff?: boolean
  vanityUrl?: string | null
  esportalNickname?: string | null
  gamersClubPlayerId?: string | null
}

export type LeetifyStats = {
  ttd?: number
  crosshairPlacement?: number
}

export type LeetifyProfile = {
  recentGameRatings: LeetifyRecentGameRatings
  games: LeetifyGame[]
  meta: LeetifyMeta
  stats?: LeetifyStats
  isSensitiveDataVisible?: boolean
}
