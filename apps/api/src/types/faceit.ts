export type FaceitGameInfo = {
  region: string
  game_player_id: string
  skill_level: number
  faceit_elo: number
  game_player_name: string
}

export type FaceitPlayer = {
  player_id: string
  nickname: string
  avatar: string
  country: string
  cover_image: string
  games: {
    cs2?: FaceitGameInfo
    csgo?: FaceitGameInfo
  }
  steam_id_64: string
  steam_nickname: string
  faceit_url: string
  verified: boolean
  activated_at: string
}

export type FaceitLifetimeStats = {
  average_kd_ratio: string
  win_rate: string
  matches: string
  average_headshots_percent: string
  adr?: string
  kast?: string
}

export type FaceitStats = {
  player_id: string
  game_id: string
  lifetime: FaceitLifetimeStats
}
