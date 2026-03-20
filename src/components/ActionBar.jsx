import styles from './ActionBar.module.css'

export default function ActionBar({ onLike, onDislike }) {
  return (
    <div className={styles.bar}>
      <button
        className={`${styles.btn} ${styles.btnDislike}`}
        onClick={onDislike}
        aria-label="Dislike"
      >
        😿
      </button>

      <button
        className={`${styles.btn} ${styles.btnLike}`}
        onClick={onLike}
        aria-label="Like"
      >
        ❤️
      </button>
    </div>
  )
}
