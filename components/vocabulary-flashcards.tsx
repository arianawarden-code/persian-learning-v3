"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, RotateCcw, Check, X, Star, Volume2 } from "lucide-react"
import type { VocabularyWord } from "@/lib/module-data"
import { usePersianSpeech } from "@/hooks/use-persian-speech"
import { seedWordsFromModule, updateCardAfterReview } from "@/lib/srs-storage"

interface VocabularyFlashcardsProps {
  vocabulary: VocabularyWord[]
  moduleId: string | number
  showWordList?: boolean
}

type QuizOption = {
  text: string
  isCorrect: boolean
}

type CardRating = "again" | "hard" | "good" | "easy" | null

const ratingLabels: Record<string, { text: string; className: string }> = {
  again: { text: "Again", className: "bg-red-50 text-red-700 border-red-200" },
  hard: { text: "Hard", className: "bg-orange-50 text-orange-700 border-orange-200" },
  good: { text: "Good", className: "bg-green-50 text-green-700 border-green-200" },
  easy: { text: "Easy", className: "bg-blue-50 text-blue-700 border-blue-200" },
}

export function VocabularyFlashcards({ vocabulary, moduleId, showWordList = false }: VocabularyFlashcardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [mode, setMode] = useState<"flashcard" | "quiz" | "saved">("flashcard")
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [quizOptions, setQuizOptions] = useState<QuizOption[]>([])
  const [starredWords, setStarredWords] = useState<Set<string>>(new Set())
  const [cardRatings, setCardRatings] = useState<Record<string, CardRating>>({})
  const [goodCounts, setGoodCounts] = useState<Record<string, number>>({})
  const [deckComplete, setDeckComplete] = useState(false)
  const [reviewFilter, setReviewFilter] = useState<"all" | "needs-review" | null>(null)
  const [quizPicking, setQuizPicking] = useState(false)
  const { speak, isSpeaking, isSupported } = usePersianSpeech()

  useEffect(() => {
    const stored = localStorage.getItem(`starred-words-${moduleId}`)
    if (stored) {
      setStarredWords(new Set(JSON.parse(stored)))
    }
    seedWordsFromModule(moduleId, vocabulary)
  }, [moduleId, vocabulary])

  const baseVocabulary =
    mode === "saved" ? vocabulary.filter((word) => starredWords.has(word.persian)) : vocabulary

  const needsReviewCount = vocabulary.filter((word) => {
    const rating = cardRatings[word.persian]
    const gc = goodCounts[word.persian] || 0
    return rating !== "easy" && !(rating === "good" && gc >= 3) && rating !== null
  }).length

  const getNeedsReviewWords = (words: VocabularyWord[]) =>
    words.filter((word) => {
      const rating = cardRatings[word.persian]
      const gc = goodCounts[word.persian] || 0
      return rating !== "easy" && !(rating === "good" && gc >= 3)
    })

  const displayedVocabulary = reviewFilter === "needs-review"
    ? getNeedsReviewWords(baseVocabulary)
    : baseVocabulary

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
    setDeckComplete(false)
    setReviewFilter(null)
  }

  const handleQuizAnswer = (index: number) => {
    if (quizAnswer !== null) return

    setQuizAnswer(index)
    setScore({
      correct: score.correct + (quizOptions[index].isCorrect ? 1 : 0),
      total: score.total + 1,
    })
  }

  const handleRate = (rating: CardRating) => {
    if (!currentWord || !rating) return

    // Map rating to SRS quality
    const qualityMap: Record<string, number> = { again: 1, hard: 3, good: 4, easy: 5 }
    updateCardAfterReview(currentWord.persian, qualityMap[rating])

    setCardRatings((prev) => ({ ...prev, [currentWord.persian]: rating }))
    if (rating === "good") {
      setGoodCounts((prev) => ({ ...prev, [currentWord.persian]: (prev[currentWord.persian] || 0) + 1 }))
    }

    // Auto-advance to next card or show deck complete
    if (currentIndex < displayedVocabulary.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    } else {
      setDeckComplete(true)
    }
  }

  const handleStartNeedsReview = () => {
    setReviewFilter("needs-review")
    setDeckComplete(false)
    setCurrentIndex(0)
    setIsFlipped(false)
  }

  const handleReviewAll = () => {
    setReviewFilter(null)
    setDeckComplete(false)
    setCurrentIndex(0)
    setIsFlipped(false)
  }

  const toggleMode = () => {
    setMode(mode === "flashcard" ? "quiz" : "flashcard")
    setIsFlipped(false)
    setQuizAnswer(null)
    setDeckComplete(false)
    setReviewFilter(null)
  }

  const modeButtons = (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={mode === "flashcard" && reviewFilter !== "needs-review" ? "default" : "outline"}
        onClick={() => {
          setMode("flashcard")
          setCurrentIndex(0)
          setQuizAnswer(null)
          setDeckComplete(false)
          setReviewFilter(null)
          setIsFlipped(false)
        }}
      >
        Flashcards
      </Button>
      <Button
        variant={mode === "quiz" ? "default" : "outline"}
        onClick={() => {
          if (needsReviewCount > 0 && mode !== "quiz") {
            setQuizPicking(true)
            setMode("quiz")
            setCurrentIndex(0)
            setIsFlipped(false)
            setQuizAnswer(null)
            setDeckComplete(false)
            setScore({ correct: 0, total: 0 })
          } else {
            setMode("quiz")
            setCurrentIndex(0)
            setIsFlipped(false)
            setQuizAnswer(null)
            setDeckComplete(false)
            setReviewFilter(null)
            setQuizPicking(false)
            setScore({ correct: 0, total: 0 })
          }
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
          setDeckComplete(false)
          setReviewFilter(null)
        }}
      >
        <Star className="mr-2 h-4 w-4" />
        Saved ({starredWords.size})
      </Button>
      {needsReviewCount > 0 && (
        <Button
          variant={reviewFilter === "needs-review" && mode !== "quiz" ? "default" : "outline"}
          className={reviewFilter !== "needs-review" || mode === "quiz" ? "border-orange-300 text-orange-700 hover:bg-orange-50" : "bg-orange-600 hover:bg-orange-700"}
          onClick={() => {
            setMode("flashcard")
            setReviewFilter("needs-review")
            setCurrentIndex(0)
            setIsFlipped(false)
            setQuizAnswer(null)
            setDeckComplete(false)
          }}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Needs Review ({needsReviewCount})
        </Button>
      )}
    </div>
  )

  if (mode === "saved" && displayedVocabulary.length === 0) {
    return (
      <div className="space-y-6">
        {modeButtons}
        <Card className="border-sand-200 bg-white p-12 text-center">
          <Star className="mx-auto mb-4 h-12 w-12 text-sand-300" />
          <h3 className="mb-2 text-xl font-semibold text-charcoal">No saved words yet</h3>
          <p className="text-charcoal/60">Click the star icon on flashcards to save words for later review</p>
        </Card>
      </div>
    )
  }

  if (reviewFilter === "needs-review" && displayedVocabulary.length === 0) {
    return (
      <div className="space-y-6">
        {modeButtons}
        <Card className="border-sand-200 bg-white p-12 text-center">
          <Check className="mx-auto mb-4 h-12 w-12 text-green-500" />
          <h3 className="mb-2 text-xl font-semibold text-charcoal">All caught up!</h3>
          <p className="text-charcoal/60">You&apos;ve mastered all the words in this module</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex items-center justify-between">
        {modeButtons}
        <div className="flex items-center gap-4">
          {mode === "quiz" && (
            <div className="text-sm text-charcoal/70">
              Score: {score.correct}/{score.total}
            </div>
          )}
          <div className="text-sm text-charcoal/70">
            {currentIndex + 1} / {displayedVocabulary.length}
          </div>
          <Button variant="ghost" size="sm" onClick={handleReset} className="min-h-[44px] min-w-[44px]">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Deck Complete Screen */}
      {deckComplete && (mode === "flashcard" || mode === "saved") ? (
        <Card className="border-sand-200 bg-white p-12 text-center">
          <Check className="mx-auto mb-4 h-12 w-12 text-green-500" />
          <h3 className="mb-2 text-2xl font-bold text-charcoal">Deck Complete!</h3>
          <p className="mb-6 text-charcoal/60">
            You&apos;ve gone through {displayedVocabulary.length} card{displayedVocabulary.length === 1 ? "" : "s"}
          </p>

          {(() => {
            const needsReviewWords = getNeedsReviewWords(baseVocabulary).filter(
              (word) => cardRatings[word.persian] !== null && cardRatings[word.persian] !== undefined
            )
            return needsReviewWords.length > 0 ? (
              <div className="space-y-4">
                <p className="text-sm text-charcoal/60">
                  {needsReviewWords.length} word{needsReviewWords.length === 1 ? "" : "s"} still need{needsReviewWords.length === 1 ? "s" : ""} practice
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Button onClick={handleStartNeedsReview} className="gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Needs Review ({needsReviewWords.length})
                  </Button>
                  <Button variant="outline" onClick={handleReviewAll} className="gap-2 bg-transparent">
                    Review All
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-green-600 font-medium">Great job — you know all these words!</p>
                <Button variant="outline" onClick={handleReviewAll} className="gap-2 bg-transparent">
                  <RotateCcw className="h-4 w-4" />
                  Review All Again
                </Button>
              </div>
            )
          })()}
        </Card>
      ) : (mode === "flashcard" || mode === "saved") ? (
        <div className="space-y-4">
          <Card
            className="relative min-h-[400px] cursor-pointer border-sand-200 bg-white p-8 transition-all hover:shadow-lg"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {isSupported && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  speak(currentWord.persian)
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
            <button
              onClick={(e) => toggleStar(currentWord, e)}
              className="absolute right-6 top-6 rounded-full p-3 transition-colors hover:bg-sand-100"
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
                    <div className="mb-3 flex items-center gap-2" dir="rtl">
                      <p className="font-serif text-xl text-charcoal">
                        {currentWord.example}
                      </p>
                      {isSupported && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            speak(currentWord.example)
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
                    <p className="text-lg italic text-charcoal/70">{currentWord.exampleTranslation}</p>
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
        </div>
      ) : quizPicking ? (
        <Card className="border-sand-200 bg-white p-12 text-center">
          <h3 className="mb-2 text-2xl font-bold text-charcoal">Quiz Mode</h3>
          <p className="mb-6 text-charcoal/60">Which words do you want to quiz?</p>
          <div className="flex items-center justify-center gap-3">
            <Button
              onClick={() => {
                setReviewFilter("needs-review")
                setQuizPicking(false)
                setCurrentIndex(0)
                setScore({ correct: 0, total: 0 })
              }}
              className="gap-2 bg-orange-600 hover:bg-orange-700"
            >
              <RotateCcw className="h-4 w-4" />
              Needs Review ({needsReviewCount})
            </Button>
            <Button
              variant="outline"
              className="gap-2 bg-transparent"
              onClick={() => {
                setReviewFilter(null)
                setQuizPicking(false)
                setCurrentIndex(0)
                setScore({ correct: 0, total: 0 })
              }}
            >
              All Words ({vocabulary.length})
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="border-sand-200 bg-white p-8">
          <div className="space-y-8">
            <div className="text-center">
              <p className="mb-4 text-sm uppercase tracking-wide text-charcoal/60">What does this word mean?</p>
              <div className="flex items-center justify-center gap-3">
                <p className="font-serif text-6xl font-bold text-terracotta">{currentWord.persian}</p>
                {isSupported && (
                  <button
                    onClick={() => speak(currentWord.persian)}
                    className="rounded-full p-2 transition-colors hover:bg-sand-100"
                  >
                    <Volume2
                      className={`h-6 w-6 ${
                        isSpeaking ? "text-terracotta" : "text-sand-300 hover:text-terracotta"
                      }`}
                    />
                  </button>
                )}
              </div>
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
                <div className="mb-3 flex items-center gap-2" dir="rtl">
                  <p className="font-serif text-xl text-charcoal">
                    {currentWord.example}
                  </p>
                  {isSupported && (
                    <button
                      onClick={() => speak(currentWord.example)}
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
                <p className="text-lg italic text-charcoal/70">{currentWord.exampleTranslation}</p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Navigation — shown for quiz mode, or flashcard when not using rating buttons */}
      {mode === "quiz" && (
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
      )}

      {/* Flashcard navigation — previous only + review filter indicator */}
      {(mode === "flashcard" || mode === "saved") && !deckComplete && displayedVocabulary.length > 0 && (
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => {
              if (currentIndex > 0) {
                setCurrentIndex(currentIndex - 1)
                setIsFlipped(false)
              }
            }}
            disabled={currentIndex === 0}
            className="gap-2 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          {reviewFilter === "needs-review" && (
            <span className="text-xs font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
              Needs Review
            </span>
          )}
          <div className="w-24" />
        </div>
      )}

      {/* Word list with rating labels */}
      {showWordList && (
        <section className="mt-8">
          <h2 className="mb-6 text-2xl font-bold text-charcoal">
            All Vocabulary Words ({vocabulary.length} words)
          </h2>
          <div className="space-y-4">
            {vocabulary.map((word, index) => {
              const rating = cardRatings[word.persian]
              const label = rating ? ratingLabels[rating] : null
              return (
                <Card key={index} className="border-sand-200 bg-white p-6">
                  <div className="mb-4 flex items-center gap-4">
                    <span className="font-serif text-3xl font-bold text-terracotta">{word.persian}</span>
                    <span className="text-xl text-charcoal/60">{word.transliteration}</span>
                    <span className="text-xl font-semibold text-charcoal">{word.english}</span>
                    {label && (
                      <span className={`ml-auto rounded-full border px-3 py-1 text-xs font-medium ${label.className}`}>
                        {label.text}
                      </span>
                    )}
                  </div>
                  <div className="rounded-lg bg-sand-50 p-4">
                    <p className="mb-1 font-medium text-charcoal/60">Example:</p>
                    <p className="mb-2 font-serif text-lg text-charcoal" dir="rtl">{word.example}</p>
                    <p className="italic text-charcoal/70">{word.exampleTranslation}</p>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
