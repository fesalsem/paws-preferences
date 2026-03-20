import styles from './Summary.module.css'

export default function Summary({ liked, total, onRestart }) {
  return (
    <div className={styles.summary}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Your <em>purr-fect</em>
          <br />
          picks 🐾
        </h2>
        <div className={styles.stats}>
          <span className={`${styles.pill} ${styles.pillLiked}`}>❤️ {liked.length} liked</span>
          <span className={`${styles.pill} ${styles.pillTotal}`}>{total} cats seen</span>
        </div>
      </div>

      <div className={styles.scroll}>
        {liked.length === 0 ? (
          <div className={styles.noLikes}>
            <p>No favourites this time...</p>
            <p className={styles.noLikesSub}>Try again — the cats miss you.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {liked.map((url, i) => (
              <div
                className={styles.thumb}
                key={i}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <img src={url} alt={`Liked cat ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        )}
      </div>

      <button className={styles.restartBtn} onClick={onRestart}>
        Meet more cats →
      </button>
    </div>
  )
}
