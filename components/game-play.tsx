"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { SkipForward, Check, Trophy } from "lucide-react"
import type { GameConfig } from "@/lib/types"
import { getMoviesByCategories, getRandomMovie } from "@/lib/movies"
import useSound from "use-sound"

interface GamePlayProps {
  config: GameConfig
  onGameEnd: (score: number, skipped: number, total: number, completedMovieTitles: Set<string>) => void
  globalCompletedMovieTitles: Set<string>
}

export function GamePlay({ config, onGameEnd, globalCompletedMovieTitles }: GamePlayProps) {
  const [availableMovies, setAvailableMovies] = useState<string[]>([])
  const [currentMovie, setCurrentMovie] = useState<string>("")
  const [completedMovieTitles, setCompletedMovieTitles] = useState<Set<string>>(new Set())
  const [shownInThisTurn, setShownInThisTurn] = useState<Set<string>>(new Set())
  const [score, setScore] = useState(0)
  const [skipped, setSkipped] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(config.timePerRound)
  const [isActive, setIsActive] = useState(true)
  const warningPlayedRef = useRef(false)
  const finalPlayedRef = useRef(false)

  const [playWarning] = useSound("/warning.mp3")
  const [playFinish] = useSound("/finish.mp3")

  useEffect(() => {
    const movies = getMoviesByCategories(config.categories)
    setAvailableMovies(movies)
    if (movies.length > 0) {
      const unusedMovies = movies.filter((movie) => !globalCompletedMovieTitles.has(movie))
      const firstMovie = getRandomMovie(unusedMovies.length > 0 ? unusedMovies : movies)
      setCurrentMovie(firstMovie)
      setShownInThisTurn(new Set([firstMovie]))
    }
  }, [config.categories, globalCompletedMovieTitles])

  useEffect(() => {
    if (!isActive || timeRemaining <= 0) return

    if (timeRemaining === 10 && !warningPlayedRef.current) {
      playWarning()
      warningPlayedRef.current = true
    }

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, timeRemaining, playWarning])

  useEffect(() => {
    if (!isActive && timeRemaining === 0 && !finalPlayedRef.current) {
      finalPlayedRef.current = true
      playFinish()

      setTimeout(() => {
        onGameEnd(score, skipped, score + skipped, completedMovieTitles)
      }, 600)
    }
  }, [isActive, timeRemaining, score, skipped, completedMovieTitles, onGameEnd, playFinish])

  const getNextMovie = useCallback(() => {
    const excludedTitles = new Set([...globalCompletedMovieTitles, ...shownInThisTurn])
    const unusedMovies = availableMovies.filter((movie) => !excludedTitles.has(movie))

    if (unusedMovies.length === 0) {
      const availableForRepeat = availableMovies.filter((movie) => !globalCompletedMovieTitles.has(movie))
      const newMovie = getRandomMovie(availableForRepeat.length > 0 ? availableForRepeat : availableMovies)
      setCurrentMovie(newMovie)
      setShownInThisTurn((prev) => new Set([...prev, newMovie]))
    } else {
      const newMovie = getRandomMovie(unusedMovies)
      setCurrentMovie(newMovie)
      setShownInThisTurn((prev) => new Set([...prev, newMovie]))
    }
  }, [availableMovies, globalCompletedMovieTitles, shownInThisTurn])

  const handleNext = useCallback(() => {
    setScore((prev) => prev + 1)
    if (currentMovie) {
      setCompletedMovieTitles((prev) => new Set([...prev, currentMovie]))
    }
    getNextMovie()
  }, [getNextMovie, currentMovie])

  const handleSkip = useCallback(() => {
    setSkipped((prev) => prev + 1)
    getNextMovie()
  }, [getNextMovie])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progressPercentage = ((config.timePerRound - timeRemaining) / config.timePerRound) * 100

  if (!currentMovie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading movies...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4">
      <Card className="w-full max-w-3xl border-2">
        <CardContent className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 md:space-y-8">
          {/* Timer Section */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">Time Remaining</span>
              <span
                className={`text-2xl sm:text-3xl font-bold tabular-nums ${
                  timeRemaining <= 10 ? "text-destructive animate-pulse" : "text-foreground"
                }`}
              >
                {formatTime(timeRemaining)}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2 sm:h-3" />
          </div>

          {/* Score Display */}
          <div className="flex justify-center gap-6 sm:gap-8">
            <div className="flex items-center gap-2">
              <SkipForward className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground flex-shrink-0" />
              <div className="text-left">
                <p className="text-xs sm:text-sm text-muted-foreground">Skipped</p>
                <p className="text-2xl sm:text-3xl font-bold tabular-nums">{skipped}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
              <div className="text-left">
                <p className="text-xs sm:text-sm text-muted-foreground">Score</p>
                <p className="text-2xl sm:text-3xl font-bold text-primary tabular-nums">{score}</p>
              </div>
            </div>
          </div>

          {/* Movie Display */}
          <div className="bg-primary/10 rounded-xl p-6 sm:p-8 md:p-12 text-center border-2 border-primary/20">
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary text-balance leading-tight break-words">
              {currentMovie}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <Button
              size="lg"
              variant="outline"
              onClick={handleSkip}
              disabled={timeRemaining === 0}
              className="h-16 sm:h-20 text-base sm:text-xl gap-2 border-2 bg-transparent"
            >
              <SkipForward className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="hidden xs:inline">Skip</span>
              <span className="xs:hidden">Skip</span>
            </Button>
            <Button
              size="lg"
              onClick={handleNext}
              disabled={timeRemaining === 0}
              className="h-16 sm:h-20 text-base sm:text-xl gap-2"
            >
              <Check className="h-5 w-5 sm:h-6 sm:w-6" />
              Got It!
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
