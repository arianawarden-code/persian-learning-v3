"use client"

import { useEffect, useState } from "react"
import { moduleContent } from "@/lib/module-data"
import { getModuleReadingProgress, getModuleWritingProgress, getModuleGrammarProgress } from "@/lib/progress-storage"

// Progress breakdown for a single module
interface ModuleProgressDetail {
  vocabulary: number
  reading: number
  writing: number
  grammar: number
  overall: number // average of all four areas
}

/**
 * Hook to get detailed progress for a single module.
 * Listens to progress-updated events and recalculates when progress changes.
 */
export function useModuleProgress(moduleId: string): ModuleProgressDetail {
  const [progress, setProgress] = useState<ModuleProgressDetail>({
    vocabulary: 0,
    reading: 0,
    writing: 0,
    grammar: 0,
    overall: 0,
  })

  const calculateProgress = () => {
    const content = moduleContent[moduleId as keyof typeof moduleContent]
    const totalStories = content?.reading?.length || 0
    const totalWritingExercises = content?.writing?.length || 0
    const totalGrammarExercises = content?.grammar?.length || 0

    const vocabulary = 0 // Vocabulary progress not yet tracked
    const reading = getModuleReadingProgress(moduleId, totalStories)
    const writing = getModuleWritingProgress(moduleId, totalWritingExercises)
    const grammar = getModuleGrammarProgress(moduleId, totalGrammarExercises)
    // Overall progress averages all four learning areas
    const overall = Math.round((vocabulary + reading + writing + grammar) / 4)

    setProgress({ vocabulary, reading, writing, grammar, overall })
  }

  useEffect(() => {
    calculateProgress()
    window.addEventListener("progress-updated", calculateProgress)
    return () => window.removeEventListener("progress-updated", calculateProgress)
  }, [moduleId])

  return progress
}

/**
 * Hook to get overall progress for all modules.
 * Returns a map of module ID to overall progress percentage.
 * Listens to progress-updated events for real-time updates.
 */
export function useAllModulesProgress(modules: Array<{ id: string | number }>) {
  const [progress, setProgress] = useState<Record<string, number>>({})

  const calculateProgress = () => {
    const progressMap: Record<string, number> = {}
    modules.forEach((module) => {
      const moduleId = String(module.id)
      const content = moduleContent[moduleId as keyof typeof moduleContent]

      const totalStories = content?.reading?.length || 0
      const totalWritingExercises = content?.writing?.length || 0
      const totalGrammarExercises = content?.grammar?.length || 0

      const vocabulary = 0 // Vocabulary progress not yet tracked
      const readingProgress = getModuleReadingProgress(moduleId, totalStories)
      const writingProgress = getModuleWritingProgress(moduleId, totalWritingExercises)
      const grammarProgress = getModuleGrammarProgress(moduleId, totalGrammarExercises)

      // Calculate overall progress as average of all four areas
      const overallProgress = Math.round((vocabulary + readingProgress + writingProgress + grammarProgress) / 4)
      progressMap[moduleId] = overallProgress
    })
    setProgress(progressMap)
  }

  useEffect(() => {
    calculateProgress()
    window.addEventListener("progress-updated", calculateProgress)
    return () => window.removeEventListener("progress-updated", calculateProgress)
  }, [modules])

  return progress
}
