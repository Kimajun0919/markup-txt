export const CAT_CONFIG = {
  '전체':       { icon: '◈',  color: '#3b82f6' },
  '콘텐츠':     { icon: '📝', color: '#8b5cf6' },
  '커머스':     { icon: '🛒', color: '#10b981' },
  '미디어':     { icon: '🎬', color: '#f59e0b' },
  '비즈니스':   { icon: '🏢', color: '#06b6d4' },
  '채용':       { icon: '💼', color: '#a78bfa' },
  '교육':       { icon: '🎓', color: '#34d399' },
  '이벤트':     { icon: '🎫', color: '#fb7185' },
  '사이트 구조':{ icon: '🗂',  color: '#94a3b8' },
  '데이터':     { icon: '📊', color: '#fbbf24' },
}

export const CATEGORIES = Object.keys(CAT_CONFIG)

export function getCatColor(category) {
  return CAT_CONFIG[category]?.color ?? '#64748b'
}
export function getCatIcon(category) {
  return CAT_CONFIG[category]?.icon ?? '◈'
}

export const REQ_LABEL = { 필수: '필수', 권장: '권장', 선택: '선택' }
