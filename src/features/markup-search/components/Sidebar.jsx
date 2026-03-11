import { CATEGORIES } from '../constants/categories'
import styles from './Sidebar.module.css'

export default function Sidebar({ data, category, query, onCategory, onQuery, searchRef }) {
  const counts = {}
  data.forEach(d => { counts[d.category] = (counts[d.category] || 0) + 1 })

  return (
    <section className={styles.sidebar}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Browse Flow</p>
          <h2 className={styles.title}>카테고리 및 검색</h2>
        </div>
        <div className={styles.hint}>
          <kbd>⌘K</kbd> 검색 <span className={styles.dot}>•</span> <kbd>ESC</kbd> 닫기
        </div>
      </div>

      <div className={styles.searchBox}>
        <SearchIcon />
        <input
          ref={searchRef}
          className={styles.input}
          type="text"
          value={query}
          onChange={e => onQuery(e.target.value)}
          placeholder={
            category
              ? `${category} 안에서 항목명·DB 컬럼·속성명 검색`
              : '항목명·DB 컬럼·속성명 검색'
          }
          autoComplete="off"
          spellCheck={false}
        />
        {query && (
          <button
            type="button"
            className={styles.clear}
            onClick={() => onQuery('')}
            aria-label="검색 초기화"
          >
            ×
          </button>
        )}
      </div>

      <div className={styles.sectionHeader}>
        <div>
          <div className={styles.sectionLabel}>카테고리</div>
          <p className={styles.sectionCopy}>
            {query.trim() && !category
              ? '지금은 전체 카테고리에서 바로 검색 중입니다. 카테고리를 누르면 결과를 더 좁힐 수 있습니다.'
              : category
              ? `"${category}" 타입만 아래에 표시됩니다. 다시 누르면 접힙니다.`
              : '카테고리를 눌러야 타입 목록이 열립니다.'}
          </p>
        </div>
      </div>

      <nav className={styles.catList}>
        {CATEGORIES.map(({ key, icon, color }) => {
          const count = key === '전체' ? data.length : (counts[key] || 0)
          if (count === 0 && key !== '전체') return null
          const isActive = category === key
          return (
            <button
              key={key}
              type="button"
              className={`${styles.catBtn} ${isActive ? styles.active : ''}`}
              onClick={() => onCategory(key)}
              style={isActive ? { '--cat-color': color } : {}}
            >
              <span className={styles.iconWrap}>
                <span className={styles.icon}>{icon}</span>
              </span>
              <span className={styles.meta}>
                <span className={styles.label}>{key === '전체' ? '전체 보기' : key}</span>
                <span className={styles.caption}>
                  {key === '전체' ? '모든 타입 펼치기' : `${key} 타입만 보기`}
                </span>
              </span>
              <span className={`${styles.count} ${isActive ? styles.countActive : ''}`}>{count}</span>
            </button>
          )
        })}
      </nav>
    </section>
  )
}

function SearchIcon() {
  return (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ color: 'var(--muted)', flexShrink: 0 }}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}
