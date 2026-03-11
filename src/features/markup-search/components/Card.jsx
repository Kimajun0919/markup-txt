import { CAT_MAP } from '../constants/categories'
import styles from './Card.module.css'

export default function Card({ item, onClick }) {
  const cfg = CAT_MAP[item.category] || { icon: '◈', color: '#64748b' }
  const reqCount = item.properties.filter(p => p.required === '필수').length

  return (
    <article
      className={`${styles.card} ${item.deprecated ? styles.deprecated : ''}`}
      onClick={() => onClick(item)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick(item)}
      style={{ '--card-color': cfg.color }}
    >
      <div className={styles.header}>
        <div className={styles.icon}>{cfg.icon}</div>
        <div className={styles.titleGroup}>
          <div className={styles.name}>{item.name}</div>
          <div className={styles.schema}>{item.schemaType}</div>
        </div>
      </div>

      <p className={styles.desc}>{item.description}</p>

      <div className={styles.footer}>
        <span className={styles.tagCat}>{item.category}</span>
        {item.deprecated && <span className={styles.tagDep}>지원종료</span>}
        {reqCount > 0 && <span className={styles.tagReq}>필수 {reqCount}개</span>}
        <span className={styles.propCount}>{item.properties.length}개 속성</span>
      </div>
    </article>
  )
}
