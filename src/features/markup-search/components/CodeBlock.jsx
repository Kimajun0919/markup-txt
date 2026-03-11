import { useState, useCallback } from 'react'
import styles from './CodeBlock.module.css'

export default function CodeBlock({ code, label }) {
  const [copied, setCopied] = useState(false)

  // JSON-LD 코드만 추출 (script 태그 안)
  const displayCode = (() => {
    const m = code?.match(/<script[^>]*>([\s\S]*?)<\/script>/)
    return m ? m[1].trim() : (code || '')
  })()

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(displayCode).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }, [displayCode])

  return (
    <div className={styles.wrap}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.codeWrap}>
        <button
          className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
          onClick={handleCopy}
        >
          {copied ? '✓ 복사됨' : '복사'}
        </button>
        <pre className={styles.pre}><code>{displayCode}</code></pre>
      </div>
    </div>
  )
}
