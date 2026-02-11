import type { VocabularyWord, ReadingExercise } from "@/lib/module-data"

// ─── Types ───────────────────────────────────────────────────────

export interface GrammarMicroCheck {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface LessonGrammar {
  title: string
  pattern: string
  patternParts: string[]
  examples: { persian: string; transliteration: string; english: string }[]
  note: string
  microCheck: GrammarMicroCheck
}

export interface WordOrderExercise {
  instruction: string
  tiles: string[]
  correct: string[]
}

export interface FillBlankExercise {
  sentence: string // use ___ for blank
  choices: string[]
  correctAnswer: string
}

export interface LessonWriting {
  wordOrder: WordOrderExercise
  fillBlank: FillBlankExercise
}

export interface LessonPhases {
  vocabIndices: [number, number] // [start, end) indices into module vocabulary
  grammar: LessonGrammar
  readingStoryId: number
  writing: LessonWriting
}

export interface Lesson {
  id: string
  number: number
  title: string
  goal: string
  timeEstimate: string
  phases: LessonPhases
  nextLesson: { id: string; title: string } | null
}

// ─── Lesson Definitions for Module 1 ───────────────────────────────

export const module1Lessons: Lesson[] = [
  {
    id: "1",
    number: 1,
    title: "Introducing Yourself",
    goal: "Learn to say hello and introduce yourself in Persian",
    timeEstimate: "15 min",
    phases: {
      vocabIndices: [0, 10], // سلام through ببخشید
      grammar: {
        title: "Saying 'I am...'",
        pattern: "من + [name] + هستم",
        patternParts: ["من", "[name]", "هستم"],
        examples: [
          { persian: "من علی هستم", transliteration: "man Ali hastam", english: "I am Ali" },
          { persian: "من آریانا هستم", transliteration: "man Ārianā hastam", english: "I am Ariana" },
        ],
        note: "In Persian, the verb 'هستم' (am) comes at the end of the sentence.",
        microCheck: {
          question: "What is the correct word order for 'I am Ali'?",
          options: ["هستم من علی", "من علی هستم", "علی من هستم", "من هستم علی"],
          correctAnswer: 1,
          explanation: "In Persian the pattern is: من (I) + name + هستم (am).",
        },
      },
      readingStoryId: 1,
      writing: {
        wordOrder: {
          instruction: "Arrange the words to say 'I am Ali'",
          tiles: ["من", "علی", "هستم"],
          correct: ["من", "علی", "هستم"],
        },
        fillBlank: {
          sentence: "من ___ هستم",
          choices: ["علی", "سلام", "اسم"],
          correctAnswer: "علی",
        },
      },
    },
    nextLesson: { id: "2", title: "Greetings & Politeness" },
  },
  {
    id: "2",
    number: 2,
    title: "Greetings & Politeness",
    goal: "Master common greetings and polite expressions",
    timeEstimate: "15 min",
    phases: {
      vocabIndices: [10, 20], // اسم through هست
      grammar: {
        title: "Asking 'How are you?'",
        pattern: "حال + شما + چطور + است؟",
        patternParts: ["حال", "شما", "چطور", "است؟"],
        examples: [
          { persian: "حال شما چطور است؟", transliteration: "hāl-e shomā chetor ast?", english: "How are you? (formal)" },
          { persian: "حالت چطوره؟", transliteration: "hālet chetore?", english: "How are you? (informal)" },
        ],
        note: "Use 'شما' for formal/respectful speech and 'تو' for informal speech.",
        microCheck: {
          question: "Which is the formal way to ask 'How are you?'",
          options: ["حالت چطوره؟", "حال شما چطور است؟", "خوبی؟", "چطوری؟"],
          correctAnswer: 1,
          explanation: "حال شما چطور است؟ uses the formal 'شما' (you).",
        },
      },
      readingStoryId: 2,
      writing: {
        wordOrder: {
          instruction: "Arrange the words to say 'I am well, thank you'",
          tiles: ["من", "خوب", "هستم", "ممنون"],
          correct: ["من", "خوب", "هستم", "ممنون"],
        },
        fillBlank: {
          sentence: "حال شما ___ است؟",
          choices: ["چطور", "خوب", "بد"],
          correctAnswer: "چطور",
        },
      },
    },
    nextLesson: { id: "3", title: "At Home & Goodbye" },
  },
  {
    id: "3",
    number: 3,
    title: "At Home & Goodbye",
    goal: "Talk about places and say goodbye properly",
    timeEstimate: "15 min",
    phases: {
      vocabIndices: [20, 25], // چه through امروز
      grammar: {
        title: "Using 'است' (is) and 'هست' (exists)",
        pattern: "[subject] + [adjective/noun] + است",
        patternParts: ["[subject]", "[adjective/noun]", "است"],
        examples: [
          { persian: "او دوست خوب است", transliteration: "oo doost-e khoob ast", english: "He/she is a good friend" },
          { persian: "امروز هوا خوب است", transliteration: "emrooz havā khoob ast", english: "The weather is good today" },
        ],
        note: "'است' (ast) is used for description, while 'هست' (hast) emphasizes existence.",
        microCheck: {
          question: "How do you say 'He is a good friend'?",
          options: ["او دوست خوب هستم", "او دوست خوب است", "او خوب دوست", "من دوست خوب است"],
          correctAnswer: 1,
          explanation: "Use 'است' (ast) for third person 'is', not 'هستم' (hastam) which means 'I am'.",
        },
      },
      readingStoryId: 3,
      writing: {
        wordOrder: {
          instruction: "Arrange the words to say 'Goodbye, see you tomorrow'",
          tiles: ["خداحافظ", "فردا", "می‌بینیم"],
          correct: ["خداحافظ", "فردا", "می‌بینیم"],
        },
        fillBlank: {
          sentence: "من امروز ___ هستم",
          choices: ["خانه", "سلام", "ممنون"],
          correctAnswer: "خانه",
        },
      },
    },
    nextLesson: null,
  },
]

export function getLessonById(lessonId: string): Lesson | undefined {
  return module1Lessons.find((l) => l.id === lessonId)
}
