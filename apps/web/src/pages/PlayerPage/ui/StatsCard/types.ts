import type { FC, SVGProps } from 'react'

export type TStatsCardProps = {
  icon?: FC<SVGProps<SVGSVGElement>>
  title: string
  value: string | number | null | undefined
}
