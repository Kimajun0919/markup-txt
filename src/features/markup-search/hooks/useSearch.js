import { useState, useMemo, useCallback, useRef } from 'react'

function normalize(str) {
  return String(str || '').toLowerCase()
}

function matchesQuery(item, q) {
  if (!q) return true
  return (
    normalize(item.name).includes(q) ||
    normalize(item.schemaType).includes(q) ||
    normalize(item.description).includes(q) ||
    normalize(item.category).includes(q) ||
    item.properties.some(
      (p) =>
        normalize(p.prop).includes(q) ||
        normalize(p.userLabel).includes(q) ||
        normalize(p.adminLabel).includes(q) ||
        normalize(p.type).includes(q) ||
        normalize(p.dataType).includes(q) ||
        normalize(p.note).includes(q) ||
        normalize(p.dbColumn).includes(q)
    )
  )
}

export function useSearch(data) {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('전체')
  const timerRef = useRef(null)

  const handleQueryChange = useCallback((val) => {
    setQuery(val)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setDebouncedQuery(val.toLowerCase().trim()), 200)
  }, [])

  const filtered = useMemo(() => {
    if (!data) return []
    return data.filter((item) => {
      const matchCat = activeCategory === '전체' || item.category === activeCategory
      return matchCat && matchesQuery(item, debouncedQuery)
    })
  }, [data, debouncedQuery, activeCategory])

  const categoryCounts = useMemo(() => {
    if (!data) return {}
    const counts = { 전체: data.length }
    data.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1
    })
    return counts
  }, [data])

  return {
    query,
    handleQueryChange,
    activeCategory,
    setActiveCategory,
    filtered,
    categoryCounts,
  }
}
