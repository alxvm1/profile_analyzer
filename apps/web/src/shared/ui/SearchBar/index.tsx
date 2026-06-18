import { Input } from '../Input'
import { Button } from '../Button'
import { Loader } from '../Loader'
import './style.css'

type SearchBarProps = {
  value?: string
  onChange?: (value: string) => void
  onSubmit?: () => void
  error?: string | null
  isLoading?: boolean
}

export const SearchBar = ({
  value = '',
  onChange,
  onSubmit,
  error,
  isLoading,
}: SearchBarProps) => (
  <div className="search-bar__wrapper">
    <form
      className="search-bar"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.()
      }}
    >
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="steamcommunity.com/id/..."
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        className="search-bar__input"
      />
      <Button
        type="submit"
        variant="primary"
        disabled={!value.trim() || isLoading}
        className="search-bar__button"
      >
        {isLoading ? <Loader /> : 'Analyze'}
      </Button>
    </form>
    {error && <p className="search-bar__error">Profile not found</p>}
  </div>
)
