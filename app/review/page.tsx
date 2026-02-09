"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Volume2, Check, X, RotateCcw, Home } from "lucide-react"
import {
  getDueWords,
  syncStarredWords,
  getReviewStats,
  getNextReviewTime,
  recordReviewCompletion,
} from "@/lib/srs-storage"
import type { SRSCard } from "@/lib/srs-storage"
import { useReviewSession } from "@/hooks/use-review-session"
import { usePersianSpeech } from "@/hooks/use-persian-speech"

// --- Flashcard Exercise ---
function FlashcardExercise({
  word,
  onRate,
  speak,
  isSpeaking,
}: {
  word: SRSCard
  onRate: (quality: number) => void
  speak: (text: string) => void
  isSpeaking: boolean
}) {
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    setFlipped(false)
  }, [word.persian])

  return (
    <div className="space-y-6">
      <Card
        className="relative min-h-[350px] cursor-pointer border-sand-200 bg-white p-8 transition-all hover:shadow-lg"
        onClick={() => setFlipped(!flipped)}
      >
        <button
          onClick={(e) => {
            e.stopPropagation()
            speak(word.persian)
          }}
          className="absolute left-6 top-6 rounded-full p-2 transition-colors hover:bg-sand-100"
        >
          <Volume2
            className={`h-6 w-6 transition-all ${
              isSpeaking ? "text-terracotta" : "text-sand-300 hover:text-terracotta"
            }`}
          />
        </button>

        <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
          {!flipped ? (
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-wide text-charcoal/60">
                What does this mean?
              </p>
              <p className="font-serif text-6xl font-bold text-terracotta">
                {word.persian}
              </p>
              <p className="text-2xl text-charcoal/70">
                {word.transliteration}
              </p>
              <p className="mt-8 text-sm text-charcoal/50">
                Click to reveal meaning
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-wide text-charcoal/60">
                English Meaning
              </p>
              <p className="text-5xl font-bold text-charcoal">{word.english}</p>
              <p className="mt-4 text-sm text-charcoal/50">
                Rate how well you knew it
              </p>
            </div>
          )}
        </div>
      </Card>

      {flipped && (
        <div className="grid grid-cols-4 gap-3">
          <Button
            variant="outline"
            className="border-red-300 bg-red-50 text-red-700 hover:bg-red-100"
            onClick={() => onRate(1)}
          >
            Again
          </Button>
          <Button
            variant="outline"
            className="border-orange-300 bg-orange-50 text-orange-700 hover:bg-orange-100"
            onClick={() => onRate(3)}
          >
            Hard
          </Button>
          <Button
            variant="outline"
            className="border-green-300 bg-green-50 text-green-700 hover:bg-green-100"
            onClick={() => onRate(4)}
          >
            Good
          </Button>
          <Button
            variant="outline"
            className="border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100"
            onClick={() => onRate(5)}
          >
            Easy
          </Button>
        </div>
      )}
    </div>
  )
}

// --- Multiple Choice Exercise ---
function MultipleChoiceExercise({
  word,
  options,
  onAnswer,
  speak,
  isSpeaking,
}: {
  word: SRSCard
  options: string[]
  onAnswer: (quality: number) => void
  speak: (text: string) => void
  isSpeaking: boolean
}) {
  const [selected, setSelected] = useState<number | null>(null)

  useEffect(() => {
    setSelected(null)
  }, [word.persian])

  const handleSelect = (index: number) => {
    if (selected !== null) return
    setSelected(index)
    const isCorrect = options[index] === word.english
    // Auto-advance after a short delay
    setTimeout(() => {
      onAnswer(isCorrect ? 5 : 1)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Card className="border-sand-200 bg-white p-8">
        <div className="mb-8 text-center">
          <p className="mb-4 text-sm uppercase tracking-wide text-charcoal/60">
            Choose the correct meaning
          </p>
          <div className="flex items-center justify-center gap-3">
            <p className="font-serif text-6xl font-bold text-terracotta">
              {word.persian}
            </p>
            <button
              onClick={() => speak(word.persian)}
              className="rounded-full p-2 transition-colors hover:bg-sand-100"
            >
              <Volume2
                className={`h-6 w-6 ${
                  isSpeaking
                    ? "text-terracotta"
                    : "text-sand-300 hover:text-terracotta"
                }`}
              />
            </button>
          </div>
          <p className="mt-2 text-2xl text-charcoal/70">
            {word.transliteration}
          </p>
        </div>

        <div className="grid gap-3">
          {options.map((option, index) => {
            let className =
              "border-sand-200 bg-white hover:border-terracotta hover:bg-terracotta/5"

            if (selected !== null) {
              if (option === word.english) {
                className = "border-green-500 bg-green-50 text-green-900"
              } else if (selected === index) {
                className = "border-red-500 bg-red-50 text-red-900"
              } else {
                className = "border-sand-200 bg-white text-charcoal/40"
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={selected !== null}
                className={`relative rounded-lg border-2 p-4 text-left text-lg font-medium transition-all ${className}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {selected !== null && (
                    <span>
                      {option === word.english ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : selected === index ? (
                        <X className="h-5 w-5 text-red-600" />
                      ) : null}
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </Card>
    </div>
  )
}

// --- Typing Exercise ---
function TypingExercise({
  word,
  onAnswer,
  speak,
  isSpeaking,
}: {
  word: SRSCard
  onAnswer: (quality: number) => void
  speak: (text: string) => void
  isSpeaking: boolean
}) {
  const [input, setInput] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  useEffect(() => {
    setInput("")
    setSubmitted(false)
    setIsCorrect(false)
  }, [word.persian])

  const normalize = (s: string) =>
    s.toLowerCase().trim().replace(/[-_\s]+/g, "")

  const handleSubmit = () => {
    if (!input.trim() || submitted) return
    const correct = normalize(input) === normalize(word.english)
    setIsCorrect(correct)
    setSubmitted(true)
  }

  const handleContinue = () => {
    onAnswer(isCorrect ? 5 : 1)
  }

  return (
    <div className="space-y-6">
      <Card className="border-sand-200 bg-white p-8">
        <div className="mb-8 text-center">
          <p className="mb-4 text-sm uppercase tracking-wide text-charcoal/60">
            Type the English meaning
          </p>
          <div className="flex items-center justify-center gap-3">
            <p className="font-serif text-5xl font-bold text-terracotta">{word.persian}</p>
            <button
              onClick={() => speak(word.persian)}
              className="rounded-full p-2 transition-colors hover:bg-sand-100"
            >
              <Volume2
                className={`h-5 w-5 ${
                  isSpeaking
                    ? "text-terracotta"
                    : "text-sand-300 hover:text-terracotta"
                }`}
              />
            </button>
          </div>
          <p className="mt-2 text-2xl text-charcoal/70">{word.transliteration}</p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (submitted) handleContinue()
                else handleSubmit()
              }
            }}
            disabled={submitted}
            placeholder="Type English meaning here..."
            className="w-full rounded-lg border-2 border-sand-200 bg-white p-4 text-center text-xl outline-none transition-colors focus:border-terracotta disabled:opacity-60"
            autoFocus
          />

          {!submitted ? (
            <Button
              onClick={handleSubmit}
              disabled={!input.trim()}
              className="w-full"
              size="lg"
            >
              Check Answer
            </Button>
          ) : (
            <div className="space-y-3">
              <div
                className={`rounded-lg p-4 text-center ${
                  isCorrect
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                {isCorrect ? (
                  <p className="text-lg font-semibold">Correct!</p>
                ) : (
                  <div>
                    <p className="text-lg font-semibold">Not quite</p>
                    <p className="mt-1">
                      The answer is:{" "}
                      <span className="font-bold">
                        {word.english}
                      </span>
                    </p>
                  </div>
                )}
              </div>
              <Button onClick={handleContinue} className="w-full" size="lg">
                Continue
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

// --- Main Review Page ---
export default function ReviewPage() {
  const [dueWords, setDueWords] = useState<SRSCard[]>([])
  const [loading, setLoading] = useState(true)
  const [nextReview, setNextReview] = useState<number | null>(null)
  const { speak, isSpeaking } = usePersianSpeech()

  const {
    sessionState,
    currentExercise,
    sessionStats,
    totalExercises,
    startSession,
    submitAnswer,
    resetSession,
  } = useReviewSession()

  const loadDueWords = () => {
    syncStarredWords()
    const words = getDueWords(20)
    setDueWords(words)
    setNextReview(getNextReviewTime())
    setLoading(false)
  }

  useEffect(() => {
    loadDueWords()
  }, [])

  useEffect(() => {
    if (sessionState === "complete") {
      recordReviewCompletion()
    }
  }, [sessionState])

  const handleStartReview = () => {
    startSession(dueWords)
  }

  const handleReviewAgain = () => {
    resetSession()
    loadDueWords()
  }

  const formatNextReview = (timestamp: number) => {
    const diff = timestamp - Date.now()
    const hours = Math.ceil(diff / (1000 * 60 * 60))
    if (hours < 1) return "less than an hour"
    if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"}`
    const days = Math.ceil(hours / 24)
    return `${days} day${days === 1 ? "" : "s"}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <header className="border-b border-sand-200 bg-cream/80 backdrop-blur-sm">
          <div className="container mx-auto flex items-center gap-4 px-4 py-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-charcoal">
              Daily Review
            </h1>
          </div>
        </header>
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-charcoal/60">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="border-b border-sand-200 bg-cream/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center gap-4 px-4 py-4">
          <Link href="/modules">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <h1 className="text-xl font-semibold text-charcoal">Daily Review</h1>
          {sessionState === "active" && currentExercise && (
            <div className="ml-auto flex items-center gap-4 text-sm text-charcoal/70">
              <span>
                Score: {sessionStats.correct}/{sessionStats.total}
              </span>
            </div>
          )}
        </div>
      </header>

      <div className="container mx-auto max-w-2xl px-4 py-8">
        {/* Pre-session (idle) */}
        {sessionState === "idle" && (
          <div className="space-y-8 text-center">
            <div className="mx-auto max-w-md">
              <div className="mb-6 inline-block rounded-2xl bg-terracotta/10 p-6">
                <span className="font-serif text-5xl text-terracotta">
                  مرور
                </span>
              </div>
              <h2 className="mb-4 text-3xl font-bold text-charcoal">
                Daily Review
              </h2>

              {dueWords.length > 0 ? (
                <>
                  <p className="mb-2 text-lg text-charcoal/70">
                    You have{" "}
                    <span className="font-bold text-terracotta">
                      {dueWords.length} word{dueWords.length === 1 ? "" : "s"}
                    </span>{" "}
                    ready for review
                  </p>
                  <p className="mb-8 text-sm text-charcoal/50">
                    Flashcards, multiple choice, and typing exercises
                  </p>
                  <Button
                    size="lg"
                    onClick={handleStartReview}
                    className="rounded-full px-12 py-6 text-lg shadow-lg"
                  >
                    Start Review →
                  </Button>
                </>
              ) : (
                <>
                  <p className="mb-4 text-lg text-charcoal/70">
                    You&apos;re all caught up!
                  </p>
                  {nextReview ? (
                    <p className="mb-8 text-sm text-charcoal/50">
                      Next review in {formatNextReview(nextReview)}
                    </p>
                  ) : (
                    <p className="mb-8 text-sm text-charcoal/50">
                      Visit some vocabulary modules to add words for review
                    </p>
                  )}
                  <Link href="/">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full bg-transparent px-12 py-6 text-lg"
                    >
                      <Home className="mr-2 h-5 w-5" />
                      Back to Home
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}

        {/* Active session */}
        {sessionState === "active" && currentExercise && (
          <div className="space-y-6">
            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-charcoal/60">
                <span>
                  Word {currentExercise.index + 1} / {totalExercises}
                </span>
                <span className="capitalize">
                  {currentExercise.mode.replace("-", " ")}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-sand-200">
                <div
                  className="h-full rounded-full bg-terracotta transition-all duration-300"
                  style={{
                    width: `${((currentExercise.index + 1) / totalExercises) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Exercise */}
            {currentExercise.mode === "flashcard" && (
              <FlashcardExercise
                word={currentExercise.word}
                onRate={submitAnswer}
                speak={speak}
                isSpeaking={isSpeaking}
              />
            )}

            {currentExercise.mode === "multiple-choice" && (
              <MultipleChoiceExercise
                word={currentExercise.word}
                options={currentExercise.options || []}
                onAnswer={submitAnswer}
                speak={speak}
                isSpeaking={isSpeaking}
              />
            )}

            {currentExercise.mode === "typing" && (
              <TypingExercise
                word={currentExercise.word}
                onAnswer={submitAnswer}
                speak={speak}
                isSpeaking={isSpeaking}
              />
            )}
          </div>
        )}

        {/* Complete screen */}
        {sessionState === "complete" && (
          <div className="space-y-8 text-center">
            <div className="mx-auto max-w-md">
              <div className="mb-6 inline-block rounded-2xl bg-green-100 p-6">
                <Check className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="mb-4 text-3xl font-bold text-charcoal">
                Review Complete!
              </h2>

              <div className="mb-6 rounded-2xl border border-sand-200 bg-white p-6">
                <div className="text-5xl font-bold text-terracotta">
                  {sessionStats.total > 0
                    ? Math.round(
                        (sessionStats.correct / sessionStats.total) * 100,
                      )
                    : 0}
                  %
                </div>
                <p className="mt-2 text-charcoal/60">
                  {sessionStats.correct} correct out of {sessionStats.total}
                </p>
              </div>

              {sessionStats.wrongWords.length > 0 && (
                <div className="mb-6 rounded-2xl border border-orange-200 bg-orange-50 p-6 text-left">
                  <h3 className="mb-3 font-semibold text-orange-800">
                    Needs more practice
                  </h3>
                  <div className="space-y-2">
                    {sessionStats.wrongWords.map((word) => (
                      <div
                        key={word.persian}
                        className="flex items-center justify-between rounded-lg bg-white px-4 py-2"
                      >
                        <span className="font-serif text-lg text-terracotta">
                          {word.persian}
                        </span>
                        <span className="text-charcoal/70">
                          {word.english}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-4">
                <Button
                  size="lg"
                  onClick={handleReviewAgain}
                  className="rounded-full px-8 py-6 text-lg shadow-lg"
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Review Again
                </Button>
                <Link href="/">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full bg-transparent px-8 py-6 text-lg"
                  >
                    <Home className="mr-2 h-5 w-5" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
