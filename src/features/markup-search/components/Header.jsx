import styles from './Header.module.css'

export default function Header({ totalTypes, totalProps }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Google 구조화 데이터 레퍼런스</h1>
        <p className={styles.sub}>
          Google Search 공식 문서 기반 — 속성 정의 · 예시값 · JSON-LD 코드
        </p>
        <div className={styles.meta}>
          <Chip dot="green" label={`${totalTypes}가지 마크업 타입`} />
          <Chip dot="cyan" label={`${totalProps}개 속성`} />
          <Chip dot="yellow" label="schema.org 기준" />
        </div>
      </div>
    </header>
  )
}

function Chip({ dot, label }) {
  return (
    <span className={styles.chip}>
      <span className={`${styles.dot} ${styles[dot]}`} />
      {label}
    </span>
  )
}
