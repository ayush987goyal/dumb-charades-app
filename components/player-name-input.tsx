"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Clock, Film } from "lucide-react"
import type { GameConfig } from "@/lib/types"
import { CATEGORY_LABELS } from "@/lib/movies"

interface PlayerNameInputProps {
  onSubmit: (name: string) => void
  gameConfig: GameConfig
  currentTeam?: "A" | "B"
}

export function PlayerNameInput({ onSubmit, gameConfig, currentTeam }: PlayerNameInputProps) {
  const [name, setName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onSubmit(name.trim())
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    return `${minutes} minute${minutes !== 1 ? "s" : ""}`
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4">
      <Card className="w-full max-w-md border-2">
        <CardHeader className="text-center space-y-2 p-4 sm:p-6">
          <div className="flex justify-center mb-2">
            <div className="rounded-full bg-primary/10 p-3 sm:p-4">
              <User className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold">
            {currentTeam ? `Team ${currentTeam}'s Turn!` : "Your Turn!"}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">Pass the device to the next player</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
          {currentTeam && (
            <div
              className={`text-center py-3 rounded-lg font-bold text-lg ${
                currentTeam === "A"
                  ? "bg-blue-500/20 text-blue-600 border-2 border-blue-500"
                  : "bg-green-500/20 text-green-600 border-2 border-green-500"
              }`}
            >
              Team {currentTeam}
            </div>
          )}

          {/* Game Config Display */}
          <div className="bg-primary/5 rounded-lg p-3 sm:p-4 space-y-2 border border-primary/10">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
              <span className="font-medium">Time:</span>
              <span className="text-muted-foreground">{formatTime(gameConfig.timePerRound)}</span>
            </div>
            <div className="flex items-start gap-2 text-xs sm:text-sm">
              <Film className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-secondary mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="font-medium">Categories:</span>
                <div className="text-muted-foreground mt-1 flex flex-wrap gap-1 break-words">
                  {gameConfig.categories.map((cat, idx) => (
                    <span key={cat} className="inline">
                      {CATEGORY_LABELS[cat]}
                      {idx < gameConfig.categories.length - 1 && ","}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="playerName" className="text-sm sm:text-base">
                Enter Your Name
              </Label>
              <Input
                id="playerName"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 sm:h-12 text-sm sm:text-base"
                autoFocus
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full text-base sm:text-lg py-5 sm:py-6"
              disabled={!name.trim()}
            >
              Begin
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
