import './style.css'
import type { CardProps } from './types'

export const Card = ({
  variant = 'default',
  padLg,
  className = '',
  ...props
}: CardProps) => {
  const cls = [
    'card',
    variant !== 'default' && `card--${variant}`,
    padLg && 'card--pad-lg',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={cls} {...props} />
}
