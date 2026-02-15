"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Volume2, Square, RotateCcw, ArrowRight } from "lucide-react"
import type { ReadingExercise } from "@/lib/module-data"
import {
  markStoryAttempted,
  markStoryMastered,
  getStoryStatus,
  setLastActivity,
} from "@/lib/progress-storage"
import { useRouter } from "next/navigation"
import { usePersianSpeech } from "@/hooks/use-persian-speech"

interface ReadingStoryProps {
  story: ReadingExercise
  moduleId: string | number
  nextStoryId?: string | null
  nextStoryTitle?: string | null
  onSubmit?: () => void
}

export function ReadingStory({ story, moduleId, nextStoryId = null, nextStoryTitle = null, onSubmit }: ReadingStoryProps) {
  const router = useRouter()
  const [showTranslation, setShowTranslation] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({})
  const [showResults, setShowResults] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const { speak, stop, isSpeaking, isSupported } = usePersianSpeech()

  const [status, setStatus] = useState<"attempted" | "mastered" | null>(null)

  useEffect(() => {
    setStatus(getStoryStatus(moduleId, story.id))

    // Update Resume target when user opens this story
    setLastActivity({ type: "reading", moduleId: String(moduleId), id: story.id })
  }, [moduleId, story.id])

  const getLinePairs = () => {
    const textLines = story.text.split(/([.!؟])/).filter((line) => line.trim())
    const translitLines = story.textTransliteration
      ? story.textTransliteration.split(/([.!?])/).filter((line) => line.trim())
      : []
    const translationLines = story.textTranslation
      ? story.textTranslation.split(/([.!?])/).filter((line) => line.trim())
      : []

    const pairs = []
    for (let i = 0; i < textLines.length; i += 2) {
      const text = textLines[i]?.trim() || ""
      const punctuation = textLines[i + 1] || ""
      const translit = translitLines[i]?.trim() || ""
      const translitPunct = translitLines[i + 1] || ""
      const translation = translationLines[i]?.trim() || ""
      const translationPunct = translationLines[i + 1] || ""

      if (text) {
        pairs.push({
          text: text + punctuation,
          transliteration: translit ? translit + translitPunct : "",
          translation: translation ? translation + translationPunct : "",
        })
      }
    }

    return pairs
  }

  const linePairs = getLinePairs()

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex,
    }))
  }

  const handleSubmit = () => {
    setShowResults(true)

    // Always award credit for finishing (attempted)
    markStoryAttempted(moduleId, story.id)
    setStatus("attempted")

    // Upgrade to mastery if perfect score
    if (correctCount === story.questions.length) {
      markStoryMastered(moduleId, story.id)
      setStatus("mastered")
    }

    // Optional: set resume to next story if you have it
    if (nextStoryId) {
      setLastActivity({ type: "reading", moduleId: String(moduleId), id: nextStoryId })
    }

    onSubmit?.()
  }

  const handleReset = () => {
    setSelectedAnswers({})
    setShowResults(false)
  }

  const correctCount = Object.entries(selectedAnswers).filter(
    ([qIndex, aIndex]) => story.questions[Number(qIndex)].correctAnswer === aIndex,
  ).length

  const allCorrect = showResults && correctCount === story.questions.length

  return (
    <div className="space-y-6">
      <Card className="border-sand-200 bg-white p-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-charcoal">Story Text</h3>
            <div className="flex gap-2">
              {isSupported && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (isSpeaking) {
                      stop()
                    } else {
                      speak(story.text)
                    }
                  }}
                  className="gap-2"
                >
                  {isSpeaking ? (
                    <>
                      <Square className="h-4 w-4" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-4 w-4" />
                      Read Aloud
                    </>
                  )}
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={() => setShowTranslation(!showTranslation)} className="gap-2">
                {showTranslation ? (
                  <>
                    <EyeOff className="h-4 w-4" />
                    Hide Translation
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    Show Translation
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {/* All Persian lines together */}
            <div className="relative rounded-lg bg-sand-50 p-4">
              <div className="space-y-2">
                {linePairs.map((pair, index) => (
                  <div key={`${story.id}-persian-${index}`} className="flex items-start gap-2">
                    {isSupported && (
                      <button
                        onClick={() => speak(pair.text)}
                        className="shrink-0 rounded-full bg-terracotta/10 p-3 transition-colors hover:bg-terracotta/20 mt-2"
                      >
                        <Volume2
                          className={`h-4 w-4 ${
                            isSpeaking ? "text-terracotta animate-pulse" : "text-terracotta/70 hover:text-terracotta"
                          }`}
                        />
                      </button>
                    )}
                    <p className="text-2xl leading-loose text-charcoal flex-1" dir="rtl" style={{ fontFamily: "var(--font-persian)" }}>
                      {pair.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* All transliteration lines together */}
            {linePairs.some((pair) => pair.transliteration) && (
              <div className="rounded-lg bg-blue-50/50 px-4 py-3">
                <div className="space-y-1">
                  {linePairs.map((pair, index) =>
                    pair.transliteration ? (
                      <p key={`${story.id}-translit-${index}`} className="text-sm leading-relaxed text-charcoal/70 italic">
                        {pair.transliteration}
                      </p>
                    ) : null,
                  )}
                </div>
              </div>
            )}

            {/* All translation lines together (when shown) */}
            {showTranslation && linePairs.some((pair) => pair.translation) && (
              <div className="rounded-lg bg-terracotta/5 border-2 border-terracotta/20 p-4">
                <div className="space-y-1">
                  {linePairs.map((pair, index) =>
                    pair.translation ? (
                      <p key={`${story.id}-translation-${index}`} className="leading-relaxed text-charcoal/80">
                        {pair.translation}
                      </p>
                    ) : null,
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      <Card className="border-sand-200 bg-white p-8">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-charcoal">Comprehension Questions</h3>
          {showResults && (
            <div className="rounded-full bg-terracotta/10 px-4 py-2">
              <span className="font-semibold text-terracotta">
                Score: {correctCount}/{story.questions.length}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {story.questions.map((question, qIndex) => {
            const isAnswered = selectedAnswers[qIndex] !== undefined

            return (
              <div
                key={`${story.id}-question-${qIndex}`}  // ✅ keep (just remove the comment if you want)
                className="rounded-lg p-6 bg-cream/50 overflow-visible"
              >
                <p className="mb-4 font-semibold text-charcoal">
                  {qIndex + 1}. {question.question}
                </p>

                <div className="space-y-2 overflow-visible">
                  {question.options.map((option, oIndex) => {
                    const isSelected = selectedAnswers[qIndex] === oIndex
                    const isCorrectAnswer = oIndex === question.correctAnswer

                    return (
                      <label
                        key={`${story.id}-q-${qIndex}-opt-${oIndex}`} // ✅ keep (just remove the comment if you want)
                        className={`flex cursor-pointer items-center gap-3 rounded-md p-3 transition-colors ${
                          showResults && isCorrectAnswer
                            ? "bg-green-100 border-2 border-green-300"
                            : showResults && isSelected && !isCorrectAnswer
                              ? "bg-red-100 border-2 border-red-300"
                              : isSelected
                                ? "bg-terracotta/10 border-2 border-terracotta/30"
                                : "hover:bg-sand-100 border-2 border-transparent"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q${qIndex}`}
                          value={oIndex}
                          checked={isSelected}
                          onChange={() => handleAnswerSelect(qIndex, oIndex)}
                          disabled={showResults}
                          className="sr-only"
                        />
                        <span className={`h-4 w-4 shrink-0 rounded-full border-2 flex items-center justify-center ${
                          showResults && isSelected && isCorrectAnswer ? "border-green-600"
                          : showResults && isSelected && !isCorrectAnswer ? "border-red-600"
                          : isSelected ? "border-terracotta"
                          : "border-charcoal/30"
                        }`}>
                          {isSelected && <span className={`h-2 w-2 rounded-full ${
                            showResults && isCorrectAnswer ? "bg-green-600"
                            : showResults && !isCorrectAnswer ? "bg-red-600"
                            : "bg-terracotta"
                          }`} />}
                        </span>
                        <span className="flex-1 text-charcoal/80">{option}</span>
                        {showResults && isCorrectAnswer && (
                          <span className="text-green-600 font-medium">✓ Correct</span>
                        )}
                        {showResults && isSelected && !isCorrectAnswer && (
                          <span className="text-red-600 font-medium">✗ Wrong</span>
                        )}
                      </label>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {!showResults && (
          <div className="mt-6">
            <Button
              onClick={handleSubmit}
              disabled={Object.keys(selectedAnswers).length !== story.questions.length}
              className="bg-terracotta hover:bg-terracotta/90"
            >
              Submit Answers
            </Button>
          </div>
        )}

        {showResults && (
          <div className={`mt-6 rounded-lg p-5 ${status === "mastered" ? "bg-green-50 border border-green-200" : "bg-sand-50 border border-sand-200"}`}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-lg font-semibold text-charcoal">
                  {status === "mastered" ? "Nice work — mastered ✅" : "Good effort — credit earned 👍"}
                </div>
                <div className="mt-1 text-sm text-charcoal/70">
                  Score: {correctCount}/{story.questions.length}
                  {status !== "mastered" && " · Get a perfect score to master this story."}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleReset} className="gap-1.5">
                  <RotateCcw className="h-3.5 w-3.5" />
                  Retry
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/modules/${moduleId}`)}
                >
                  Return to Module
                </Button>

                {nextStoryId && (
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white gap-1.5"
                    onClick={() => router.push(`/modules/${moduleId}/reading/${nextStoryId}`)}
                  >
                    Next: {nextStoryTitle} <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
