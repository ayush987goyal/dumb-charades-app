"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { SkipForward, Check, Trophy, Undo2 } from "lucide-react"
import type { GameConfig } from "@/lib/types"
import { getMoviesByCategories, getRandomMovie } from "@/lib/movies"
import { triggerHaptic, requestScreenWakeLock } from "@/lib/haptics"
import { countWords } from "@/lib/word-count"
import useSound from "use-sound"

interface GamePlayProps {
  config: GameConfig
  onGameEnd: (score: number, skipped: number, total: number, completedMovieTitles: Set<string>) => void
  globalCompletedMovieTitles: Set<string>
}

// One Got It / Skip tap during the current turn, kept so it can be undone.
type TurnAction = {
  movie: string
  result: "got" | "skip"
  // The card drawn to replace `movie`; returned to the deck on undo.
  replacedBy: string
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
  const [actions, setActions] = useState<TurnAction[]>([])
  const warningPlayedRef = useRef(false)
  const finalPlayedRef = useRef(false)

  const [playWarning] = useSound("/warning.mp3")
  const [playFinish] = useSound("/finish.mp3")

  useEffect(() => {
    let wakeLock: WakeLockSentinel | null = null
    requestScreenWakeLock().then((sentinel) => {
      wakeLock = sentinel
    })
    return () => {
      wakeLock?.release().catch(() => {})
    }
  }, [])

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

    if (timeRemaining <= 10) {
      triggerHaptic("warning")
    }

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
      triggerHaptic("finish")
      playFinish()

      setTimeout(() => {
        onGameEnd(score, skipped, score + skipped, completedMovieTitles)
      }, 600)
    }
  }, [isActive, timeRemaining, score, skipped, completedMovieTitles, onGameEnd, playFinish])

  const getNextMovie = useCallback((): string => {
    const excludedTitles = new Set([...globalCompletedMovieTitles, ...shownInThisTurn])
    const unusedMovies = availableMovies.filter((movie) => !excludedTitles.has(movie))

    let newMovie: string
    if (unusedMovies.length === 0) {
      const availableForRepeat = availableMovies.filter((movie) => !globalCompletedMovieTitles.has(movie))
      newMovie = getRandomMovie(availableForRepeat.length > 0 ? availableForRepeat : availableMovies)
    } else {
      newMovie = getRandomMovie(unusedMovies)
    }
    setCurrentMovie(newMovie)
    setShownInThisTurn((prev) => new Set([...prev, newMovie]))
    return newMovie
  }, [availableMovies, globalCompletedMovieTitles, shownInThisTurn])

  const recordAndAdvance = useCallback(
    (result: TurnAction["result"]) => {
      if (!currentMovie) return
      const movie = currentMovie
      setCompletedMovieTitles((prev) => new Set([...prev, movie]))
      const replacedBy = getNextMovie()
      setActions((prev) => [...prev, { movie, result, replacedBy }])
    },
    [currentMovie, getNextMovie],
  )

  const handleNext = useCallback(() => {
    triggerHaptic("success")
    setScore((prev) => prev + 1)
    recordAndAdvance("got")
  }, [recordAndAdvance])

  const handleSkip = useCallback(() => {
    triggerHaptic("skip")
    setSkipped((prev) => prev + 1)
    recordAndAdvance("skip")
  }, [recordAndAdvance])

  const handleUndo = useCallback(() => {
    const last = actions[actions.length - 1]
    if (!last || timeRemaining === 0) return
    triggerHaptic("light")
    setActions((prev) => prev.slice(0, -1))
    if (last.result === "got") {
      setScore((prev) => Math.max(0, prev - 1))
    } else {
      setSkipped((prev) => Math.max(0, prev - 1))
    }
    setCompletedMovieTitles((prev) => {
      const next = new Set(prev)
      next.delete(last.movie)
      return next
    })
    // Return the card that replaced it to the deck so it can be drawn again later
    if (last.replacedBy !== last.movie) {
      setShownInThisTurn((prev) => {
        const next = new Set(prev)
        next.delete(last.replacedBy)
        return next
      })
    }
    setCurrentMovie(last.movie)
  }, [actions, timeRemaining])

  const lastAction = actions[actions.length - 1]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progressPercentage = ((config.timePerRound - timeRemaining) / config.timePerRound) * 100
  const wordCount = currentMovie ? countWords(currentMovie) : 0

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
          <div className="bg-primary/10 rounded-xl p-6 sm:p-8 md:p-12 text-center border-2 border-primary/20 space-y-3 sm:space-y-4">
            <div className="inline-flex items-center rounded-full bg-primary/15 px-3 py-1 text-xs sm:text-sm font-semibold text-primary tracking-wide uppercase">
              {wordCount} {wordCount === 1 ? "Word" : "Words"}
            </div>
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

          {/* Undo last action (this turn only) */}
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleUndo}
              disabled={!lastAction || timeRemaining === 0}
              aria-label="Undo last action"
              className="gap-1.5 text-muted-foreground max-w-full"
            >
              <Undo2 className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">
                {lastAction && timeRemaining > 0
                  ? `Undo "${lastAction.result === "got" ? "Got It" : "Skip"}" · ${lastAction.movie}`
                  : "Undo"}
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
