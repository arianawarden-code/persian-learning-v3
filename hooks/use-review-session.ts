"use client"

import { useState, useCallback } from "react"
import type { SRSCard } from "@/lib/srs-storage"
import { updateCardAfterReview, getAllCards } from "@/lib/srs-storage"

export type ExerciseMode = "flashcard" | "multiple-choice" | "typing"
export type SessionState = "idle" | "active" | "complete"

export interface Exercise {
  word: SRSCard
  mode: ExerciseMode
  index: number
  options?: string[] // for multiple-choice
}

export interface SessionStats {
  correct: number
  total: number
  wrongWords: SRSCard[]
}

const MODES: ExerciseMode[] = ["flashcard", "multiple-choice", "typing"]

function generateOptions(word: SRSCard, allCards: SRSCard[]): string[] {
  const correct = word.english
  const others = allCards
    .filter((c) => c.persian !== word.persian)
    .map((c) => c.english)

  // Shuffle and pick 3 distractors
  const shuffled = [...others].sort(() => Math.random() - 0.5)
  const distractors = shuffled.slice(0, 3)

  // If we don't have enough distractors, pad with what we have
  while (distractors.length < 3) {
    distractors.push(`(no option)`)
  }

  const options = [correct, ...distractors]
  return options.sort(() => Math.random() - 0.5)
}

export function useReviewSession() {
  const [sessionState, setSessionState] = useState<SessionState>("idle")
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [stats, setStats] = useState<SessionStats>({
    correct: 0,
    total: 0,
    wrongWords: [],
  })

  const startSession = useCallback((words: SRSCard[]) => {
    const allCards = getAllCards()
    const exs: Exercise[] = words.map((word, i) => {
      const mode = MODES[i % MODES.length]
      const exercise: Exercise = { word, mode, index: i }
      if (mode === "multiple-choice") {
        exercise.options = generateOptions(word, allCards)
      }
      return exercise
    })

    setExercises(exs)
    setCurrentIndex(0)
    setStats({ correct: 0, total: 0, wrongWords: [] })
    setSessionState("active")
  }, [])

  const submitAnswer = useCallback(
    (quality: number) => {
      const current = exercises[currentIndex]
      if (!current) return

      updateCardAfterReview(current.word.persian, quality)

      const isCorrect = quality >= 3
      setStats((prev) => ({
        correct: prev.correct + (isCorrect ? 1 : 0),
        total: prev.total + 1,
        wrongWords: isCorrect
          ? prev.wrongWords
          : [...prev.wrongWords, current.word],
      }))

      if (currentIndex + 1 >= exercises.length) {
        setSessionState("complete")
      } else {
        setCurrentIndex((prev) => prev + 1)
      }
    },
    [exercises, currentIndex],
  )

  const currentExercise = exercises[currentIndex] || null

  return {
    sessionState,
    currentExercise,
    sessionStats: stats,
    totalExercises: exercises.length,
    startSession,
    submitAnswer,
    resetSession: () => setSessionState("idle"),
  }
}
