import { NavBar } from '@widgets/NavBar'
import { HomePage } from '@pages/home'
import { Background } from '@shared/ui'

export const App = () => (
  <>
    <Background />
    <NavBar glass />
    <HomePage />
  </>
)