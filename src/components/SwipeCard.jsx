import { useState, useRef, useCallback, useImperativeHandle, forwardRef } from 'react'
import styles from './SwipeCard.module.css'

const SWIPE_THRESHOLD = 90 // px needed to trigger a swipe decision
const ROTATION_FACTOR = 0.08

const SwipeCard = forwardRef(function SwipeCard({ url, stackIndex, onSwipe }, ref) {
  const cardRef = useRef(null)
  const startPos = useRef(null)
  const dragDelta = useRef({ x: 0, y: 0 })
  const [loaded, setLoaded] = useState(false)

  const isTop = stackIndex === 0

  // ── Helpers ──────────────────────────────────────────────────────────

  const getEventPos = (e) => {
    const src = e.touches ? e.touches[0] : e
    return { x: src.clientX, y: src.clientY }
  }

  const setHintOpacity = (likeOpacity, dislikeOpacity) => {
    const el = cardRef.current
    if (!el) return
    const likeEl = el.querySelector('[data-hint="like"]')
    const dislikeEl = el.querySelector('[data-hint="dislike"]')
    const overlayLike = el.querySelector('[data-overlay="like"]')
    const overlayDislike = el.querySelector('[data-overlay="dislike"]')
    if (likeEl) likeEl.style.opacity = likeOpacity
    if (dislikeEl) dislikeEl.style.opacity = dislikeOpacity
    if (overlayLike) overlayLike.style.opacity = likeOpacity
    if (overlayDislike) overlayDislike.style.opacity = dislikeOpacity
  }

  const applyDrag = useCallback((dx, dy) => {
    if (!cardRef.current) return
    const rotate = dx * ROTATION_FACTOR
    cardRef.current.style.transform = `translate(${dx}px, ${dy * 0.4}px) rotate(${rotate}deg)`

    const ratio = Math.min(Math.abs(dx) / 80, 1)
    if (dx > 20) {
      setHintOpacity(ratio, 0)
    } else if (dx < -20) {
      setHintOpacity(0, ratio)
    } else {
      setHintOpacity(0, 0)
    }
  }, [])

  const resetCard = useCallback(() => {
    if (!cardRef.current) return
    cardRef.current.style.transition = 'transform 0.4s cubic-bezier(0.34,1.2,0.64,1)'
    cardRef.current.style.transform = 'translate(0,0) rotate(0deg)'
    setHintOpacity(0, 0)
    setTimeout(() => {
      if (cardRef.current) cardRef.current.style.transition = ''
    }, 400)
  }, [])

  // Exposed via ref so CardStack / buttons can trigger programmatically
  const flyOut = useCallback(
    (dir) => {
      if (!cardRef.current) return
      const x = dir === 'right' ? window.innerWidth * 1.5 : -window.innerWidth * 1.5
      cardRef.current.style.transition = 'transform 0.45s cubic-bezier(0.4,0,1,1)'
      cardRef.current.style.transform = `translate(${x}px, 0) rotate(${dir === 'right' ? 30 : -30}deg)`
      setTimeout(() => onSwipe(dir === 'right'), 420)
    },
    [onSwipe]
  )

  useImperativeHandle(ref, () => ({ flyOut }), [flyOut])

  // ── Pointer handlers ─────────────────────────────────────────────────

  const onPointerDown = useCallback(
    (e) => {
      if (!isTop) return
      startPos.current = getEventPos(e)
      dragDelta.current = { x: 0, y: 0 }
      if (cardRef.current) cardRef.current.style.transition = ''
    },
    [isTop]
  )

  const onPointerMove = useCallback(
    (e) => {
      if (!startPos.current || !isTop) return
      const pos = getEventPos(e)
      const dx = pos.x - startPos.current.x
      const dy = pos.y - startPos.current.y
      dragDelta.current = { x: dx, y: dy }
      applyDrag(dx, dy)
    },
    [isTop, applyDrag]
  )

  const onPointerUp = useCallback(() => {
    if (!startPos.current) return
    const { x: dx } = dragDelta.current
    startPos.current = null
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      flyOut(dx > 0 ? 'right' : 'left')
    } else {
      resetCard()
    }
  }, [flyOut, resetCard])

  // ── Stack positioning ────────────────────────────────────────────────

  const stackClass = [
    styles.card,
    isTop ? styles.isTop : stackIndex === 1 ? styles.isSecond : styles.isThird,
  ].join(' ')

  return (
    <div
      ref={cardRef}
      className={stackClass}
      onMouseDown={onPointerDown}
      onMouseMove={onPointerMove}
      onMouseUp={onPointerUp}
      onMouseLeave={onPointerUp}
      onTouchStart={onPointerDown}
      onTouchMove={onPointerMove}
      onTouchEnd={onPointerUp}
    >
      {/* Swipe colour overlays */}
      {isTop && (
        <>
          <div data-overlay="like" className={`${styles.overlay} ${styles.overlayLike}`} />
          <div data-overlay="dislike" className={`${styles.overlay} ${styles.overlayDislike}`} />
        </>
      )}

      {/* Skeleton shimmer while image loads */}
      {!loaded && <div className={styles.skeleton} />}

      <img
        src={url}
        alt="A cat"
        draggable={false}
        onLoad={() => setLoaded(true)}
        className={styles.img}
        style={{ opacity: loaded ? 1 : 0 }}
      />

      {/* Swipe hint labels — only rendered on top card */}
      {isTop && (
        <>
          <div data-hint="like" className={`${styles.hint} ${styles.hintLike}`}>
            LIKE ❤️
          </div>
          <div data-hint="dislike" className={`${styles.hint} ${styles.hintDislike}`}>
            😿 NOPE
          </div>
        </>
      )}
    </div>
  )
})

export default SwipeCard
