// ─── Types ───────────────────────────────────────────────────────

export interface LessonPhases {
  vocabIndices: [number, number]    // [start, end) into module vocabulary
  grammarIndex: number              // index into module grammar array
  readingStoryIds: number[]          // story ids in module reading array
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
  culturalNote?: {
    title: string
    content: string
  }
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
      readingStoryIds: [1],      // "First Meeting"
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
      vocabIndices: [10, 21],   // نه through هست
      grammarIndex: 1,          // "Asking 'How are you?'"
      readingStoryIds: [2],      // "Greetings"
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
      vocabIndices: [21, 28],   // چه through یا
      grammarIndex: 2,          // "Using است and هست"
      readingStoryIds: [3],      // "At Home"
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
      readingStoryIds: [1],      // "My Name"
      writingIndices: [0, 6],   // 6 exercises per lesson
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
      readingStoryIds: [3],      // "Meeting a New Friend"
      writingIndices: [6, 12],  // 6 exercises per lesson
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
      readingStoryIds: [5],      // "My Job"
      writingIndices: [12, 18], // 6 exercises per lesson
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
      readingStoryIds: [1, 2],   // "My Family" + story 2
      writingIndices: [0, 6],   // 6 exercises per lesson
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
      readingStoryIds: [3, 4],   // "Uncle's Visit" + story 4
      writingIndices: [6, 12],  // 6 exercises per lesson
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
      readingStoryIds: [5, 6],   // "A Kind Family" + story 6
      writingIndices: [12, 18], // 6 exercises per lesson
    },
    nextLesson: null,
  },
]

// ─── Lesson Definitions for Module 4 ───────────────────────────────

export const module4Lessons: Lesson[] = [
  {
    id: "1",
    number: 1,
    title: "Counting Things",
    goal: "Learn numbers 0-9 and how to count things in Persian",
    timeEstimate: "15 min",
    phases: {
      vocabIndices: [0, 10],    // صفر through نه (0-9)
      grammarIndex: 0,          // "Counting things"
      readingStoryIds: [1, 2],   // "My Family" + story 2
      writingIndices: [0, 6],   // 6 exercises per lesson
    },
    nextLesson: { id: "2", title: "Saying Your Age" },
  },
  {
    id: "2",
    number: 2,
    title: "Saying Your Age",
    goal: "Learn numbers 10-19 and how to say your age in Persian",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [10, 20],   // ده through نوزده (10-19)
      grammarIndex: 1,          // "Saying your age"
      readingStoryIds: [3, 4],   // "How Old Are You?" + story 4
      writingIndices: [6, 12],  // 6 exercises per lesson
    },
    nextLesson: { id: "3", title: "Big Numbers" },
  },
  {
    id: "3",
    number: 3,
    title: "Big Numbers",
    goal: "Learn tens 20-100 and how to combine numbers in Persian",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [20, 31],   // بیست through هزار (20-1000)
      grammarIndex: 2,          // "Combining numbers"
      readingStoryIds: [5, 6],   // "A Big Family" + story 6
      writingIndices: [12, 18], // 6 exercises per lesson
    },
    nextLesson: null,
  },
]

// ─── Lesson Definitions for Module 5 ───────────────────────────────

export const module5Lessons: Lesson[] = [
  {
    id: "1",
    number: 1,
    title: "Days of the Week",
    goal: "Learn the seven days of the week and how to talk about your schedule",
    timeEstimate: "15 min",
    phases: {
      vocabIndices: [0, 10],    // شنبه through دیروز (days + today/tomorrow/yesterday)
      grammarIndex: 0,          // "Talking about your schedule"
      readingStoryIds: [1, 2],   // "My Week" + story 2
      writingIndices: [0, 6],   // 6 exercises per lesson
    },
    nextLesson: { id: "2", title: "Time Expressions" },
  },
  {
    id: "2",
    number: 2,
    title: "Time Expressions",
    goal: "Learn to talk about weeks, weekends, and use time expressions like 'every day' and 'next week'",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [10, 20],   // هفته through هر هفته (time expressions)
      grammarIndex: 1,          // "Using time expressions"
      readingStoryIds: [3, 4],   // "A Busy Week" + story 4
      writingIndices: [6, 12],  // 6 exercises per lesson
    },
    nextLesson: null,
  },
]

// ─── Lesson Definitions for Module 6 ───────────────────────────────

export const module6Lessons: Lesson[] = [
  {
    id: "1",
    number: 1,
    title: "Months of the Year",
    goal: "Learn the twelve Persian month names and how to say which month it is",
    timeEstimate: "15 min",
    phases: {
      vocabIndices: [0, 12],    // فروردین through اسفند (12 month names)
      grammarIndex: 0,          // "Saying which month it is"
      readingStoryIds: [1, 2],   // "The Persian Calendar" + story 2
      writingIndices: [0, 6],   // 6 exercises per lesson
    },
    nextLesson: { id: "2", title: "Seasons" },
    culturalNote: {
      title: "The Solar Hijri Calendar",
      content: "Iran uses the Solar Hijri calendar (گاه‌شماری هجری خورشیدی), not the Western Gregorian calendar. It is a solar calendar, meaning it follows the Earth's orbit around the sun, so the seasons always fall in the same months.\n\nThe calendar begins with Nowruz (نوروز), the Persian New Year, which falls on the spring equinox — around March 20 or 21 in the Gregorian calendar. This makes فروردین (Farvardin), the first month, a spring month.\n\nThe first six months have 31 days, the next five have 30 days, and the last month (اسفند) has 29 days (30 in a leap year).\n\nThe calendar counts years from the Hijra, the Prophet Muhammad's migration from Mecca to Medina in 622 CE. So the current year in Iran is roughly 621 or 622 years behind the Gregorian year.\n\nIranians use this calendar in daily life — for birthdays, school schedules, holidays, and official documents. In this lesson, you will learn all twelve month names.",
    },
  },
  {
    id: "2",
    number: 2,
    title: "Seasons",
    goal: "Learn the four seasons, connect months to seasons, and talk about your favorite time of year",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [12, 19],   // بهار through فصل (seasons + month/year/season)
      grammarIndex: 1,          // "Talking about seasons"
      readingStoryIds: [3, 4],   // "The Four Seasons" + story 4
      writingIndices: [6, 12],  // 6 exercises per lesson
    },
    nextLesson: null,
  },
]

// ─── Lesson Definitions for Module 7 ───────────────────────────────

export const module7Lessons: Lesson[] = [
  {
    id: "1",
    number: 1,
    title: "What Time Is It?",
    goal: "Learn to tell time, talk about today, tomorrow, and yesterday, and use basic time words like hour, minute, week, and month",
    timeEstimate: "15 min",
    phases: {
      vocabIndices: [0, 10],    // زمان through ماه
      grammarIndex: 0,          // "Telling the time"
      readingStoryIds: [1, 2],   // "What Time Is It?" + "Tomorrow Is Friday!"
      writingIndices: [0, 6],   // 6 exercises per lesson
    },
    nextLesson: { id: "2", title: "Morning, Noon & Night" },
  },
  {
    id: "2",
    number: 2,
    title: "Morning, Noon & Night",
    goal: "Learn the parts of the day, say when you do things, and use time adverbs like always, never, and sometimes",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [10, 20],   // سال through گاهی
      grammarIndex: 1,          // "Using always, never, and sometimes"
      readingStoryIds: [3, 4],   // "Morning Person" + "Always Late!"
      writingIndices: [6, 12],  // 6 exercises per lesson
    },
    nextLesson: { id: "3", title: "Before & After" },
  },
  {
    id: "3",
    number: 3,
    title: "Before & After",
    goal: "Learn to say half past, quarter past, ask what time it is, and use before and after with time expressions",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [20, 30],   // به‌موقع through قبل از
      grammarIndex: 2,          // "Saying before and after"
      readingStoryIds: [5, 6],   // "Before and After" + "On Time!"
      writingIndices: [12, 18], // 6 exercises per lesson
    },
    nextLesson: null,
  },
]

export const module8Lessons: Lesson[] = [
  {
    id: "1",
    number: 1,
    title: "Sun, Rain & Snow",
    goal: "Learn basic weather words like sunny, rainy, snowy, hot, and cold, and describe the weather using هَوا + adjective + اَست",
    timeEstimate: "15 min",
    phases: {
      vocabIndices: [0, 10],
      grammarIndex: 0,
      readingStoryIds: [1, 2],
      writingIndices: [0, 6],
    },
    nextLesson: { id: "2", title: "Four Seasons" },
  },
  {
    id: "2",
    number: 2,
    title: "Four Seasons",
    goal: "Learn the four seasons, say what the weather is like in each season, and use inside/outside with weather descriptions",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [10, 20],
      grammarIndex: 1,
      readingStoryIds: [3, 4],
      writingIndices: [6, 12],
    },
    nextLesson: { id: "3", title: "What Do I Need?" },
  },
  {
    id: "3",
    number: 3,
    title: "What Do I Need?",
    goal: "Learn weather items like umbrella and clothes, sky words like sun, moon, and stars, and say what you need for the weather",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [20, 30],
      grammarIndex: 2,
      readingStoryIds: [5, 6],
      writingIndices: [12, 18],
    },
    nextLesson: null,
  },
]

export const module9Lessons: Lesson[] = [
  {
    id: "1",
    number: 1,
    title: "Red, Blue & Green",
    goal: "Learn basic color names like red, blue, green, yellow, and ask what color something is using چِه رَنگی اَست؟",
    timeEstimate: "15 min",
    phases: {
      vocabIndices: [0, 10],
      grammarIndex: 0,
      readingStoryIds: [1, 2],
      writingIndices: [0, 6],
    },
    nextLesson: { id: "2", title: "Colors in Nature" },
  },
  {
    id: "2",
    number: 2,
    title: "Colors in Nature",
    goal: "Learn more colors like pink, purple, and gray, describe things with colors using the Ezafe construction, and talk about flowers, trees, and fruit",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [10, 20],
      grammarIndex: 1,
      readingStoryIds: [3, 4],
      writingIndices: [6, 12],
    },
    nextLesson: { id: "3", title: "Light & Dark" },
  },
  {
    id: "3",
    number: 3,
    title: "Light & Dark",
    goal: "Learn light and dark, golden and silver, compare colors using مِثلِ (like), and use words like which, that, all, and better",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [20, 30],
      grammarIndex: 2,
      readingStoryIds: [5, 6],
      writingIndices: [12, 18],
    },
    nextLesson: null,
  },
]

export const module10Lessons: Lesson[] = [
  {
    id: "1",
    number: 1,
    title: "Big, Small & Heavy",
    goal: "Learn basic adjectives for size and weight like big, small, long, short, full, empty, heavy, and light, and describe things using noun + adjective + است",
    timeEstimate: "15 min",
    phases: {
      vocabIndices: [0, 10],
      grammarIndex: 0,
      readingStoryIds: [1, 2],
      writingIndices: [0, 6],
    },
    nextLesson: { id: "2", title: "Comparing Things" },
  },
  {
    id: "2",
    number: 2,
    title: "Comparing Things",
    goal: "Learn comparative adjectives with -تر (taller, shorter, heavier, lighter) and words like more, less, half, and completely",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [10, 20],
      grammarIndex: 1,
      readingStoryIds: [3, 4],
      writingIndices: [6, 12],
    },
    nextLesson: { id: "3", title: "Almost, Very & Little by Little" },
  },
  {
    id: "3",
    number: 3,
    title: "Almost, Very & Little by Little",
    goal: "Learn intensifiers and adverbs like very, almost, completely, little by little, and mostly, and use them to make descriptions stronger or weaker",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [20, 30],
      grammarIndex: 2,
      readingStoryIds: [5, 6],
      writingIndices: [12, 18],
    },
    nextLesson: null,
  },
]

// ─── Lesson Definitions for Module 11 ──────────────────────────────

export const module11Lessons: Lesson[] = [
  {
    id: "1",
    number: 1,
    title: "Bread, Rice & Fruit",
    goal: "Learn basic food words like bread, rice, meat, chicken, fish, vegetables, and fruit, and say what you eat using من + [food] + می‌خورم",
    timeEstimate: "15 min",
    phases: {
      vocabIndices: [0, 10],
      grammarIndex: 0,
      readingStoryIds: [1, 2],
      writingIndices: [0, 6],
    },
    nextLesson: { id: "2", title: "Tea, Coffee & Flavors" },
  },
  {
    id: "2",
    number: 2,
    title: "Tea, Coffee & Flavors",
    goal: "Learn drinks like tea, coffee, and milk, plus taste words like delicious, fresh, hot, and cold, and describe food using [food] + [adjective] + است",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [10, 20],
      grammarIndex: 1,
      readingStoryIds: [3, 4],
      writingIndices: [6, 12],
    },
    nextLesson: { id: "3", title: "At the Restaurant" },
  },
  {
    id: "3",
    number: 3,
    title: "At the Restaurant",
    goal: "Learn to talk about eating, drinking, meals, and ordering food politely at a restaurant using لطفاً and می‌خواهم",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [20, 30],
      grammarIndex: 2,
      readingStoryIds: [5, 6],
      writingIndices: [12, 18],
    },
    nextLesson: null,
  },
]

// ─── Lesson Definitions for Module 12 ──────────────────────────────

export const module12Lessons: Lesson[] = [
  {
    id: "1",
    number: 1,
    title: "Water, Tea & Coffee",
    goal: "Learn basic everyday drinks like water, tea, coffee, milk, and juice, and ask for a drink politely using یِک + [container] + [drink] + لُطفاً",
    timeEstimate: "15 min",
    phases: {
      vocabIndices: [0, 10],
      grammarIndex: 0,
      readingStoryIds: [1, 2],
      writingIndices: [0, 6],
    },
    nextLesson: { id: "2", title: "Juice, Tea Types & More" },
  },
  {
    id: "2",
    number: 2,
    title: "Juice, Tea Types & More",
    goal: "Learn drink varieties like orange juice, green tea, and herbal tea, and build compound drink names using the Ezafe construction",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [10, 20],
      grammarIndex: 1,
      readingStoryIds: [3, 4],
      writingIndices: [6, 12],
    },
    nextLesson: { id: "3", title: "Doogh, Shakes & Flavors" },
  },
  {
    id: "3",
    number: 3,
    title: "Doogh, Shakes & Flavors",
    goal: "Learn Iranian drinks like doogh and delster, plus flavor words like sour, bitter, and fresh, and say you don't like something",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [20, 30],
      grammarIndex: 2,
      readingStoryIds: [5, 6],
      writingIndices: [12, 18],
    },
    nextLesson: { id: "4", title: "Ice, Sugar & Preferences" },
  },
  {
    id: "4",
    number: 4,
    title: "Ice, Sugar & Preferences",
    goal: "Learn to say how you like your drink — with or without ice, with or without sugar, plain, strong, or weak",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [30, 40],
      grammarIndex: 3,
      readingStoryIds: [7, 8],
      writingIndices: [18, 24],
    },
    nextLesson: null,
  },
]

// ─── Lesson Definitions for Module 13 ──────────────────────────────

export const module13Lessons: Lesson[] = [
  {
    id: "1",
    number: 1,
    title: "Common Fruits",
    goal: "Learn common fruits like apple, banana, orange, grape, and watermelon, and say what you want to eat using من + [fruit] + می‌خواهم",
    timeEstimate: "15 min",
    phases: {
      vocabIndices: [0, 10],
      grammarIndex: 0,
      readingStoryIds: [1, 2],
      writingIndices: [0, 6],
    },
    nextLesson: { id: "2", title: "More Fruits" },
  },
  {
    id: "2",
    number: 2,
    title: "More Fruits",
    goal: "Learn tropical and dried fruits like mango, peach, coconut, dates, and olives, and say you like something a lot using من + [fruit] + خیلی دوست دارم",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [10, 20],
      grammarIndex: 1,
      readingStoryIds: [3, 4],
      writingIndices: [6, 12],
    },
    nextLesson: { id: "3", title: "Common Vegetables" },
  },
  {
    id: "3",
    number: 3,
    title: "Common Vegetables",
    goal: "Learn common vegetables like tomato, potato, onion, carrot, and cucumber, and ask what someone wants using چه + [food] + می‌خواهید؟",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [20, 30],
      grammarIndex: 2,
      readingStoryIds: [5, 6],
      writingIndices: [12, 18],
    },
    nextLesson: { id: "4", title: "More Vegetables & Legumes" },
  },
  {
    id: "4",
    number: 4,
    title: "More Vegetables & Legumes",
    goal: "Learn vegetables like garlic, mushroom, cabbage, and legumes like beans and chickpeas, and list ingredients using [food] + با + [item] + و + [item]",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [30, 40],
      grammarIndex: 3,
      readingStoryIds: [7, 8],
      writingIndices: [18, 24],
    },
    nextLesson: null,
  },
]

// ─── Lesson Definitions for Module 14 ──────────────────────────────

export const module14Lessons: Lesson[] = [
  {
    id: "1",
    number: 1,
    title: "Meals & Eating",
    goal: "Learn meal names like breakfast, lunch, dinner, and snack, plus the verbs 'to eat' and 'to drink', and say what you eat for each meal using من + برایِ + [meal] + [food] + می‌خورم",
    timeEstimate: "15 min",
    phases: {
      vocabIndices: [0, 10],
      grammarIndex: 0,
      readingStoryIds: [1, 2],
      writingIndices: [0, 6],
    },
    nextLesson: { id: "2", title: "Cooking & Table Setting" },
  },
  {
    id: "2",
    number: 2,
    title: "Cooking & Table Setting",
    goal: "Learn cooking words like cooked, raw, and ready, plus table items like plate, spoon, fork, and knife, and say if food is ready using [food] + آمادِه + اَست/نیست",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [10, 20],
      grammarIndex: 1,
      readingStoryIds: [3, 4],
      writingIndices: [6, 12],
    },
    nextLesson: { id: "3", title: "Tastes & Hunger" },
  },
  {
    id: "3",
    number: 3,
    title: "Tastes & Hunger",
    goal: "Learn taste words like delicious, sweet, salty, spicy, and sour, plus feelings like hungry, full, and thirsty, and express how you feel using من + [state] + هَستَم",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [20, 30],
      grammarIndex: 2,
      readingStoryIds: [5, 6],
      writingIndices: [12, 18],
    },
    nextLesson: { id: "4", title: "Dishes & Eating Habits" },
  },
  {
    id: "4",
    number: 4,
    title: "Dishes & Eating Habits",
    goal: "Learn dish words like dessert, salad, soup, and portion, plus eating habits like homemade, takeout, eating little, and eating a lot, and say how much you eat using من + کَم/زیاد + می‌خورم",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [30, 40],
      grammarIndex: 3,
      readingStoryIds: [7, 8],
      writingIndices: [18, 24],
    },
    nextLesson: null,
  },
]

// ─── Lesson Definitions for Module 15 ──────────────────────────────

export const module15Lessons: Lesson[] = [
  {
    id: "1",
    number: 1,
    title: "Shops & Shopping",
    goal: "Learn shopping places like shop, market, and supermarket, plus people like seller and customer, and say where you go shopping using من + به + [place] + می‌رَوَم",
    timeEstimate: "15 min",
    phases: {
      vocabIndices: [0, 10],
      grammarIndex: 0,
      readingStoryIds: [1, 2],
      writingIndices: [0, 6],
    },
    nextLesson: { id: "2", title: "Prices & Payment" },
  },
  {
    id: "2",
    number: 2,
    title: "Prices & Payment",
    goal: "Learn price words like cheap, expensive, and discount, plus payment words like cash, card, and receipt, and ask the price using قِیمتِ + [item] + چَند اَست؟",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [10, 20],
      grammarIndex: 1,
      readingStoryIds: [3, 4],
      writingIndices: [6, 12],
    },
    nextLesson: { id: "3", title: "Items & Actions" },
  },
  {
    id: "3",
    number: 3,
    title: "Items & Actions",
    goal: "Learn shopping action words like bag, size, exchange, and return, and say what you want to buy using مَن + می‌خواهَم + [item] + بِخَرَم",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [20, 30],
      grammarIndex: 2,
      readingStoryIds: [5, 6],
      writingIndices: [12, 18],
    },
    nextLesson: null,
  },
]

// ─── Lesson Definitions for Module 16 ───────────────────────────────

export const module16Lessons: Lesson[] = [
  {
    id: "1",
    number: 1,
    title: "Money & Payment Basics",
    goal: "Learn basic money words like money, price, cheap, and expensive, plus payment words like cash, card, and account, and say how you pay using مَن + با + [method] + می‌پَردازَم",
    timeEstimate: "15 min",
    phases: {
      vocabIndices: [0, 10],
      grammarIndex: 0,
      readingStoryIds: [1, 2],
      writingIndices: [0, 6],
    },
    nextLesson: { id: "2", title: "Comparing Prices" },
  },
  {
    id: "2",
    number: 2,
    title: "Comparing Prices",
    goal: "Learn comparison words like more expensive, cheaper, and affordable, and say if the price is right using این + قِیمت + [adjective] + اَست",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [10, 20],
      grammarIndex: 1,
      readingStoryIds: [3, 4],
      writingIndices: [6, 12],
    },
    nextLesson: { id: "3", title: "Earning & Spending" },
  },
  {
    id: "3",
    number: 3,
    title: "Earning & Spending",
    goal: "Learn earning and spending words like coin, banknote, income, and loan, and ask to borrow money using می‌تَوانَم + قَرض + بِگیرَم؟",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [20, 30],
      grammarIndex: 2,
      readingStoryIds: [5, 6],
      writingIndices: [12, 18],
    },
    nextLesson: null,
  },
]

// ─── Lesson Definitions for Module 17 ───────────────────────────────

export const module17Lessons: Lesson[] = [
  {
    id: "1",
    number: 1,
    title: "Basic Clothing Items",
    goal: "Learn basic clothing words like shirt, pants, coat, shoe, and hat, and say what you are wearing using مَن + [clothing] + می‌پوشَم",
    timeEstimate: "15 min",
    phases: {
      vocabIndices: [0, 10],
      grammarIndex: 0,
      readingStoryIds: [1, 2],
      writingIndices: [0, 6],
    },
    nextLesson: { id: "2", title: "Accessories & Description" },
  },
  {
    id: "2",
    number: 2,
    title: "Accessories & Description",
    goal: "Learn accessories like glasses, watch, bag, scarf, and belt, plus color and size, and ask what color something is using رَنگِ + [item] + چیست؟",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [10, 20],
      grammarIndex: 1,
      readingStoryIds: [3, 4],
      writingIndices: [6, 12],
    },
    nextLesson: { id: "3", title: "Clothing Details & Shopping" },
  },
  {
    id: "3",
    number: 3,
    title: "Clothing Details & Shopping",
    goal: "Learn clothing details like pocket, sleeve, button, zipper, and fabric, and say if clothes fit using این + [item] + اَندازه‌ام + هَست/نیست",
    timeEstimate: "12 min",
    phases: {
      vocabIndices: [20, 30],
      grammarIndex: 2,
      readingStoryIds: [5, 6],
      writingIndices: [12, 18],
    },
    nextLesson: null,
  },
]

export function getLessonById(lessonId: string, moduleId?: string): Lesson | undefined {
  if (moduleId === "17") {
    return module17Lessons.find((l) => l.id === lessonId)
  }
  if (moduleId === "16") {
    return module16Lessons.find((l) => l.id === lessonId)
  }
  if (moduleId === "15") {
    return module15Lessons.find((l) => l.id === lessonId)
  }
  if (moduleId === "14") {
    return module14Lessons.find((l) => l.id === lessonId)
  }
  if (moduleId === "13") {
    return module13Lessons.find((l) => l.id === lessonId)
  }
  if (moduleId === "12") {
    return module12Lessons.find((l) => l.id === lessonId)
  }
  if (moduleId === "11") {
    return module11Lessons.find((l) => l.id === lessonId)
  }
  if (moduleId === "10") {
    return module10Lessons.find((l) => l.id === lessonId)
  }
  if (moduleId === "9") {
    return module9Lessons.find((l) => l.id === lessonId)
  }
  if (moduleId === "8") {
    return module8Lessons.find((l) => l.id === lessonId)
  }
  if (moduleId === "7") {
    return module7Lessons.find((l) => l.id === lessonId)
  }
  if (moduleId === "6") {
    return module6Lessons.find((l) => l.id === lessonId)
  }
  if (moduleId === "5") {
    return module5Lessons.find((l) => l.id === lessonId)
  }
  if (moduleId === "4") {
    return module4Lessons.find((l) => l.id === lessonId)
  }
  if (moduleId === "3") {
    return module3Lessons.find((l) => l.id === lessonId)
  }
  if (moduleId === "2") {
    return module2Lessons.find((l) => l.id === lessonId)
  }
  return module1Lessons.find((l) => l.id === lessonId)
}
