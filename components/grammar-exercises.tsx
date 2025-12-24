"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle2, XCircle, BookOpen, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Module, GrammarExercise } from "@/lib/module-data"
import { getGrammarProgress, markGrammarExerciseComplete } from "@/lib/progress-storage"

interface GrammarExercisesProps {
  moduleId: string | number
  module: Module
  exercises: GrammarExercise[]
}

export default function GrammarExercises({ moduleId, module, exercises }: GrammarExercisesProps) {
  const router = useRouter()
  const [mode, setMode] = useState<"lessons" | "exercises">("lessons")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set())
  const [showCompletion, setShowCompletion] = useState(false)

  const lessons = exercises.filter((ex) => ex.teachingContent)
  const practiceExercises = exercises

  const isCorrect = selectedAnswer === practiceExercises[currentIndex]?.correctAnswer
  const allCompleted = completedExercises.size === exercises.length

  useEffect(() => {
    const progress = getGrammarProgress(moduleId)
    setCompletedExercises(new Set(progress.completedExercises))
  }, [moduleId])

  const handleAnswerSelect = (index: number) => {
    if (isAnswered) return
    setSelectedAnswer(index)
  }

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return
    setIsAnswered(true)

    if (isCorrect) {
      const exercise = practiceExercises[currentIndex]
      const newCompleted = new Set(completedExercises)
      newCompleted.add(exercise.id)
      setCompletedExercises(newCompleted)
      markGrammarExerciseComplete(moduleId, exercise.id)

      if (newCompleted.size === exercises.length) {
        setShowCompletion(true)
      }
    }
  }

  const handleNext = () => {
    if (mode === "lessons" && currentIndex < lessons.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else if (mode === "exercises" && currentIndex < practiceExercises.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      if (mode === "exercises") {
        setSelectedAnswer(null)
        setIsAnswered(false)
      }
    }
  }

  const handleStartExercises = () => {
    setMode("exercises")
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
  }

  const handleBackToLessons = () => {
    setMode("lessons")
    setCurrentIndex(0)
  }

  const handleReturnToModule = () => {
    router.push(`/modules/${moduleId}`)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.push(`/modules/${moduleId}`)} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Module
        </Button>
      </div>

      <div>
        <h1 className="font-bold text-balance text-3xl mb-2">{module.title}</h1>
        <p className="text-muted-foreground">Grammar: Letter Positions & Forms</p>
      </div>

      <div className="flex gap-2 p-1 bg-muted rounded-lg">
        <button
          onClick={() => setMode("lessons")}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center gap-2 ${
            mode === "lessons" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          Lessons
        </button>
        <button
          onClick={() => setMode("exercises")}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center gap-2 ${
            mode === "exercises" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Brain className="h-4 w-4" />
          Exercises
        </button>
      </div>

      {mode === "exercises" && (
        <div className="flex gap-2">
          {practiceExercises.map((ex, idx) => (
            <div
              key={ex.id}
              className={`h-2 flex-1 rounded-full transition-colors ${
                completedExercises.has(ex.id) ? "bg-green-500" : idx === currentIndex ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      )}

      {showCompletion && (
        <Card className="p-6 bg-green-50 border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
            <div>
              <h3 className="font-semibold text-lg text-green-900">Grammar Exercises Complete!</h3>
              <p className="text-sm text-green-700">You've mastered all the letter positions for this module.</p>
            </div>
          </div>
          <Button onClick={handleReturnToModule} className="w-full">
            Return to Module
          </Button>
        </Card>
      )}

      {mode === "lessons" && (
        <>
          <Card className="p-6 bg-amber-50 border-amber-200">
            <div className="mb-4 text-sm text-amber-700">
              Lesson {currentIndex + 1} of {lessons.length}
            </div>
            {lessons[currentIndex]?.teachingContent && (
              <>
                <h2 className="font-bold text-2xl mb-3 text-amber-900">
                  {lessons[currentIndex].teachingContent.title}
                </h2>
                <p className="text-amber-800 mb-6 leading-relaxed">
                  {lessons[currentIndex].teachingContent.explanation}
                </p>

                <div className="space-y-4">
                  {lessons[currentIndex].teachingContent.examples.map((example, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 border border-amber-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-amber-900">{example.label}</span>
                        <span className="text-4xl font-arabic">{example.persian}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{example.description}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </Card>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="flex-1 bg-transparent"
            >
              Previous Lesson
            </Button>
            {currentIndex < lessons.length - 1 ? (
              <Button onClick={handleNext} className="flex-1">
                Next Lesson
              </Button>
            ) : (
              <Button onClick={handleStartExercises} className="flex-1">
                Start Practice Exercises
              </Button>
            )}
          </div>
        </>
      )}

      {mode === "exercises" && !showCompletion && (
        <>
          <Card className="p-6">
            <div className="mb-4">
              <span className="text-sm text-muted-foreground">
                Exercise {currentIndex + 1} of {practiceExercises.length}
              </span>
              <p className="text-sm text-primary mt-1">{practiceExercises[currentIndex].instruction}</p>
            </div>

            <h2 className="font-semibold text-xl mb-6">{practiceExercises[currentIndex].question}</h2>

            <div className="space-y-3 mb-6">
              {practiceExercises[currentIndex].options.map((option, index) => {
                const isSelected = selectedAnswer === index
                const isCorrectOption = index === practiceExercises[currentIndex].correctAnswer

                let buttonClasses = "w-full p-4 text-left border-2 rounded-lg transition-all text-lg"

                if (isAnswered) {
                  if (isSelected && isCorrect) {
                    buttonClasses += " border-green-500 bg-green-50"
                  } else if (isSelected && !isCorrect) {
                    buttonClasses += " border-red-500 bg-red-50"
                  } else if (isCorrectOption) {
                    buttonClasses += " border-green-500 bg-green-50"
                  } else {
                    buttonClasses += " border-border bg-muted/30"
                  }
                } else {
                  buttonClasses += isSelected
                    ? " border-primary bg-primary/5"
                    : " border-border hover:border-primary/50"
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={isAnswered}
                    className={buttonClasses}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {isAnswered && isSelected && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-600" />}
                      {isAnswered && !isSelected && isCorrectOption && (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {isAnswered && practiceExercises[currentIndex].explanation && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Explanation:</strong> {practiceExercises[currentIndex].explanation}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              {!isAnswered ? (
                <>
                  <Button variant="outline" onClick={handleBackToLessons} className="flex-1 bg-transparent">
                    Review Lessons
                  </Button>
                  <Button onClick={handleCheckAnswer} disabled={selectedAnswer === null} className="flex-1">
                    Check Answer
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className="flex-1 bg-transparent"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={currentIndex === practiceExercises.length - 1}
                    className="flex-1"
                  >
                    Next Exercise
                  </Button>
                </>
              )}
            </div>
          </Card>

          {allCompleted && (
            <Button onClick={handleReturnToModule} variant="outline" className="w-full bg-transparent">
              Return to Module
            </Button>
          )}
        </>
      )}
    </div>
  )
}
