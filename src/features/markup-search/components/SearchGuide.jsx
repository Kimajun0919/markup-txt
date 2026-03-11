import { useMemo } from 'react'
import styles from './SearchGuide.module.css'

const MATCH_FIELDS = [
  { key: 'prop', label: '속성명', priority: 140 },
  { key: 'userLabel', label: '항목명', priority: 120 },
  { key: 'adminLabel', label: '관리명', priority: 110 },
  { key: 'dbColumn', label: 'DB 컬럼', priority: 100 },
  { key: 'type', label: '타입', priority: 60 },
  { key: 'dataType', label: '데이터형식', priority: 45 },
  { key: 'note', label: '비고', priority: 20 },
]

const SUPPORT_FIELDS = [
  { key: 'userLabel', label: '항목명' },
  { key: 'adminLabel', label: '관리명' },
  { key: 'dbColumn', label: 'DB 컬럼' },
]

const MAX_RESULTS = 8

export default function SearchGuide({ data, category, query, onSelect }) {
  const trimmedQuery = query.trim()
  const matches = useMemo(
    () => buildMatches(data, category, trimmedQuery),
    [data, category, trimmedQuery]
  )

  if (!trimmedQuery) return null

  return (
    <section className={styles.panel} aria-label="빠른 속성 안내">
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>빠른 속성 찾기</p>
          <h2 className={styles.title}>검색어에 맞는 실제 속성명 안내</h2>
        </div>
        <span className={styles.count}>{matches.length}건</span>
      </div>

      {matches.length === 0 ? (
        <p className={styles.empty}>
          직접 연결되는 속성을 찾지 못했습니다. 항목명, 관리명, DB 컬럼명 기준으로 다시 검색해보세요.
        </p>
      ) : (
        <>
          <p className={styles.helper}>
            {category
              ? `"${category}" 안에서 "${trimmedQuery}"로 검색된 항목 중 실제로 마크업에 써야 하는 속성명만 먼저 보여줍니다.`
              : `"${trimmedQuery}"로 검색된 전체 카테고리 결과 중 실제로 마크업에 써야 하는 속성명만 먼저 보여줍니다.`}
          </p>

          <div className={styles.list}>
            {matches.slice(0, MAX_RESULTS).map((match) => (
              <button
                key={`${match.item.id}-${match.property.prop}`}
                type="button"
                className={styles.result}
                onClick={() => onSelect(match.item, match.property.prop)}
              >
                <div className={styles.resultTop}>
                  <span className={styles.resultLabel}>사용할 속성명</span>
                  <span className={styles.matchBadge}>
                    {match.matches[0].label} 일치
                  </span>
                </div>

                <code className={styles.prop}>{match.property.prop}</code>

                <div className={styles.context}>
                  <span className={styles.contextName}>{match.item.name}</span>
                  <span className={styles.contextSchema}>{match.item.schemaType}</span>
                </div>

                <div className={styles.supportList}>
                  {getSupportEntries(match.property).map((entry) => (
                    <span key={`${match.property.prop}-${entry.label}`} className={styles.support}>
                      <strong>{entry.label}</strong>
                      {entry.value}
                    </span>
                  ))}
                </div>

                {hasDisplayValue(match.property.note) && (
                  <p className={styles.note}>{truncate(match.property.note, 110)}</p>
                )}
              </button>
            ))}
          </div>

          {matches.length > MAX_RESULTS && (
            <p className={styles.more}>상위 {MAX_RESULTS}개만 표시 중입니다.</p>
          )}
        </>
      )}
    </section>
  )
}

function buildMatches(data, category, query) {
  const normalizedQuery = normalize(query)
  if (!normalizedQuery) return []

  const tokens = normalizedQuery.split(/\s+/).filter(Boolean)
  const scopedItems = data.filter(
    (item) => !category || category === '전체' || item.category === category
  )

  return scopedItems
    .flatMap((item) =>
      item.properties
        .map((property) => {
          const matches = MATCH_FIELDS
            .map((field) => {
              const score = getMatchScore(property[field.key], normalizedQuery, tokens, field.priority)
              if (!score) return null
              return { label: field.label, score }
            })
            .filter(Boolean)
            .sort((a, b) => b.score - a.score)

          if (matches.length === 0) return null

          return {
            item,
            property,
            matches,
            score: matches[0].score + getRequiredBonus(property.required),
          }
        })
        .filter(Boolean)
    )
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      if (a.item.name !== b.item.name) return a.item.name.localeCompare(b.item.name)
      return a.property.prop.localeCompare(b.property.prop)
    })
}

function getMatchScore(value, normalizedQuery, tokens, priority) {
  const normalizedValue = normalize(value)
  if (!normalizedValue) return 0
  if (!tokens.every((token) => normalizedValue.includes(token))) return 0
  if (normalizedValue === normalizedQuery) return priority + 40
  if (normalizedValue.startsWith(normalizedQuery)) return priority + 20
  return priority
}

function getRequiredBonus(required) {
  if (required === '필수') return 6
  if (required === '권장') return 3
  return 0
}

function getSupportEntries(property) {
  return SUPPORT_FIELDS
    .map((field) => ({ label: field.label, value: property[field.key] }))
    .filter((entry) => hasDisplayValue(entry.value))
    .filter(
      (entry, index, list) =>
        list.findIndex((candidate) => candidate.value === entry.value) === index
    )
}

function hasDisplayValue(value) {
  const text = String(value || '').trim()
  return Boolean(text && text !== '—' && text !== '-')
}

function normalize(value) {
  return String(value || '').trim().toLowerCase()
}

function truncate(value, maxLength) {
  if (value.length <= maxLength) return value
  return `${value.slice(0, maxLength).trim()}...`
}
