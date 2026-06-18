import { SearchBar } from '@shared/ui'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'effector-forms'
import { useUnit } from 'effector-react'
import './style.css'
import { homePageModel } from './model'
import { useEffect } from 'react'

export const HomePage = () => {
  const navigate = useNavigate()

  const { fields, submit, reset } = useForm(
    homePageModel.searchFormModel.searchForm,
  )

  const resetSearch = useUnit(homePageModel.searchFormModel.events.resetSearch)

  const [error, isLoading, targetUrl] = useUnit([
    homePageModel.searchFormModel.stores.$error,
    homePageModel.searchFormModel.stores.$isLoading,
    homePageModel.searchFormModel.stores.$targetUrl,
  ])

  useEffect(() => resetSearch, [resetSearch])

  useEffect(() => {
    if (!targetUrl) return

    navigate(targetUrl)
    reset()
  }, [targetUrl, navigate, reset])

  return (
    <main className="page-container py-10">
      <div className="flex flex-col items-center justify-center gap-4 min-h-[60vh]">
        <div className="flex flex-col justify-center items-center gap-6">
          <h1 className="t-h1">Inspect your Enemy</h1>
          <p className="t-body t-muted">
            Enter Steam URL or nickname to analyze
          </p>
        </div>
        <div className="w-full max-w-[480px] flex justify-center">
          <SearchBar
            value={fields.playerId.value}
            onChange={fields.playerId.onChange}
            onSubmit={() => submit()}
            error={error?.message ?? null}
            isLoading={isLoading}
          />
        </div>
      </div>
    </main>
  )
}
