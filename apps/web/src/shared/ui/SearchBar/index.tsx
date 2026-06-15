import { Input } from '../Input'
import { Button } from '../Button'
import './style.css'

type SearchBarProps = {
  onSubmit?: (value: string) => void
}

export const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const value = new FormData(e.currentTarget).get('query') as string
    onSubmit?.(value.trim())
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <Input name="query" placeholder="steamcommunity.com/id/..." />
      <Button type="submit" variant="primary">Analyze</Button>
    </form>
  )
}
