import { useNavigate } from 'react-router-dom'
import { SearchBar } from '@shared/ui'
import './style.css'

function normalizeForRoute(value: string): string {
  const s = value.trim().replace(/\/$/, '')
  const profileMatch = s.match(/profiles\/(\d{17})/)
  if (profileMatch) return profileMatch[1]
  const vanityMatch = s.match(/\/id\/([^/?]+)/)
  if (vanityMatch) return vanityMatch[1]
  return s
}

export const HomePage = () => {
  const navigate = useNavigate()

  return (
    <main className="page-container py-10">
      <div className="flex flex-col items-center justify-center gap-6 min-h-[60vh]">
        <div className="flex flex-col items-center gap-2">
          <h1 className="t-h1">Inspect your Enemy</h1>
          <p className="t-body t-muted">
            Enter Steam URL or nickname to analyze
          </p>
        </div>
        <div className="w-full max-w-[480px]">
          <SearchBar
            onSubmit={(value) => navigate(`/${encodeURIComponent(normalizeForRoute(value))}`)}
          />
        </div>
      </div>
    </main>
  )
}
