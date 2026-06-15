import * as RadixAvatar from '@radix-ui/react-avatar'
import './style.css'
import type { AvatarProps } from './types'

export const Avatar = ({ src, fallback, size = 'md', ring, online }: AvatarProps) => (
  <RadixAvatar.Root className={`avatar avatar--${size} ${ring ? 'avatar--ring' : ''}`}>
    <RadixAvatar.Image src={src} alt={fallback} />
    <RadixAvatar.Fallback>{fallback.slice(0, 2).toUpperCase()}</RadixAvatar.Fallback>
    {online && <span className="avatar__status" />}
  </RadixAvatar.Root>
)