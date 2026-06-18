export type TRankTier = {
  min: number
  max: number | null
  color: string
  bg: string
}

export type TPremierBadgeProps = {
  rating: number
  size?: 'sm' | 'md' | 'lg'
}

export type TSizeConfig = {
  height: number
  viewW: number
  viewH: number
  mainSize: number
  decSize: number
}
