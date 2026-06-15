export type SteamProfile = {
  steamid: string
  personaname: string
  avatarfull: string
  profileurl: string
  communityvisibilitystate: number
  timecreated?: number
}

export type SteamBans = {
  SteamId: string
  CommunityBanned: boolean
  VACBanned: boolean
  NumberOfVACBans: number
  DaysSinceLastBan: number
  NumberOfGameBans: number
}

export type SteamPlaytime = {
  hoursCs2: number
}