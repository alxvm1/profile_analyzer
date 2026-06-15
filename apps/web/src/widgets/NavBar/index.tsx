import { Avatar } from '@shared/ui'
import './style.css'
import type { NavBarProps } from './types'

const defaultLinks = [
  { label: 'Поиск', href: '/' },
  { label: 'Профиль', href: '/profile' },
  { label: 'История', href: '/history' },
]

export const NavBar = ({ links = defaultLinks, glass = false }: NavBarProps) => (
  <header className={`topnav ${glass ? 'topnav--glass' : ''}`}>
    <span className="t-h4 t-accent">ProfileAnalyzer</span>

    <nav className="topnav__links">
      {links.map(link => (
        <a
          key={link.href}
          href={link.href}
          className={`navlink ${link.active ? 'navlink--active' : ''}`}
        >
          {link.label}
        </a>
      ))}
    </nav>

    <div className="ml-auto">
      <Avatar fallback="U" size="sm" />
    </div>
  </header>
)
