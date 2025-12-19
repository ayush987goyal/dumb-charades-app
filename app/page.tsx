"use client"

import { useState, useEffect } from "react"
import { PlayerNameInput } from "@/components/player-name-input"
import { GameSetup } from "@/components/game-setup"
import { GamePlay } from "@/components/game-play"
import { GameResults } from "@/components/game-results"
import { getCompletedMovies, addCompletedMovies } from "@/lib/storage"
import type { GameConfig, Player } from "@/lib/types"

type GameScreen = "setup" | "playerEntry" | "playing" | "results"

export default function Home() {
  const [screen, setScreen] = useState<GameScreen>("setup")
  const [playerName, setPlayerName] = useState<string>("")
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(null)
  const [gameResults, setGameResults] = useState<{
    score: number
    skipped: number
    total: number
  } | null>(null)
  const [globalCompletedMovieTitles, setGlobalCompletedMovieTitles] = useState<Set<string>>(new Set())
  const [sessionPlayers, setSessionPlayers] = useState<Player[]>([])
  const [currentTeam, setCurrentTeam] = useState<"A" | "B">("A")

  useEffect(() => {
    const completed = getCompletedMovies()
    setGlobalCompletedMovieTitles(new Set(completed))
  }, [])

  const handleStartGame = (config: GameConfig) => {
    setGameConfig(config)
    setCurrentTeam("A")
    setScreen("playerEntry")
  }

  const handlePlayerNameSubmit = (name: string) => {
    setPlayerName(name)
    setScreen("playing")
  }

  const handleGameEnd = (score: number, skipped: number, total: number, completedMovieTitles: Set<string>) => {
    setGameResults({ score, skipped, total })

    const accuracy = total > 0 ? Math.round((score / total) * 100) : 0
    const newPlayer: Player = {
      name: playerName,
      team: gameConfig?.gameMode === "team" ? currentTeam : undefined,
      score,
      skipped,
      total,
      accuracy,
    }
    setSessionPlayers((prev) => [...prev, newPlayer])

    const newCompletedTitles = Array.from(completedMovieTitles)
    addCompletedMovies(newCompletedTitles)
    setGlobalCompletedMovieTitles((prev) => new Set([...prev, ...completedMovieTitles]))
    setScreen("results")
  }

  const handleNextPlayer = () => {
    setPlayerName("")
    setGameResults(null)
    if (gameConfig?.gameMode === "team") {
      setCurrentTeam((prev) => (prev === "A" ? "B" : "A"))
    }
    setScreen("playerEntry")
  }

  const handleNewGame = () => {
    if (confirm("Start a new game? This will reset all current scores and return to game setup.")) {
      setSessionPlayers([])
      setPlayerName("")
      setGameConfig(null)
      setGameResults(null)
      setCurrentTeam("A")
      setScreen("setup")
    }
  }

  return (
    <main className="min-h-screen">
      {screen === "setup" && <GameSetup onStartGame={handleStartGame} />}
      {screen === "playerEntry" && gameConfig && (
        <PlayerNameInput
          onSubmit={handlePlayerNameSubmit}
          gameConfig={gameConfig}
          currentTeam={gameConfig.gameMode === "team" ? currentTeam : undefined}
        />
      )}
      {screen === "playing" && gameConfig && (
        <GamePlay
          config={gameConfig}
          onGameEnd={handleGameEnd}
          globalCompletedMovieTitles={globalCompletedMovieTitles}
        />
      )}
      {screen === "results" && gameResults && gameConfig && (
        <GameResults
          playerName={playerName}
          score={gameResults.score}
          skipped={gameResults.skipped}
          total={gameResults.total}
          allPlayers={sessionPlayers}
          gameMode={gameConfig.gameMode}
          onNextPlayer={handleNextPlayer}
          onNewGame={handleNewGame}
        />
      )}
    </main>
  )
}
