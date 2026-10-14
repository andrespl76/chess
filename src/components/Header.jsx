import { useTheme } from '../context/ThemeContext'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const { totalItems, dispatch } = useCart()

  return (
    <header className="header">
      <div className="brand">
        <span className="brand-icon">♛</span>
        <div className="brand-text">
          <strong>ChessStore</strong>
          <small>Tienda de Ajedrez</small>
        </div>
      </div>

      <nav className="nav">
        <a href="#catalog" className="nav-link">🏠 Catálogo</a>
        <a href="#cart" className="nav-link">
          🛒 Carrito
          {totalItems > 0 && <span className="badge-count">{totalItems}</span>}
        </a>
        <button
          className="nav-btn danger"
          onClick={() => dispatch({ type: 'CLEAR' })}
          disabled={totalItems === 0}
          title="Vaciar carrito"
        >
          🗑 Checkout
        </button>
        <button
          className="nav-btn theme-toggle"
          onClick={toggleTheme}
          title="Cambiar tema"
        >
          {theme === 'light' ? '🌙 Tema' : '☀️ Tema'}
        </button>
      </nav>
    </header>
  )
}