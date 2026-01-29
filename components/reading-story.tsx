"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import type { ReadingExercise } from "@/lib/module-data"
import { setStoryComplete, isStoryComplete } from "@/lib/progress-storage"
import { useRouter } from "next/navigation"

interface ReadingStoryProps {
  story: ReadingExercise
  moduleId: string | number
}

export function ReadingStory({ story, moduleId }: ReadingStoryProps) {
  const router = useRouter()
  const [showTranslation, setShowTranslation] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({})
  const [showResults, setShowResults] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    setIsCompleted(isStoryComplete(moduleId, story.id))
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
    if (correctCount === story.questions.length) {
      setStoryComplete(moduleId, story.id)
      setIsCompleted(true)
    }
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
      {isCompleted && (
        <div className="rounded-lg bg-green-50 border-2 border-green-200 p-4 flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="font-medium text-green-700">Story completed! Great work!</span>
        </div>
      )}

      <Card className="border-sand-200 bg-white p-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-charcoal">Story Text</h3>
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

          <div className="space-y-4">
            {linePairs.map((pair, index) => (
              <div
                key={`${story.id}-line-${index}-${pair.text}`}
                className="grid grid-cols-1 lg:grid-cols-2 gap-4"
              >
                <div>
                  <div className="rounded-lg bg-sand-50 p-4">
                    <p className="font-serif text-2xl leading-loose text-charcoal" dir="rtl">
                      {pair.text}
                    </p>
                  </div>
                  {pair.transliteration && (
                    <div className="mt-2 rounded-lg bg-blue-50/50 px-4 py-3">
                      <p className="text-sm leading-relaxed text-charcoal/70 italic">{pair.transliteration}</p>
                    </div>
                  )}
                </div>

                {showTranslation && pair.translation && (
                  <div className="flex items-center">
                    <div className="rounded-lg bg-terracotta/5 border-2 border-terracotta/20 p-4 w-full">
                      <p className="leading-relaxed text-charcoal/80">{pair.translation}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
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
                key={`${story.id}-question-${qIndex}`}  // ✅ changed (removed question text from key)
                className="rounded-lg p-6 bg-cream/50"
              >
                <p className="mb-4 font-semibold text-charcoal">
                  {qIndex + 1}. {question.question}
                </p>

                <div className="space-y-2">
                  {question.options.map((option, oIndex) => {
                    const isSelected = selectedAnswers[qIndex] === oIndex
                    const isCorrectAnswer = oIndex === question.correctAnswer

                    return (
                      <label
                        key={`${story.id}-q-${qIndex}-opt-${oIndex}`} // ✅ changed (removed option text from key)
                        className={`flex cursor-pointer items-center gap-3 rounded-md p-3 transition-colors ${
                          showResults && isCorrectAnswer
                            ? "bg-green-100 border-2 border-green-300"
                            : showResults && isSelected && !isCorrectAnswer
                              ? "bg-red-100 border-2 border-red-300"
                              : isSelected
                                ? "bg-terracotta/10 border-2 border-terracotta/30"
                                : "hover:bg-sand-100 border border-transparent"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q${qIndex}`}
                          value={oIndex}
                          checked={isSelected}
                          onChange={() => handleAnswerSelect(qIndex, oIndex)}
                          disabled={showResults}
                          className="h-4 w-4 accent-terracotta"
                        />
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

        <div className="mt-6 flex gap-3">
          {!showResults ? (
            <Button
              onClick={handleSubmit}
              disabled={Object.keys(selectedAnswers).length !== story.questions.length}
              className="bg-terracotta hover:bg-terracotta/90"
            >
              Submit Answers
            </Button>
          ) : (
            <>
              <Button onClick={handleReset} variant="outline">
                Try Again
              </Button>
              {allCorrect && (
                <Button
                  onClick={() => router.push(`/modules/${moduleId}`)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Return to Module
                </Button>
              )}
            </>
          )}
        </div>
      </Card>
    </div>
  )
}
