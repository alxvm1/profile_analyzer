import './style.css'
import type { NavBarProps } from './types'

export const NavBar = ({glass = false }: NavBarProps) => (
  <header className={`topnav ${glass ? 'topnav--glass' : ''}`}>
    <span className="t-h4 t-bright">SIGHTLINE</span>
  </header>
)
