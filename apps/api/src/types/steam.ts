export type SteamProfile = {
  steamid: string
  personaname: string
  profileurl: string
  avatar: string
  avatarmedium: string
  avatarfull: string
  avatarhash: string
  communityvisibilitystate: number
  profilestate?: number
  commentpermission?: number
  personastate: number
  personastateflags?: number
  lastlogoff?: number
  timecreated?: number
  primaryclanid?: string
  loccountrycode?: string
  locstatecode?: string
  loccityid?: number
}

export type SteamBans = {
  SteamId: string
  CommunityBanned: boolean
  VACBanned: boolean
  NumberOfVACBans: number
  DaysSinceLastBan: number
  NumberOfGameBans: number
  EconomyBan: string
}

export type SteamPlaytime = {
  hoursCs2: number
}
