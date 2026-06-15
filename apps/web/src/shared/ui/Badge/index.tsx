import './style.css'
import type { BadgeProps } from './types'

export const Badge = ({ variant = 'accent', dot, className = '', children, ...props }: BadgeProps) => (
  <span className={`badge badge--${variant} ${className}`} {...props}>
    {dot && <span className="dot" />}
    {children}
  </span>
)