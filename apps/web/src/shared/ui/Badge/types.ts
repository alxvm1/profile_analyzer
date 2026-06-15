import { type ComponentProps } from 'react'

export type BadgeVariant = 'accent' | 'positive' | 'warning' | 'danger' | 'info' | 'outline' | 'glass'

export interface BadgeProps extends ComponentProps<'span'> {
  variant?: BadgeVariant
  dot?: boolean
}
