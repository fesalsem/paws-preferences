import styles from './Header.module.css'

export default function Header({ current, total }) {
  const progress = ((current - 1) / total) * 100

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        Whiskr <span>🐾</span>
      </h1>
      <div className={styles.progressWrap}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>
      <p className={styles.counter}>
        {current} of {total}
      </p>
    </header>
  )
}
