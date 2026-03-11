import { useEffect } from 'react'

export function useKeyboard(handlers) {
  useEffect(() => {
    const onKey = e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        handlers.focusSearch?.()
      }
      if (e.key === 'Escape') {
        handlers.closePanel?.()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handlers])
}
