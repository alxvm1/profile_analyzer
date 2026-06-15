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
  preaim?: number
  reactionTime?: number
  accuracyHead?: number
  kills?: number
  deaths?: number
}

export type LeetifyProfile = {
  recentGameRatings: LeetifyRecentGameRatings
  games: LeetifyGame[]
  meta: {
    name: string
    steam64Id: string
    faceitNickname: string | null
    leetifyUserId: string
  }
}
