import { Link } from 'react-router-dom'
import HeaderIcon from './assets/HeaderIcon.svg?react'
import './style.css'

export const NavBar = () => (
  <header className="navbar">
    <Link to="/">
      <HeaderIcon />
    </Link>
  </header>
)
