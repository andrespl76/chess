import { memo } from 'react'

function ChessCard({ product, onAdd }) {
  return (
    <article className="card">
      <div className="card-img">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="badge">{product.category}</span>
        <span className="rating">⭐ {product.rating}</span>
      </div>

      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>

        <div className="card-info">
          <p className="price">${product.price}</p>
          <p className={`stock ${product.stock < 5 ? 'low' : ''}`}>
            {product.stock < 5
              ? `¡Solo ${product.stock}!`
              : `Stock: ${product.stock}`}
          </p>
        </div>

        <button className="btn-add" onClick={() => onAdd(product)}>
          🛒 Añadir al carrito
        </button>
      </div>
    </article>
  )
}

// React.memo: evita re-render si props no cambian
export default memo(ChessCard)