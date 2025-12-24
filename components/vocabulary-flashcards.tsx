"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, RotateCcw, Check, X, Star } from "lucide-react"
import type { VocabularyWord } from "@/lib/module-data"

interface VocabularyFlashcardsProps {
  vocabulary: VocabularyWord[]
  moduleId: string | number
}

type QuizOption = {
  text: string
  isCorrect: boolean
}

export function VocabularyFlashcards({ vocabulary, moduleId }: VocabularyFlashcardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [mode, setMode] = useState<"flashcard" | "quiz" | "saved">("flashcard")
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [quizOptions, setQuizOptions] = useState<QuizOption[]>([])
  const [starredWords, setStarredWords] = useState<Set<string>>(new Set())

  useEffect(() => {
    const stored = localStorage.getItem(`starred-words-${moduleId}`)
    if (stored) {
      setStarredWords(new Set(JSON.parse(stored)))
    }
  }, [moduleId])

  const displayedVocabulary =
    mode === "saved" ? vocabulary.filter((word) => starredWords.has(word.persian)) : vocabulary

  const currentWord = displayedVocabulary[currentIndex]

  const generateQuizOptions = (): QuizOption[] => {
    const options: QuizOption[] = [{ text: currentWord.english, isCorrect: true }]

    const otherWords = displayedVocabulary.filter((_, i) => i !== currentIndex)
    const shuffled = [...otherWords].sort(() => Math.random() - 0.5)

    for (let i = 0; i < 3 && i < shuffled.length; i++) {
      options.push({ text: shuffled[i].english, isCorrect: false })
    }

    return options.sort(() => Math.random() - 0.5)
  }

  useEffect(() => {
    if (currentWord) {
      setQuizOptions(generateQuizOptions())
    }
  }, [currentIndex, mode])

  const toggleStar = (word: VocabularyWord, e: React.MouseEvent) => {
    e.stopPropagation()
    const newStarred = new Set(starredWords)

    if (newStarred.has(word.persian)) {
      newStarred.delete(word.persian)
    } else {
      newStarred.add(word.persian)
    }

    setStarredWords(newStarred)
    localStorage.setItem(`starred-words-${moduleId}`, JSON.stringify([...newStarred]))
  }

  const handleNext = () => {
    if (currentIndex < displayedVocabulary.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
      setQuizAnswer(null)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
      setQuizAnswer(null)
    }
  }

  const handleReset = () => {
    setCurrentIndex(0)
    setIsFlipped(false)
    setQuizAnswer(null)
    setScore({ correct: 0, total: 0 })
  }

  const handleQuizAnswer = (index: number) => {
    if (quizAnswer !== null) return

    setQuizAnswer(index)
    setScore({
      correct: score.correct + (quizOptions[index].isCorrect ? 1 : 0),
      total: score.total + 1,
    })
  }

  const toggleMode = () => {
    setMode(mode === "flashcard" ? "quiz" : "flashcard")
    setIsFlipped(false)
    setQuizAnswer(null)
  }

  if (mode === "saved" && displayedVocabulary.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex gap-2">
          <Button
            variant={mode === "flashcard" ? "default" : "outline"}
            onClick={() => {
              setMode("flashcard")
              setCurrentIndex(0)
              setQuizAnswer(null)
            }}
          >
            Flashcards
          </Button>
          <Button
            variant={mode === "quiz" ? "default" : "outline"}
            onClick={() => {
              setMode("quiz")
              setCurrentIndex(0)
              setIsFlipped(false)
              setQuizAnswer(null)
            }}
          >
            Quiz Mode
          </Button>
          <Button
            variant={mode === "saved" ? "default" : "outline"}
            onClick={() => {
              setMode("saved")
              setCurrentIndex(0)
              setIsFlipped(false)
              setQuizAnswer(null)
            }}
          >
            <Star className="mr-2 h-4 w-4" />
            Saved
          </Button>
        </div>
        <Card className="border-sand-200 bg-white p-12 text-center">
          <Star className="mx-auto mb-4 h-12 w-12 text-sand-300" />
          <h3 className="mb-2 text-xl font-semibold text-charcoal">No saved words yet</h3>
          <p className="text-charcoal/60">Click the star icon on flashcards to save words for later review</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant={mode === "flashcard" ? "default" : "outline"}
            onClick={() => {
              setMode("flashcard")
              setCurrentIndex(0)
              setQuizAnswer(null)
            }}
          >
            Flashcards
          </Button>
          <Button
            variant={mode === "quiz" ? "default" : "outline"}
            onClick={() => {
              setMode("quiz")
              setCurrentIndex(0)
              setIsFlipped(false)
              setQuizAnswer(null)
            }}
          >
            Quiz Mode
          </Button>
          <Button
            variant={mode === "saved" ? "default" : "outline"}
            onClick={() => {
              setMode("saved")
              setCurrentIndex(0)
              setIsFlipped(false)
              setQuizAnswer(null)
            }}
          >
            <Star className="mr-2 h-4 w-4" />
            Saved ({starredWords.size})
          </Button>
        </div>
        <div className="flex items-center gap-4">
          {mode === "quiz" && (
            <div className="text-sm text-charcoal/70">
              Score: {score.correct}/{score.total}
            </div>
          )}
          <div className="text-sm text-charcoal/70">
            {currentIndex + 1} / {displayedVocabulary.length}
          </div>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Flashcard/Quiz Card */}
      {mode === "flashcard" || mode === "saved" ? (
        <Card
          className="relative min-h-[400px] cursor-pointer border-sand-200 bg-white p-8 transition-all hover:shadow-lg"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <button
            onClick={(e) => toggleStar(currentWord, e)}
            className="absolute right-6 top-6 rounded-full p-2 transition-colors hover:bg-sand-100"
          >
            <Star
              className={`h-6 w-6 transition-all ${
                starredWords.has(currentWord.persian)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-sand-300 hover:text-yellow-400"
              }`}
            />
          </button>

          <div className="flex h-full min-h-[350px] flex-col items-center justify-center text-center">
            {!isFlipped ? (
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-wide text-charcoal/60">Persian Word</p>
                <p className="font-serif text-6xl font-bold text-terracotta">{currentWord.persian}</p>
                <p className="text-2xl text-charcoal/70">{currentWord.transliteration}</p>
                <p className="mt-8 text-sm text-charcoal/50">Click to reveal meaning</p>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-sm uppercase tracking-wide text-charcoal/60">English Meaning</p>
                <p className="text-5xl font-bold text-charcoal">{currentWord.english}</p>

                <div className="mt-8 rounded-lg bg-sand-50 p-6 text-left">
                  <p className="mb-2 text-sm font-medium text-charcoal/60">Example:</p>
                  <p className="mb-3 font-serif text-xl text-charcoal" dir="rtl">
                    {currentWord.example}
                  </p>
                  <p className="text-lg italic text-charcoal/70">{currentWord.exampleTranslation}</p>
                </div>

                <p className="text-sm text-charcoal/50">Click to flip back</p>
              </div>
            )}
          </div>
        </Card>
      ) : (
        <Card className="border-sand-200 bg-white p-8">
          <div className="space-y-8">
            <div className="text-center">
              <p className="mb-4 text-sm uppercase tracking-wide text-charcoal/60">What does this word mean?</p>
              <p className="font-serif text-6xl font-bold text-terracotta">{currentWord.persian}</p>
              <p className="mt-2 text-2xl text-charcoal/70">{currentWord.transliteration}</p>
            </div>

            <div className="grid gap-3">
              {quizOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleQuizAnswer(index)}
                  disabled={quizAnswer !== null}
                  className={`relative rounded-lg border-2 p-4 text-left text-lg font-medium transition-all ${
                    quizAnswer === null
                      ? "border-sand-200 bg-white hover:border-terracotta hover:bg-terracotta/5"
                      : quizAnswer === index
                        ? option.isCorrect
                          ? "border-green-500 bg-green-50 text-green-900"
                          : "border-red-500 bg-red-50 text-red-900"
                        : option.isCorrect && quizAnswer !== null
                          ? "border-green-500 bg-green-50 text-green-900"
                          : "border-sand-200 bg-white text-charcoal/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.text}</span>
                    {quizAnswer !== null && (
                      <span>
                        {option.isCorrect ? (
                          <Check className="h-5 w-5 text-green-600" />
                        ) : quizAnswer === index ? (
                          <X className="h-5 w-5 text-red-600" />
                        ) : null}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {quizAnswer !== null && (
              <div className="rounded-lg bg-sand-50 p-6">
                <p className="mb-2 text-sm font-medium text-charcoal/60">Example usage:</p>
                <p className="mb-3 font-serif text-xl text-charcoal" dir="rtl">
                  {currentWord.example}
                </p>
                <p className="text-lg italic text-charcoal/70">{currentWord.exampleTranslation}</p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="gap-2 bg-transparent"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button onClick={handleNext} disabled={currentIndex === displayedVocabulary.length - 1} className="gap-2">
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
