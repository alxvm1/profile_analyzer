import { useNavigate } from 'react-router-dom'
import { Badge, TrustRing, SearchBar } from '@shared/ui'
import './style.css'

export const HomePage = () => {
  const navigate = useNavigate()

  return (
    <main className="page-container py-10">
      <div className="flex flex-col items-center justify-center gap-6 min-h-[60vh]">
        <Badge variant="glass">title</Badge>
        <TrustRing value={0} color="var(--c-surface-3)" />
        <div className="flex flex-col items-center gap-2">
          <h1 className="t-h1">Inspect your Enemy</h1>
          <p className="t-body t-muted">
            Enter Steam URL or nickname to analyze
          </p>
        </div>
        <div className="w-full max-w-[480px]">
          <SearchBar
            onSubmit={(value) =>
              navigate(`/${encodeURIComponent(value)}`)
            }
          />
        </div>
      </div>
    </main>
  )
}
