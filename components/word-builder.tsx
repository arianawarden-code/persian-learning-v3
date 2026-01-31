"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface WordBuilderProps {
  targetWord: string
  targetWordTransliteration: string
  availableLetters: string[]
  instruction: string
  moduleId: string | number
  exerciseId: string
  totalExercises: number
  currentExerciseIndex: number
}

export function WordBuilder({
  targetWord,
  targetWordTransliteration,
  availableLetters,
  instruction,
  moduleId,
  exerciseId,
  totalExercises,
  currentExerciseIndex,
}: WordBuilderProps) {
  const router = useRouter()
  const [availablePool, setAvailablePool] = useState<{ letter: string; id: number }[]>(
    availableLetters.map((letter, idx) => ({ letter, id: idx })),
  )
  const [answerSlots, setAnswerSlots] = useState<{ letter: string; id: number }[]>([])
  const [draggedItem, setDraggedItem] = useState<{
    letter: string
    id: number
    sourceIndex?: number // position in answerSlots when dragging from answer area (undefined when from available pool)
    targetIndex?: number // position being dragged over in answerSlots for insertion
  } | null>(null)
  const [feedback, setFeedback] = useState<string>("")
  const [isCompleted, setIsCompleted] = useState(false)

  // Capture the dragged item and its source position (if from answer slots)
  const handleDragStart = (item: { letter: string; id: number }, sourceIndex?: number) => {
    setDraggedItem({ ...item, sourceIndex })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDropToAnswer = (e: React.DragEvent) => {
    e.preventDefault()
    if (draggedItem) {
      const isAlreadyInAnswer = answerSlots.some((item) => item.id === draggedItem.id)
      
      if (isAlreadyInAnswer) {
        // Reordering within answer slots: remove from old position and insert at target position
        const filtered = answerSlots.filter((item) => item.id !== draggedItem.id)
        const insertIndex = draggedItem.targetIndex !== undefined ? draggedItem.targetIndex : filtered.length
        setAnswerSlots([
          ...filtered.slice(0, insertIndex),
          { letter: draggedItem.letter, id: draggedItem.id },
          ...filtered.slice(insertIndex)
        ])
      } else {
        // Moving from available pool: insert at target position in answer slots
        const insertIndex = draggedItem.targetIndex !== undefined ? draggedItem.targetIndex : answerSlots.length
        setAnswerSlots([
          ...answerSlots.slice(0, insertIndex),
          { letter: draggedItem.letter, id: draggedItem.id },
          ...answerSlots.slice(insertIndex)
        ])
        // Remove from available pool
        setAvailablePool(availablePool.filter((item) => item.id !== draggedItem.id))
      }
      setDraggedItem(null)
      setFeedback("")
    }
  }

  const handleDropToAvailable = (e: React.DragEvent) => {
    e.preventDefault()
    if (draggedItem && answerSlots.some((item) => item.id === draggedItem.id)) {
      setAvailablePool([...availablePool, draggedItem])
      setAnswerSlots(answerSlots.filter((item) => item.id !== draggedItem.id))
      setDraggedItem(null)
      setFeedback("")
    }
  }

  const handleRemoveLetter = (item: { letter: string; id: number }) => {
    setAnswerSlots(answerSlots.filter((slot) => slot.id !== item.id))
    setAvailablePool([...availablePool, item])
    setFeedback("")
  }

  const handleReset = () => {
    setAvailablePool(availableLetters.map((letter, idx) => ({ letter, id: idx })))
    setAnswerSlots([])
    setFeedback("")
  }

  const handleCheck = () => {
    const userWord = answerSlots.map((slot) => slot.letter).join("")
    if (userWord === targetWord) {
      setFeedback("correct")
      setIsCompleted(true)
      if (typeof window !== "undefined") {
        const key = "writing-progress"
        const stored = localStorage.getItem(key)
        const progress = stored ? JSON.parse(stored) : {}
        const moduleKey = String(moduleId)
        if (!progress[moduleKey]) {
          progress[moduleKey] = {}
        }
        progress[moduleKey][exerciseId] = true
        localStorage.setItem(key, JSON.stringify(progress))
        console.log("[v0] Writing exercise completed:", { moduleId: moduleKey, exerciseId, progress })
      }
    } else {
      setFeedback("incorrect")
    }
  }

  const checkAllExercisesComplete = () => {
    if (typeof window === "undefined") return false
    const key = "writing-progress"
    const stored = localStorage.getItem(key)
    if (!stored) return false
    const progress = JSON.parse(stored)
    const moduleKey = String(moduleId)
    const moduleProgress = progress[moduleKey] || {}
    const completedCount = Object.values(moduleProgress).filter(Boolean).length
    console.log("[v0] Checking all exercises complete:", { moduleId: moduleKey, completedCount, totalExercises })
    return completedCount === totalExercises
  }

  const allExercisesComplete = isCompleted && checkAllExercisesComplete()

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">Build Word</span>
      </div>
      <h3 className="mb-4 text-lg font-semibold text-charcoal">{instruction}</h3>

      <div className="mb-6 rounded-lg bg-sand-50 p-4">
        <p className="mb-2 text-sm text-charcoal">Target word:</p>
        <p className="font-serif text-3xl font-bold text-terracotta">{targetWord}</p>
        <p className="text-lg text-charcoal/70">{targetWordTransliteration}</p>
      </div>

      {/* Available Letters Pool */}
      <div>
        <p className="mb-3 text-sm font-medium text-charcoal">Available letters:</p>
        <div
          className="flex min-h-20 flex-wrap gap-2 rounded-lg border-2 border-sand-200 bg-white p-4"
          onDragOver={handleDragOver}
          onDrop={handleDropToAvailable}
        >
          {availablePool.length === 0 ? (
            <p className="w-full text-center text-sm text-charcoal/40">All letters used</p>
          ) : (
            availablePool.map((item) => (
              <button
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(item)}
                className="flex h-14 w-14 cursor-grab items-center justify-center rounded-lg border-2 border-sand-200 bg-white font-serif text-2xl font-bold text-terracotta transition-all hover:border-terracotta hover:shadow-md active:cursor-grabbing"
              >
                {item.letter}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Answer Drop Zone */}
      <div className="mt-6">
        <p className="mb-2 text-sm font-medium text-charcoal">Your answer:</p>
        <div
          className="min-h-20 rounded-lg border-2 border-dashed border-sand-200 bg-cream/30 p-4"
          onDragOver={handleDragOver}
          onDrop={handleDropToAnswer}
        >
          {answerSlots.length === 0 ? (
            <p className="text-center font-serif text-3xl text-charcoal/30">Drop letters here</p>
          ) : (
            <div className="flex flex-wrap gap-2" dir="rtl">
              {answerSlots.map((item, index) => (
                <button
                  key={item.id}
                  draggable
                  // Capture source position when drag starts
                  onDragStart={() => handleDragStart(item, index)}
                  // Update target position as item is dragged over different positions
                  onDragOver={(e) => {
                    e.preventDefault()
                    setDraggedItem(prev => prev ? { ...prev, targetIndex: index } : null)
                  }}
                  // Clear target position when leaving without dropping
                  onDragLeave={() => setDraggedItem(prev => prev ? { ...prev, targetIndex: undefined } : null)}
                  onClick={() => handleRemoveLetter(item)}
                  // Highlight the target position with visual feedback
                  className={`flex h-14 w-14 cursor-grab items-center justify-center rounded-lg border-2 transition-all active:cursor-grabbing font-serif text-2xl font-bold ${
                    draggedItem?.targetIndex === index
                      ? 'border-terracotta bg-terracotta/30'
                      : 'border-terracotta bg-terracotta/10'
                  } text-terracotta hover:bg-terracotta/20`}
                  title="Click to remove or drag to reorder"
                >
                  {item.letter}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <div
          className={`mt-4 rounded-lg p-4 ${
            feedback === "correct" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {feedback === "correct" ? (
            <div>
              <p className="font-medium">✓ Correct! Well done!</p>
              <p className="text-sm mt-1">
                Exercise {currentExerciseIndex + 1} of {totalExercises} completed
              </p>
            </div>
          ) : (
            <p className="font-medium">✗ Not quite right. Try again!</p>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button className="bg-terracotta hover:bg-terracotta/90" onClick={handleCheck}>
          Check Answer
        </Button>
        {allExercisesComplete && (
          <Button
            onClick={() => router.push(`/modules/${moduleId}`)}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Return to Module
          </Button>
        )}
      </div>
    </div>
  )
}
