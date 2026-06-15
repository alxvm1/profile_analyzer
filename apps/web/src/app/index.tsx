import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NavBar } from '@widgets/NavBar'
import { Background } from '@shared/ui'
import { HomePage } from '@pages/HomePage'
import { PlayerPage } from '@pages/PlayerPage'

export const App = () => (
  <BrowserRouter>
    <Background />
    <NavBar glass />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:input" element={<PlayerPage />} />
    </Routes>
  </BrowserRouter>
)
