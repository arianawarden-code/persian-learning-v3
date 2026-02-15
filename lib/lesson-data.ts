// ─── Types ───────────────────────────────────────────────────────

export interface LessonPhases {
  vocabIndices: [number, number]    // [start, end) into module vocabulary
  grammarIndex: number              // index into module grammar array
  readingStoryId: number            // story id in module reading array
  writingIndices: [number, number]  // [start, end) into module writing array
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
      vocabIndices: [0, 10],    // سلام through ببخشید
      grammarIndex: 0,          // "Saying 'I am...'"
      readingStoryId: 1,        // "First Meeting"
      writingIndices: [0, 3],   // word-order + fill-blank + build-word
    },
    nextLesson: { id: "2", title: "Greetings & Politeness" },
  },
  {
    id: "2",
    number: 2,
    title: "Greetings & Politeness",
    goal: "Master common greetings and polite expressions",
    timeEstimate: "7 min",
    phases: {
      vocabIndices: [10, 20],   // اسم through هست
      grammarIndex: 1,          // "Asking 'How are you?'"
      readingStoryId: 2,        // "Greetings"
      writingIndices: [3, 6],   // word-order + fill-blank + build-word
    },
    nextLesson: { id: "3", title: "At Home & Goodbye" },
  },
  {
    id: "3",
    number: 3,
    title: "Saying Goodbye",
    goal: "You’ll be able to say goodbye politely and use basic courtesy phrases in Persian",
    timeEstimate: "6 min",
    phases: {
      vocabIndices: [20, 25],   // چه through امروز
      grammarIndex: 2,          // "Using است and هست"
      readingStoryId: 3,        // "At Home"
      writingIndices: [6, 9],   // word-order + fill-blank + build-word
    },
    nextLesson: null,
  },
]

// ─── Lesson Definitions for Module 2 ───────────────────────────────

export const module2Lessons: Lesson[] = [
  {
    id: "1",
    number: 1,
    title: "Who Am I?",
    goal: "Learn to share your name, age, and where you're from",
    timeEstimate: "15 min",
    phases: {
      vocabIndices: [0, 10],    // اسم through دانشجو (identity + من/هستم/است)
      grammarIndex: 0,          // "Saying 'My name is...'"
      readingStoryId: 1,        // "My Name"
      writingIndices: [0, 3],   // word-order + fill-blank + build-word
    },
    nextLesson: { id: "2", title: "Pronouns & Origin" },
  },
  {
    id: "2",
    number: 2,
    title: "Pronouns & Origin",
    goal: "Master Persian pronouns and say where you're from",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [10, 20],   // تو through سن (pronouns + اهل/دوست)
      grammarIndex: 1,          // "Pronouns with the verb 'to be'"
      readingStoryId: 3,        // "Meeting a New Friend"
      writingIndices: [3, 6],   // word-order + fill-blank + build-word
    },
    nextLesson: { id: "3", title: "What I Do" },
  },
  {
    id: "3",
    number: 3,
    title: "What I Do",
    goal: "Talk about your job, where you live, and what languages you speak",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [20, 30],   // زبان through دکتر (verbs + professions)
      grammarIndex: 2,          // "Saying where you're from"
      readingStoryId: 5,        // "My Job"
      writingIndices: [6, 9],   // word-order + fill-blank + build-word
    },
    nextLesson: null,
  },
]

// ─── Lesson Definitions for Module 3 ───────────────────────────────

export const module3Lessons: Lesson[] = [
  {
    id: "1",
    number: 1,
    title: "My Family",
    goal: "Learn to talk about your immediate family using the ezafe construction",
    timeEstimate: "15 min",
    phases: {
      vocabIndices: [0, 10],    // خانواده through عمو
      grammarIndex: 0,          // "The Ezafe construction (-e)"
      readingStoryId: 1,        // "My Family"
      writingIndices: [0, 3],   // word-order + fill-blank + build-word
    },
    nextLesson: { id: "2", title: "Extended Family" },
  },
  {
    id: "2",
    number: 2,
    title: "Extended Family",
    goal: "Talk about extended family members and say what you have",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [10, 20],   // دایی through جوان
      grammarIndex: 1,          // "Saying 'I have...'"
      readingStoryId: 3,        // "Uncle's Visit"
      writingIndices: [3, 6],   // word-order + fill-blank + build-word
    },
    nextLesson: { id: "3", title: "Family Life" },
  },
  {
    id: "3",
    number: 3,
    title: "Family Life",
    goal: "Describe family members and talk about living together",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [20, 30],   // پیر through خانه
      grammarIndex: 2,          // "Describing family members"
      readingStoryId: 5,        // "A Kind Family"
      writingIndices: [6, 9],   // word-order + fill-blank + build-word
    },
    nextLesson: null,
  },
]

export function getLessonById(lessonId: string, moduleId?: string): Lesson | undefined {
  if (moduleId === "3") {
    return module3Lessons.find((l) => l.id === lessonId)
  }
  if (moduleId === "2") {
    return module2Lessons.find((l) => l.id === lessonId)
  }
  return module1Lessons.find((l) => l.id === lessonId)
}
