import type { MovieCategory } from "./movies"

export interface Player {
  name: string
  team?: "A" | "B"
  score: number
  skipped: number
  total: number
  accuracy: number
}

export interface GameConfig {
  timePerRound: number
  categories: MovieCategory[]
  gameMode: "individual" | "team"
}

export interface GameState {
  config: GameConfig
  currentMovieIndex: number
  score: number
  skipped: number
  timeRemaining: number
  isPlaying: boolean
  availableMovies: string[] // Now stores movie titles instead of IDs
  usedMovies: string[] // Now stores movie titles instead of IDs
}
