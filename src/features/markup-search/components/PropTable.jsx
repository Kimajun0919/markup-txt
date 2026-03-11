import { useState, useMemo, useEffect } from 'react'
import { REQ_STYLE } from '../constants/categories'
import styles from './PropTable.module.css'

const FILTERS = ['전체', '필수', '권장', '선택']

export default function PropTable({ properties, initialQuery = '', highlightedProp = '' }) {
  const [filter, setFilter] = useState('전체')
  const [propSearch, setPropSearch] = useState(initialQuery)

  useEffect(() => {
    setFilter('전체')
    setPropSearch(initialQuery)
  }, [initialQuery])

  const filtered = useMemo(() => {
    let list = filter === '전체' ? properties : properties.filter(p => p.required === filter)
    if (propSearch.trim()) {
      const q = propSearch.toLowerCase()
      list = list.filter(p =>
        p.prop.toLowerCase().includes(q) ||
        p.userLabel.toLowerCase().includes(q) ||
        p.adminLabel.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.dataType.toLowerCase().includes(q) ||
        p.note.toLowerCase().includes(q) ||
        p.dbColumn.toLowerCase().includes(q)
      )
    }
    return list
  }, [properties, filter, propSearch])

  const counts = useMemo(() => {
    const c = { 전체: properties.length }
    properties.forEach(p => { c[p.required] = (c[p.required] || 0) + 1 })
    return c
  }, [properties])

  return (
    <div>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.filters}>
          {FILTERS.map(f => (
            <button
              key={f}
              className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
              <span className={styles.filterCount}>{counts[f] || 0}</span>
            </button>
          ))}
        </div>
        <input
          className={styles.propSearch}
          type="text"
          placeholder="속성명·항목명·DB 컬럼 검색..."
          value={propSearch}
          onChange={e => setPropSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>속성</th>
              <th>타입</th>
              <th>필수여부</th>
              <th>DB 컬럼</th>
              <th>데이터형식</th>
              <th>비고</th>
              <th>예시값</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className={styles.noResult}>해당 조건의 속성이 없습니다.</td>
              </tr>
            ) : (
              filtered.map((p, i) => (
                <PropRow
                  key={`${p.prop}-${i}`}
                  prop={p}
                  isHighlighted={highlightedProp === p.prop}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PropRow({ prop: p, isHighlighted }) {
  const reqStyle = REQ_STYLE[p.required] || {}
  const aliases = [
    { label: '항목명', value: p.userLabel },
    { label: '관리명', value: p.adminLabel },
  ].filter((entry, index, list) => {
    const value = String(entry.value || '').trim()
    if (!value || value === '—' || value === '-') return false
    return list.findIndex((candidate) => candidate.value === entry.value) === index
  })

  return (
    <tr className={`${styles.row} ${isHighlighted ? styles.highlightRow : ''}`}>
      <td>
        <span className={styles.propName}>{p.prop}</span>
        {aliases.map((alias) => (
          <span key={`${p.prop}-${alias.label}`} className={styles.propAlias}>
            <strong>{alias.label}</strong>
            {alias.value}
          </span>
        ))}
      </td>
      <td><span className={styles.propType}>{p.type}</span></td>
      <td>
        <span
          className={styles.reqBadge}
          style={{ background: reqStyle.bg, color: reqStyle.color }}
        >
          {p.required}
        </span>
      </td>
      <td><span className={styles.dbCol}>{p.dbColumn}</span></td>
      <td><span className={styles.propType}>{p.dataType}</span></td>
      <td className={styles.note}>{p.note}</td>
      <td><span className={styles.example}>{p.example}</span></td>
    </tr>
  )
}
