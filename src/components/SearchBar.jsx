import { useRef } from 'react'

export default function SearchBar({ search, setSearch }) {
  const inputRef = useRef(null)

  // useRef: manipula el DOM sin re-render
  const focusInput = () => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }

  const clearSearch = () => {
    setSearch('')
    inputRef.current?.focus()
  }

  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input
        ref={inputRef}
        type="text"
        className="search-input"
        placeholder="Buscar equipos de ajedrez..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Buscar productos"
      />
      {search && (
        <button
          className="search-clear"
          onClick={clearSearch}
          aria-label="Limpiar búsqueda"
        >
          ✖
        </button>
      )}
      <button
        className="btn-secondary"
        onClick={focusInput}
        title="Enfocar búsqueda"
      >
        🎯
      </button>
    </div>
  )
}