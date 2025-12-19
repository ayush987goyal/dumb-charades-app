import { bollywoodMovies } from "./bollywood"
import { hollywoodMovies } from "./hollywood"
import { tollywoodMovies } from "./tollywood"
import { kollywoodMovies } from "./kollywood"
import { britishMovies } from "./british"
import { frenchMovies } from "./french"
import { koreanMovies } from "./korean"
import { japaneseMovies } from "./japanese"

export type MovieCategory =
  | "bollywood"
  | "hollywood"
  | "tollywood"
  | "kollywood"
  | "british"
  | "french"
  | "korean"
  | "japanese"

export const MOVIES_BY_CATEGORY: Record<MovieCategory, string[]> = {
  bollywood: bollywoodMovies,
  hollywood: hollywoodMovies,
  tollywood: tollywoodMovies,
  kollywood: kollywoodMovies,
  british: britishMovies,
  french: frenchMovies,
  korean: koreanMovies,
  japanese: japaneseMovies,
}

export const CATEGORY_LABELS: Record<MovieCategory, string> = {
  bollywood: "Bollywood",
  hollywood: "Hollywood",
  tollywood: "Tollywood",
  kollywood: "Kollywood",
  british: "British",
  french: "French",
  korean: "Korean",
  japanese: "Japanese",
}

export function getMoviesByCategories(categories: MovieCategory[]): string[] {
  const movies: string[] = []
  categories.forEach((category) => {
    movies.push(...MOVIES_BY_CATEGORY[category])
  })
  return movies
}

export function getRandomMovie(movies: string[]): string {
  if (movies.length === 0) return ""
  return movies[Math.floor(Math.random() * movies.length)]
}
