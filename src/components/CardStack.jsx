import { useEffect, useRef } from 'react'
import SwipeCard from './SwipeCard.jsx'
import styles from './CardStack.module.css'

const VISIBLE_COUNT = 3

export default function CardStack({ urls, index, onSwipe, onRegisterTrigger }) {
  const topCardRef = useRef(null)

  // Register a trigger function so App can fire swipes from buttons
  useEffect(() => {
    onRegisterTrigger((dir) => {
      if (topCardRef.current) {
        topCardRef.current.flyOut(dir)
      }
    })
  }, [onRegisterTrigger])

  // Compute which cards to render (back-to-front so top card is last in DOM)
  const slots = Array.from({ length: VISIBLE_COUNT }, (_, offset) => index + offset)
    .filter((i) => i < urls.length)
    .reverse()

  return (
    <div className={styles.area}>
      <div className={styles.stack}>
        {slots.length === 0 ? (
          <div className={styles.empty}>All done!</div>
        ) : (
          slots.map((cardIndex) => (
            <SwipeCard
              key={urls[cardIndex]}
              url={urls[cardIndex]}
              stackIndex={cardIndex - index}
              onSwipe={onSwipe}
              ref={cardIndex === index ? topCardRef : null}
            />
          ))
        )}
      </div>
    </div>
  )
}
