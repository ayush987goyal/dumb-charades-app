import { bollywoodMovies } from "./bollywood"
import { hollywoodMovies } from "./hollywood"
import { southIndianMovies } from "./south-indian"
import { worldCinemaMovies } from "./world-cinema"

export type MovieCategory =
  | "bollywood"
  | "hollywood"
  | "southindian"
  | "world"

export const MOVIES_BY_CATEGORY: Record<MovieCategory, string[]> = {
  bollywood: bollywoodMovies,
  hollywood: hollywoodMovies,
  southindian: southIndianMovies,
  world: worldCinemaMovies,
}

export const CATEGORY_LABELS: Record<MovieCategory, string> = {
  bollywood: "Bollywood",
  hollywood: "Hollywood",
  southindian: "South Indian",
  world: "World Cinema",
}

export function getMoviesByCategories(categories: MovieCategory[]): string[] {
  const movies = new Set<string>()
  categories.forEach((category) => {
    MOVIES_BY_CATEGORY[category].forEach((movie) => movies.add(movie))
  })
  // A Set keeps a title that sits in two selected categories from being drawn twice as often.
  return [...movies]
}

export function getRandomMovie(movies: string[]): string {
  if (movies.length === 0) return ""
  return movies[Math.floor(Math.random() * movies.length)]
}
