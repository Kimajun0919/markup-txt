import { useState, useEffect } from 'react'

export function useData() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/data/structured_data.json')
      .then(r => {
        if (!r.ok) throw new Error('데이터 로드 실패')
        return r.json()
      })
      .then(json => { setData(json); setLoading(false) })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [])

  return { data, loading, error }
}
