import { type ComponentProps } from 'react'

export type CardVariant = 'default' | 'hover' | 'accent' | 'glass'

export interface CardProps extends ComponentProps<'div'> {
  variant?: CardVariant
  padLg?: boolean
}
