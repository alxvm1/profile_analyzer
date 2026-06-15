import './style.css'
import type { ButtonProps } from './types'

export const Button = ({
  variant = 'secondary',
  size,
  icon,
  block,
  className = '',
  ...props
}: ButtonProps) => {
  const cls = [
    'btn',
    variant !== 'secondary' && `btn--${variant}`,
    size && `btn--${size}`,
    icon && 'btn--icon',
    block && 'btn--block',
    className,
  ].filter(Boolean).join(' ')

  return <button className={cls} {...props} />
}