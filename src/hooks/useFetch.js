import { useState, useEffect, useCallback } from 'react'

/**
 * useFetch: hook personalizado para peticiones HTTP
 * - async/await dentro de useEffect
 * - AbortController para cleanup (evita memory leaks)
 * - useCallback para refetch estable
 */
export function useFetch(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  const refetch = useCallback(() => {
    setReloadKey((k) => k + 1)
  }, [])

  useEffect(() => {
    if (!url) return

    const controller = new AbortController()

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(url, {
          ...options,
          signal: controller.signal
        })

        if (!res.ok) {
          throw new Error(`HTTP ${res.status} - ${res.statusText}`)
        }

        const json = await res.json()
        setData(json)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    // IA: useEffect con fetch → Solución manual:
    // AbortController limpia la petición al desmontar o cambiar URL
    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, reloadKey])

  return { data, loading, error, refetch }
}