"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, SkipForward, Film, RotateCcw, UserPlus } from "lucide-react"
import type { Player } from "@/lib/types"

interface GameResultsProps {
  playerName: string
  score: number
  skipped: number
  total: number
  allPlayers: Player[]
  gameMode: "individual" | "team"
  onNextPlayer: () => void
  onNewGame: () => void
}

export function GameResults({
  playerName,
  score,
  skipped,
  total,
  allPlayers,
  gameMode,
  onNextPlayer,
  onNewGame,
}: GameResultsProps) {
  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0

  const getMessage = () => {
    if (accuracy >= 80) return "Outstanding Performance!"
    if (accuracy >= 60) return "Great Job!"
    if (accuracy >= 40) return "Good Effort!"
    return "Keep Practicing!"
  }

  const sortedPlayers = [...allPlayers].sort((a, b) => b.score - a.score)

  const teamScores =
    gameMode === "team"
      ? {
          A: allPlayers.filter((p) => p.team === "A").reduce((sum, p) => sum + p.score, 0),
          B: allPlayers.filter((p) => p.team === "B").reduce((sum, p) => sum + p.score, 0),
        }
      : null

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-8">
      <Card className="w-full max-w-2xl border-2">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <div className="rounded-full bg-primary/10 p-4">
              <Trophy className="h-12 w-12 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl md:text-4xl font-bold text-balance">{playerName}'s Results</CardTitle>
          <CardDescription className="text-lg md:text-xl">{getMessage()}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            <div className="bg-primary/10 rounded-xl p-4 md:p-6 text-center border border-primary/20">
              <Trophy className="h-6 w-6 md:h-8 md:w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl md:text-3xl font-bold text-primary">{score}</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">Correct</p>
            </div>
            <div className="bg-card rounded-xl p-4 md:p-6 text-center border">
              <SkipForward className="h-6 w-6 md:h-8 md:w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-2xl md:text-3xl font-bold">{skipped}</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">Skipped</p>
            </div>
            <div className="bg-secondary/10 rounded-xl p-4 md:p-6 text-center border border-secondary/20">
              <Film className="h-6 w-6 md:h-8 md:w-8 text-secondary mx-auto mb-2" />
              <p className="text-2xl md:text-3xl font-bold text-secondary">{total}</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">Total</p>
            </div>
          </div>

          {/* Accuracy */}
          <div className="bg-card rounded-xl p-4 md:p-6 text-center border">
            <p className="text-sm text-muted-foreground mb-2">Accuracy</p>
            <p className="text-4xl md:text-5xl font-bold text-primary">{accuracy}%</p>
          </div>

          {/* Team Leaderboard for team mode */}
          {gameMode === "team" && teamScores && allPlayers.length > 0 && (
            <div className="bg-card rounded-xl p-4 md:p-6 border">
              <h3 className="text-lg font-semibold mb-4 text-center">Team Scores</h3>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`p-4 rounded-lg text-center border-2 ${
                    teamScores.A > teamScores.B
                      ? "bg-blue-500/20 border-blue-500"
                      : teamScores.A === teamScores.B
                        ? "bg-blue-500/10 border-blue-400"
                        : "bg-blue-500/5 border-blue-300"
                  }`}
                >
                  <p className="text-sm font-medium text-blue-600 mb-1">Team A</p>
                  <p className="text-3xl font-bold text-blue-700">{teamScores.A}</p>
                  {teamScores.A > teamScores.B && <p className="text-xs text-blue-600 mt-1">🏆 Leading!</p>}
                </div>
                <div
                  className={`p-4 rounded-lg text-center border-2 ${
                    teamScores.B > teamScores.A
                      ? "bg-green-500/20 border-green-500"
                      : teamScores.B === teamScores.A
                        ? "bg-green-500/10 border-green-400"
                        : "bg-green-500/5 border-green-300"
                  }`}
                >
                  <p className="text-sm font-medium text-green-600 mb-1">Team B</p>
                  <p className="text-3xl font-bold text-green-700">{teamScores.B}</p>
                  {teamScores.B > teamScores.A && <p className="text-xs text-green-600 mt-1">🏆 Leading!</p>}
                </div>
              </div>
            </div>
          )}

          {sortedPlayers.length > 0 && (
            <div className="bg-card rounded-xl p-4 md:p-6 border">
              <h3 className="text-lg font-semibold mb-4 text-center">
                {gameMode === "team" ? "Player Scores" : "Game Leaderboard"}
              </h3>
              <div className="space-y-2">
                {sortedPlayers.map((player, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      player.name === playerName ? "bg-primary/10 border border-primary/20" : "bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          gameMode === "individual"
                            ? index === 0
                              ? "bg-yellow-500 text-yellow-950"
                              : index === 1
                                ? "bg-gray-400 text-gray-900"
                                : index === 2
                                  ? "bg-orange-600 text-orange-50"
                                  : "bg-muted text-muted-foreground"
                            : player.team === "A"
                              ? "bg-blue-500 text-white"
                              : "bg-green-500 text-white"
                        }`}
                      >
                        {gameMode === "individual" ? index + 1 : player.team}
                      </div>
                      <div>
                        <p className="font-semibold text-sm md:text-base break-words">{player.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {player.total} movies • {player.accuracy}% accuracy
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl md:text-2xl font-bold text-primary">{player.score}</p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button size="lg" onClick={onNextPlayer} className="w-full h-12 md:h-14 text-sm md:text-base gap-2">
              <UserPlus className="h-4 w-4 md:h-5 md:w-5" />
              Next Player
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onNewGame}
              className="w-full h-12 md:h-14 text-sm md:text-base gap-2 bg-transparent"
            >
              <RotateCcw className="h-4 w-4 md:h-5 md:w-5" />
              New Game
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
