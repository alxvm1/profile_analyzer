export type FaceitStats = {
  lifetime: {
    'Average K/D Ratio': string
    'Win Rate %': string
    Matches: string
    'Average Headshots %': string
    'Average Damage per Round'?: string
    KAST?: string
  }
}

export type FaceitPlayer = {
  player_id: string
  nickname: string
  avatar: string
  country: string
  games: {
    cs2?: {
      faceit_elo: number
      skill_level: number
    }
  }
  lifetime?: {
    'Average K/D Ratio': string
    'Win Rate %': string
    Matches: string
  }
}