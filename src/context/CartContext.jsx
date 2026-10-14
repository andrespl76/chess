import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo
} from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find((i) => i.id === action.payload.id)
      if (existing) {
        return state.map((i) =>
          i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...state, { ...action.payload, qty: 1 }]
    }
    case 'REMOVE':
      return state.filter((i) => i.id !== action.payload)
    case 'INCREMENT':
      return state.map((i) =>
        i.id === action.payload ? { ...i, qty: i.qty + 1 } : i
      )
    case 'DECREMENT':
      return state
        .map((i) =>
          i.id === action.payload ? { ...i, qty: i.qty - 1 } : i
        )
        .filter((i) => i.qty > 0)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [])

  const totalItems = useMemo(
    () => cart.reduce((sum, i) => sum + i.qty, 0),
    [cart]
  )

  const totalPrice = useMemo(
    () => cart.reduce((sum, i) => sum + i.price * i.qty, 0),
    [cart]
  )

  const value = useMemo(
    () => ({ cart, dispatch, totalItems, totalPrice }),
    [cart, totalItems, totalPrice]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>')
  return ctx
}