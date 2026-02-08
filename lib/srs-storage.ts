// Spaced Repetition System (SM-2) engine with localStorage persistence

export interface SRSCard {
  persian: string
  english: string
  transliteration: string
  moduleId: string
  interval: number // days until next review
  repetitions: number
  easeFactor: number
  nextReview: number // timestamp
  lastReviewed: number // timestamp
  correctStreak: number
  totalReviews: number
  isStarred: boolean
}

const STORAGE_KEY = "srs-vocabulary-data"

function getCards(): Record<string, SRSCard> {
  if (typeof window === "undefined") return {}
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : {}
}

function saveCards(cards: Record<string, SRSCard>) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards))
  window.dispatchEvent(new Event("progress-updated"))
}

export function seedWordsFromModule(
  moduleId: string | number,
  words: { persian: string; english: string; transliteration: string }[],
) {
  if (typeof window === "undefined") return
  const cards = getCards()
  let changed = false

  for (const word of words) {
    if (!cards[word.persian]) {
      cards[word.persian] = {
        persian: word.persian,
        english: word.english,
        transliteration: word.transliteration,
        moduleId: String(moduleId),
        interval: 1,
        repetitions: 0,
        easeFactor: 2.5,
        nextReview: Date.now(), // due immediately on first seed
        lastReviewed: 0,
        correctStreak: 0,
        totalReviews: 0,
        isStarred: false,
      }
      changed = true
    }
  }

  if (changed) {
    saveCards(cards)
  }
}

export function syncStarredWords() {
  if (typeof window === "undefined") return
  const cards = getCards()
  let changed = false

  // Reset all starred flags first
  for (const key in cards) {
    if (cards[key].isStarred) {
      cards[key].isStarred = false
      changed = true
    }
  }

  // Scan all starred-words-{moduleId} keys
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith("starred-words-")) {
      const starred: string[] = JSON.parse(localStorage.getItem(key) || "[]")
      for (const persian of starred) {
        if (cards[persian]) {
          cards[persian].isStarred = true
          changed = true
        }
      }
    }
  }

  if (changed) {
    saveCards(cards)
  }
}

export function getDueWords(limit = 20): SRSCard[] {
  const cards = getCards()
  const now = Date.now()

  const due = Object.values(cards).filter((card) => card.nextReview <= now)

  // Sort: starred first, then by nextReview (oldest first)
  due.sort((a, b) => {
    if (a.isStarred !== b.isStarred) return a.isStarred ? -1 : 1
    return a.nextReview - b.nextReview
  })

  return due.slice(0, limit)
}

export function getAllCards(): SRSCard[] {
  return Object.values(getCards())
}

export function updateCardAfterReview(persian: string, quality: number) {
  const cards = getCards()
  const card = cards[persian]
  if (!card) return

  card.totalReviews++
  card.lastReviewed = Date.now()

  if (quality >= 3) {
    // Correct answer
    card.correctStreak++
    card.repetitions++

    if (card.repetitions === 1) {
      card.interval = 1
    } else if (card.repetitions === 2) {
      card.interval = 6
    } else {
      card.interval = Math.round(card.interval * card.easeFactor)
    }

    // Update ease factor based on quality (SM-2 formula)
    card.easeFactor = Math.max(
      1.3,
      card.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)),
    )
  } else {
    // Wrong answer — reset
    card.correctStreak = 0
    card.repetitions = 0
    card.interval = 1
    card.easeFactor = Math.max(1.3, card.easeFactor - 0.2)
  }

  card.nextReview = Date.now() + card.interval * 24 * 60 * 60 * 1000

  cards[persian] = card
  saveCards(cards)
}

export function getReviewStats(): { dueToday: number; totalCards: number } {
  const cards = getCards()
  const now = Date.now()
  const allCards = Object.values(cards)
  const dueToday = allCards.filter((card) => card.nextReview <= now).length

  return { dueToday, totalCards: allCards.length }
}

// --- Streak tracking ---

const STREAK_KEY = "srs-review-streak"

interface StreakData {
  currentStreak: number
  lastReviewDate: string // YYYY-MM-DD
}

function getDateString(date = new Date()): string {
  return date.toISOString().slice(0, 10)
}

function getStreakData(): StreakData {
  if (typeof window === "undefined") return { currentStreak: 0, lastReviewDate: "" }
  const stored = localStorage.getItem(STREAK_KEY)
  return stored ? JSON.parse(stored) : { currentStreak: 0, lastReviewDate: "" }
}

export function recordReviewCompletion() {
  if (typeof window === "undefined") return
  const data = getStreakData()
  const today = getDateString()

  if (data.lastReviewDate === today) return // already recorded today

  const yesterday = getDateString(new Date(Date.now() - 86400000))
  if (data.lastReviewDate === yesterday) {
    data.currentStreak++
  } else {
    data.currentStreak = 1
  }

  data.lastReviewDate = today
  localStorage.setItem(STREAK_KEY, JSON.stringify(data))
  window.dispatchEvent(new Event("progress-updated"))
}

export function getStreak(): number {
  const data = getStreakData()
  const today = getDateString()
  const yesterday = getDateString(new Date(Date.now() - 86400000))

  // Streak is still active if last review was today or yesterday
  if (data.lastReviewDate === today || data.lastReviewDate === yesterday) {
    return data.currentStreak
  }
  return 0
}

export function getNextReviewTime(): number | null {
  const cards = getCards()
  const allCards = Object.values(cards)
  if (allCards.length === 0) return null

  const now = Date.now()
  const future = allCards
    .filter((c) => c.nextReview > now)
    .sort((a, b) => a.nextReview - b.nextReview)

  return future.length > 0 ? future[0].nextReview : null
}
