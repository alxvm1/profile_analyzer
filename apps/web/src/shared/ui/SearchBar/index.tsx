import { useState } from 'react'
import { Input } from '../Input'
import { Button } from '../Button'
import './style.css'

type SearchBarProps = { onSubmit?: (value: string) => void }

export const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const [value, setValue] = useState('')

  return (
    <form className="search-bar" onSubmit={(e) => {
      e.preventDefault()
      const trimmed = value.trim()
      if (trimmed) onSubmit?.(trimmed)
    }}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="steamcommunity.com/id/... · 7656... · STEAM_0:1:..."
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
      <Button type="submit" variant="primary" disabled={!value.trim()}>
        Analyze
      </Button>
    </form>
  )
}
