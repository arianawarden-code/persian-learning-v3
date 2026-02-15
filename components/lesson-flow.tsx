"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Check,
  ChevronLeft,
  Clock,
  RotateCcw,
  Star,
  Volume2,
} from "lucide-react"
import type { Lesson } from "@/lib/lesson-data"
import type { VocabularyWord, ReadingExercise, GrammarExercise, WritingExercise } from "@/lib/module-data"
import { ReadingStory } from "@/components/reading-story"
import { markLessonComplete } from "@/lib/progress-storage"
import { seedWordsFromModule, updateCardAfterReview } from "@/lib/srs-storage"
import { usePersianSpeech } from "@/hooks/use-persian-speech"

// ─── Phase types ─────────────────────────────────────────────────

type Phase = "intro" | "vocabulary" | "grammar" | "reading" | "writing" | "completion"

const PHASE_ORDER: Phase[] = ["intro", "vocabulary", "grammar", "reading", "writing", "completion"]

interface LessonFlowProps {
  lesson: Lesson
  vocabWords: VocabularyWord[]
  grammarExercise: GrammarExercise
  readingStory: ReadingExercise
  writingExercises: WritingExercise[]
  moduleId: string
}

// ─── Component ───────────────────────────────────────────────────

export function LessonFlow({ lesson, vocabWords, grammarExercise, readingStory, writingExercises, moduleId }: LessonFlowProps) {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>("intro")

  const goNext = useCallback(() => {
    const idx = PHASE_ORDER.indexOf(phase)
    if (idx < PHASE_ORDER.length - 1) {
      setPhase(PHASE_ORDER[idx + 1])
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [phase])

  const goBack = useCallback(() => {
    const idx = PHASE_ORDER.indexOf(phase)
    if (idx > 0) {
      setPhase(PHASE_ORDER[idx - 1])
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [phase])

  // Progress bar
  const currentIdx = PHASE_ORDER.indexOf(phase)
  const progressPercent = Math.round((currentIdx / (PHASE_ORDER.length - 1)) * 100)

  return (
    <div className="mx-auto max-w-3xl">
      {/* Back to Module button */}
      <div className="mb-4 flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-charcoal/60 hover:text-charcoal"
          onClick={() => router.push(`/modules/${moduleId}`)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Module
        </Button>
      </div>

      {/* Progress bar */}
      {phase !== "intro" && phase !== "completion" && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={goBack}
              className="flex items-center gap-1 text-sm text-charcoal/60 hover:text-charcoal transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <span className="text-xs text-charcoal/50 capitalize">{phase}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-sand-200">
            <div
              className="h-2 rounded-full bg-terracotta transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {phase === "intro" && (
        <IntroPhase lesson={lesson} onStart={goNext} />
      )}
      {phase === "vocabulary" && (
        <VocabularyPhase words={vocabWords} moduleId={moduleId} onComplete={goNext} />
      )}
      {phase === "grammar" && (
        <GrammarPhase grammar={grammarExercise} onComplete={goNext} />
      )}
      {phase === "reading" && (
        <ReadingPhase story={readingStory} moduleId={moduleId} onComplete={goNext} />
      )}
      {phase === "writing" && (
        <WritingPhase exercises={writingExercises} onComplete={goNext} />
      )}
      {phase === "completion" && (
        <CompletionPhase lesson={lesson} grammarTitle={grammarExercise.instruction} moduleId={moduleId} />
      )}
    </div>
  )
}

// ─── Intro Phase ─────────────────────────────────────────────────

function IntroPhase({ lesson, onStart }: { lesson: Lesson; onStart: () => void }) {
  return (
    <Card className="border-sand-200 bg-white p-10 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-terracotta/10">
        <BookOpen className="h-10 w-10 text-terracotta" />
      </div>

      <p className="mb-2 text-sm font-medium text-terracotta">Lesson {lesson.number}</p>
      <h1 className="mb-3 font-serif text-3xl font-bold text-charcoal">{lesson.title}</h1>
      <p className="mb-6 text-lg text-charcoal/70">{lesson.goal}</p>

      <div className="mb-8 flex items-center justify-center gap-2 text-sm text-charcoal/50">
        <Clock className="h-4 w-4" />
        <span>{lesson.timeEstimate}</span>
      </div>

      <Button
        onClick={onStart}
        size="lg"
        className="bg-terracotta hover:bg-terracotta/90 gap-2 text-base px-8"
      >
        Start Lesson
        <ArrowRight className="h-5 w-5" />
      </Button>
    </Card>
  )
}

// ─── Vocabulary Phase ────────────────────────────────────────────

type CardRating = "again" | "hard" | "good" | "easy"

function VocabularyPhase({
  words,
  moduleId,
  onComplete,
}: {
  words: VocabularyWord[]
  moduleId: string
  onComplete: () => void
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [showInterstitial, setShowInterstitial] = useState(false)
  const [starredWords, setStarredWords] = useState<Set<string>>(new Set())
  const { speak, isSpeaking, isSupported } = usePersianSpeech()

  const INTERSTITIAL_AFTER = 5

  // Seed SRS on mount
  useState(() => {
    seedWordsFromModule(moduleId, words)
    const stored = localStorage.getItem(`starred-words-${moduleId}`)
    if (stored) {
      setStarredWords(new Set(JSON.parse(stored)))
    }
  })

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

  const handleRate = (rating: CardRating) => {
    const qualityMap: Record<CardRating, number> = { again: 1, hard: 3, good: 4, easy: 5 }
    updateCardAfterReview(words[currentIndex].persian, qualityMap[rating])

    // Check for interstitial
    if (currentIndex === INTERSTITIAL_AFTER - 1 && !showInterstitial) {
      setShowInterstitial(true)
      setIsFlipped(false)
      return
    }

    // Auto-advance or complete
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
    }
  }

  const handleContinueFromInterstitial = () => {
    setShowInterstitial(false)
    setCurrentIndex(INTERSTITIAL_AFTER)
    setIsFlipped(false)
  }

  if (showInterstitial) {
    return (
      <Card className="border-sand-200 bg-white p-10 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Check className="h-8 w-8 text-green-700" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-charcoal">Nice progress!</h2>
        <p className="mb-6 text-charcoal/70">
          You&apos;ve learned {INTERSTITIAL_AFTER} words so far. {words.length - INTERSTITIAL_AFTER} more to go!
        </p>
        <Button
          onClick={handleContinueFromInterstitial}
          className="bg-terracotta hover:bg-terracotta/90 gap-2"
        >
          Keep Going
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Card>
    )
  }

  const word = words[currentIndex]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-charcoal">Vocabulary</h2>
        <span className="text-sm text-charcoal/50">
          {currentIndex + 1} / {words.length}
        </span>
      </div>

      {/* Flashcard */}
      <Card
        className="relative min-h-[400px] cursor-pointer border-sand-200 bg-white p-8 transition-all hover:shadow-lg"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Audio button */}
        {isSupported && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              speak(word.persian)
            }}
            className="absolute left-6 top-6 rounded-full p-3 transition-colors hover:bg-sand-100"
          >
            <Volume2
              className={`h-6 w-6 transition-all ${
                isSpeaking ? "text-terracotta" : "text-sand-300 hover:text-terracotta"
              }`}
            />
          </button>
        )}

        {/* Star button */}
        <button
          onClick={(e) => toggleStar(word, e)}
          className="absolute right-6 top-6 rounded-full p-3 transition-colors hover:bg-sand-100"
        >
          <Star
            className={`h-6 w-6 transition-all ${
              starredWords.has(word.persian)
                ? "fill-yellow-400 text-yellow-400"
                : "text-sand-300 hover:text-yellow-400"
            }`}
          />
        </button>

        <div className="flex h-full min-h-[350px] flex-col items-center justify-center text-center">
          {!isFlipped ? (
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-wide text-charcoal/60">Persian Word</p>
              <p className="font-serif text-6xl font-bold text-terracotta">{word.persian}</p>
              <p className="text-2xl text-charcoal/70">{word.transliteration}</p>
              <p className="mt-8 text-sm text-charcoal/50">Click to reveal meaning</p>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-wide text-charcoal/60">English Meaning</p>
              <p className="text-5xl font-bold text-charcoal">{word.english}</p>

              <div className="mt-8 rounded-lg bg-sand-50 p-6 text-left">
                <p className="mb-2 text-sm font-medium text-charcoal/60">Example:</p>
                <div className="mb-3 flex items-center gap-2" dir="rtl">
                  <p className="font-serif text-xl text-charcoal">{word.example}</p>
                  {isSupported && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        speak(word.example)
                      }}
                      className="shrink-0 rounded-full p-2.5 transition-colors hover:bg-sand-200"
                    >
                      <Volume2
                        className={`h-5 w-5 ${
                          isSpeaking ? "text-terracotta" : "text-charcoal/40 hover:text-terracotta"
                        }`}
                      />
                    </button>
                  )}
                </div>
                <p className="text-lg italic text-charcoal/70">{word.exampleTranslation}</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Rating buttons — shown after flip */}
      {isFlipped && (
        <div className="grid grid-cols-4 gap-3">
          <Button
            variant="outline"
            className="border-red-300 bg-red-50 text-red-700 hover:bg-red-100"
            onClick={() => handleRate("again")}
          >
            Again
          </Button>
          <Button
            variant="outline"
            className="border-orange-300 bg-orange-50 text-orange-700 hover:bg-orange-100"
            onClick={() => handleRate("hard")}
          >
            Hard
          </Button>
          <Button
            variant="outline"
            className="border-green-300 bg-green-50 text-green-700 hover:bg-green-100"
            onClick={() => handleRate("good")}
          >
            Good
          </Button>
          <Button
            variant="outline"
            className="border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100"
            onClick={() => handleRate("easy")}
          >
            Easy
          </Button>
        </div>
      )}

      {/* Previous button */}
      {currentIndex > 0 && (
        <div className="flex items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            className="gap-2 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
        </div>
      )}
    </div>
  )
}

// ─── Grammar Phase ───────────────────────────────────────────────

function GrammarPhase({
  grammar,
  onComplete,
}: {
  grammar: GrammarExercise
  onComplete: () => void
}) {
  const [showCheck, setShowCheck] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const isCorrect = selectedAnswer === grammar.correctAnswer
  const patternParts = grammar.patternParts || []
  const patternExamples = grammar.patternExamples || []
  const note = grammar.note || ""

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-charcoal">Grammar</h2>

      {/* Pattern display */}
      <Card className="border-sand-200 bg-white p-8">
        <h3 className="mb-4 text-xl font-bold text-charcoal">{grammar.instruction}</h3>

        {grammar.pattern && (
          <div className="mb-6 rounded-xl bg-terracotta/5 border border-terracotta/20 p-6 text-center">
            <div className="flex items-center justify-center gap-3 text-2xl" dir="rtl" style={{ fontFamily: "var(--font-persian)" }}>
              {patternParts.map((part, i) => (
                <span
                  key={i}
                  className={
                    part.startsWith("[")
                      ? "rounded bg-terracotta/20 px-3 py-1 text-terracotta font-medium"
                      : "text-charcoal"
                  }
                >
                  {part}
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm text-charcoal/50">{grammar.pattern}</p>
          </div>
        )}

        {/* Examples */}
        {patternExamples.length > 0 && (
          <div className="space-y-3 mb-6">
            {patternExamples.map((ex, i) => (
              <div key={i} className="flex items-center gap-4 rounded-lg bg-sand-50 px-4 py-3">
                <p className="text-xl text-charcoal flex-1" dir="rtl" style={{ fontFamily: "var(--font-persian)" }}>
                  {ex.persian}
                </p>
                <div className="text-right">
                  <p className="text-sm text-charcoal/50 italic">{ex.transliteration}</p>
                  <p className="text-sm text-charcoal/70">{ex.english}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Note */}
        {note && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 px-4 py-3">
            <p className="text-sm text-blue-800">{note}</p>
          </div>
        )}
      </Card>

      {/* Micro-check or transition */}
      {!showCheck ? (
        <div className="flex gap-3">
          <Button
            onClick={() => setShowCheck(true)}
            variant="outline"
            className="flex-1 gap-2"
          >
            Quick Check
          </Button>
          <Button
            onClick={onComplete}
            className="flex-1 bg-terracotta hover:bg-terracotta/90 gap-2"
          >
            See it in a conversation
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Card className="border-sand-200 bg-white p-6">
          <p className="mb-4 font-semibold text-charcoal">{grammar.question}</p>
          <div className="space-y-2 mb-4">
            {grammar.options.map((option, i) => {
              const isSelected = selectedAnswer === i
              const isCorrectOption = i === grammar.correctAnswer

              return (
                <button
                  key={i}
                  onClick={() => !submitted && setSelectedAnswer(i)}
                  disabled={submitted}
                  className={`w-full rounded-lg border-2 px-4 py-3 text-left transition-colors ${
                    submitted && isCorrectOption
                      ? "border-green-300 bg-green-50"
                      : submitted && isSelected && !isCorrectOption
                        ? "border-red-300 bg-red-50"
                        : isSelected
                          ? "border-terracotta/50 bg-terracotta/5"
                          : "border-sand-200 hover:border-sand-300"
                  }`}
                >
                  <span dir="rtl" style={{ fontFamily: "var(--font-persian)" }}>{option}</span>
                </button>
              )
            })}
          </div>

          {!submitted ? (
            <Button
              onClick={() => setSubmitted(true)}
              disabled={selectedAnswer === null}
              className="bg-terracotta hover:bg-terracotta/90"
            >
              Check Answer
            </Button>
          ) : (
            <div className="space-y-3">
              <div className={`rounded-lg p-3 ${isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
                <p className={`text-sm font-medium ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                  {isCorrect ? "Correct!" : "Not quite."}
                </p>
                {grammar.explanation && (
                  <p className="text-sm text-charcoal/70 mt-1">{grammar.explanation}</p>
                )}
              </div>
              <Button
                onClick={onComplete}
                className="bg-terracotta hover:bg-terracotta/90 gap-2"
              >
                See it in a conversation
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}

// ─── Reading Phase ───────────────────────────────────────────────

function ReadingPhase({
  story,
  moduleId,
  onComplete,
}: {
  story: ReadingExercise
  moduleId: string
  onComplete: () => void
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-charcoal">Reading</h2>
      <ReadingStory story={story} moduleId={moduleId} />
      <div className="flex justify-end">
        <Button
          onClick={onComplete}
          className="bg-terracotta hover:bg-terracotta/90 gap-2"
        >
          Continue to Writing
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// ─── Writing Phase ───────────────────────────────────────────────

function WritingPhase({
  exercises,
  onComplete,
}: {
  exercises: WritingExercise[]
  onComplete: () => void
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const exercise = exercises[currentIndex]
  const isLast = currentIndex >= exercises.length - 1

  const handleExerciseComplete = () => {
    if (isLast) {
      onComplete()
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  let exerciseCard: React.ReactNode
  if (exercise.type === "word-order") {
    exerciseCard = <WordOrderExerciseCard exercise={exercise} onComplete={handleExerciseComplete} isLast={isLast} />
  } else if (exercise.type === "build-word") {
    exerciseCard = <BuildWordExerciseCard exercise={exercise} onComplete={handleExerciseComplete} isLast={isLast} />
  } else {
    exerciseCard = <FillBlankExerciseCard exercise={exercise} onComplete={handleExerciseComplete} isLast={isLast} />
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-charcoal">Writing</h2>
      {exerciseCard}
    </div>
  )
}

function WordOrderExerciseCard({
  exercise,
  onComplete,
  isLast,
}: {
  exercise: WritingExercise
  onComplete: () => void
  isLast: boolean
}) {
  const tiles = exercise.tiles || []
  const correctOrder = exercise.correctOrder || []

  const [selected, setSelected] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [availableTiles, setAvailableTiles] = useState(() =>
    [...tiles].sort(() => Math.random() - 0.5)
  )

  const isCorrect =
    selected.length === correctOrder.length &&
    selected.every((w, i) => w === correctOrder[i])

  const handleTileClick = (tile: string, fromSelected: boolean) => {
    if (submitted) return
    if (fromSelected) {
      setSelected(selected.filter((_, i) => i !== selected.indexOf(tile)))
      setAvailableTiles([...availableTiles, tile])
    } else {
      setSelected([...selected, tile])
      const idx = availableTiles.indexOf(tile)
      setAvailableTiles(availableTiles.filter((_, i) => i !== idx))
    }
  }

  return (
    <Card className="border-sand-200 bg-white p-6">
      <p className="mb-4 font-semibold text-charcoal">{exercise.instruction}</p>

      {/* Answer area */}
      <div
        className={`mb-4 flex min-h-[60px] flex-wrap items-center gap-2 rounded-lg border-2 border-dashed p-4 ${
          submitted && isCorrect
            ? "border-green-300 bg-green-50"
            : submitted && !isCorrect
              ? "border-red-300 bg-red-50"
              : "border-sand-300 bg-sand-50"
        }`}
        dir="rtl"
      >
        {selected.length === 0 && (
          <span className="text-sm text-charcoal/40">Tap words below to arrange them</span>
        )}
        {selected.map((word, i) => (
          <button
            key={`selected-${i}`}
            onClick={() => handleTileClick(word, true)}
            className="rounded-lg bg-terracotta/10 border border-terracotta/30 px-4 py-2 text-lg text-charcoal transition-colors hover:bg-terracotta/20"
            style={{ fontFamily: "var(--font-persian)" }}
            disabled={submitted}
          >
            {word}
          </button>
        ))}
      </div>

      {/* Available tiles */}
      <div className="mb-6 flex flex-wrap gap-2 justify-center" dir="rtl">
        {availableTiles.map((tile, i) => (
          <button
            key={`available-${i}`}
            onClick={() => handleTileClick(tile, false)}
            className="rounded-lg bg-white border border-sand-300 px-4 py-2 text-lg text-charcoal transition-colors hover:bg-sand-100 hover:border-sand-400"
            style={{ fontFamily: "var(--font-persian)" }}
            disabled={submitted}
          >
            {tile}
          </button>
        ))}
      </div>

      {!submitted ? (
        <Button
          onClick={() => setSubmitted(true)}
          disabled={selected.length !== correctOrder.length}
          className="bg-terracotta hover:bg-terracotta/90"
        >
          Check
        </Button>
      ) : (
        <div className="space-y-3">
          <p className={`text-sm font-medium ${isCorrect ? "text-green-700" : "text-red-700"}`}>
            {isCorrect ? "Perfect!" : `The correct order is: ${correctOrder.join(" ")}`}
          </p>
          <Button onClick={onComplete} className="bg-terracotta hover:bg-terracotta/90 gap-2">
            {isLast ? "Complete Lesson" : "Next Exercise"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </Card>
  )
}

function FillBlankExerciseCard({
  exercise,
  onComplete,
  isLast,
}: {
  exercise: WritingExercise
  onComplete: () => void
  isLast: boolean
}) {
  const sentence = exercise.sentence || ""
  const choices = exercise.choices || []
  const correctChoice = exercise.correctChoice || ""

  const [selected, setSelected] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const isCorrect = selected === correctChoice

  // Split sentence around ___
  const parts = sentence.split("___")

  return (
    <Card className="border-sand-200 bg-white p-6">
      <p className="mb-4 font-semibold text-charcoal">Fill in the blank</p>

      {/* Sentence with blank */}
      <div
        className="mb-6 rounded-lg bg-sand-50 p-4 text-center text-2xl text-charcoal"
        dir="rtl"
        style={{ fontFamily: "var(--font-persian)" }}
      >
        {parts[0]}
        <span
          className={`inline-block min-w-[80px] mx-2 border-b-2 px-2 py-1 ${
            submitted && isCorrect
              ? "border-green-500 text-green-700"
              : submitted && !isCorrect
                ? "border-red-500 text-red-700"
                : selected
                  ? "border-terracotta text-terracotta"
                  : "border-charcoal/30"
          }`}
        >
          {selected || "\u00A0"}
        </span>
        {parts[1]}
      </div>

      {/* Choices */}
      <div className="mb-6 flex flex-wrap gap-3 justify-center">
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => !submitted && setSelected(choice)}
            disabled={submitted}
            className={`rounded-lg border-2 px-5 py-3 text-lg transition-colors ${
              submitted && choice === correctChoice
                ? "border-green-300 bg-green-50"
                : submitted && choice === selected && !isCorrect
                  ? "border-red-300 bg-red-50"
                  : choice === selected
                    ? "border-terracotta/50 bg-terracotta/5"
                    : "border-sand-200 hover:border-sand-300"
            }`}
            style={{ fontFamily: "var(--font-persian)" }}
          >
            {choice}
          </button>
        ))}
      </div>

      {!submitted ? (
        <Button
          onClick={() => setSubmitted(true)}
          disabled={!selected}
          className="bg-terracotta hover:bg-terracotta/90"
        >
          Check
        </Button>
      ) : (
        <div className="space-y-3">
          <p className={`text-sm font-medium ${isCorrect ? "text-green-700" : "text-red-700"}`}>
            {isCorrect ? "Correct!" : `The answer is: ${correctChoice}`}
          </p>
          <Button onClick={onComplete} className="bg-terracotta hover:bg-terracotta/90 gap-2">
            {isLast ? "Complete Lesson" : "Next Exercise"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </Card>
  )
}

function BuildWordExerciseCard({
  exercise,
  onComplete,
  isLast,
}: {
  exercise: WritingExercise
  onComplete: () => void
  isLast: boolean
}) {
  const targetWord = exercise.targetWord || ""
  const targetWordTransliteration = exercise.targetWordTransliteration || ""
  const letters = exercise.availableLetters || []

  const [availablePool, setAvailablePool] = useState<{ letter: string; id: number }[]>(
    () => letters.map((letter, idx) => ({ letter, id: idx }))
  )
  const [answerSlots, setAnswerSlots] = useState<{ letter: string; id: number }[]>([])
  const [submitted, setSubmitted] = useState(false)

  const userWord = answerSlots.map((s) => s.letter).join("")
  const isCorrect = userWord === targetWord

  const handleLetterClick = (item: { letter: string; id: number }, fromAnswer: boolean) => {
    if (submitted) return
    if (fromAnswer) {
      setAnswerSlots(answerSlots.filter((s) => s.id !== item.id))
      setAvailablePool([...availablePool, item])
    } else {
      setAnswerSlots([...answerSlots, item])
      setAvailablePool(availablePool.filter((s) => s.id !== item.id))
    }
  }

  const handleReset = () => {
    setAvailablePool(letters.map((letter, idx) => ({ letter, id: idx })))
    setAnswerSlots([])
    setSubmitted(false)
  }

  return (
    <Card className="border-sand-200 bg-white p-6">
      <div className="mb-4 flex items-center gap-2">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">Build Word</span>
      </div>
      <p className="mb-4 font-semibold text-charcoal">{exercise.instruction}</p>

      {/* Target word */}
      <div className="mb-6 rounded-lg bg-sand-50 p-4">
        <p className="mb-1 text-sm text-charcoal/70">Target word:</p>
        <p className="font-serif text-3xl font-bold text-terracotta">{targetWord}</p>
        <p className="text-lg text-charcoal/70">{targetWordTransliteration}</p>
      </div>

      {/* Available letters */}
      <div className="mb-4">
        <p className="mb-2 text-sm font-medium text-charcoal">Available letters:</p>
        <div className="flex min-h-[68px] flex-wrap gap-2 rounded-lg border-2 border-sand-200 bg-white p-3">
          {availablePool.length === 0 ? (
            <p className="w-full text-center text-sm text-charcoal/40">All letters used</p>
          ) : (
            availablePool.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLetterClick(item, false)}
                disabled={submitted}
                className="flex h-14 w-14 items-center justify-center rounded-lg border-2 border-sand-200 bg-white font-serif text-2xl font-bold text-terracotta transition-all hover:border-terracotta hover:shadow-md"
              >
                {item.letter}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Answer area */}
      <div className="mb-4">
        <p className="mb-2 text-sm font-medium text-charcoal">Your answer:</p>
        <div
          className={`min-h-[68px] rounded-lg border-2 border-dashed p-3 ${
            submitted && isCorrect
              ? "border-green-300 bg-green-50"
              : submitted && !isCorrect
                ? "border-red-300 bg-red-50"
                : "border-sand-300 bg-cream/30"
          }`}
        >
          {answerSlots.length === 0 ? (
            <p className="text-center font-serif text-3xl text-charcoal/30">Tap letters above</p>
          ) : (
            <div className="flex flex-wrap gap-2" dir="rtl">
              {answerSlots.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleLetterClick(item, true)}
                  disabled={submitted}
                  className="flex h-14 w-14 items-center justify-center rounded-lg border-2 border-terracotta bg-terracotta/10 font-serif text-2xl font-bold text-terracotta transition-all hover:bg-terracotta/20"
                >
                  {item.letter}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {!submitted ? (
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button
            onClick={() => setSubmitted(true)}
            disabled={answerSlots.length === 0}
            className="bg-terracotta hover:bg-terracotta/90"
          >
            Check
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <p className={`text-sm font-medium ${isCorrect ? "text-green-700" : "text-red-700"}`}>
            {isCorrect ? "Perfect! You built the word correctly!" : `Not quite — the correct word is: ${targetWord}`}
          </p>
          {!isCorrect && (
            <Button variant="outline" onClick={handleReset}>
              Try Again
            </Button>
          )}
          <Button onClick={onComplete} className="bg-terracotta hover:bg-terracotta/90 gap-2">
            {isLast ? "Complete Lesson" : "Next Exercise"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </Card>
  )
}

// ─── Completion Phase ────────────────────────────────────────────

function CompletionPhase({
  lesson,
  grammarTitle,
  moduleId,
}: {
  lesson: Lesson
  grammarTitle: string
  moduleId: string
}) {
  const router = useRouter()

  // Mark lesson complete on mount
  useState(() => {
    markLessonComplete(moduleId, lesson.id)
  })

  return (
    <Card className="border-sand-200 bg-white p-10 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <Check className="h-10 w-10 text-green-700" />
      </div>

      <h2 className="mb-2 font-serif text-3xl font-bold text-charcoal">Lesson Complete!</h2>
      <p className="mb-6 text-charcoal/70">Great job finishing &ldquo;{lesson.title}&rdquo;</p>

      {/* What you learned */}
      <div className="mb-8 rounded-xl bg-sand-50 p-6 text-left">
        <h3 className="mb-3 font-semibold text-charcoal">What you learned:</h3>
        <ul className="space-y-2 text-sm text-charcoal/70">
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
            <span>{grammarTitle}</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
            <span>{lesson.phases.vocabIndices[1] - lesson.phases.vocabIndices[0]} new vocabulary words</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
            <span>Reading comprehension practice</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
            <span>Writing exercises</span>
          </li>
        </ul>
      </div>

      {/* Next lesson preview */}
      {lesson.nextLesson && (
        <div className="mb-8 rounded-xl border border-terracotta/20 bg-terracotta/5 p-4">
          <p className="text-sm text-charcoal/50 mb-1">Up next</p>
          <p className="font-semibold text-charcoal">{lesson.nextLesson.title}</p>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        {lesson.nextLesson && (
          <Button
            onClick={() => router.push(`/modules/${moduleId}/lessons/${lesson.nextLesson!.id}`)}
            className="bg-terracotta hover:bg-terracotta/90 gap-2"
          >
            Continue to Next Lesson
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
        <Button
          variant="outline"
          onClick={() => router.push(`/modules/${moduleId}/lessons/${lesson.id}`)}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Review Lesson
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push(`/modules/${moduleId}`)}
        >
          Back to Module
        </Button>
      </div>
    </Card>
  )
}
