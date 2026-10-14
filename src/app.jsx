import { ThemeProvider, useTheme } from './context/ThemeContext'
import { CartProvider, useCart } from './context/CartContext'
import Header from './components/Header'
import Catalog from './components/Catalog'
import ChessApiPanel from './components/ChessApiPanel'
import { chessProducts } from './data/chessData'

function CartPanel() {
  const { cart, dispatch, totalPrice, totalItems } = useCart()

  if (cart.length === 0) {
    return (
      <section id="cart" className="cart-panel empty-cart">
        <h2>🛒 Carrito</h2>
        <p>Tu carrito está vacío. ¡Añade piezas de ajedrez!</p>
      </section>
    )
  }

  return (
    <section id="cart" className="cart-panel">
      <h2>🛒 Carrito ({totalItems} items)</h2>

      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="cart-item-info">
              <strong>{item.name}</strong>
              <span>${item.price} c/u</span>
            </div>

            <div className="cart-qty">
              <button
                onClick={() =>
                  dispatch({ type: 'DECREMENT', payload: item.id })
                }
              >
                −
              </button>
              <span>{item.qty}</span>
              <button
                onClick={() =>
                  dispatch({ type: 'INCREMENT', payload: item.id })
                }
              >
                +
              </button>
            </div>

            <span className="cart-subtotal">
              ${(item.price * item.qty).toFixed(2)}
            </span>

            <button
              className="cart-remove"
              onClick={() => dispatch({ type: 'REMOVE', payload: item.id })}
              title="Eliminar"
            >
              ✖
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-footer">
        <span>Total:</span>
        <strong>${totalPrice.toFixed(2)}</strong>
      </div>
    </section>
  )
}

function Layout() {
  const { theme } = useTheme()

  return (
    <div className={`app ${theme}`}>
      <Header />

      <main className="main">
        <section className="hero">
          <h1>♟️ Catálogo de Equipos de Ajedrez</h1>
          <p>Tableros, piezas, relojes y libros para maestros y aficionados.</p>
        </section>

        <Catalog products={chessProducts} />
        <CartPanel />
        <ChessApiPanel />
      </main>

      <footer className="footer">
        <p>ChessStore · Semana 07 · React Hooks ♟️</p>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Layout />
      </CartProvider>
    </ThemeProvider>
  )
}