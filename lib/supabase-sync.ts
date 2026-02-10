import { createClient } from "@/lib/supabase/client"

const MIGRATION_FLAG = "supabase-migration-completed"

const READING_KEY = "reading-progress"
const WRITING_KEY = "writing-progress"
const GRAMMAR_KEY = "grammar-progress"
const SRS_KEY = "srs-vocabulary-data"
const STREAK_KEY = "srs-review-streak"
const ACTIVITY_KEY = "last-activity"

let isSyncingFromSupabase = false

function getStarredWordsKeys(): { key: string; moduleId: string }[] {
  const result: { key: string; moduleId: string }[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith("starred-words-")) {
      result.push({ key, moduleId: key.replace("starred-words-", "") })
    }
  }
  return result
}

export function isSyncing() {
  return isSyncingFromSupabase
}

/**
 * Push all localStorage data to Supabase (one-time migration).
 * Only runs if the migration flag hasn't been set for this user.
 */
export async function syncToSupabase(userId: string) {
  const flagKey = `${MIGRATION_FLAG}-${userId}`
  if (localStorage.getItem(flagKey)) return

  await pushProgressToSupabase(userId)
  localStorage.setItem(flagKey, "true")
}

/**
 * Pull all data from Supabase into localStorage.
 * Runs on every login to ensure fresh data.
 */
export async function syncFromSupabase(userId: string) {
  isSyncingFromSupabase = true
  const supabase = createClient()

  try {
    const { data: readingRows } = await supabase
      .from("reading_progress")
      .select("module_id, story_id, status")
      .eq("user_id", userId)

    if (readingRows && readingRows.length > 0) {
      const reading: Record<string, Record<string, string>> = {}
      for (const row of readingRows) {
        if (!reading[row.module_id]) reading[row.module_id] = {}
        reading[row.module_id][row.story_id] = row.status
      }
      localStorage.setItem(READING_KEY, JSON.stringify(reading))
    }

    const { data: writingRows } = await supabase
      .from("writing_progress")
      .select("module_id, exercise_id")
      .eq("user_id", userId)

    if (writingRows && writingRows.length > 0) {
      const writing: Record<string, Record<string, boolean>> = {}
      for (const row of writingRows) {
        if (!writing[row.module_id]) writing[row.module_id] = {}
        writing[row.module_id][row.exercise_id] = true
      }
      localStorage.setItem(WRITING_KEY, JSON.stringify(writing))
    }

    const { data: grammarRows } = await supabase
      .from("grammar_progress")
      .select("module_id, exercise_id")
      .eq("user_id", userId)

    if (grammarRows && grammarRows.length > 0) {
      const grammar: Record<string, { completedExercises: number[] }> = {}
      for (const row of grammarRows) {
        if (!grammar[row.module_id]) grammar[row.module_id] = { completedExercises: [] }
        grammar[row.module_id].completedExercises.push(row.exercise_id)
      }
      localStorage.setItem(GRAMMAR_KEY, JSON.stringify(grammar))
    }

    const { data: srsRows } = await supabase
      .from("srs_cards")
      .select("*")
      .eq("user_id", userId)

    if (srsRows && srsRows.length > 0) {
      const cards: Record<string, object> = {}
      for (const row of srsRows) {
        cards[row.persian] = {
          persian: row.persian,
          english: row.english,
          transliteration: row.transliteration,
          moduleId: row.module_id,
          interval: row.interval,
          repetitions: row.repetitions,
          easeFactor: row.ease_factor,
          nextReview: row.next_review,
          lastReviewed: row.last_reviewed,
          correctStreak: row.correct_streak,
          totalReviews: row.total_reviews,
          isStarred: row.is_starred,
        }
      }
      localStorage.setItem(SRS_KEY, JSON.stringify(cards))
    }

    const { data: streakRow } = await supabase
      .from("user_streak")
      .select("current_streak, last_review_date")
      .eq("user_id", userId)
      .single()

    if (streakRow) {
      localStorage.setItem(
        STREAK_KEY,
        JSON.stringify({
          currentStreak: streakRow.current_streak,
          lastReviewDate: streakRow.last_review_date,
        }),
      )
    }

    const { data: starredRows } = await supabase
      .from("starred_words")
      .select("module_id, persian")
      .eq("user_id", userId)

    if (starredRows && starredRows.length > 0) {
      const byModule: Record<string, string[]> = {}
      for (const row of starredRows) {
        if (!byModule[row.module_id]) byModule[row.module_id] = []
        byModule[row.module_id].push(row.persian)
      }
      for (const [moduleId, words] of Object.entries(byModule)) {
        localStorage.setItem(`starred-words-${moduleId}`, JSON.stringify(words))
      }
    }

    const { data: activityRow } = await supabase
      .from("last_activity")
      .select("activity_type, module_id, activity_id")
      .eq("user_id", userId)
      .single()

    if (activityRow) {
      localStorage.setItem(
        ACTIVITY_KEY,
        JSON.stringify({
          type: activityRow.activity_type,
          moduleId: activityRow.module_id,
          id: activityRow.activity_id,
        }),
      )
    }
  } finally {
    isSyncingFromSupabase = false
  }
}

/**
 * Push current localStorage state to Supabase.
 * Called on progress-updated events (debounced).
 */
export async function pushProgressToSupabase(userId: string) {
  const supabase = createClient()

  const readingRaw = localStorage.getItem(READING_KEY)
  if (readingRaw) {
    const reading = JSON.parse(readingRaw)
    const rows: { user_id: string; module_id: string; story_id: string; status: string }[] = []
    for (const [moduleId, stories] of Object.entries(reading)) {
      for (const [storyId, status] of Object.entries(stories as Record<string, unknown>)) {
        const normalizedStatus = status === true ? "mastered" : String(status)
        rows.push({ user_id: userId, module_id: moduleId, story_id: storyId, status: normalizedStatus })
      }
    }
    if (rows.length > 0) {
      await supabase.from("reading_progress").upsert(rows, { onConflict: "user_id,module_id,story_id" })
    }
  }

  const writingRaw = localStorage.getItem(WRITING_KEY)
  if (writingRaw) {
    const writing = JSON.parse(writingRaw)
    const rows: { user_id: string; module_id: string; exercise_id: string }[] = []
    for (const [moduleId, exercises] of Object.entries(writing)) {
      for (const [exerciseId, completed] of Object.entries(exercises as Record<string, boolean>)) {
        if (completed) rows.push({ user_id: userId, module_id: moduleId, exercise_id: exerciseId })
      }
    }
    if (rows.length > 0) {
      await supabase.from("writing_progress").upsert(rows, { onConflict: "user_id,module_id,exercise_id" })
    }
  }

  const grammarRaw = localStorage.getItem(GRAMMAR_KEY)
  if (grammarRaw) {
    const grammar = JSON.parse(grammarRaw)
    const rows: { user_id: string; module_id: string; exercise_id: number }[] = []
    for (const [moduleId, data] of Object.entries(grammar)) {
      const exercises = (data as { completedExercises: number[] }).completedExercises || []
      for (const exerciseId of exercises) {
        rows.push({ user_id: userId, module_id: moduleId, exercise_id: exerciseId })
      }
    }
    if (rows.length > 0) {
      await supabase.from("grammar_progress").upsert(rows, { onConflict: "user_id,module_id,exercise_id" })
    }
  }

  const srsRaw = localStorage.getItem(SRS_KEY)
  if (srsRaw) {
    const cards = JSON.parse(srsRaw)
    const rows: object[] = []
    for (const card of Object.values(cards) as Record<string, unknown>[]) {
      rows.push({
        user_id: userId,
        persian: card.persian,
        english: card.english,
        transliteration: card.transliteration,
        module_id: card.moduleId,
        interval: card.interval,
        repetitions: card.repetitions,
        ease_factor: card.easeFactor,
        next_review: card.nextReview,
        last_reviewed: card.lastReviewed,
        correct_streak: card.correctStreak,
        total_reviews: card.totalReviews,
        is_starred: card.isStarred,
      })
    }
    if (rows.length > 0) {
      await supabase.from("srs_cards").upsert(rows, { onConflict: "user_id,persian" })
    }
  }

  const streakRaw = localStorage.getItem(STREAK_KEY)
  if (streakRaw) {
    const streak = JSON.parse(streakRaw)
    await supabase.from("user_streak").upsert(
      {
        user_id: userId,
        current_streak: streak.currentStreak || 0,
        last_review_date: streak.lastReviewDate || "",
      },
      { onConflict: "user_id" },
    )
  }

  const starredKeys = getStarredWordsKeys()
  for (const { key, moduleId } of starredKeys) {
    const words: string[] = JSON.parse(localStorage.getItem(key) || "[]")
    const rows = words.map((persian) => ({
      user_id: userId,
      module_id: moduleId,
      persian,
    }))
    if (rows.length > 0) {
      await supabase.from("starred_words").upsert(rows, { onConflict: "user_id,module_id,persian" })
    }
  }

  const activityRaw = localStorage.getItem(ACTIVITY_KEY)
  if (activityRaw) {
    const activity = JSON.parse(activityRaw)
    await supabase.from("last_activity").upsert(
      {
        user_id: userId,
        activity_type: activity.type,
        module_id: activity.moduleId,
        activity_id: String(activity.id),
      },
      { onConflict: "user_id" },
    )
  }
}
