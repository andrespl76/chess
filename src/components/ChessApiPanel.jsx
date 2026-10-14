import { useState } from 'react'
import { useFetch } from '../hooks/useFetch'

const ENDPOINTS = {
  usuarios: 'https://jsonplaceholder.typicode.com/users',
  productos: 'https://jsonplaceholder.typicode.com/posts',
  posts: 'https://jsonplaceholder.typicode.com/comments',
  error: 'https://jsonplaceholder.typicode.com/404notfound'
}

export default function ChessApiPanel() {
  const [endpoint, setEndpoint] = useState('usuarios')
  const { data, loading, error, refetch } = useFetch(ENDPOINTS[endpoint])

  return (
    <section className="api-panel">
      <div className="api-header">
        <div>
          <h2>♻️ Hook personalizado: useFetch</h2>
          <p className="subtitle">
            Extraer lógica repetitiva · Validar reglas de Hooks · Reutilización
          </p>
        </div>
        <button className="btn-secondary" onClick={refetch} title="Recargar">
          🔄 Recargar
        </button>
      </div>

      <div className="api-buttons">
        {Object.keys(ENDPOINTS).map((key) => (
          <button
            key={key}
            className={`api-btn ${endpoint === key ? 'active' : ''}`}
            onClick={() => setEndpoint(key)}
          >
            {key === 'usuarios' && '👥 Usuarios'}
            {key === 'productos' && '📦 Productos'}
            {key === 'posts' && '💬 Posts'}
            {key === 'error' && '⚠️ Error 404'}
          </button>
        ))}
      </div>

      <div className="api-result">
        {loading && (
          <div className="loader">
            <div className="spinner" />
            <p>⏳ Cargando datos...</p>
          </div>
        )}

        {error && !loading && (
          <p className="error">❌ Error: {error}</p>
        )}

        {data && !loading && (
          <>
            <p className="api-meta">
              Endpoint: <strong>{endpoint}</strong> · Items cargados:{' '}
              <strong>{Array.isArray(data) ? data.length : 1}</strong>
            </p>
            <pre className="api-json">
              {JSON.stringify(data, null, 2).slice(0, 500)}...
            </pre>
          </>
        )}
      </div>

      <p className="api-footer">
        Hook: <code>useFetch</code> | Reutilizable: ✅ | Reglas de Hooks: ✅
      </p>
    </section>
  )
}