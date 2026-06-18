export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export interface AvatarProps {
  src?: string
  fallback: string
  size?: AvatarSize
  ring?: boolean
  online?: boolean
}
