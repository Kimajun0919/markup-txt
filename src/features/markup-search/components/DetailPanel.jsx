import { useState, useEffect } from 'react'
import { CAT_MAP } from '../constants/categories'
import PropTable from './PropTable'
import CodeBlock from './CodeBlock'
import styles from './DetailPanel.module.css'

export default function DetailPanel({ item, onClose, initialPropQuery = '', highlightedProp = '' }) {
  const [tab, setTab] = useState('props')

  // 패널 열릴 때마다 props 탭으로 초기화
  useEffect(() => {
    if (item) setTab('props')
  }, [item?.id, initialPropQuery])

  if (!item) return null

  const cfg = CAT_MAP[item.category] || { icon: '◈', color: '#64748b' }

  return (
    <>
      {/* Backdrop */}
      <div
        className={styles.backdrop}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label={`${item.name} 상세 정보`}
      >
        {/* Header */}
        <div className={styles.header}>
          <div
            className={styles.icon}
            style={{
              background: `color-mix(in srgb, ${cfg.color} 15%, transparent)`,
              color: cfg.color,
            }}
          >
            {cfg.icon}
          </div>
          <div className={styles.titleGroup}>
            <div className={styles.name}>{item.name}</div>
            <div className={styles.schema}>{item.schemaType}</div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="닫기">
            ×
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          <p className={styles.desc}>{item.description}</p>

          {/* Stat pills */}
          <div className={styles.stats}>
            <Pill label="전체 속성" value={item.properties.length} />
            <Pill
              label="필수"
              value={item.properties.filter(p => p.required === '필수').length}
              color="#fbbf24"
            />
            <Pill
              label="권장"
              value={item.properties.filter(p => p.required === '권장').length}
              color="var(--green)"
            />
            <Pill label="카테고리" value={item.category} />
            {item.deprecated && (
              <Pill label="상태" value="지원 종료" color="var(--red)" />
            )}
          </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tabBtn} ${tab === 'props' ? styles.activeTab : ''}`}
              onClick={() => setTab('props')}
            >
              속성 목록
              <span className={styles.tabCount}>{item.properties.length}</span>
            </button>
            <button
              className={`${styles.tabBtn} ${tab === 'code' ? styles.activeTab : ''}`}
              onClick={() => setTab('code')}
            >
              JSON-LD 예시
              <span className={styles.tabCount}>{item.examples.length}</span>
            </button>
          </div>

          {/* Tab content */}
          {tab === 'props' && (
            <PropTable
              properties={item.properties}
              initialQuery={initialPropQuery}
              highlightedProp={highlightedProp}
            />
          )}
          {tab === 'code' && <ExamplesTab examples={item.examples} />}
        </div>
      </div>
    </>
  )
}

function Pill({ label, value, color }) {
  return (
    <div className={styles.pill}>
      <span className={styles.pillLabel}>{label}</span>
      <span className={styles.pillValue} style={color ? { color } : {}}>
        {value}
      </span>
    </div>
  )
}

function ExamplesTab({ examples }) {
  const [active, setActive] = useState(0)

  if (!examples || examples.length === 0) {
    return <p style={{ color: 'var(--muted)', fontSize: 13 }}>예시 없음</p>
  }

  return (
    <div>
      {examples.length > 1 && (
        <div className={styles.exTabs}>
          {examples.map((ex, i) => (
            <button
              key={i}
              className={`${styles.exTab} ${active === i ? styles.exTabActive : ''}`}
              onClick={() => setActive(i)}
            >
              {ex.label || `예시 ${i + 1}`}
            </button>
          ))}
        </div>
      )}
      <CodeBlock
        key={active}
        code={examples[active]?.code || ''}
        label={examples.length === 1 ? examples[0].label : undefined}
      />
    </div>
  )
}
