export const CATEGORIES = [
  { key: '전체',      icon: '◈',  color: '#3b82f6' },
  { key: '콘텐츠',    icon: '📝', color: '#8b5cf6' },
  { key: '커머스',    icon: '🛒', color: '#10b981' },
  { key: '미디어',    icon: '🎬', color: '#f59e0b' },
  { key: '비즈니스',  icon: '🏢', color: '#06b6d4' },
  { key: '채용',      icon: '💼', color: '#a78bfa' },
  { key: '교육',      icon: '🎓', color: '#34d399' },
  { key: '이벤트',    icon: '🎫', color: '#fb7185' },
  { key: '사이트 구조', icon: '🗂', color: '#94a3b8' },
  { key: '데이터',    icon: '📊', color: '#fbbf24' },
]

export const CAT_MAP = Object.fromEntries(CATEGORIES.map(c => [c.key, c]))

export const REQ_STYLE = {
  필수: { bg: 'rgba(251,191,36,0.15)', color: '#fbbf24' },
  권장: { bg: 'rgba(16,185,129,0.15)', color: '#10b981' },
  선택: { bg: 'rgba(100,116,139,0.15)', color: '#64748b' },
}
