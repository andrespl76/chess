import { useState, useMemo, useCallback } from 'react'
import { useCart } from '../context/CartContext'
import ChessCard from './ChessCard'
import SearchBar from './SearchBar'

export default function Catalog({ products }) {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [category, setCategory] = useState('Todos')
  const { dispatch } = useCart()

  // useMemo: sólo recalcula si cambian las dependencias
  const filteredProducts = useMemo(() => {
    let result = products

    // Filtro por categoría
    if (category !== 'Todos') {
      result = result.filter((p) => p.category === category)
    }

    // Filtro por texto
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((p) => p.name.toLowerCase().includes(q))
    }

    // Ordenamiento
    if (sortBy === 'price-asc') {
      return [...result].sort((a, b) => a.price - b.price)
    }
    if (sortBy === 'price-desc') {
      return [...result].sort((a, b) => b.price - a.price)
    }
    if (sortBy === 'rating') {
      return [...result].sort((a, b) => b.rating - a.rating)
    }
    return result
  }, [products, search, sortBy, category])

  // useCallback: misma referencia entre renders
  const handleAdd = useCallback(
    (product) => {
      dispatch({ type: 'ADD', payload: product })
    },
    [dispatch]
  )

  const categories = ['Todos', 'Tableros', 'Piezas', 'Relojes', 'Libros', 'Colección']

  return (
    <section id="catalog" className="catalog">
      <div className="catalog-toolbar">
        <SearchBar search={search} setSearch={setSearch} />

        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label="Ordenar productos"
        >
          <option value="default">Ordenar por...</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
          <option value="rating">Mejor valorados</option>
        </select>
      </div>

      <div className="category-chips">
        {categories.map((c) => (
          <button
            key={c}
            className={`chip ${category === c ? 'active' : ''}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="results-count">
        Mostrando <strong>{filteredProducts.length}</strong> de{' '}
        {products.length} productos
      </p>

      <div className="grid">
        {filteredProducts.map((p) => (
          <ChessCard key={p.id} product={p} onAdd={handleAdd} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="empty">
          <p>😢 No se encontraron productos</p>
          <button
            className="btn-secondary"
            onClick={() => {
              setSearch('')
              setCategory('Todos')
              setSortBy('default')
            }}
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </section>
  )
}