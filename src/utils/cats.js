/**
 * Generates an array of unique Cataas image URLs.
 * The cache-busting param ensures each URL is distinct so React
 * treats every card as a separate image request.
 */
export function generateCatUrls(count) {
  const seed = Date.now()
  return Array.from(
    { length: count },
    (_, i) => `https://cataas.com/cat?v=${seed}_${i}`
  )
}
