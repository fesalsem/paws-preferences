import { useState, useCallback } from 'react'
import CardStack from './components/CardStack.jsx'
import Summary from './components/Summary.jsx'
import Header from './components/Header.jsx'
import ActionBar from './components/ActionBar.jsx'
import { generateCatUrls } from './utils/cats.js'
import styles from './App.module.css'

const TOTAL = 15

export default function App() {
  const [urls] = useState(() => generateCatUrls(TOTAL))
  const [index, setIndex] = useState(0)
  const [liked, setLiked] = useState([])
  const [done, setDone] = useState(false)
  // We use a ref-based callback so CardStack can expose a flyOut trigger
  const [swipeTrigger, setSwipeTrigger] = useState(null)

  const handleSwipe = useCallback(
    (isLike) => {
      const currentUrl = urls[index]
      if (isLike) setLiked((prev) => [...prev, currentUrl])
      const next = index + 1
      if (next >= TOTAL) {
        setTimeout(() => setDone(true), 100)
      } else {
        setIndex(next)
      }
    },
    [index, urls]
  )

  const handleButtonSwipe = useCallback(
    (dir) => {
      if (swipeTrigger) swipeTrigger(dir)
    },
    [swipeTrigger]
  )

  const handleRestart = () => {
    setIndex(0)
    setLiked([])
    setDone(false)
  }

  if (done) {
    return <Summary liked={liked} total={TOTAL} onRestart={handleRestart} />
  }

  return (
    <div className={styles.app}>
      <Header current={index + 1} total={TOTAL} />

      <CardStack
        urls={urls}
        index={index}
        onSwipe={handleSwipe}
        onRegisterTrigger={setSwipeTrigger}
      />

      <p className={styles.tip}>← swipe to decide →</p>

      <ActionBar onLike={() => handleButtonSwipe('right')} onDislike={() => handleButtonSwipe('left')} />
    </div>
  )
}
