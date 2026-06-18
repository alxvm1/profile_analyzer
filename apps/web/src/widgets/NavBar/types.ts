export interface NavLink {
  label: string
  href: string
  active?: boolean
}

export interface NavBarProps {
  links?: NavLink[]
}
