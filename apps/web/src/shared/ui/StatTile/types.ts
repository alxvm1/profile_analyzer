export interface StatTileProps {
  label: string
  value: string | number
  delta?: string
  deltaDir?: 'up' | 'down'
  footer?: string
}
