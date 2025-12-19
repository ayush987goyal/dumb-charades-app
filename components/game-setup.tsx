"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Film,
  Timer,
  Sparkles,
  Trash2,
  Users,
  Info,
  Settings,
  UserCircle,
  Clapperboard,
  Trophy,
  History,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { type MovieCategory, CATEGORY_LABELS } from "@/lib/movies"
import type { GameConfig } from "@/lib/types"
import { clearMovieHistory, getCompletedMovies } from "@/lib/storage"

interface GameSetupProps {
  onStartGame: (config: GameConfig) => void
}

const TIME_OPTIONS = [
  { label: "1 minute", value: 60 },
  { label: "2 minutes", value: 120 },
  { label: "3 minutes", value: 180 },
  { label: "5 minutes", value: 300 },
]

export function GameSetup({ onStartGame }: GameSetupProps) {
  const [timePerRound, setTimePerRound] = useState(120)
  const [selectedCategories, setSelectedCategories] = useState<MovieCategory[]>(["bollywood", "hollywood"])
  const [gameMode, setGameMode] = useState<"individual" | "team">("team")
  const [completedCount, setCompletedCount] = useState(getCompletedMovies().length)
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false)

  const handleCategoryToggle = (category: MovieCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleStart = () => {
    if (selectedCategories.length === 0) {
      alert("Please select at least one category")
      return
    }
    onStartGame({ timePerRound, categories: selectedCategories, gameMode })
  }

  const handleClearHistory = () => {
    if (
      confirm(
        "Are you sure you want to clear all movie history? Previously guessed movies will be able to appear again.",
      )
    ) {
      clearMovieHistory()
      setCompletedCount(0)
    }
  }

  const categories: MovieCategory[] = [
    "bollywood",
    "hollywood",
    "tollywood",
    "kollywood",
    "british",
    "french",
    "korean",
    "japanese",
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4">
      <Card className="w-full max-w-2xl border-2">
        <CardHeader className="text-center space-y-2 p-4 sm:p-6">
          <div className="flex justify-center mb-2">
            <div className="rounded-full bg-primary/10 p-3 sm:p-4">
              <Film className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl sm:text-4xl font-bold text-balance">Dumb Charades</CardTitle>
          <CardDescription className="text-base sm:text-lg">Configure game settings for all players</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 sm:space-y-8 p-4 sm:p-6">
          {/* Game Mode Selection */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
              <Label className="text-base sm:text-lg font-semibold">Game Mode</Label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={gameMode === "team" ? "default" : "outline"}
                onClick={() => setGameMode("team")}
                className="h-auto py-3 sm:py-4 text-sm sm:text-base"
              >
                Team Mode
              </Button>
              <Button
                variant={gameMode === "individual" ? "default" : "outline"}
                onClick={() => setGameMode("individual")}
                className="h-auto py-3 sm:py-4 text-sm sm:text-base"
              >
                Individual
              </Button>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {gameMode === "team"
                ? "Players alternate between Team A and Team B"
                : "Each player competes individually"}
            </p>
          </div>

          {/* Time Selection */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <Timer className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
              <Label className="text-base sm:text-lg font-semibold">Time Per Round</Label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
              {TIME_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  variant={timePerRound === option.value ? "default" : "outline"}
                  onClick={() => setTimePerRound(option.value)}
                  className="h-auto py-3 sm:py-4 text-sm sm:text-base"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Category Selection */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-secondary flex-shrink-0" />
              <Label className="text-base sm:text-lg font-semibold">Movie Categories</Label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {categories.map((category) => {
                const isChecked = selectedCategories.includes(category)
                return (
                  <label
                    key={category}
                    htmlFor={`category-${category}`}
                    className="flex items-center space-x-2 bg-card border rounded-lg p-2.5 sm:p-3 cursor-pointer hover:bg-accent transition-colors"
                  >
                    <div className="relative flex items-center justify-center flex-shrink-0">
                      <input
                        type="checkbox"
                        id={`category-${category}`}
                        checked={isChecked}
                        onChange={() => handleCategoryToggle(category)}
                        className="w-5 h-5 cursor-pointer accent-primary"
                      />
                    </div>
                    <span className="text-xs sm:text-sm font-medium leading-tight break-words">
                      {CATEGORY_LABELS[category]}
                    </span>
                  </label>
                )
              })}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Selected: {selectedCategories.length} {selectedCategories.length === 1 ? "category" : "categories"}
            </p>
          </div>

          {/* Clear History section */}
          {completedCount > 0 && (
            <div className="space-y-3 pt-2 border-t">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Movie History</Label>
                  <p className="text-xs text-muted-foreground">
                    {completedCount} {completedCount === 1 ? "movie" : "movies"} completed across all games
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={handleClearHistory} className="gap-2 bg-transparent">
                  <Trash2 className="h-4 w-4" />
                  Clear History
                </Button>
              </div>
            </div>
          )}

          {/* Start Button */}
          <Button
            size="lg"
            className="w-full text-base sm:text-lg py-5 sm:py-6"
            onClick={handleStart}
            disabled={selectedCategories.length === 0}
          >
            Continue to Player Entry
          </Button>

          {/* Instructions section */}
          <div className="space-y-3 pt-6 border-t-2 border-primary/10">
            <button
              onClick={() => setIsInstructionsOpen(!isInstructionsOpen)}
              className="w-full flex items-center justify-between gap-2 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Info className="h-5 w-5 text-primary flex-shrink-0" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">How to Play</h3>
              </div>
              {isInstructionsOpen ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </button>

            {isInstructionsOpen && (
              <div className="grid gap-4 pt-2">
                <div className="flex gap-3 p-3">
                  <div className="flex-shrink-0">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Settings className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm sm:text-base text-foreground">Game Setup (One Time)</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Configure the game mode, time per round, and movie categories. These settings apply to all
                      players.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 p-3">
                  <div className="flex-shrink-0">
                    <div className="rounded-full bg-secondary/10 p-2">
                      <UserCircle className="h-4 w-4 text-secondary" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm sm:text-base text-foreground">Player Turns</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Each player enters their name before their turn. In team mode, players alternate between Team A
                      and Team B. The timer starts immediately after clicking Begin. You'll hear a warning sound at 10
                      seconds remaining and a final sound when time is up.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 p-3">
                  <div className="flex-shrink-0">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Clapperboard className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm sm:text-base text-foreground">Acting Out Movies</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Act out the movie shown without speaking. Your team tries to guess it. Click{" "}
                      <strong className="text-foreground">Got It</strong> when guessed correctly (1 point) or{" "}
                      <strong className="text-foreground">Skip</strong> to pass (no points). Completed movies won't
                      repeat.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 p-3">
                  <div className="flex-shrink-0">
                    <div className="rounded-full bg-secondary/10 p-2">
                      <Trophy className="h-4 w-4 text-secondary" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm sm:text-base text-foreground">Scoring & Results</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      After time runs out, see your score, accuracy, and team standings. Pass the device to the next
                      player by clicking <strong className="text-foreground">Next Player</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 p-3">
                  <div className="flex-shrink-0">
                    <div className="rounded-full bg-primary/10 p-2">
                      <History className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm sm:text-base text-foreground">Movie History</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Completed movies are remembered across games. Use{" "}
                      <strong className="text-foreground">Clear History</strong> to reset and allow previously guessed
                      movies to appear again.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer credit with GitHub link */}
          <div className="text-center pt-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              Made with <span className="text-red-500 inline-block animate-pulse">♥</span> by{" "}
              <a
                href="https://github.com/ayush987goyal"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
              >
                Ayush Goyal
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
