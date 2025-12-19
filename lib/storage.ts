const MOVIES_HISTORY_KEY = "charades_completed_movies"

export function getCompletedMovies(): string[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(MOVIES_HISTORY_KEY)
  return data ? JSON.parse(data) : []
}

export function saveCompletedMovies(movieTitles: string[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(MOVIES_HISTORY_KEY, JSON.stringify(movieTitles))
  }
}

export function addCompletedMovies(movieTitles: string[]): void {
  const existing = getCompletedMovies()
  const updated = [...new Set([...existing, ...movieTitles])]
  saveCompletedMovies(updated)
}

export function clearMovieHistory(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(MOVIES_HISTORY_KEY)
  }
}
