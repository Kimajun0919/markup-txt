import { useState, useRef, useCallback } from 'react'
import { useData } from './hooks/useData'
import { useFilter } from './hooks/useFilter'
import { useKeyboard } from './hooks/useKeyboard'
import Sidebar from './components/Sidebar'
import CardGrid from './components/CardGrid'
import DetailPanel from './components/DetailPanel'
import SearchGuide from './components/SearchGuide'
import styles from './App.module.css'

export default function MarkupSearch() {
  const { data, loading, error } = useData()
  const [category, setCategory] = useState(null)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [focusedProp, setFocusedProp] = useState('')
  const searchRef = useRef(null)
  const hasQuery = Boolean(query.trim())

  const filtered = useFilter(data, { category, query })

  const closePanel = useCallback(() => {
    setSelected(null)
    setFocusedProp('')
  }, [])
  const focusSearch = useCallback(() => searchRef.current?.focus(), [])
  const openItem = useCallback((item, prop = '') => {
    setSelected(item)
    setFocusedProp(prop)
  }, [])
  const handleCategoryChange = useCallback((nextCategory) => {
    setCategory((currentCategory) => (
      currentCategory === nextCategory ? null : nextCategory
    ))
  }, [])

  useKeyboard({ closePanel, focusSearch })

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>데이터 로딩 중...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.loading}>
        <p style={{ color: 'var(--red)' }}>⚠ {error}</p>
      </div>
    )
  }

  return (
    <div className={styles.app}>
      <header className="hero hero-single panel">
        <div className="hero-copy">
          <p className="eyebrow">Markup discovery builder</p>
          <h1>구조화 데이터 마크업 탐색기</h1>
          <p className="hero-description">
            타입, 속성, JSON-LD 예시를 검색 흐름에 맞춰 빠르게 찾을 수 있게
            정리했습니다. 생성기 화면과 같은 레이아웃으로 맞춰서 전환 시에도
            작업 맥락이 끊기지 않게 구성했습니다.
          </p>
        </div>
      </header>

      <main className="content-grid">
        <Sidebar
          data={data}
          category={category}
          query={query}
          onCategory={handleCategoryChange}
          onQuery={setQuery}
          searchRef={searchRef}
        />

        <div className={styles.resultsColumn}>
          {hasQuery && (
            <SearchGuide
              data={data}
              category={category}
              query={query}
              onSelect={openItem}
            />
          )}

          <section className="panel">
            <div className="panel-header">
              <div>
                <h2>타입 결과</h2>
                <p>
                  카테고리와 검색어 기준으로 마크업 타입을 추려서 보고,
                  필요한 항목은 상세 패널에서 속성과 예시 코드를 확인합니다.
                </p>
              </div>
            </div>

            <CardGrid
              items={filtered}
              total={data.length}
              onSelect={openItem}
              activeCategory={category}
              query={query}
            />
          </section>
        </div>
      </main>

      {selected && (
        <DetailPanel
          item={selected}
          onClose={closePanel}
          initialPropQuery={focusedProp}
          highlightedProp={focusedProp}
        />
      )}
    </div>
  )
}
