export interface Module {
  id: string | number
  title: string
  description: string
  level: "alphabet" | "beginner" | "intermediate" | "advanced"
  topics: string[]
}

export interface VocabularyWord {
  persian: string
  transliteration: string
  english: string
  example: string
  exampleTranslation: string
}

export interface ReadingExercise {
  id: number
  title: string
  text: string
  textTransliteration?: string
  textTranslation: string
  questions: {
    question: string
    options: string[]
    correctAnswer: number
  }[]
}

export interface GrammarExercise {
  id: number
  type: "letter-position" | "letter-identification" | "word-analysis"
  instruction: string
  // Teaching content shown before the quiz
  teachingContent?: {
    title: string
    explanation: string
    examples: {
      label: string
      persian: string
      description: string
    }[]
  }
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

// Define WritingExercise interface
export interface WritingExercise {
  id: number
  type: "build-word" | "sentence"
  instruction: string
  targetWord?: string
  targetWordTransliteration?: string
  availableLetters?: string[]
  prompt?: string
}

export interface ModuleContent {
  moduleId: string | number
  vocabulary: VocabularyWord[]
  reading: ReadingExercise[]
  writing: WritingExercise[]
  grammar?: GrammarExercise[]
}

export const modules: Module[] = [
  // ALPHABET MODULES (A-1 to A-5)
  {
    id: "A-1",
    title: "Letters: Alef to Zhe",
    description: "Learn the first 6 Persian letters, their forms, and basic diacritics",
    level: "alphabet",
    topics: ["Letters ا ب پ ت ث ج", "Letter forms", "Basic diacritics", "Simple words"],
  },
  {
    id: "A-2",
    title: "Letters: Che to Zay",
    description: "Master the next 6 letters and practice connecting them",
    level: "alphabet",
    topics: ["Letters چ ح خ د ذ ر ز", "Connecting letters", "Word building", "Diacritics practice"],
  },
  {
    id: "A-3",
    title: "Letters: Zhe to Tâ",
    description: "Learn letters with dots and special forms",
    level: "alphabet",
    topics: ["Letters ژ س ش ص ض ط", "Dotted letters", "Special forms", "Writing practice"],
  },
  {
    id: "A-4",
    title: "Letters: Za to Kaf",
    description: "Master heavy letters and complex connections",
    level: "alphabet",
    topics: ["Letters ظ ع غ ف ق ک", "Heavy letters", "Complex forms", "Word construction"],
  },
  {
    id: "A-5",
    title: "Letters: Gaf to Ya",
    description: "Complete the alphabet and master all letter combinations",
    level: "alphabet",
    topics: ["Letters گ ل م ن و ه ی", "Final forms", "All diacritics", "Complete words"],
  },

  // BEGINNER MODULES (1-30)
  {
    id: 1,
    title: "Foundation & Greetings",
    description: "Learn the Persian alphabet, basic greetings, and essential phrases for everyday interactions",
    level: "beginner",
    topics: ["Persian alphabet", "Basic greetings", "Introductions", "Common phrases"],
  },
  {
    id: 2,
    title: "Numbers & Time",
    description: "Master numbers, telling time, days of the week, and months in Persian",
    level: "beginner",
    topics: ["Numbers 1-100", "Telling time", "Days & months"],
  },
  {
    id: 3,
    title: "Family & Relationships",
    description: "Vocabulary and expressions for talking about family members and relationships",
    level: "beginner",
    topics: ["Family members", "Relationships", "Possessive forms"],
  },
  {
    id: 4,
    title: "Daily Routines",
    description: "Express daily activities and routines in present tense",
    level: "beginner",
    topics: ["Daily activities", "Present tense", "Time expressions"],
  },
  {
    id: 5,
    title: "Food & Dining",
    description: "Learn food vocabulary, ordering at restaurants, and expressing preferences",
    level: "beginner",
    topics: ["Food items", "Restaurant phrases", "Likes/dislikes"],
  },
  {
    id: 6,
    title: "Colors & Descriptions",
    description: "Describe objects, people, and places using colors and adjectives",
    level: "beginner",
    topics: ["Colors", "Adjectives", "Descriptions"],
  },
  {
    id: 7,
    title: "Locations & Directions",
    description: "Ask for and give directions, talk about locations and places",
    level: "beginner",
    topics: ["Directions", "Prepositions", "City vocabulary"],
  },
  {
    id: 8,
    title: "Shopping Basics",
    description: "Essential vocabulary and phrases for shopping and bargaining",
    level: "beginner",
    topics: ["Shopping phrases", "Prices", "Bargaining"],
  },
  {
    id: 9,
    title: "Transportation",
    description: "Discuss different modes of transportation and travel",
    level: "beginner",
    topics: ["Transport types", "Travel phrases", "Verbs of motion"],
  },
  {
    id: 10,
    title: "Home & Living",
    description: "Vocabulary for home, furniture, and household items",
    level: "beginner",
    topics: ["Rooms", "Furniture", "Household items"],
  },
  {
    id: 11,
    title: "Weather & Seasons",
    description: "Talk about weather conditions, seasons, and nature in Persian",
    level: "beginner",
    topics: ["Weather vocabulary", "Seasons", "Temperature", "Nature words"],
  },
  {
    id: 12,
    title: "Hobbies & Interests",
    description: "Express your hobbies, interests, and favorite activities",
    level: "beginner",
    topics: ["Sports", "Entertainment", "Hobbies", "Expressing likes/dislikes"],
  },
  {
    id: 13,
    title: "Body & Health",
    description: "Learn body parts and express health conditions",
    level: "beginner",
    topics: ["Body parts", "Health vocabulary", "Medical phrases"],
  },
  {
    id: 14,
    title: "Shopping & Money",
    description: "Navigate shopping scenarios and handle money transactions",
    level: "beginner",
    topics: ["Currency", "Shopping verbs", "Price negotiation"],
  },
  {
    id: 15,
    title: "Occupations & Work",
    description: "Discuss jobs, professions, and workplace vocabulary",
    level: "beginner",
    topics: ["Job titles", "Workplace", "Work activities"],
  },
  {
    id: 16,
    title: "Past Tense Introduction",
    description: "Learn to talk about past events and experiences",
    level: "beginner",
    topics: ["Simple past tense", "Past activities", "Time markers"],
  },
  {
    id: 17,
    title: "Clothing & Fashion",
    description: "Vocabulary for clothing, accessories, and personal style",
    level: "beginner",
    topics: ["Clothing items", "Colors", "Style expressions"],
  },
  {
    id: 18,
    title: "Technology & Media",
    description: "Modern vocabulary for technology, internet, and social media",
    level: "beginner",
    topics: ["Tech vocabulary", "Internet terms", "Social media"],
  },
  {
    id: 19,
    title: "Education & Learning",
    description: "School-related vocabulary and educational expressions",
    level: "beginner",
    topics: ["School subjects", "Education system", "Learning verbs"],
  },
  {
    id: 20,
    title: "Animals & Nature",
    description: "Learn about animals, plants, and natural environments",
    level: "beginner",
    topics: ["Animal names", "Nature vocabulary", "Environmental terms"],
  },
  {
    id: 21,
    title: "Emotions & Feelings",
    description: "Express emotions, feelings, and psychological states",
    level: "beginner",
    topics: ["Emotion words", "Feeling expressions", "Mood vocabulary"],
  },
  {
    id: 22,
    title: "Travel & Tourism",
    description: "Essential phrases for traveling and tourist situations",
    level: "beginner",
    topics: ["Travel phrases", "Hotel vocabulary", "Tourist activities"],
  },
  {
    id: 23,
    title: "Celebrations & Holidays",
    description: "Cultural celebrations, holidays, and festive vocabulary",
    level: "beginner",
    topics: ["Persian holidays", "Nowruz", "Celebration phrases"],
  },
  {
    id: 24,
    title: "Sports & Activities",
    description: "Sports terminology and recreational activities",
    level: "beginner",
    topics: ["Sports names", "Game vocabulary", "Exercise terms"],
  },
  {
    id: 25,
    title: "Communication Basics",
    description: "Phone calls, messages, and basic communication skills",
    level: "beginner",
    topics: ["Phone phrases", "Messaging", "Communication verbs"],
  },
  {
    id: 26,
    title: "Future Tense",
    description: "Express future plans, intentions, and predictions",
    level: "beginner",
    topics: ["Future tense", "Planning expressions", "Time markers"],
  },
  {
    id: 27,
    title: "Comparisons",
    description: "Compare people, objects, and experiences",
    level: "beginner",
    topics: ["Comparative forms", "Superlatives", "Comparison phrases"],
  },
  {
    id: 28,
    title: "Questions & Answers",
    description: "Master question formation and appropriate responses",
    level: "beginner",
    topics: ["Question words", "Question patterns", "Answer structures"],
  },
  {
    id: 29,
    title: "Polite Requests",
    description: "Make polite requests, offers, and suggestions",
    level: "beginner",
    topics: ["Polite forms", "Request phrases", "Formal speech"],
  },
  {
    id: 30,
    title: "Beginner Review",
    description: "Comprehensive review of all beginner-level content",
    level: "beginner",
    topics: ["Grammar review", "Vocabulary consolidation", "Practice exercises"],
  },

  // INTERMEDIATE MODULES (31-60)
  {
    id: 31,
    title: "Intermediate Grammar Foundations",
    description: "Build upon basic grammar with more complex structures",
    level: "intermediate",
    topics: ["Compound verbs", "Verb patterns", "Grammar review"],
  },
  {
    id: 32,
    title: "Advanced Conversations",
    description: "Engage in longer, more natural conversations",
    level: "intermediate",
    topics: ["Conversation strategies", "Natural speech", "Discourse markers"],
  },
  {
    id: 33,
    title: "Business Persian Basics",
    description: "Professional vocabulary and business communication",
    level: "intermediate",
    topics: ["Business terms", "Formal writing", "Professional etiquette"],
  },
  {
    id: 34,
    title: "Media & News",
    description: "Understand news reports and media Persian",
    level: "intermediate",
    topics: ["News vocabulary", "Media language", "Current events"],
  },
  {
    id: 35,
    title: "Persian Literature Introduction",
    description: "Introduction to classical and modern Persian literature",
    level: "intermediate",
    topics: ["Literary terms", "Poetry basics", "Famous authors"],
  },
  {
    id: 36,
    title: "Regional Dialects",
    description: "Understand variations in Persian across different regions",
    level: "intermediate",
    topics: ["Dialect differences", "Regional vocabulary", "Tehrani dialect"],
  },
  {
    id: 37,
    title: "Complex Sentences",
    description: "Create complex sentences with multiple clauses",
    level: "intermediate",
    topics: ["Subordinate clauses", "Conjunctions", "Sentence linking"],
  },
  {
    id: 38,
    title: "Conditional Sentences",
    description: "Express hypothetical situations and conditions",
    level: "intermediate",
    topics: ["If clauses", "Conditional forms", "Hypotheticals"],
  },
  {
    id: 39,
    title: "Reported Speech",
    description: "Report what others have said indirectly",
    level: "intermediate",
    topics: ["Indirect speech", "Reporting verbs", "Speech patterns"],
  },
  {
    id: 40,
    title: "Persian Culture & Traditions",
    description: "Deep dive into Persian culture, customs, and traditions",
    level: "intermediate",
    topics: ["Cultural practices", "Social norms", "Traditional customs"],
  },
  {
    id: 41,
    title: "Formal vs Informal Speech",
    description: "Navigate between formal and informal registers",
    level: "intermediate",
    topics: ["Register differences", "Formal language", "Informal expressions"],
  },
  {
    id: 42,
    title: "Medical Persian",
    description: "Healthcare vocabulary and medical situations",
    level: "intermediate",
    topics: ["Medical terms", "Symptoms", "Healthcare system"],
  },
  {
    id: 43,
    title: "Legal & Administrative",
    description: "Legal terminology and administrative procedures",
    level: "intermediate",
    topics: ["Legal vocabulary", "Official documents", "Administrative terms"],
  },
  {
    id: 44,
    title: "Environmental Issues",
    description: "Discuss environmental topics and sustainability",
    level: "intermediate",
    topics: ["Environment vocabulary", "Climate change", "Conservation"],
  },
  {
    id: 45,
    title: "Persian Poetry",
    description: "Explore classical Persian poetry and poetic forms",
    level: "intermediate",
    topics: ["Poetry forms", "Famous poets", "Literary devices"],
  },
  {
    id: 46,
    title: "Historical Narratives",
    description: "Discuss Persian history and historical events",
    level: "intermediate",
    topics: ["Historical vocabulary", "Past narratives", "Historical figures"],
  },
  {
    id: 47,
    title: "Debate & Argumentation",
    description: "Express opinions and engage in debates",
    level: "intermediate",
    topics: ["Opinion phrases", "Arguments", "Persuasion techniques"],
  },
  {
    id: 48,
    title: "Scientific Persian",
    description: "Scientific terminology and academic language",
    level: "intermediate",
    topics: ["Scientific terms", "Academic vocabulary", "Research language"],
  },
  {
    id: 49,
    title: "Arts & Entertainment",
    description: "Discuss arts, cinema, music, and entertainment",
    level: "intermediate",
    topics: ["Art vocabulary", "Cinema terms", "Music genres"],
  },
  {
    id: 50,
    title: "Social Issues",
    description: "Discuss contemporary social issues and concerns",
    level: "intermediate",
    topics: ["Social vocabulary", "Modern issues", "Society topics"],
  },
  {
    id: 51,
    title: "Economics & Finance",
    description: "Economic terminology and financial discussions",
    level: "intermediate",
    topics: ["Economic terms", "Financial vocabulary", "Banking"],
  },
  {
    id: 52,
    title: "Politics & Government",
    description: "Political vocabulary and governmental systems",
    level: "intermediate",
    topics: ["Political terms", "Government structure", "Civic vocabulary"],
  },
  {
    id: 53,
    title: "Philosophy & Thought",
    description: "Philosophical concepts and abstract thinking",
    level: "intermediate",
    topics: ["Philosophical terms", "Abstract concepts", "Reasoning"],
  },
  {
    id: 54,
    title: "Passive Voice",
    description: "Master passive constructions in Persian",
    level: "intermediate",
    topics: ["Passive forms", "Voice change", "Usage contexts"],
  },
  {
    id: 55,
    title: "Relative Clauses",
    description: "Use relative clauses to add detail and complexity",
    level: "intermediate",
    topics: ["Relative pronouns", "Clause construction", "Complex descriptions"],
  },
  {
    id: 56,
    title: "Cause & Effect",
    description: "Express causality and consequences",
    level: "intermediate",
    topics: ["Causal expressions", "Result phrases", "Logical connections"],
  },
  {
    id: 57,
    title: "Time & Sequence",
    description: "Advanced time expressions and sequencing events",
    level: "intermediate",
    topics: ["Time phrases", "Sequence markers", "Chronological order"],
  },
  {
    id: 58,
    title: "Written Correspondence",
    description: "Formal and informal letter writing",
    level: "intermediate",
    topics: ["Letter formats", "Email writing", "Correspondence etiquette"],
  },
  {
    id: 59,
    title: "Presentation Skills",
    description: "Give presentations and speeches in Persian",
    level: "intermediate",
    topics: ["Presentation vocabulary", "Speech organization", "Public speaking"],
  },
  {
    id: 60,
    title: "Intermediate Review",
    description: "Comprehensive review of intermediate-level content",
    level: "intermediate",
    topics: ["Grammar consolidation", "Vocabulary review", "Skill assessment"],
  },

  // ADVANCED MODULES (61-90)
  {
    id: 61,
    title: "Advanced Grammar & Syntax",
    description: "Master complex grammatical structures and sophisticated sentence construction",
    level: "advanced",
    topics: ["Complex sentences", "Subjunctive mood", "Passive voice", "Advanced syntax"],
  },
  {
    id: 62,
    title: "Idioms & Expressions",
    description: "Learn colloquial expressions, idioms, and proverbs used in everyday Persian",
    level: "advanced",
    topics: ["Common idioms", "Proverbs", "Colloquialisms", "Cultural expressions"],
  },
  {
    id: 63,
    title: "Academic & Formal Persian",
    description: "Master academic writing and formal discourse",
    level: "advanced",
    topics: ["Academic vocabulary", "Essay writing", "Research terminology", "Formal register"],
  },
  {
    id: 64,
    title: "Fluency & Native Expression",
    description: "Achieve native-like fluency and natural expression",
    level: "advanced",
    topics: ["Native patterns", "Natural speech", "Fluency techniques", "Spontaneous speaking"],
  },
  {
    id: 65,
    title: "Classical Persian Literature",
    description: "Study classical Persian literary works and poetry",
    level: "advanced",
    topics: ["Hafez", "Rumi", "Ferdowsi", "Classical poetry analysis"],
  },
  {
    id: 66,
    title: "Modern Persian Literature",
    description: "Explore contemporary Persian literature and authors",
    level: "advanced",
    topics: ["Modern novels", "Contemporary poetry", "Literary criticism"],
  },
  {
    id: 67,
    title: "Persian Linguistics",
    description: "Linguistic analysis of Persian language structure",
    level: "advanced",
    topics: ["Phonology", "Morphology", "Syntax analysis", "Language history"],
  },
  {
    id: 68,
    title: "Translation Techniques",
    description: "Develop skills for translating between Persian and other languages",
    level: "advanced",
    topics: ["Translation strategies", "Cultural adaptation", "Interpretation skills"],
  },
  {
    id: 69,
    title: "Persian Calligraphy & Writing",
    description: "Master the art of Persian calligraphy and elegant writing",
    level: "advanced",
    topics: ["Nastaliq script", "Calligraphy styles", "Artistic writing"],
  },
  {
    id: 70,
    title: "Advanced Business Persian",
    description: "Professional communication for business contexts",
    level: "advanced",
    topics: ["Business negotiation", "Contract language", "Corporate communication"],
  },
  {
    id: 71,
    title: "Legal Persian",
    description: "Specialized legal terminology and judicial language",
    level: "advanced",
    topics: ["Legal documents", "Court language", "Judicial terminology"],
  },
  {
    id: 72,
    title: "Medical Persian",
    description: "Advanced medical and healthcare vocabulary",
    level: "advanced",
    topics: ["Medical terminology", "Patient care", "Healthcare communication"],
  },
  {
    id: 73,
    title: "Persian in Media",
    description: "Analyze Persian media, journalism, and broadcasting",
    level: "advanced",
    topics: ["News writing", "Journalism", "Broadcasting language"],
  },
  {
    id: 74,
    title: "Rhetorical Devices",
    description: "Master rhetorical strategies and persuasive language",
    level: "advanced",
    topics: ["Rhetoric", "Persuasion", "Argumentation", "Stylistic devices"],
  },
  {
    id: 75,
    title: "Persian Humor & Wit",
    description: "Understand and use humor, sarcasm, and wordplay",
    level: "advanced",
    topics: ["Jokes", "Wordplay", "Sarcasm", "Cultural humor"],
  },
  {
    id: 76,
    title: "Regional Variations",
    description: "Deep understanding of dialectal variations across Persian-speaking regions",
    level: "advanced",
    topics: ["Iranian dialects", "Dari", "Tajiki", "Regional differences"],
  },
  {
    id: 77,
    title: "Persian Philosophy",
    description: "Explore philosophical texts and abstract thinking",
    level: "advanced",
    topics: ["Philosophical discourse", "Abstract concepts", "Critical thinking"],
  },
  {
    id: 78,
    title: "Historical Texts",
    description: "Read and analyze historical Persian documents",
    level: "advanced",
    topics: ["Historical documents", "Archive reading", "Old Persian"],
  },
  {
    id: 79,
    title: "Persian Cinema & Drama",
    description: "Analyze Persian films, theater, and dramatic arts",
    level: "advanced",
    topics: ["Film analysis", "Theater", "Dramatic language", "Screenplay reading"],
  },
  {
    id: 80,
    title: "Advanced Poetry Analysis",
    description: "In-depth analysis of classical and modern Persian poetry",
    level: "advanced",
    topics: ["Poetic forms", "Meter", "Rhyme schemes", "Literary analysis"],
  },
  {
    id: 81,
    title: "Persian Music & Lyrics",
    description: "Understand Persian music traditions and lyrical composition",
    level: "advanced",
    topics: ["Traditional music", "Song lyrics", "Musical terminology"],
  },
  {
    id: 82,
    title: "Sufism & Mysticism",
    description: "Explore Sufi literature and mystical Persian texts",
    level: "advanced",
    topics: ["Sufi poetry", "Mystical concepts", "Spiritual vocabulary"],
  },
  {
    id: 83,
    title: "Advanced Writing Styles",
    description: "Master various writing styles and genres",
    level: "advanced",
    topics: ["Creative writing", "Journalistic style", "Academic writing"],
  },
  {
    id: 84,
    title: "Proverbs & Wisdom",
    description: "Study Persian proverbs, wisdom sayings, and cultural knowledge",
    level: "advanced",
    topics: ["Traditional proverbs", "Wise sayings", "Cultural wisdom"],
  },
  {
    id: 85,
    title: "Technical Persian",
    description: "Specialized technical and scientific vocabulary",
    level: "advanced",
    topics: ["Technical manuals", "Scientific papers", "Engineering terminology"],
  },
  {
    id: 86,
    title: "Debate & Public Speaking",
    description: "Advanced argumentation and public speaking skills",
    level: "advanced",
    topics: ["Formal debates", "Speeches", "Persuasive rhetoric"],
  },
  {
    id: 87,
    title: "Persian Proverbs in Context",
    description: "Use proverbs naturally in conversation and writing",
    level: "advanced",
    topics: ["Contextual usage", "Cultural references", "Appropriate timing"],
  },
  {
    id: 88,
    title: "Interpretation & Simultaneous Translation",
    description: "Develop real-time interpretation and translation skills",
    level: "advanced",
    topics: ["Simultaneous interpretation", "Consecutive interpretation", "Note-taking"],
  },
  {
    id: 89,
    title: "Cultural Mastery",
    description: "Deep cultural understanding and cross-cultural communication",
    level: "advanced",
    topics: ["Cultural nuances", "Social etiquette", "Cross-cultural awareness"],
  },
  {
    id: 90,
    title: "Advanced Review & Mastery",
    description: "Comprehensive mastery assessment and fluency demonstration across all skills",
    level: "advanced",
    topics: ["Comprehensive review", "Fluency assessment", "Mastery demonstration"],
  },
]

export const moduleContent: Record<string | number, ModuleContent> = {
  
    
  
  "A-1": {
    moduleId: "A-1",
    vocabulary: [
      {
        persian: "ا",
        transliteration: "alef",
        english: "Letter A",
        example: "اب",
        exampleTranslation: "âb - water",
      },
      {
        persian: "ب",
        transliteration: "be",
        english: "Letter B",
        example: "باب",
        exampleTranslation: "bâb - chapter",
      },
      {
        persian: "پ",
        transliteration: "pe",
        english: "Letter P",
        example: "پا",
        exampleTranslation: "pâ - foot/leg",
      },
      {
        persian: "ت",
        transliteration: "te",
        english: "Letter T",
        example: "تاب",
        exampleTranslation: "tâb - swing",
      },
      {
        persian: "ث",
        transliteration: "se",
        english: "Letter S (Arabic)",
        example: "ثابت",
        exampleTranslation: "sâbet - stable",
      },
      {
        persian: "ج",
        transliteration: "jim",
        english: "Letter J",
        example: "جا",
        exampleTranslation: "jâ - place",
      },
      {
        persian: "اَ",
        transliteration: "a (zabar)",
        english: "Short vowel 'a'",
        example: "بَت",
        exampleTranslation: "bat - idol",
      },
      {
        persian: "اِ",
        transliteration: "e (zir)",
        english: "Short vowel 'e'",
        example: "بِت",
        exampleTranslation: "bet - root",
      },
      {
        persian: "اُ",
        transliteration: "o (pish)",
        english: "Short vowel 'o'",
        example: "تُپ",
        exampleTranslation: "top - ball",
      },
      {
        persian: "آ",
        transliteration: "â (mad)",
        english: "Long 'a' sound",
        example: "آب",
        exampleTranslation: "âb - water",
      },
    ],
    reading: [
      {
        id: 1,
        title: "First Letters",
        text: "اب. آب. باب. تاب. پا. جا.",
        textTransliteration: "ab. âb. bâb. tâb. pâ. jâ.",
        textTranslation: "Father. Water. Chapter. Swing. Foot. Place.",
        questions: [
          {
            question: "Which letter appears at the beginning of 'آب' (âb)?",
            options: ["ا", "آ", "ب", "پ"],
            correctAnswer: 1,
          },
          {
            question: "How many times does the letter 'ب' appear in 'باب' (bâb)?",
            options: ["Once", "Twice", "Three times", "Not at all"],
            correctAnswer: 1,
          },
        ],
      },
    ],
    writing: [
      {
        id: 1,
        type: "build-word",
        instruction: "Build the word for 'water'",
        targetWord: "آب",
        targetWordTransliteration: "âb",
        availableLetters: ["آ", "ب", "ت", "پ", "ا"],
      },
      {
        id: 2,
        type: "build-word",
        instruction: "Build the word for 'foot'",
        targetWord: "پا",
        targetWordTransliteration: "pâ",
        availableLetters: ["پ", "ا", "ب", "ت", "ج"],
      },
      {
        id: 3,
        type: "build-word",
        instruction: "Build the word for 'place'",
        targetWord: "جا",
        targetWordTransliteration: "jâ",
        availableLetters: ["ج", "ا", "پ", "ب", "ت"],
      },
    ],
    grammar: [
      // Letter 1: Alef (ا) - Non-connecting letter
      {
        id: 1,
        type: "letter-position",
        instruction: "Learn about the letter Alef (ا)",
        teachingContent: {
          title: "Alef (ا) - A Special Letter",
          explanation:
            "Alef is a special letter in Persian because it DOES NOT connect to the letter that comes after it. It only has two forms: Isolated and Final.",
          examples: [
            { label: "Isolated", persian: "ا", description: "Letter standing alone" },
            { label: "Final", persian: "ـا", description: "At the end, connects from right only" },
            { label: "In word", persian: "آب", description: "âb (water) - Alef at beginning" },
            { label: "In word", persian: "پا", description: "pâ (foot) - Alef at end" },
          ],
        },
        question: "Does Alef (ا) connect to the letter that follows it?",
        options: ["Yes, it always connects", "No, it never connects forward", "Only sometimes", "Only in the middle"],
        correctAnswer: 1,
        explanation: "Alef is a non-connecting letter - it never connects to the letter after it.",
      },
      {
        id: 2,
        type: "word-analysis",
        instruction: "Identify Alef in words",
        teachingContent: {
          title: "Finding Alef in Words",
          explanation:
            "Look for the tall vertical stroke (ا). Because it doesn't connect forward, you'll often see a gap after it.",
          examples: [
            { label: "Beginning", persian: "اب", description: "ab (father)" },
            { label: "Beginning", persian: "آب", description: "âb (water) - with madda" },
            { label: "End", persian: "جا", description: "jâ (place)" },
          ],
        },
        question: "In the word 'باب' (bâb - chapter), how many times does Alef appear?",
        options: ["Once", "Twice", "Three times", "Not at all"],
        correctAnswer: 1,
        explanation: "Alef (ا) appears twice in 'باب' - in the middle and at the end.",
      },

      // Letter 2: Be (ب)
      {
        id: 3,
        type: "letter-position",
        instruction: "Learn about the letter Be (ب)",
        teachingContent: {
          title: "Be (ب) - Letter B",
          explanation:
            "Be is a connecting letter with 4 different forms. The key feature is ONE dot BELOW the letter shape.",
          examples: [
            { label: "Isolated", persian: "ب", description: "Standing alone" },
            { label: "Initial", persian: "بـ", description: "At beginning" },
            { label: "Medial", persian: "ـبـ", description: "In middle" },
            { label: "Final", persian: "ـب", description: "At end" },
          ],
        },
        question: "How many dots does the letter Be (ب) have?",
        options: ["No dots", "One dot below", "Two dots above", "Three dots above"],
        correctAnswer: 1,
        explanation: "Be has ONE dot positioned BELOW the letter shape.",
      },
      {
        id: 4,
        type: "letter-position",
        instruction: "Identify Be forms in words",
        teachingContent: {
          title: "Be in Different Positions",
          explanation: "Practice recognizing Be in various positions within words.",
          examples: [
            { label: "Initial", persian: "باب", description: "bâb - Be at start" },
            { label: "Final", persian: "آب", description: "âb - Be at end" },
            { label: "Final", persian: "تاب", description: "tâb - Be at end" },
          ],
        },
        question: "What form of Be (ب) appears at the END of 'آب' (âb - water)?",
        options: ["ب (isolated)", "بـ (initial)", "ـبـ (medial)", "ـب (final)"],
        correctAnswer: 3,
        explanation: "At the end of a word, Be uses its final form: ـب",
      },

      // Letter 3: Pe (پ)
      {
        id: 5,
        type: "letter-position",
        instruction: "Learn about the letter Pe (پ)",
        teachingContent: {
          title: "Pe (پ) - Letter P",
          explanation:
            "Pe looks exactly like Be, but with THREE dots BELOW instead of one. This letter is unique to Persian and doesn't exist in Arabic.",
          examples: [
            { label: "Isolated", persian: "پ", description: "Standing alone" },
            { label: "Initial", persian: "پـ", description: "At beginning" },
            { label: "Medial", persian: "ـپـ", description: "In middle" },
            { label: "Final", persian: "ـپ", description: "At end" },
          ],
        },
        question: "What is the difference between Be (ب) and Pe (پ)?",
        options: ["Position in word", "Number of dots", "Direction of writing", "No difference"],
        correctAnswer: 1,
        explanation: "Pe has THREE dots below, while Be has only ONE dot below.",
      },
      {
        id: 6,
        type: "word-analysis",
        instruction: "Find Pe in words",
        teachingContent: {
          title: "Pe in Words",
          explanation: "Look for the three dots below to distinguish Pe from Be.",
          examples: [
            { label: "Initial", persian: "پا", description: "pâ (foot)" },
            { label: "Final", persian: "تُپ", description: "top (ball)" },
          ],
        },
        question: "In the word 'پا' (pâ - foot), what form of Pe is used?",
        options: ["Isolated", "Initial", "Medial", "Final"],
        correctAnswer: 1,
        explanation: "Pe appears at the beginning, so it uses its initial form: پـ",
      },

      // Letter 4: Te (ت)
      {
        id: 7,
        type: "letter-position",
        instruction: "Learn about the letter Te (ت)",
        teachingContent: {
          title: "Te (ت) - Letter T",
          explanation: "Te has the same base shape as Be and Pe, but with TWO dots ABOVE the letter.",
          examples: [
            { label: "Isolated", persian: "ت", description: "Standing alone" },
            { label: "Initial", persian: "تـ", description: "At beginning" },
            { label: "Medial", persian: "ـتـ", description: "In middle" },
            { label: "Final", persian: "ـت", description: "At end" },
          ],
        },
        question: "Where are the dots positioned on the letter Te (ت)?",
        options: ["Below the letter", "Above the letter", "No dots", "Inside the letter"],
        correctAnswer: 1,
        explanation: "Te has TWO dots positioned ABOVE the letter shape.",
      },
      {
        id: 8,
        type: "letter-position",
        instruction: "Recognize Te in words",
        teachingContent: {
          title: "Te in Different Positions",
          explanation: "Practice identifying Te by looking for two dots above.",
          examples: [
            { label: "Initial", persian: "تاب", description: "tâb (swing)" },
            { label: "Initial", persian: "تُپ", description: "top (ball)" },
            { label: "Final", persian: "بَت", description: "bat (idol)" },
          ],
        },
        question: "In 'تاب' (tâb - swing), what position is Te in?",
        options: ["Isolated", "Initial (beginning)", "Medial (middle)", "Final (end)"],
        correctAnswer: 1,
        explanation: "Te appears at the beginning of the word, using its initial form.",
      },

      // Letter 5: Se (ث)
      {
        id: 9,
        type: "letter-position",
        instruction: "Learn about the letter Se (ث)",
        teachingContent: {
          title: "Se (ث) - Letter S (Arabic)",
          explanation:
            "Se has the same shape as Be, Pe, and Te, but with THREE dots ABOVE. This letter comes from Arabic and is less common in modern Persian.",
          examples: [
            { label: "Isolated", persian: "ث", description: "Standing alone" },
            { label: "Initial", persian: "ثـ", description: "At beginning" },
            { label: "Medial", persian: "ـثـ", description: "In middle" },
            { label: "Final", persian: "ـث", description: "At end" },
          ],
        },
        question: "How can you distinguish Se (ث) from Pe (پ)?",
        options: ["Se has dots above, Pe has dots below", "They are identical", "Se is shorter", "Pe doesn't connect"],
        correctAnswer: 0,
        explanation: "Se has THREE dots ABOVE, while Pe has THREE dots BELOW.",
      },
      {
        id: 10,
        type: "word-analysis",
        instruction: "Find Se in words",
        teachingContent: {
          title: "Se in Words",
          explanation: "Look for three dots above the base shape.",
          examples: [{ label: "Initial", persian: "ثابت", description: "sâbet (stable)" }],
        },
        question: "In 'ثابت' (sâbet), what form of Se is used?",
        options: ["Isolated", "Initial", "Medial", "Final"],
        correctAnswer: 1,
        explanation: "Se appears at the beginning of 'ثابت', using its initial form.",
      },

      // Letter 6: Jim (ج)
      {
        id: 11,
        type: "letter-position",
        instruction: "Learn about the letter Jim (ج)",
        teachingContent: {
          title: "Jim (ج) - Letter J",
          explanation:
            "Jim has a completely different shape from the previous letters. It looks like a small hook with ONE dot in the middle.",
          examples: [
            { label: "Isolated", persian: "ج", description: "Standing alone - hook shape" },
            { label: "Initial", persian: "جـ", description: "At beginning" },
            { label: "Medial", persian: "ـجـ", description: "In middle" },
            { label: "Final", persian: "ـج", description: "At end" },
          ],
        },
        question: "What shape does Jim (ج) have?",
        options: ["Straight line", "Hook or curve", "Circle", "Triangle"],
        correctAnswer: 1,
        explanation: "Jim has a distinctive hook or curved shape with one dot.",
      },
      {
        id: 12,
        type: "letter-position",
        instruction: "Recognize Jim in words",
        teachingContent: {
          title: "Jim in Different Positions",
          explanation: "Practice identifying the hook shape of Jim in words.",
          examples: [
            { label: "Initial", persian: "جا", description: "jâ (place)" },
            { label: "Final", persian: "باج", description: "bâj (tax/tribute)" },
          ],
        },
        question: "In 'جا' (jâ - place), what form of Jim is used?",
        options: ["Isolated", "Initial", "Medial", "Final"],
        correctAnswer: 1,
        explanation: "Jim appears at the beginning, using its initial form that connects to Alef.",
      },

      // Summary exercise
      {
        id: 13,
        type: "word-analysis",
        instruction: "Review all letters learned",
        teachingContent: {
          title: "Letter Review",
          explanation:
            "You've learned 6 letters: ا (Alef), ب (Be), پ (Pe), ت (Te), ث (Se), ج (Jim). Remember their distinctive features!",
          examples: [
            { label: "Alef", persian: "ا", description: "Non-connecting, tall vertical" },
            { label: "Be", persian: "ب", description: "1 dot below" },
            { label: "Pe", persian: "پ", description: "3 dots below" },
            { label: "Te", persian: "ت", description: "2 dots above" },
            { label: "Se", persian: "ث", description: "3 dots above" },
            { label: "Jim", persian: "ج", description: "Hook shape, 1 dot" },
          ],
        },
        question: "Which letters have dots BELOW them?",
        options: ["Alef and Jim", "Be and Pe", "Te and Se", "All of them"],
        correctAnswer: 1,
        explanation: "Be (ب) has 1 dot below and Pe (پ) has 3 dots below.",
      },
    ],
  },

  "A-2": {
    moduleId: "A-2",
    vocabulary: [
      {
        persian: "چ",
        transliteration: "che",
        english: "Letter Ch",
        example: "چا",
        exampleTranslation: "châ - tea",
      },
      {
        persian: "ح",
        transliteration: "he",
        english: "Letter H (heavy)",
        example: "حال",
        exampleTranslation: "hâl - state/condition",
      },
      {
        persian: "خ",
        transliteration: "khe",
        english: "Letter Kh",
        example: "خال",
        exampleTranslation: "khâl - mole/aunt",
      },
      {
        persian: "د",
        transliteration: "dâl",
        english: "Letter D",
        example: "دار",
        exampleTranslation: "dâr - has/tree",
      },
      {
        persian: "ذ",
        transliteration: "zâl",
        english: "Letter Z (Arabic)",
        example: "ذات",
        exampleTranslation: "zât - essence",
      },
      {
        persian: "ر",
        transliteration: "re",
        english: "Letter R",
        example: "راه",
        exampleTranslation: "râh - road",
      },
      {
        persian: "ز",
        transliteration: "ze",
        english: "Letter Z",
        example: "زار",
        exampleTranslation: "zâr - field",
      },
    ],
    reading: [
      {
        id: 1,
        title: "Tea Time",
        text: "چا دارد. چا خوب است.",
        textTransliteration: "châ dārad. châ khub ast.",
        textTranslation: "He has tea. Tea is good.",
        questions: [
          {
            question: "Which letter appears at the beginning of 'چا' (châ)?",
            options: ["ح", "خ", "چ", "ج"],
            correctAnswer: 2,
          },
          {
            question: "What is the last letter in 'دارد' (dārad)?",
            options: ["ا", "ر", "د", "چ"],
            correctAnswer: 2,
          },
        ],
      },
    ],
    writing: [
      {
        id: 1,
        type: "build-word",
        instruction: "Build the word for 'tea'",
        targetWord: "چا",
        targetWordTransliteration: "châ",
        availableLetters: ["چ", "ا", "د", "ر", "ز"],
      },
      {
        id: 2,
        type: "build-word",
        instruction: "Build the word for 'road'",
        targetWord: "راه",
        targetWordTransliteration: "râh",
        availableLetters: ["ر", "ا", "ه", "چ", "د"],
      },
    ],
    grammar: [
      {
        id: 1,
        type: "letter-position",
        instruction: "Learn the four forms of 'che' (چ)",
        teachingContent: {
          title: "Forms of Connecting Letters: Che",
          explanation:
            "The letter 'che' (چ) is a connecting letter. Learn its forms: initial (چـ), medial (ـچـ), and final (ـچ).",
          examples: [
            {
              label: "Initial 'che'",
              persian: "چـ",
              description: "Used at the start of a word.",
            },
            {
              label: "Medial 'che'",
              persian: "ـچـ",
              description: "Used in the middle of a word.",
            },
            {
              label: "Final 'che'",
              persian: "ـچ",
              description: "Used at the end of a word.",
            },
          ],
        },
        question: "What is the initial form of 'che' (چ)?",
        options: ["چ", "چـ", "ـچـ", "ـچ"],
        correctAnswer: 1,
        explanation: "At the beginning: چـ",
      },
      {
        id: 2,
        type: "letter-position",
        instruction: "Understand non-connecting letters",
        teachingContent: {
          title: "Non-Connecting Letters",
          explanation:
            "Some letters in Persian, like 'dâl' (د), 'zâl' (ذ), 're' (ر), and 'ze' (ز), do not connect to the letter that follows them. They only connect to the letter before them.",
          examples: [
            {
              label: "Word with non-connector",
              persian: "داد",
              description: "The first 'د' connects to 'ا', but the second 'د' does not connect to anything after it.",
            },
            {
              label: "Word with non-connector",
              persian: "راز",
              description: "The 'ر' connects to 'ا', but does not connect to 'ز'. The 'ز' is in its final form.",
            },
          ],
        },
        question: "Does the letter 'dâl' (د) connect to letters after it?",
        options: ["Yes, always", "No, never", "Only sometimes", "Only in final position"],
        correctAnswer: 1,
        explanation: "Letters like د ذ ر ز don't connect to the following letter",
      },
      {
        id: 3,
        type: "word-analysis",
        instruction: "Identify positions in real words",
        question: "In 'دار' (dâr - has), what position is the 'د'?",
        options: ["Initial", "Medial", "Final", "Isolated"],
        correctAnswer: 0,
        explanation: "The 'د' is at the beginning, making it initial",
      },
      {
        id: 4,
        type: "word-analysis",
        instruction: "Analyze letter connections",
        question: "In 'خال' (khâl - mole), what position is the 'خ'?",
        options: ["Initial", "Medial", "Final", "Isolated"],
        correctAnswer: 0,
        explanation: "The 'خ' starts the word and connects to 'ا'",
      },
      {
        id: 5,
        type: "letter-position",
        instruction: "Learn forms of connecting letters",
        question: "What is the medial form of 'he' (ح)?",
        options: ["ح", "حـ", "ـحـ", "ـح"],
        correctAnswer: 2,
        explanation: "In the middle of a word: ـحـ",
      },
    ],
  },

  "A-3": {
    moduleId: "A-3",
    vocabulary: [
      {
        persian: "ژ",
        transliteration: "zhe",
        english: "Letter Zh (like 'z' in azure)",
        example: "ژاله",
        exampleTranslation: "zhāleh - dew",
      },
      {
        persian: "س",
        transliteration: "sin",
        english: "Letter S",
        example: "سال",
        exampleTranslation: "sâl - year",
      },
      {
        persian: "ش",
        transliteration: "shin",
        english: "Letter Sh",
        example: "شال",
        exampleTranslation: "shâl - shawl",
      },
      {
        persian: "ص",
        transliteration: "sâd",
        english: "Letter S (heavy)",
        example: "صابون",
        exampleTranslation: "sābun - soap",
      },
      {
        persian: "ض",
        transliteration: "zâd",
        english: "Letter Z (heavy)",
        example: "ضرب",
        exampleTranslation: "zarb - multiplication",
      },
      {
        persian: "ط",
        transliteration: "tâ",
        english: "Letter T (heavy)",
        example: "طاس",
        exampleTranslation: "tâs - bowl",
      },
    ],
    reading: [
      {
        id: 1,
        title: "The Year",
        text: "سال خوب است. سال جدید.",
        textTransliteration: "sâl khub ast. sâl-e jadid.",
        textTranslation: "The year is good. New year.",
        questions: [
          {
            question: "Which letter starts the word 'سال' (sâl)?",
            options: ["ش", "س", "ص", "ض"],
            correctAnswer: 1,
          },
          {
            question: "Identify the first letter of 'شال' (shâl):",
            options: ["س", "ش", "ص", "ژ"],
            correctAnswer: 1,
          },
        ],
      },
    ],
    writing: [
      {
        id: 1,
        type: "build-word",
        instruction: "Build the word for 'year'",
        targetWord: "سال",
        targetWordTransliteration: "sâl",
        availableLetters: ["س", "ا", "ل", "ش", "ط"],
      },
      {
        id: 2,
        type: "build-word",
        instruction: "Build the word for 'shawl'",
        targetWord: "شال",
        targetWordTransliteration: "shâl",
        availableLetters: ["ش", "ا", "ل", "س", "ص"],
      },
    ],
    grammar: [
      {
        id: 1,
        type: "letter-position",
        instruction: "Learn the four forms of 'sin' (س)",
        teachingContent: {
          title: "Forms of Sin (س)",
          explanation: "The letter 'sin' (س) has four forms: isolated (س), initial (سـ), medial (ـسـ), and final (ـس).",
          examples: [
            {
              label: "Initial 'sin'",
              persian: "سـ",
              description: "Used at the start of a word.",
            },
            {
              label: "Medial 'sin'",
              persian: "ـسـ",
              description: "Used in the middle of a word.",
            },
            {
              label: "Final 'sin'",
              persian: "ـس",
              description: "Used at the end of a word.",
            },
          ],
        },
        question: "What is the initial form of 'sin' (س)?",
        options: ["س", "سـ", "ـسـ", "ـس"],
        correctAnswer: 1,
        explanation: "At the beginning of a word: سـ",
      },
      {
        id: 2,
        type: "letter-position",
        instruction: "Learn the four forms of 'shin' (ش)",
        question: "What is the medial form of 'shin' (ش)?",
        options: ["ش", "شـ", "ـشـ", "ـش"],
        correctAnswer: 2,
        explanation: "In the middle of a word: ـشـ",
      },
      {
        id: 3,
        type: "letter-position",
        instruction: "Understand non-connecting letters",
        question: "Does the letter 'zhe' (ژ) connect to letters after it?",
        options: ["Yes, always", "No, never", "Only sometimes", "Only in final position"],
        correctAnswer: 1,
        explanation: "The letter ژ is a non-connector, like د ذ ر ز",
      },
      {
        id: 4,
        type: "word-analysis",
        instruction: "Analyze letter positions in words",
        question: "In the word 'سال' (sâl - year), what position is the 'س'?",
        options: ["Initial", "Medial", "Final", "Isolated"],
        correctAnswer: 0,
        explanation: "The 'س' is at the beginning, making it initial position",
      },
      {
        id: 5,
        type: "word-analysis",
        instruction: "Analyze letter positions in words",
        question: "In the word 'شال' (shâl - shawl), what position is the 'ل'?",
        options: ["Initial", "Medial", "Final", "Isolated"],
        correctAnswer: 2,
        explanation: "The 'ل' is at the end of the word, making it final position",
      },
    ],
  },

  "A-4": {
    moduleId: "A-4",
    vocabulary: [
      {
        persian: "ظ",
        transliteration: "zâ",
        english: "Letter Z (heavy, Arabic)",
        example: "ظرف",
        exampleTranslation: "zarf - container",
      },
      {
        persian: "ع",
        transliteration: "eyn",
        english: "Letter ' (glottal)",
        example: "عالی",
        exampleTranslation: "âli - excellent",
      },
      {
        persian: "غ",
        transliteration: "gheyn",
        english: "Letter Gh",
        example: "غذا",
        exampleTranslation: "ghazâ - food",
      },
      {
        persian: "ف",
        transliteration: "fe",
        english: "Letter F",
        example: "فال",
        exampleTranslation: "fâl - fortune",
      },
      {
        persian: "ق",
        transliteration: "ghâf",
        english: "Letter Gh (heavy)",
        example: "قلب",
        exampleTranslation: "ghalb - heart",
      },
      {
        persian: "ک",
        transliteration: "kâf",
        english: "Letter K (Arabic form)",
        example: "کار",
        exampleTranslation: "kâr - work",
      },
    ],
    reading: [
      {
        id: 1,
        title: "Good Food",
        text: "غذا عالی است. غذا خوب است.",
        textTransliteration: "ghazâ âli ast. ghazâ khub ast.",
        textTranslation: "The food is excellent. The food is good.",
        questions: [
          {
            question: "Which letter starts the word 'غذا' (ghazâ)?",
            options: ["ع", "غ", "ف", "ق"],
            correctAnswer: 1,
          },
          {
            question: "What is the second letter in 'عالی' (âli)?",
            options: ["ل", "ا", "ع", "ی"],
            correctAnswer: 1,
          },
        ],
      },
    ],
    writing: [
      {
        id: 1,
        type: "build-word",
        instruction: "Build the word for 'food'",
        targetWord: "غذا",
        targetWordTransliteration: "ghazâ",
        availableLetters: ["غ", "ذ", "ا", "ف", "ق"],
      },
      {
        id: 2,
        type: "build-word",
        instruction: "Build the word for 'work'",
        targetWord: "کار",
        targetWordTransliteration: "kâr",
        availableLetters: ["ک", "ا", "ر", "ف", "غ"],
      },
    ],
    grammar: [
      {
        id: 1,
        type: "letter-position",
        instruction: "Learn the four forms of 'eyn' (ع)",
        teachingContent: {
          title: "Forms of Eyn (ع)",
          explanation:
            "The letter 'eyn' (ع) is a connecting letter with initial (عـ), medial (ـعـ), and final (ـع) forms.",
          examples: [
            {
              label: "Initial 'eyn'",
              persian: "عـ",
              description: "Used at the start of a word.",
            },
            {
              label: "Medial 'eyn'",
              persian: "ـعـ",
              description: "Used in the middle of a word.",
            },
            {
              label: "Final 'eyn'",
              persian: "ـع",
              description: "Used at the end of a word.",
            },
          ],
        },
        question: "What is the initial form of 'eyn' (ع)?",
        options: ["ع", "عـ", "ـعـ", "ـع"],
        correctAnswer: 1,
        explanation: "At the beginning of a word: عـ",
      },
      {
        id: 2,
        type: "letter-position",
        instruction: "Learn the four forms of 'gheyn' (غ)",
        question: "What is the final form of 'gheyn' (غ)?",
        options: ["غ", "غـ", "ـغـ", "ـغ"],
        correctAnswer: 3,
        explanation: "At the end of a word: ـغ",
      },
      {
        id: 3,
        type: "letter-position",
        instruction: "Learn the four forms of 'fe' (ف)",
        question: "What is the medial form of 'fe' (ف)?",
        options: ["ف", "فـ", "ـفـ", "ـف"],
        correctAnswer: 2,
        explanation: "In the middle of a word: ـفـ",
      },
      {
        id: 4,
        type: "word-analysis",
        instruction: "Analyze letter positions in words",
        question: "In the word 'غذا' (ghazâ - food), what position is the 'غ'?",
        options: ["Initial", "Medial", "Final", "Isolated"],
        correctAnswer: 0,
        explanation: "The 'غ' is at the beginning, making it initial position",
      },
      {
        id: 5,
        type: "word-analysis",
        instruction: "Analyze letter positions in words",
        question: "In the word 'کار' (kâr - work), what position is the 'ر'?",
        options: ["Initial", "Medial", "Final", "Isolated"],
        correctAnswer: 2,
        explanation: "The 'ر' is at the end of the word, making it final position",
      },
      {
        id: 6,
        type: "letter-identification",
        instruction: "Distinguish between similar letters",
        teachingContent: {
          title: "Differentiating Eyn and Gheyn",
          explanation:
            "The letters 'eyn' (ع) and 'gheyn' (غ) look very similar. The key difference is the dot: 'غ' has a dot above it, while 'ع' does not.",
          examples: [
            {
              label: "'Eyn' (ع)",
              persian: "ع",
              description: "No dot.",
            },
            {
              label: "'Gheyn' (غ)",
              persian: "غ",
              description: "Has one dot above.",
            },
          ],
        },
        question: "What is the difference between 'ع' and 'غ'?",
        options: ["ع has no dot, غ has a dot", "They are the same", "ع is longer", "غ is curved"],
        correctAnswer: 0,
        explanation: "The letter 'غ' has a dot above it, while 'ع' has no dot",
      },
    ],
  },

  "A-5": {
    moduleId: "A-5",
    vocabulary: [
      {
        persian: "گ",
        transliteration: "gâf",
        english: "Letter G",
        example: "گل",
        exampleTranslation: "gol - flower",
      },
      {
        persian: "ل",
        transliteration: "lâm",
        english: "Letter L",
        example: "لال",
        exampleTranslation: "lâl - ruby",
      },
      {
        persian: "م",
        transliteration: "mim",
        english: "Letter M",
        example: "مال",
        exampleTranslation: "mâl - property",
      },
      {
        persian: "ن",
        transliteration: "nun",
        english: "Letter N",
        example: "نان",
        exampleTranslation: "nân - bread",
      },
      {
        persian: "و",
        transliteration: "vâv",
        english: "Letter V/W/O/U",
        example: "ورد",
        exampleTranslation: "vard - rose",
      },
      {
        persian: "ه",
        transliteration: "he",
        english: "Letter H",
        example: "هوا",
        exampleTranslation: "havâ - air/weather",
      },
      {
        persian: "ی",
        transliteration: "ye",
        english: "Letter Y/I",
        example: "یار",
        exampleTranslation: "yâr - friend",
      },
    ],
    reading: [
      {
        id: 1,
        title: "Beautiful Flower",
        text: "گل زیبا است. گل قرمز است.",
        textTransliteration: "gol zibâ ast. gol ghermez ast.",
        textTranslation: "The flower is beautiful. The flower is red.",
        questions: [
          {
            question: "Which letter appears at the beginning of 'گل' (gol)?",
            options: ["ک", "گ", "ل", "م"],
            correctAnswer: 1,
          },
          {
            question: "What is the last letter in 'نان' (nân)?",
            options: ["ا", "ن", "م", "ل"],
            correctAnswer: 1,
          },
        ],
      },
    ],
    writing: [
      {
        id: 1,
        type: "build-word",
        instruction: "Build the word for 'flower'",
        targetWord: "گل",
        targetWordTransliteration: "gol",
        availableLetters: ["گ", "ل", "م", "ن", "و"],
      },
      {
        id: 2,
        type: "build-word",
        instruction: "Build the word for 'bread'",
        targetWord: "نان",
        targetWordTransliteration: "nân",
        availableLetters: ["ن", "ا", "م", "ل", "ی"],
      },
      {
        id: 3,
        type: "build-word",
        instruction: "Build the word for 'friend'",
        targetWord: "یار",
        targetWordTransliteration: "yâr",
        availableLetters: ["ی", "ا", "ر", "ه", "و"],
      },
    ],
    grammar: [
      {
        id: 1,
        type: "letter-position",
        instruction: "Learn the four forms of 'lâm' (ل)",
        teachingContent: {
          title: "Forms of Lâm (ل)",
          explanation:
            "The letter 'lâm' (ل) has standard forms: isolated (ل), initial (لـ), medial (ـلـ), and final (ـل).",
          examples: [
            {
              label: "Initial 'lâm'",
              persian: "لـ",
              description: "Used at the start of a word.",
            },
            {
              label: "Medial 'lâm'",
              persian: "ـلـ",
              description: "Used in the middle of a word.",
            },
            {
              label: "Final 'lâm'",
              persian: "ـل",
              description: "Used at the end of a word.",
            },
          ],
        },
        question: "What is the initial form of 'lâm' (ل)?",
        options: ["ل", "لـ", "ـلـ", "ـل"],
        correctAnswer: 1,
        explanation: "At the beginning of a word: لـ",
      },
      {
        id: 2,
        type: "letter-position",
        instruction: "Learn the four forms of 'mim' (م)",
        question: "What is the medial form of 'mim' (م)?",
        options: ["م", "مـ", "ـمـ", "ـم"],
        correctAnswer: 2,
        explanation: "In the middle of a word: ـمـ",
      },
      {
        id: 3,
        type: "letter-position",
        instruction: "Learn the four forms of 'nun' (ن)",
        question: "What is the final form of 'nun' (ن)?",
        options: ["ن", "نـ", "ـنـ", "ـن"],
        correctAnswer: 3,
        explanation: "At the end of a word: ـن",
      },
      {
        id: 4,
        type: "letter-position",
        instruction: "Understand non-connecting letters",
        question: "Does the letter 'vâv' (و) connect to letters after it?",
        options: ["Yes, always", "No, never", "Only sometimes", "Only in final position"],
        correctAnswer: 1,
        explanation: "The letter و is a non-connector, it doesn't connect to following letters",
      },
      {
        id: 5,
        type: "word-analysis",
        instruction: "Analyze letter positions in words",
        question: "In the word 'گل' (gol - flower), what position is the 'ل'?",
        options: ["Initial", "Medial", "Final", "Isolated"],
        correctAnswer: 2,
        explanation: "The 'ل' is at the end of the word, making it final position",
      },
      {
        id: 6,
        type: "word-analysis",
        instruction: "Analyze letter positions in words",
        question: "In the word 'نان' (nân - bread), what position is the middle 'ا'?",
        options: ["Initial", "Medial", "Final", "Isolated"],
        correctAnswer: 1,
        explanation: "The 'ا' is between two letters, making it medial position",
      },
      {
        id: 7,
        type: "letter-identification",
        instruction: "Complete understanding of the Persian alphabet",
        teachingContent: {
          title: "The Persian Alphabet",
          explanation:
            "The Persian alphabet is derived from the Arabic alphabet with some modifications. It has 32 letters.",
          examples: [
            {
              label: "The 32 letters",
              persian: "ا ب پ ت ث ج چ ح خ د ذ ر ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن و ه ی",
              description: "All letters of the Persian alphabet.",
            },
          ],
        },
        question: "How many total letters are in the Persian alphabet?",
        options: ["26 letters", "28 letters", "32 letters", "36 letters"],
        correctAnswer: 2,
        explanation: "The Persian alphabet has 32 letters in total",
      },
    ],
  },

  //module 1 
  1: {
    moduleId: 1,
    vocabulary: [
      {
        persian: "سلام",
        transliteration: "salām",
        english: "hello",
        example: "سلام! حال شما چطور است؟",
        exampleTranslation: "Hello! How are you?",
      },
      {
        persian: "خداحافظ",
        transliteration: "khodāhāfez",
        english: "goodbye",
        example: "خداحافظ، فردا می‌بینمت",
        exampleTranslation: "Goodbye, see you tomorrow",
      },
      {
        persian: "صبح بخیر",
        transliteration: "sobh bekheyr",
        english: "good morning",
        example: "صبح بخیر! روز خوبی داشته باشید",
        exampleTranslation: "Good morning! Have a nice day",
      },
      {
        persian: "شب بخیر",
        transliteration: "shab bekheyr",
        english: "good night",
        example: "شب بخیر، خواب خوبی داشته باشید",
        exampleTranslation: "Good night, sleep well",
      },
      {
        persian: "ممنون",
        transliteration: "mamnoon",
        english: "thank you",
        example: "ممنون از کمکت",
        exampleTranslation: "Thank you for your help",
      },
      {
        persian: "خواهش می‌کنم",
        transliteration: "khāhesh mikonam",
        english: "you're welcome",
        example: "خواهش می‌کنم، کاری نکردم",
        exampleTranslation: "You're welcome, I didn't do anything",
      },
      {
        persian: "بله",
        transliteration: "bale",
        english: "yes",
        example: "بله، من اینجا هستم",
        exampleTranslation: "Yes, I am here",
      },
      {
        persian: "نه",
        transliteration: "na",
        english: "no",
        example: "نه، من نمی‌توانم بیایم",
        exampleTranslation: "No, I cannot come",
      },
      {
        persian: "لطفا",
        transliteration: "lotfan",
        english: "please",
        example: "لطفا کمکم کنید",
        exampleTranslation: "Please help me",
      },
      {
        persian: "ببخشید",
        transliteration: "bebakhshid",
        english: "excuse me / sorry",
        example: "ببخشید، دیر کردم",
        exampleTranslation: "Sorry, I'm late",
      },
      {
        persian: "اسم",
        transliteration: "esm",
        english: "name",
        example: "اسم شما چیست؟",
        exampleTranslation: "What is your name?",
      },
      {
        persian: "من",
        transliteration: "man",
        english: "I / me",
        example: "من علی هستم",
        exampleTranslation: "I am Ali",
      },
      {
        persian: "تو",
        transliteration: "to",
        english: "you (informal)",
        example: "تو کجا هستی؟",
        exampleTranslation: "Where are you?",
      },
      {
        persian: "شما",
        transliteration: "shomā",
        english: "you (formal)",
        example: "شما از کجا هستید؟",
        exampleTranslation: "Where are you from?",
      },
      {
        persian: "او",
        transliteration: "oo",
        english: "he / she",
        example: "او دوست من است",
        exampleTranslation: "He/She is my friend",
      },
      {
        persian: "چطور",
        transliteration: "chetor",
        english: "how",
        example: "حالت چطوره؟",
        exampleTranslation: "How are you?",
      },
      {
        persian: "خوب",
        transliteration: "khoob",
        english: "good / well",
        example: "من خوب هستم",
        exampleTranslation: "I am well",
      },
      {
        persian: "بد",
        transliteration: "bad",
        english: "bad",
        example: "حالم بد نیست",
        exampleTranslation: "I'm not bad",
      },
      {
        persian: "هستم",
        transliteration: "hastam",
        english: "I am",
        example: "من دانشجو هستم",
        exampleTranslation: "I am a student",
      },
      {
        persian: "هست",
        transliteration: "hast",
        english: "is",
        example: "او اینجا هست",
        exampleTranslation: "He/She is here",
      },
      {
        persian: "چه",
        transliteration: "che",
        english: "what",
        example: "این چه چیزی است؟",
        exampleTranslation: "What is this?",
      },
      {
        persian: "کجا",
        transliteration: "kojā",
        english: "where",
        example: "شما کجا زندگی می‌کنید؟",
        exampleTranslation: "Where do you live?",
      },
      {
        persian: "دوست",
        transliteration: "doost",
        english: "friend",
        example: "او دوست خوبی است",
        exampleTranslation: "He/She is a good friend",
      },
      {
        persian: "خانه",
        transliteration: "khāne",
        english: "house / home",
        example: "من به خانه می‌روم",
        exampleTranslation: "I am going home",
      },
      {
        persian: "امروز",
        transliteration: "emrooz",
        english: "today",
        example: "امروز هوا خوب است",
        exampleTranslation: "The weather is good today",
      },
    ],
    reading: [
      {
        id: 1,
        title: "First Meeting",
        text: "سلام! من علی هستم. اسم شما چیست؟ من خوشحالم که شما را می‌بینم. شما از کجا هستید؟ من از ایران هستم. امروز روز خوبی است.",
        textTransliteration:
          "Salām! Man Ali hastam. Esm-e shomā chist? Man khoshhālam ke shomā rā mibinam. Shomā az kojā hastid? Man az Irān hastam. Emrooz rooz-e khoobi ast.",
        textTranslation:
          "Hello! I am Ali. What is your name? I am happy to see you. Where are you from? I am from Iran. Today is a good day.",
        questions: [
          {
            question: "What is the person's name?",
            options: ["Ali", "Reza", "Sara", "Maryam"],
            correctAnswer: 0,
          },
          {
            question: "Where is Ali from?",
            options: ["Turkey", "Iran", "Iraq", "Afghanistan"],
            correctAnswer: 1,
          },
        ],
      },
      {
        id: 2,
        title: "Greetings",
        text: "صبح بخیر! حال شما چطور است؟ من خوب هستم، ممنون. شما چطور هستید؟ امیدوارم روز خوبی داشته باشید. هوا امروز خیلی خوب است.",
        textTransliteration:
          "Sobh bekheyr! Hāl-e shomā chetor ast? Man khoob hastam, mamnoon. Shomā chetor hastid? Omidvāram rooz-e khoobi dāshte bāshid. Havā emrooz kheyli khoob ast.",
        textTranslation:
          "Good morning! How are you? I am well, thank you. How are you? I hope you have a good day. The weather is very nice today.",
        questions: [
          {
            question: "What time of day is it?",
            options: ["Morning", "Afternoon", "Evening", "Night"],
            correctAnswer: 0,
          },
          {
            question: "How is the speaker feeling?",
            options: ["Bad", "Good", "Tired", "Sad"],
            correctAnswer: 1,
          },
        ],
      },
      {
        id: 3,
        title: "At Home",
        text: "من امروز خانه هستم. دوست من هم اینجا هست. او اسمش رضا است. ما امروز با هم درس می‌خوانیم. او دوست خوبی است.",
        textTransliteration:
          "Man emrooz khāne hastam. Doost-e man ham injā hast. Oo esmesh Rezā ast. Mā emrooz bā ham dars mikhānim. Oo doost-e khoobi ast.",
        textTranslation:
          "I am at home today. My friend is also here. His name is Reza. We are studying together today. He is a good friend.",
        questions: [
          {
            question: "Where is the speaker?",
            options: ["At school", "At home", "At work", "Outside"],
            correctAnswer: 1,
          },
          {
            question: "Who is with the speaker?",
            options: ["Brother", "Sister", "Friend", "Teacher"],
            correctAnswer: 2,
          },
        ],
      },
      {
        id: 4,
        title: "Saying Goodbye",
        text: "خداحافظ! فردا می‌بینمت. شب بخیر و خواب خوبی داشته باش! ممنون از وقتی که گذاشتی. امشب استراحت کن.",
        textTransliteration:
          "Khodāhāfez! Fardā mibinamet. Shab bekheyr va khāb-e khoobi dāshte bāsh! Mamnoon az vaghti ke gozāshti. Emshab esterāhat kon.",
        textTranslation:
          "Goodbye! See you tomorrow. Good night and sleep well! Thank you for the time you spent. Rest tonight.",
        questions: [
          {
            question: "When will they meet again?",
            options: ["Today", "Tomorrow", "Next week", "Never"],
            correctAnswer: 1,
          },
          {
            question: "What is the speaker wishing?",
            options: ["Good morning", "Good afternoon", "Good night", "Good luck"],
            correctAnswer: 2,
          },
        ],
      },
      {
        id: 5,
        title: "Polite Conversation",
        text: "ببخشید، لطفا کمکم کنید. ممنون از شما. خواهش می‌کنم! شما خیلی مهربان هستید. من خوشحالم که شما را می‌شناسم.",
        textTransliteration:
          "Bebakhshid, lotfan komakam konid. Mamnoon az shomā. Khāhesh mikonam! Shomā kheyli mehrabān hastid. Man khoshhālam ke shomā rā mishenāsam.",
        textTranslation:
          "Excuse me, please help me. Thank you. You're welcome! You are very kind. I am happy to know you.",
        questions: [
          {
            question: "What does the speaker ask for?",
            options: ["Food", "Help", "Money", "Time"],
            correctAnswer: 1,
          },
          {
            question: "What is the tone of the conversation?",
            options: ["Angry", "Sad", "Polite", "Rude"],
            correctAnswer: 2,
          },
        ],
      },
    ],
    writing: [
      {
        id: 1,
        type: "build-word",
        instruction: "Build the word 'سلام' (hello) using the letters below",
        targetWord: "سلام",
        targetWordTransliteration: "salām",
        availableLetters: ["س", "ل", "ا", "م", "ر", "ت"],
      },
      {
        id: 2,
        type: "build-word",
        instruction: "Build the word 'ممنون' (thank you)",
        targetWord: "ممنون",
        targetWordTransliteration: "mamnoon",
        availableLetters: ["م", "ن", "و", "ا", "س", "خ"],
      },
      {
        id: 3,
        type: "build-word",
        instruction: "Build the word 'خوب' (good)",
        targetWord: "خوب",
        targetWordTransliteration: "khoob",
        availableLetters: ["خ", "و", "ب", "د", "ر", "ک"],
      },
      {
        id: 4,
        type: "sentence",
        instruction: "Write a greeting in Persian using the words: سلام، من، هستم",
        prompt: "Introduce yourself using 'hello', 'I', and 'am'",
      },
      {
        id: 5,
        type: "sentence",
        instruction: "Write a goodbye message using: خداحافظ، فردا",
        prompt: "Say goodbye and mention tomorrow",
      },
    ],

    grammar: [
      // Letter 1: Alef (ا) - Non-connecting letter
      {
        id: 1,
        type: "letter-position",
        instruction: "Learn about the letter Alef (ا)",
        teachingContent: {
          title: "Alef (ا) - A Special Letter",
          explanation:
            "Alef is a special letter in Persian because it DOES NOT connect to the letter that comes after it. It only has two forms: Isolated and Final.",
          examples: [
            { label: "Isolated", persian: "ا", description: "Letter standing alone" },
            { label: "Final", persian: "ـا", description: "At the end, connects from right only" },
            { label: "In word", persian: "آب", description: "âb (water) - Alef at beginning" },
            { label: "In word", persian: "پا", description: "pâ (foot) - Alef at end" },
          ],
        },
        question: "Does Alef (ا) connect to the letter that follows it?",
        options: ["Yes, it always connects", "No, it never connects forward", "Only sometimes", "Only in the middle"],
        correctAnswer: 1,
        explanation: "Alef is a non-connecting letter - it never connects to the letter after it.",
      },
      {
        id: 2,
        type: "word-analysis",
        instruction: "Identify Alef in words",
        teachingContent: {
          title: "Finding Alef in Words",
          explanation:
            "Look for the tall vertical stroke (ا). Because it doesn't connect forward, you'll often see a gap after it.",
          examples: [
            { label: "Beginning", persian: "اب", description: "ab (father)" },
            { label: "Beginning", persian: "آب", description: "âb (water) - with madda" },
            { label: "End", persian: "جا", description: "jâ (place)" },
          ],
        },
        question: "In the word 'باب' (bâb - chapter), how many times does Alef appear?",
        options: ["Once", "Twice", "Three times", "Not at all"],
        correctAnswer: 1,
        explanation: "Alef (ا) appears twice in 'باب' - in the middle and at the end.",
      },

      // Letter 2: Be (ب)
      {
        id: 3,
        type: "letter-position",
        instruction: "Learn about the letter Be (ب)",
        teachingContent: {
          title: "Be (ب) - Letter B",
          explanation:
            "Be is a connecting letter with 4 different forms. The key feature is ONE dot BELOW the letter shape.",
          examples: [
            { label: "Isolated", persian: "ب", description: "Standing alone" },
            { label: "Initial", persian: "بـ", description: "At beginning" },
            { label: "Medial", persian: "ـبـ", description: "In middle" },
            { label: "Final", persian: "ـب", description: "At end" },
          ],
        },
        question: "How many dots does the letter Be (ب) have?",
        options: ["No dots", "One dot below", "Two dots above", "Three dots above"],
        correctAnswer: 1,
        explanation: "Be has ONE dot positioned BELOW the letter shape.",
      },
      {
        id: 4,
        type: "letter-position",
        instruction: "Identify Be forms in words",
        teachingContent: {
          title: "Be in Different Positions",
          explanation: "Practice recognizing Be in various positions within words.",
          examples: [
            { label: "Initial", persian: "باب", description: "bâb - Be at start" },
            { label: "Final", persian: "آب", description: "âb - Be at end" },
            { label: "Final", persian: "تاب", description: "tâb - Be at end" },
          ],
        },
        question: "What form of Be (ب) appears at the END of 'آب' (âb - water)?",
        options: ["ب (isolated)", "بـ (initial)", "ـبـ (medial)", "ـب (final)"],
        correctAnswer: 3,
        explanation: "At the end of a word, Be uses its final form: ـب",
      },

      // Letter 3: Pe (پ)
      {
        id: 5,
        type: "letter-position",
        instruction: "Learn about the letter Pe (پ)",
        teachingContent: {
          title: "Pe (پ) - Letter P",
          explanation:
            "Pe looks exactly like Be, but with THREE dots BELOW instead of one. This letter is unique to Persian and doesn't exist in Arabic.",
          examples: [
            { label: "Isolated", persian: "پ", description: "Standing alone" },
            { label: "Initial", persian: "پـ", description: "At beginning" },
            { label: "Medial", persian: "ـپـ", description: "In middle" },
            { label: "Final", persian: "ـپ", description: "At end" },
          ],
        },
        question: "What is the difference between Be (ب) and Pe (پ)?",
        options: ["Position in word", "Number of dots", "Direction of writing", "No difference"],
        correctAnswer: 1,
        explanation: "Pe has THREE dots below, while Be has only ONE dot below.",
      },
      {
        id: 6,
        type: "word-analysis",
        instruction: "Find Pe in words",
        teachingContent: {
          title: "Pe in Words",
          explanation: "Look for the three dots below to distinguish Pe from Be.",
          examples: [
            { label: "Initial", persian: "پا", description: "pâ (foot)" },
            { label: "Final", persian: "تُپ", description: "top (ball)" },
          ],
        },
        question: "In the word 'پا' (pâ - foot), what form of Pe is used?",
        options: ["Isolated", "Initial", "Medial", "Final"],
        correctAnswer: 1,
        explanation: "Pe appears at the beginning, so it uses its initial form: پـ",
      },

      // Letter 4: Te (ت)
      {
        id: 7,
        type: "letter-position",
        instruction: "Learn about the letter Te (ت)",
        teachingContent: {
          title: "Te (ت) - Letter T",
          explanation: "Te has the same base shape as Be and Pe, but with TWO dots ABOVE the letter.",
          examples: [
            { label: "Isolated", persian: "ت", description: "Standing alone" },
            { label: "Initial", persian: "تـ", description: "At beginning" },
            { label: "Medial", persian: "ـتـ", description: "In middle" },
            { label: "Final", persian: "ـت", description: "At end" },
          ],
        },
        question: "Where are the dots positioned on the letter Te (ت)?",
        options: ["Below the letter", "Above the letter", "No dots", "Inside the letter"],
        correctAnswer: 1,
        explanation: "Te has TWO dots positioned ABOVE the letter shape.",
      },
      {
        id: 8,
        type: "letter-position",
        instruction: "Recognize Te in words",
        teachingContent: {
          title: "Te in Different Positions",
          explanation: "Practice identifying Te by looking for two dots above.",
          examples: [
            { label: "Initial", persian: "تاب", description: "tâb (swing)" },
            { label: "Initial", persian: "تُپ", description: "top (ball)" },
            { label: "Final", persian: "بَت", description: "bat (idol)" },
          ],
        },
        question: "In 'تاب' (tâb - swing), what position is Te in?",
        options: ["Isolated", "Initial (beginning)", "Medial (middle)", "Final (end)"],
        correctAnswer: 1,
        explanation: "Te appears at the beginning of the word, using its initial form.",
      },

      // Letter 5: Se (ث)
      {
        id: 9,
        type: "letter-position",
        instruction: "Learn about the letter Se (ث)",
        teachingContent: {
          title: "Se (ث) - Letter S (Arabic)",
          explanation:
            "Se has the same shape as Be, Pe, and Te, but with THREE dots ABOVE. This letter comes from Arabic and is less common in modern Persian.",
          examples: [
            { label: "Isolated", persian: "ث", description: "Standing alone" },
            { label: "Initial", persian: "ثـ", description: "At beginning" },
            { label: "Medial", persian: "ـثـ", description: "In middle" },
            { label: "Final", persian: "ـث", description: "At end" },
          ],
        },
        question: "How can you distinguish Se (ث) from Pe (پ)?",
        options: ["Se has dots above, Pe has dots below", "They are identical", "Se is shorter", "Pe doesn't connect"],
        correctAnswer: 0,
        explanation: "Se has THREE dots ABOVE, while Pe has THREE dots BELOW.",
      },
      {
        id: 10,
        type: "word-analysis",
        instruction: "Find Se in words",
        teachingContent: {
          title: "Se in Words",
          explanation: "Look for three dots above the base shape.",
          examples: [{ label: "Initial", persian: "ثابت", description: "sâbet (stable)" }],
        },
        question: "In 'ثابت' (sâbet), what form of Se is used?",
        options: ["Isolated", "Initial", "Medial", "Final"],
        correctAnswer: 1,
        explanation: "Se appears at the beginning of 'ثابت', using its initial form.",
      },

      // Letter 6: Jim (ج)
      {
        id: 11,
        type: "letter-position",
        instruction: "Learn about the letter Jim (ج)",
        teachingContent: {
          title: "Jim (ج) - Letter J",
          explanation:
            "Jim has a completely different shape from the previous letters. It looks like a small hook with ONE dot in the middle.",
          examples: [
            { label: "Isolated", persian: "ج", description: "Standing alone - hook shape" },
            { label: "Initial", persian: "جـ", description: "At beginning" },
            { label: "Medial", persian: "ـجـ", description: "In middle" },
            { label: "Final", persian: "ـج", description: "At end" },
          ],
        },
        question: "What shape does Jim (ج) have?",
        options: ["Straight line", "Hook or curve", "Circle", "Triangle"],
        correctAnswer: 1,
        explanation: "Jim has a distinctive hook or curved shape with one dot.",
      },
      {
        id: 12,
        type: "letter-position",
        instruction: "Recognize Jim in words",
        teachingContent: {
          title: "Jim in Different Positions",
          explanation: "Practice identifying the hook shape of Jim in words.",
          examples: [
            { label: "Initial", persian: "جا", description: "jâ (place)" },
            { label: "Final", persian: "باج", description: "bâj (tax/tribute)" },
          ],
        },
        question: "In 'جا' (jâ - place), what form of Jim is used?",
        options: ["Isolated", "Initial", "Medial", "Final"],
        correctAnswer: 1,
        explanation: "Jim appears at the beginning, using its initial form that connects to Alef.",
      },

      // Summary exercise
      {
        id: 13,
        type: "word-analysis",
        instruction: "Review all letters learned",
        teachingContent: {
          title: "Letter Review",
          explanation:
            "You've learned 6 letters: ا (Alef), ب (Be), پ (Pe), ت (Te), ث (Se), ج (Jim). Remember their distinctive features!",
          examples: [
            { label: "Alef", persian: "ا", description: "Non-connecting, tall vertical" },
            { label: "Be", persian: "ب", description: "1 dot below" },
            { label: "Pe", persian: "پ", description: "3 dots below" },
            { label: "Te", persian: "ت", description: "2 dots above" },
            { label: "Se", persian: "ث", description: "3 dots above" },
            { label: "Jim", persian: "ج", description: "Hook shape, 1 dot" },
          ],
        },
        question: "Which letters have dots BELOW them?",
        options: ["Alef and Jim", "Be and Pe", "Te and Se", "All of them"],
        correctAnswer: 1,
        explanation: "Be (ب) has 1 dot below and Pe (پ) has 3 dots below.",
      },
    ],
  },
  
  //module 2
  2: {
    moduleId: 2,
    vocabulary: [
      {
        persian: "یک",
        transliteration: "yek",
        english: "one",
        example: "من یک دوست دارم",
        exampleTranslation: "I have one friend",
      },
      {
        persian: "دو",
        transliteration: "do",
        english: "two",
        example: "من دو خواهر دارم",
        exampleTranslation: "I have two sisters",
      },
      {
        persian: "سه",
        transliteration: "se",
        english: "three",
        example: "سه روز است",
        exampleTranslation: "It's three days",
      },
      {
        persian: "چهار",
        transliteration: "chahār",
        english: "four",
        example: "چهار نفر اینجا هستند",
        exampleTranslation: "Four people are here",
      },
      {
        persian: "پنج",
        transliteration: "panj",
        english: "five",
        example: "من پنج کتاب دارم",
        exampleTranslation: "I have five books",
      },
      {
        persian: "شش",
        transliteration: "shesh",
        english: "six",
        example: "ساعت شش است",
        exampleTranslation: "It is six o'clock",
      },
      {
        persian: "هفت",
        transliteration: "haft",
        english: "seven",
        example: "هفت روز هفته",
        exampleTranslation: "Seven days of the week",
      },
      {
        persian: "هشت",
        transliteration: "hasht",
        english: "eight",
        example: "من هشت ساله هستم",
        exampleTranslation: "I am eight years old",
      },
      {
        persian: "نه",
        transliteration: "noh",
        english: "nine",
        example: "ساعت نه صبح است",
        exampleTranslation: "It is nine in the morning",
      },
      {
        persian: "ده",
        transliteration: "dah",
        english: "ten",
        example: "ده تا دوست دارم",
        exampleTranslation: "I have ten friends",
      },
      {
        persian: "صفر",
        transliteration: "sefr",
        english: "zero",
        example: "صفر است",
        exampleTranslation: "It is zero",
      },
      {
        persian: "ساعت",
        transliteration: "sā'at",
        english: "hour / clock / o'clock",
        example: "ساعت چند است؟",
        exampleTranslation: "What time is it?",
      },
      {
        persian: "دقیقه",
        transliteration: "daghighe",
        english: "minute",
        example: "ده دقیقه دیگر",
        exampleTranslation: "Ten more minutes",
      },
      {
        persian: "روز",
        transliteration: "rooz",
        english: "day",
        example: "امروز روز خوبی است",
        exampleTranslation: "Today is a good day",
      },
      {
        persian: "هفته",
        transliteration: "hafte",
        english: "week",
        example: "یک هفته است",
        exampleTranslation: "It's one week",
      },
      {
        persian: "شنبه",
        transliteration: "shanbe",
        english: "Saturday",
        example: "امروز شنبه است",
        exampleTranslation: "Today is Saturday",
      },
      {
        persian: "یکشنبه",
        transliteration: "yekshanbe",
        english: "Sunday",
        example: "فردا یکشنبه است",
        exampleTranslation: "Tomorrow is Sunday",
      },
      {
        persian: "دوشنبه",
        transliteration: "doshanbe",
        english: "Monday",
        example: "دوشنبه کار دارم",
        exampleTranslation: "I have work on Monday",
      },
      {
        persian: "سه‌شنبه",
        transliteration: "seshanbe",
        english: "Tuesday",
        example: "سه‌شنبه می‌آیم",
        exampleTranslation: "I will come on Tuesday",
      },
      {
        persian: "چهارشنبه",
        transliteration: "chahārshanbe",
        english: "Wednesday",
        example: "چهارشنبه استراحت می‌کنم",
        exampleTranslation: "I rest on Wednesday",
      },
      {
        persian: "پنجشنبه",
        transliteration: "panjshanbe",
        english: "Thursday",
        example: "پنجشنبه خانه هستم",
        exampleTranslation: "I am home on Thursday",
      },
      {
        persian: "جمعه",
        transliteration: "jom'e",
        english: "Friday",
        example: "جمعه تعطیل است",
        exampleTranslation: "Friday is a holiday",
      },
      {
        persian: "فردا",
        transliteration: "fardā",
        english: "tomorrow",
        example: "فردا می‌بینمت",
        exampleTranslation: "See you tomorrow",
      },
      {
        persian: "دیروز",
        transliteration: "dirooz",
        english: "yesterday",
        example: "دیروز خانه بودم",
        exampleTranslation: "I was home yesterday",
      },
      {
        persian: "چند",
        transliteration: "chand",
        english: "how many / how much",
        example: "ساعت چند است؟",
        exampleTranslation: "What time is it?",
      },
    ],
    reading: [
      {
        id: 1,
        title: "Counting",
        text: "من یک، دو، سه می‌شمارم. یک دوست، دو خانه، سه کتاب. چهار، پنج، شش. هفت، هشت، نه، ده! من ده تا دوست دارم.",
        textTransliteration:
          "Man yek, do, se mishomāram. Yek doost, do khāne, se ketāb. Chahār, panj, shesh. Haft, hasht, noh, dah! Man dah tā doost dāram.",
        textTranslation:
          "I count one, two, three. One friend, two houses, three books. Four, five, six. Seven, eight, nine, ten! I have ten friends.",
        questions: [
          {
            question: "How many friends does the speaker have?",
            options: ["Five", "Ten", "Three", "One"],
            correctAnswer: 1,
          },
          {
            question: "What is the speaker doing?",
            options: ["Reading", "Counting", "Writing", "Walking"],
            correctAnswer: 1,
          },
        ],
      },
      {
        id: 2,
        title: "What Time Is It?",
        text: "ساعت چند است؟ ساعت سه است. نه، ببخشید. ساعت چهار است! ده دقیقه دیگر ساعت پنج است.",
        textTransliteration:
          "Sā'at chand ast? Sā'at se ast. Na, bebakhshid. Sā'at chahār ast! Dah daghighe digar sā'at panj ast.",
        textTranslation:
          "What time is it? It is three o'clock. No, sorry. It is four o'clock! In ten more minutes it will be five o'clock.",
        questions: [
          {
            question: "What time is it now?",
            options: ["Three", "Four", "Five", "Six"],
            correctAnswer: 1,
          },
          {
            question: "How many minutes until five o'clock?",
            options: ["Five", "Ten", "Fifteen", "Twenty"],
            correctAnswer: 1,
          },
        ],
      },
      {
        id: 3,
        title: "Days of the Week",
        text: "امروز شنبه است. فردا یکشنبه است. دوشنبه کار دارم. پنجشنبه و جمعه خانه هستم. من جمعه را دوست دارم!",
        textTransliteration:
          "Emrooz shanbe ast. Fardā yekshanbe ast. Doshanbe kār dāram. Panjshanbe va jom'e khāne hastam. Man jom'e rā doost dāram!",
        textTranslation:
          "Today is Saturday. Tomorrow is Sunday. I have work on Monday. Thursday and Friday I am home. I like Friday!",
        questions: [
          {
            question: "What day is today?",
            options: ["Friday", "Saturday", "Sunday", "Monday"],
            correctAnswer: 1,
          },
          {
            question: "Which day does the speaker like?",
            options: ["Monday", "Thursday", "Friday", "Saturday"],
            correctAnswer: 2,
          },
        ],
      },
      {
        id: 4,
        title: "Yesterday and Tomorrow",
        text: "دیروز خانه بودم. امروز کار دارم. فردا دوست من می‌آید. ساعت شش می‌آید. من خوشحالم!",
        textTransliteration:
          "Dirooz khāne boodam. Emrooz kār dāram. Fardā doost-e man mi-āyad. Sā'at shesh mi-āyad. Man khoshhālam!",
        textTranslation:
          "Yesterday I was home. Today I have work. Tomorrow my friend is coming. He/she is coming at six o'clock. I am happy!",
        questions: [
          {
            question: "Where was the speaker yesterday?",
            options: ["At work", "At home", "With a friend", "Outside"],
            correctAnswer: 1,
          },
          {
            question: "What time is the friend coming?",
            options: ["Three", "Four", "Five", "Six"],
            correctAnswer: 3,
          },
        ],
      },
      {
        id: 5,
        title: "My Week",
        text: "یک هفته هفت روز است. شنبه تا جمعه. من شنبه تا چهارشنبه کار دارم. پنجشنبه و جمعه خانه هستم. هفته خوبی است!",
        textTransliteration:
          "Yek hafte haft rooz ast. Shanbe tā jom'e. Man shanbe tā chahārshanbe kār dāram. Panjshanbe va jom'e khāne hastam. Hafte-ye khoobi ast!",
        textTranslation:
          "One week is seven days. Saturday to Friday. I work Saturday to Wednesday. Thursday and Friday I am home. It's a good week!",
        questions: [
          {
            question: "How many days are in a week?",
            options: ["Five", "Six", "Seven", "Eight"],
            correctAnswer: 2,
          },
          {
            question: "Which days is the speaker at home?",
            options: ["Monday and Tuesday", "Wednesday and Thursday", "Thursday and Friday", "Saturday and Sunday"],
            correctAnswer: 2,
          },
        ],
      },
    ],
    writing: [
      {
        id: 1,
        type: "build-word",
        instruction: "Build the word 'یک' (one)",
        targetWord: "یک",
        targetWordTransliteration: "yek",
        availableLetters: ["ی", "ک", "د", "و", "س", "ه"],
      },
      {
        id: 2,
        type: "build-word",
        instruction: "Build the word 'دو' (two)",
        targetWord: "دو",
        targetWordTransliteration: "do",
        availableLetters: ["د", "و", "س", "ه", "ی", "ک"],
      },
      {
        id: 3,
        type: "build-word",
        instruction: "Build the word 'سه' (three)",
        targetWord: "سه",
        targetWordTransliteration: "se",
        availableLetters: ["س", "ه", "چ", "ک", "ر", "ت"],
      },
      {
        id: 4,
        type: "build-word",
        instruction: "Build the word 'ساعت' (hour/clock)",
        targetWord: "ساعت",
        targetWordTransliteration: "sā'at",
        availableLetters: ["س", "ا", "ع", "ت", "ر", "د", "م", "ن"],
      },
      {
        id: 5,
        type: "build-word",
        instruction: "Build the word 'روز' (day)",
        targetWord: "روز",
        targetWordTransliteration: "rooz",
        availableLetters: ["ر", "و", "ز", "س", "ت", "ن", "م"],
      },
    ],
  },

  3: {
    moduleId: 3,
    vocabulary: [
      {
        persian: "خانواده",
        transliteration: "khānevāde",
        english: "family",
        example: "خانواده من بزرگ است",
        exampleTranslation: "My family is big",
      },
      {
        persian: "پدر",
        transliteration: "pedar",
        english: "father",
        example: "پدر من معلم است",
        exampleTranslation: "My father is a teacher",
      },
      {
        persian: "مادر",
        transliteration: "mādar",
        english: "mother",
        example: "مادر من خانه است",
        exampleTranslation: "My mother is at home",
      },
      {
        persian: "برادر",
        transliteration: "barādar",
        english: "brother",
        example: "من یک برادر دارم",
        exampleTranslation: "I have one brother",
      },
      {
        persian: "خواهر",
        transliteration: "khāhar",
        english: "sister",
        example: "خواهر من دانشجو است",
        exampleTranslation: "My sister is a student",
      },
      {
        persian: "پسر",
        transliteration: "pesar",
        english: "son / boy",
        example: "او پسر من است",
        exampleTranslation: "He is my son",
      },
      {
        persian: "دختر",
        transliteration: "dokhtar",
        english: "daughter / girl",
        example: "دختر من شش ساله است",
        exampleTranslation: "My daughter is six years old",
      },
      {
        persian: "پدربزرگ",
        transliteration: "pedarbozorg",
        english: "grandfather",
        example: "پدربزرگ من خانه است",
        exampleTranslation: "My grandfather is at home",
      },
      {
        persian: "مادربزرگ",
        transliteration: "mādarbozorg",
        english: "grandmother",
        example: "مادربزرگ من مهربان است",
        exampleTranslation: "My grandmother is kind",
      },
      {
        persian: "عمو",
        transliteration: "amoo",
        english: "uncle (paternal)",
        example: "عمو من ایران است",
        exampleTranslation: "My uncle is in Iran",
      },
      {
        persian: "دایی",
        transliteration: "dāyi",
        english: "uncle (maternal)",
        example: "دایی من امروز می‌آید",
        exampleTranslation: "My uncle is coming today",
      },
      {
        persian: "عمه",
        transliteration: "amme",
        english: "aunt (paternal)",
        example: "عمه من دکتر است",
        exampleTranslation: "My aunt is a doctor",
      },
      {
        persian: "خاله",
        transliteration: "khāle",
        english: "aunt (maternal)",
        example: "خاله من خوب است",
        exampleTranslation: "My aunt is good",
      },
      {
        persian: "همسر",
        transliteration: "hamsar",
        english: "spouse",
        example: "همسر من خانه است",
        exampleTranslation: "My spouse is at home",
      },
      {
        persian: "شوهر",
        transliteration: "showhar",
        english: "husband",
        example: "شوهر من کار دارد",
        exampleTranslation: "My husband has work",
      },
      {
        persian: "زن",
        transliteration: "zan",
        english: "wife / woman",
        example: "زن من معلم است",
        exampleTranslation: "My wife is a teacher",
      },
      {
        persian: "بچه",
        transliteration: "bache",
        english: "child / kid",
        example: "من دو تا بچه دارم",
        exampleTranslation: "I have two children",
      },
      {
        persian: "کوچک",
        transliteration: "koochak",
        english: "small / little / young",
        example: "برادر کوچک من",
        exampleTranslation: "My little brother",
      },
      {
        persian: "بزرگ",
        transliteration: "bozorg",
        english: "big / large / old",
        example: "خواهر بزرگ من",
        exampleTranslation: "My big sister",
      },
      {
        persian: "جوان",
        transliteration: "javān",
        english: "young",
        example: "او جوان است",
        exampleTranslation: "He/she is young",
      },
      {
        persian: "پیر",
        transliteration: "pir",
        english: "old (for people)",
        example: "پدربزرگ من پیر است",
        exampleTranslation: "My grandfather is old",
      },
      {
        persian: "مرد",
        transliteration: "mard",
        english: "man",
        example: "او یک مرد خوب است",
        exampleTranslation: "He is a good man",
      },
      {
        persian: "زندگی",
        transliteration: "zendegi",
        english: "life",
        example: "زندگی خوب است",
        exampleTranslation: "Life is good",
      },
      {
        persian: "محبت",
        transliteration: "mohabbat",
        english: "love / affection",
        example: "محبت خانواده خوب است",
        exampleTranslation: "Family love is good",
      },
      {
        persian: "نام",
        transliteration: "nām",
        english: "name",
        example: "نام پدر من علی است",
        exampleTranslation: "My father's name is Ali",
      },
    ],
    reading: [
      {
        id: 1,
        title: "My Family",
        text: "خانواده من کوچک است. من یک برادر و یک خواهر دارم. پدر من معلم است. مادر من خانه است. من خانواده خود را دوست دارم.",
        textTransliteration:
          "Khānevāde-ye man koochak ast. Man yek barādar va yek khāhar dāram. Pedar-e man mo'allem ast. Mādar-e man khāne ast. Man khānevāde-ye khod rā doost dāram.",
        textTranslation:
          "My family is small. I have one brother and one sister. My father is a teacher. My mother is at home. I love my family.",
        questions: [
          {
            question: "How many siblings does the speaker have?",
            options: ["One", "Two", "Three", "Four"],
            correctAnswer: 1,
          },
          {
            question: "What is the father's job?",
            options: ["Doctor", "Teacher", "Worker", "Student"],
            correctAnswer: 1,
          },
        ],
      },
      {
        id: 2,
        title: "Grandparents",
        text: "پدربزرگ و مادربزرگ من امروز می‌آیند. آن‌ها پیر هستند. من آن‌ها را دوست دارم. پدربزرگ من مهربان است. مادربزرگ من هم مهربان است.",
        textTransliteration:
          "Pedarbozorg va mādarbozorg-e man emrooz mi-āyand. Ānhā pir hastand. Man ānhā rā doost dāram. Pedarbozorg-e man mehrabān ast. Mādarbozorg-e man ham mehrabān ast.",
        textTranslation:
          "My grandfather and grandmother are coming today. They are old. I love them. My grandfather is kind. My grandmother is also kind.",
        questions: [
          {
            question: "When are the grandparents coming?",
            options: ["Yesterday", "Today", "Tomorrow", "Next week"],
            correctAnswer: 1,
          },
          {
            question: "How does the speaker describe the grandparents?",
            options: ["Young", "Bad", "Kind", "Sad"],
            correctAnswer: 2,
          },
        ],
      },
      {
        id: 3,
        title: "My Siblings",
        text: "برادر من بزرگ است. او بیست ساله است. خواهر من کوچک است. او ده ساله است. من هم پانزده ساله هستم. ما با هم بازی می‌کنیم.",
        textTransliteration:
          "Barādar-e man bozorg ast. Oo bist sāle ast. Khāhar-e man koochak ast. Oo dah sāle ast. Man ham pānzdah sāle hastam. Mā bā ham bāzi mikonim.",
        textTranslation:
          "My brother is big. He is twenty years old. My sister is little. She is ten years old. I am also fifteen years old. We play together.",
        questions: [
          {
            question: "How old is the younger sister?",
            options: ["Ten", "Fifteen", "Twenty", "Five"],
            correctAnswer: 0,
          },
          {
            question: "What do they do together?",
            options: ["Work", "Study", "Play", "Sleep"],
            correctAnswer: 2,
          },
        ],
      },
      {
        id: 4,
        title: "Uncle and Aunt",
        text: "عمو من فردا می‌آید. نام او رضا است. خاله من هم می‌آید. او دو تا بچه دارد. یک پسر و یک دختر. من خوشحالم!",
        textTransliteration:
          "Amoo-ye man fardā mi-āyad. Nām-e oo Rezā ast. Khāle-ye man ham mi-āyad. Oo do tā bache dārad. Yek pesar va yek dokhtar. Man khoshhālam!",
        textTranslation:
          "My uncle is coming tomorrow. His name is Reza. My aunt is also coming. She has two children. One boy and one girl. I am happy!",
        questions: [
          {
            question: "What is the uncle's name?",
            options: ["Ali", "Reza", "Hassan", "Ahmad"],
            correctAnswer: 1,
          },
          {
            question: "How many children does the aunt have?",
            options: ["One", "Two", "Three", "Four"],
            correctAnswer: 1,
          },
        ],
      },
      {
        id: 5,
        title: "A Big Family",
        text: "خانواده من بزرگ است. من سه برادر و دو خواهر دارم. پدر و مادر من خانه هستند. ما یک خانواده خوب هستیم. زندگی خوب است!",
        textTransliteration:
          "Khānevāde-ye man bozorg ast. Man se barādar va do khāhar dāram. Pedar va mādar-e man khāne hastand. Mā yek khānevāde-ye khoob hastim. Zendegi khoob ast!",
        textTranslation:
          "My family is big. I have three brothers and two sisters. My father and mother are at home. We are a good family. Life is good!",
        questions: [
          {
            question: "How many brothers does the speaker have?",
            options: ["One", "Two", "Three", "Four"],
            correctAnswer: 2,
          },
          {
            question: "Where are the parents?",
            options: ["At work", "At home", "Outside", "At school"],
            correctAnswer: 1,
          },
        ],
      },
    ],
    writing: [
      {
        id: 1,
        type: "build-word",
        instruction: "Build the word 'پدر' (father)",
        targetWord: "پدر",
        targetWordTransliteration: "pedar",
        availableLetters: ["پ", "د", "ر", "م", "ا", "ت"],
      },
      {
        id: 2,
        type: "build-word",
        instruction: "Build the word 'مادر' (mother)",
        targetWord: "مادر",
        targetWordTransliteration: "mādar",
        availableLetters: ["م", "ا", "د", "ر", "پ", "ب"],
      },
      {
        id: 3,
        type: "build-word",
        instruction: "Build the word 'برادر' (brother)",
        targetWord: "برادر",
        targetWordTransliteration: "barādar",
        availableLetters: ["ب", "ر", "ا", "د", "خ", "و", "ه"],
      },
      {
        id: 4,
        type: "build-word",
        instruction: "Build the word 'خواهر' (sister)",
        targetWord: "خواهر",
        targetWordTransliteration: "khāhar",
        availableLetters: ["خ", "و", "ا", "ه", "ر", "ب", "د"],
      },
      {
        id: 5,
        type: "build-word",
        instruction: "Build the word 'خانواده' (family)",
        targetWord: "خانواده",
        targetWordTransliteration: "khānevāde",
        availableLetters: ["خ", "ا", "ن", "و", "د", "ه", "ر", "م", "ت"],
      },
    ],
  },

  4: {
    moduleId: 4,
    vocabulary: [
      {
        persian: "صبحانه",
        transliteration: "sobhāne",
        english: "breakfast",
        example: "من هر روز صبحانه می‌خورم",
        exampleTranslation: "I eat breakfast every day",
      },
      {
        persian: "ناهار",
        transliteration: "nāhār",
        english: "lunch",
        example: "ناهار ساعت یک است",
        exampleTranslation: "Lunch is at one o'clock",
      },
      {
        persian: "شام",
        transliteration: "shām",
        english: "dinner",
        example: "شام چه می‌خوریم؟",
        exampleTranslation: "What are we having for dinner?",
      },
      {
        persian: "بیدار شدن",
        transliteration: "bidār shodan",
        english: "to wake up",
        example: "من ساعت هفت بیدار می‌شوم",
        exampleTranslation: "I wake up at seven",
      },
      {
        persian: "خوابیدن",
        transliteration: "khābidan",
        english: "to sleep",
        example: "او زود می‌خوابد",
        exampleTranslation: "He/she sleeps early",
      },
      {
        persian: "کار کردن",
        transliteration: "kār kardan",
        english: "to work",
        example: "من هر روز کار می‌کنم",
        exampleTranslation: "I work every day",
      },
      {
        persian: "درس خواندن",
        transliteration: "dars khāndan",
        english: "to study",
        example: "من شب درس می‌خوانم",
        exampleTranslation: "I study at night",
      },
      {
        persian: "ورزش کردن",
        transliteration: "varzesh kardan",
        english: "to exercise",
        example: "او صبح ورزش می‌کند",
        exampleTranslation: "He/she exercises in the morning",
      },
      {
        persian: "دوش گرفتن",
        transliteration: "doosh gereftan",
        english: "to shower",
        example: "من بعد از ورزش دوش می‌گیرم",
        exampleTranslation: "I shower after exercise",
      },
      {
        persian: "لباس پوشیدن",
        transliteration: "lebās pooshidan",
        english: "to get dressed",
        example: "من لباس می‌پوشم",
        exampleTranslation: "I get dressed",
      },
      {
        persian: "صبح",
        transliteration: "sobh",
        english: "morning",
        example: "صبح هوا خوب است",
        exampleTranslation: "The weather is nice in the morning",
      },
      {
        persian: "ظهر",
        transliteration: "zohr",
        english: "noon",
        example: "ظهر خیلی گرم است",
        exampleTranslation: "It's very hot at noon",
      },
      {
        persian: "عصر",
        transliteration: "asr",
        english: "afternoon",
        example: "عصر چای می‌خوریم",
        exampleTranslation: "We drink tea in the afternoon",
      },
      {
        persian: "شب",
        transliteration: "shab",
        english: "night",
        example: "شب سرد است",
        exampleTranslation: "It's cold at night",
      },
      {
        persian: "روز",
        transliteration: "rooz",
        english: "day",
        example: "روز خوبی داشته باش",
        exampleTranslation: "Have a good day",
      },
      {
        persian: "هر روز",
        transliteration: "har rooz",
        english: "every day",
        example: "من هر روز قهوه می‌نوشم",
        exampleTranslation: "I drink coffee every day",
      },
      {
        persian: "همیشه",
        transliteration: "hamishe",
        english: "always",
        example: "او همیشه خوشحال است",
        exampleTranslation: "He/she is always happy",
      },
      {
        persian: "معمولا",
        transliteration: "ma'moolan",
        english: "usually",
        example: "من معمولا زود می‌خوابم",
        exampleTranslation: "I usually sleep early",
      },
      {
        persian: "گاهی",
        transliteration: "gāhi",
        english: "sometimes",
        example: "گاهی دیر می‌آیم",
        exampleTranslation: "Sometimes I come late",
      },
      {
        persian: "هرگز",
        transliteration: "hargez",
        english: "never",
        example: "من هرگز دروغ نمی‌گویم",
        exampleTranslation: "I never lie",
      },
      {
        persian: "زود",
        transliteration: "zood",
        english: "early",
        example: "من زود بیدار می‌شوم",
        exampleTranslation: "I wake up early",
      },
      {
        persian: "دیر",
        transliteration: "dir",
        english: "late",
        example: "او دیر می‌آید",
        exampleTranslation: "He/she comes late",
      },
      {
        persian: "استراحت کردن",
        transliteration: "esterāhat kardan",
        english: "to rest",
        example: "من بعد از کار استراحت می‌کنم",
        exampleTranslation: "I rest after work",
      },
      {
        persian: "تمیز کردن",
        transliteration: "tamiz kardan",
        english: "to clean",
        example: "من خانه را تمیز می‌کنم",
        exampleTranslation: "I clean the house",
      },
      {
        persian: "آماده شدن",
        transliteration: "āmāde shodan",
        english: "to get ready",
        example: "من آماده می‌شوم",
        exampleTranslation: "I'm getting ready",
      },
    ],
    reading: [
      {
        title: "My Morning Routine",
        text: "من هر روز صبح ساعت هفت بیدار می‌شوم. بعد دوش می‌گیرم. لباس می‌پوشم. صبحانه می‌خورم. ساعت هشت از خانه می‌روم.",
        transliteration:
          "man har rooz sobh sā'at haft bidār mishovam. ba'd doosh migiram. lebās mipoosham. sobhāne mikhoram. sā'at hasht az khāne miram.",
        translation:
          "I wake up at seven every morning. Then I shower. I get dressed. I eat breakfast. I leave home at eight.",
        questions: [
          {
            question: "When does the person wake up?",
            options: ["At six", "At seven", "At eight", "At nine"],
            correctAnswer: 1,
          },
          {
            question: "What does the person do after waking up?",
            options: ["Eat breakfast", "Leave home", "Shower", "Get dressed"],
            correctAnswer: 2,
          },
        ],
      },
      {
        title: "Daily Work",
        text: "من ساعت نه کار می‌کنم. ساعت یک ناهار می‌خورم. بعد از ناهار استراحت می‌کنم. ساعت پنج به خانه می‌روم.",
        transliteration:
          "man sā'at noh kār mikonam. sā'at yek nāhār mikhoram. ba'd az nāhār esterāhat mikonam. sā'at panj be khāne miram.",
        translation: "I work at nine. I eat lunch at one. I rest after lunch. I go home at five.",
        questions: [
          {
            question: "When does the person start work?",
            options: ["At eight", "At nine", "At ten", "At eleven"],
            correctAnswer: 1,
          },
          {
            question: "What does the person do after lunch?",
            options: ["Work", "Go home", "Rest", "Exercise"],
            correctAnswer: 2,
          },
        ],
      },
      {
        title: "Evening Time",
        text: "عصر من به خانه می‌آیم. چای می‌خورم. کمی استراحت می‌کنم. شب درس می‌خوانم. ساعت یازده می‌خوابم.",
        transliteration:
          "asr man be khāne miāyam. chāy mikhoram. kami esterāhat mikonam. shab dars mikhānam. sā'at yāzdah mikhābam.",
        translation: "I come home in the afternoon. I drink tea. I rest a little. I study at night. I sleep at eleven.",
        questions: [
          {
            question: "When does the person study?",
            options: ["Morning", "Afternoon", "Night", "Noon"],
            correctAnswer: 2,
          },
          {
            question: "When does the person go to sleep?",
            options: ["At ten", "At eleven", "At twelve", "At nine"],
            correctAnswer: 1,
          },
        ],
      },
      {
        title: "Exercise Routine",
        text: "من معمولا صبح ورزش می‌کنم. گاهی شب ورزش می‌کنم. بعد از ورزش دوش می‌گیرم. همیشه بعد از ورزش خوشحال هستم.",
        transliteration:
          "man ma'moolan sobh varzesh mikonam. gāhi shab varzesh mikonam. ba'd az varzesh doosh migiram. hamishe ba'd az varzesh khoshhāl hastam.",
        translation:
          "I usually exercise in the morning. Sometimes I exercise at night. I shower after exercise. I'm always happy after exercise.",
        questions: [
          {
            question: "When does the person usually exercise?",
            options: ["Morning", "Afternoon", "Night", "Noon"],
            correctAnswer: 0,
          },
          {
            question: "What does the person do after exercise?",
            options: ["Sleep", "Eat", "Shower", "Work"],
            correctAnswer: 2,
          },
        ],
      },
      {
        title: "Weekend Activities",
        text: "من شنبه و جمعه استراحت می‌کنم. زود بیدار نمی‌شوم. دیر صبحانه می‌خورم. خانه را تمیز می‌کنم.",
        transliteration:
          "man shanbe va jom'e esterāhat mikonam. zood bidār nemishovam. dir sobhāne mikhoram. khāne rā tamiz mikonam.",
        translation: "I rest on Saturday and Friday. I don't wake up early. I eat breakfast late. I clean the house.",
        questions: [
          {
            question: "When does the person rest?",
            options: ["Monday", "Tuesday", "Saturday and Friday", "Wednesday"],
            correctAnswer: 2,
          },
          {
            question: "What does the person do on weekends?",
            options: ["Work", "Clean the house", "Go shopping", "Study"],
            correctAnswer: 1,
          },
        ],
      },
    ],
    writing: [
      {
        targetWord: "صبحانه",
        availableLetters: ["ص", "ب", "ح", "ا", "ن", "ه", "م"],
        description: "Build the word for 'breakfast'",
      },
      { targetWord: "کار", availableLetters: ["ک", "ا", "ر", "م", "ن"], description: "Build the word for 'work'" },
      { targetWord: "شام", availableLetters: ["ش", "ا", "م", "ب", "ر"], description: "Build the word for 'dinner'" },
      { targetWord: "صبح", availableLetters: ["ص", "ب", "ح", "ش", "م"], description: "Build the word for 'morning'" },
      { targetWord: "روز", availableLetters: ["ر", "و", "ز", "ش", "ب"], description: "Build the word for 'day'" },
    ],
  },

  5: {
    moduleId: 5,
    vocabulary: [
      {
        persian: "غذا",
        transliteration: "ghazā",
        english: "food",
        example: "غذا خوشمزه است",
        exampleTranslation: "The food is delicious",
      },
      {
        persian: "نان",
        transliteration: "nān",
        english: "bread",
        example: "نان تازه است",
        exampleTranslation: "The bread is fresh",
      },
      {
        persian: "برنج",
        transliteration: "berenj",
        english: "rice",
        example: "من برنج دوست دارم",
        exampleTranslation: "I like rice",
      },
      {
        persian: "گوشت",
        transliteration: "goosht",
        english: "meat",
        example: "این گوشت خوب است",
        exampleTranslation: "This meat is good",
      },
      {
        persian: "مرغ",
        transliteration: "morgh",
        english: "chicken",
        example: "مرغ خوشمزه است",
        exampleTranslation: "The chicken is delicious",
      },
      {
        persian: "ماهی",
        transliteration: "māhi",
        english: "fish",
        example: "ماهی تازه است",
        exampleTranslation: "The fish is fresh",
      },
      {
        persian: "سبزی",
        transliteration: "sabzi",
        english: "vegetables",
        example: "سبزی سالم است",
        exampleTranslation: "Vegetables are healthy",
      },
      {
        persian: "میوه",
        transliteration: "mive",
        english: "fruit",
        example: "میوه شیرین است",
        exampleTranslation: "The fruit is sweet",
      },
      {
        persian: "سیب",
        transliteration: "sib",
        english: "apple",
        example: "سیب قرمز است",
        exampleTranslation: "The apple is red",
      },
      {
        persian: "پرتقال",
        transliteration: "porteghāl",
        english: "orange",
        example: "پرتقال خوشمزه است",
        exampleTranslation: "The orange is delicious",
      },
      {
        persian: "آب",
        transliteration: "āb",
        english: "water",
        example: "آب خنک است",
        exampleTranslation: "The water is cold",
      },
      {
        persian: "چای",
        transliteration: "chāy",
        english: "tea",
        example: "چای گرم است",
        exampleTranslation: "The tea is hot",
      },
      {
        persian: "قهوه",
        transliteration: "ghahve",
        english: "coffee",
        example: "قهوه تلخ است",
        exampleTranslation: "The coffee is bitter",
      },
      {
        persian: "شیر",
        transliteration: "shir",
        english: "milk",
        example: "شیر سفید است",
        exampleTranslation: "The milk is white",
      },
      {
        persian: "شکر",
        transliteration: "shekar",
        english: "sugar",
        example: "شکر شیرین است",
        exampleTranslation: "Sugar is sweet",
      },
      {
        persian: "نمک",
        transliteration: "namak",
        english: "salt",
        example: "نمک کم است",
        exampleTranslation: "There's not enough salt",
      },
      {
        persian: "خوشمزه",
        transliteration: "khoshmaze",
        english: "delicious",
        example: "این غذا خوشمزه است",
        exampleTranslation: "This food is delicious",
      },
      {
        persian: "تازه",
        transliteration: "tāze",
        english: "fresh",
        example: "نان تازه است",
        exampleTranslation: "The bread is fresh",
      },
      {
        persian: "گرم",
        transliteration: "garm",
        english: "hot/warm",
        example: "چای خیلی گرم است",
        exampleTranslation: "The tea is very hot",
      },
      {
        persian: "سرد",
        transliteration: "sard",
        english: "cold",
        example: "آب سرد است",
        exampleTranslation: "The water is cold",
      },
      {
        persian: "دوست داشتن",
        transliteration: "doost dāshtan",
        english: "to like/love",
        example: "من برنج دوست دارم",
        exampleTranslation: "I like rice",
      },
      {
        persian: "خوردن",
        transliteration: "khordan",
        english: "to eat",
        example: "من صبحانه می‌خورم",
        exampleTranslation: "I eat breakfast",
      },
      {
        persian: "نوشیدن",
        transliteration: "nooshidan",
        english: "to drink",
        example: "من چای می‌نوشم",
        exampleTranslation: "I drink tea",
      },
      {
        persian: "رستوران",
        transliteration: "resturān",
        english: "restaurant",
        example: "این رستوران خوب است",
        exampleTranslation: "This restaurant is good",
      },
      {
        persian: "منو",
        transliteration: "menoo",
        english: "menu",
        example: "منو لطفا",
        exampleTranslation: "Menu please",
      },
    ],
    reading: [
      {
        title: "At the Restaurant",
        text: "من به رستوران می‌روم. منو را می‌بینم. برنج و مرغ سفارش می‌دهم. غذا خوشمزه است. چای می‌نوشم.",
        transliteration:
          "man be resturān miram. menoo rā mibinam. berenj va morgh sefāresh midaham. ghazā khoshmaze ast. chāy minusham.",
        translation:
          "I go to the restaurant. I see the menu. I order rice and chicken. The food is delicious. I drink tea.",
        questions: [
          {
            question: "Where does the person go?",
            options: ["Home", "Restaurant", "Shop", "School"],
            correctAnswer: 1,
          },
          {
            question: "What does the person order?",
            options: ["Fish", "Rice and chicken", "Vegetables", "Fruit"],
            correctAnswer: 1,
          },
        ],
      },
      {
        title: "Breakfast Time",
        text: "صبح من صبحانه می‌خورم. نان و پنیر می‌خورم. چای می‌نوشم. چای گرم است. صبحانه خوشمزه است.",
        transliteration:
          "sobh man sobhāne mikhoram. nān va panir mikhoram. chāy minusham. chāy garm ast. sobhāne khoshmaze ast.",
        translation:
          "In the morning I eat breakfast. I eat bread and cheese. I drink tea. The tea is hot. Breakfast is delicious.",
        questions: [
          {
            question: "What does the person eat for breakfast?",
            options: ["Rice", "Bread and cheese", "Meat", "Fish"],
            correctAnswer: 1,
          },
          { question: "What does the person drink?", options: ["Water", "Coffee", "Tea", "Milk"], correctAnswer: 2 },
        ],
      },
      {
        title: "Favorite Foods",
        text: "من برنج دوست دارم. میوه هم دوست دارم. سیب و پرتقال خوشمزه است. من سبزی هم می‌خورم. سبزی سالم است.",
        transliteration:
          "man berenj doost dāram. mive ham doost dāram. sib va porteghāl khoshmaze ast. man sabzi ham mikhoram. sabzi sālem ast.",
        translation:
          "I like rice. I also like fruit. Apples and oranges are delicious. I also eat vegetables. Vegetables are healthy.",
        questions: [
          {
            question: "What does the person like?",
            options: ["Only meat", "Rice and fruit", "Only vegetables", "Only bread"],
            correctAnswer: 1,
          },
          {
            question: "Why does the person eat vegetables?",
            options: ["They are expensive", "They are healthy", "They are cold", "They are hot"],
            correctAnswer: 1,
          },
        ],
      },
      {
        title: "Shopping for Food",
        text: "من به بازار می‌روم. میوه تازه می‌خرم. سیب قرمز خوب است. نان تازه هم می‌خرم. همه چیز خوب است.",
        transliteration:
          "man be bāzār miram. mive tāze mikharam. sib ghermez khoob ast. nān tāze ham mikharam. hame chiz khoob ast.",
        translation:
          "I go to the market. I buy fresh fruit. Red apples are good. I also buy fresh bread. Everything is good.",
        questions: [
          {
            question: "Where does the person go?",
            options: ["Restaurant", "Market", "Home", "School"],
            correctAnswer: 1,
          },
          { question: "What color are the apples?", options: ["Green", "Yellow", "Red", "Orange"], correctAnswer: 2 },
        ],
      },
      {
        title: "Dinner Preparation",
        text: "شب من شام درست می‌کنم. برنج می‌پزم. مرغ با سبزی درست می‌کنم. غذا آماده است. خانواده شام می‌خورد.",
        transliteration:
          "shab man shām dorost mikonam. berenj mipazam. morgh bā sabzi dorost mikonam. ghazā āmāde ast. khānevāde shām mikhored.",
        translation:
          "At night I make dinner. I cook rice. I make chicken with vegetables. The food is ready. The family eats dinner.",
        questions: [
          {
            question: "When does the person cook?",
            options: ["Morning", "Afternoon", "Night", "Noon"],
            correctAnswer: 2,
          },
          {
            question: "What does the person cook?",
            options: ["Rice and chicken with vegetables", "Only rice", "Only meat", "Only vegetables"],
            correctAnswer: 0,
          },
        ],
      },
    ],
    writing: [
      { targetWord: "غذا", availableLetters: ["غ", "ذ", "ا", "ن", "م"], description: "Build the word for 'food'" },
      { targetWord: "نان", availableLetters: ["ن", "ا", "ب", "م"], description: "Build the word for 'bread'" },
      { targetWord: "آب", availableLetters: ["آ", "ب", "ش", "م"], description: "Build the word for 'water'" },
      { targetWord: "چای", availableLetters: ["چ", "ا", "ی", "م", "ن"], description: "Build the word for 'tea'" },
      {
        targetWord: "میوه",
        availableLetters: ["م", "ی", "و", "ه", "ن", "ا"],
        description: "Build the word for 'fruit'",
      },
    ],
  },

  6: {
    moduleId: 6,
    vocabulary: [
      {
        persian: "رنگ",
        transliteration: "rang",
        english: "color",
        example: "این رنگ قشنگ است",
        exampleTranslation: "This color is beautiful",
      },
      {
        persian: "سفید",
        transliteration: "sefid",
        english: "white",
        example: "برف سفید است",
        exampleTranslation: "Snow is white",
      },
      {
        persian: "سیاه",
        transliteration: "siāh",
        english: "black",
        example: "شب سیاه است",
        exampleTranslation: "The night is black",
      },
      {
        persian: "قرمز",
        transliteration: "ghermez",
        english: "red",
        example: "سیب قرمز است",
        exampleTranslation: "The apple is red",
      },
      {
        persian: "آبی",
        transliteration: "ābi",
        english: "blue",
        example: "آسمان آبی است",
        exampleTranslation: "The sky is blue",
      },
      {
        persian: "سبز",
        transliteration: "sabz",
        english: "green",
        example: "چمن سبز است",
        exampleTranslation: "The grass is green",
      },
      {
        persian: "زرد",
        transliteration: "zard",
        english: "yellow",
        example: "خورشید زرد است",
        exampleTranslation: "The sun is yellow",
      },
      {
        persian: "نارنجی",
        transliteration: "nārenji",
        english: "orange",
        example: "پرتقال نارنجی است",
        exampleTranslation: "The orange is orange",
      },
      {
        persian: "صورتی",
        transliteration: "soorati",
        english: "pink",
        example: "گل صورتی است",
        exampleTranslation: "The flower is pink",
      },
      {
        persian: "قهوه‌ای",
        transliteration: "ghahve-i",
        english: "brown",
        example: "میز قهوه‌ای است",
        exampleTranslation: "The table is brown",
      },
      {
        persian: "بزرگ",
        transliteration: "bozorg",
        english: "big/large",
        example: "این خانه بزرگ است",
        exampleTranslation: "This house is big",
      },
      {
        persian: "کوچک",
        transliteration: "koochak",
        english: "small",
        example: "این اتاق کوچک است",
        exampleTranslation: "This room is small",
      },
      {
        persian: "قشنگ",
        transliteration: "ghashang",
        english: "beautiful",
        example: "این گل قشنگ است",
        exampleTranslation: "This flower is beautiful",
      },
      {
        persian: "زشت",
        transliteration: "zesht",
        english: "ugly",
        example: "این عکس زشت است",
        exampleTranslation: "This picture is ugly",
      },
      {
        persian: "نو",
        transliteration: "now",
        english: "new",
        example: "این کتاب نو است",
        exampleTranslation: "This book is new",
      },
      {
        persian: "کهنه",
        transliteration: "kohne",
        english: "old",
        example: "این لباس کهنه است",
        exampleTranslation: "These clothes are old",
      },
      {
        persian: "تمیز",
        transliteration: "tamiz",
        english: "clean",
        example: "خانه تمیز است",
        exampleTranslation: "The house is clean",
      },
      {
        persian: "کثیف",
        transliteration: "kasif",
        english: "dirty",
        example: "ماشین کثیف است",
        exampleTranslation: "The car is dirty",
      },
      {
        persian: "روشن",
        transliteration: "roshan",
        english: "light/bright",
        example: "اتاق روشن است",
        exampleTranslation: "The room is bright",
      },
      {
        persian: "تاریک",
        transliteration: "tārik",
        english: "dark",
        example: "شب تاریک است",
        exampleTranslation: "The night is dark",
      },
      {
        persian: "خوب",
        transliteration: "khoob",
        english: "good",
        example: "این کتاب خوب است",
        exampleTranslation: "This book is good",
      },
      {
        persian: "بد",
        transliteration: "bad",
        english: "bad",
        example: "این فیلم بد است",
        exampleTranslation: "This movie is bad",
      },
      {
        persian: "خیلی",
        transliteration: "kheyli",
        english: "very",
        example: "خیلی خوب است",
        exampleTranslation: "It's very good",
      },
      {
        persian: "کمی",
        transliteration: "kami",
        english: "a little",
        example: "کمی سرد است",
        exampleTranslation: "It's a little cold",
      },
      {
        persian: "چگونه",
        transliteration: "chegune",
        english: "how",
        example: "این چگونه است؟",
        exampleTranslation: "How is this?",
      },
    ],
    reading: [
      {
        title: "My New House",
        text: "خانه من نو است. خانه بزرگ است. اتاق‌ها روشن است. دیوارها سفید است. در آبی است. خانه خیلی قشنگ است.",
        transliteration:
          "khāne man now ast. khāne bozorg ast. otāgh-hā roshan ast. divār-hā sefid ast. dar ābi ast. khāne kheyli ghashang ast.",
        translation:
          "My house is new. The house is big. The rooms are bright. The walls are white. The door is blue. The house is very beautiful.",
        questions: [
          { question: "Is the house new or old?", options: ["Old", "New", "Small", "Dirty"], correctAnswer: 1 },
          { question: "What color are the walls?", options: ["Blue", "Red", "White", "Green"], correctAnswer: 2 },
        ],
      },
      {
        title: "Colors in Nature",
        text: "آسمان آبی است. خورشید زرد است. چمن سبز است. گل قرمز است. همه چیز قشنگ است. من طبیعت دوست دارم.",
        transliteration:
          "āsemān ābi ast. khorshid zard ast. chaman sabz ast. gol ghermez ast. hame chiz ghashang ast. man tabi'at doost dāram.",
        translation:
          "The sky is blue. The sun is yellow. The grass is green. The flower is red. Everything is beautiful. I love nature.",
        questions: [
          { question: "What color is the sky?", options: ["Yellow", "Green", "Blue", "Red"], correctAnswer: 2 },
          { question: "What color is the grass?", options: ["Green", "Blue", "Red", "Yellow"], correctAnswer: 0 },
        ],
      },
      {
        title: "My Room",
        text: "اتاق من کوچک است. اما خیلی تمیز است. میز قهوه‌ای است. صندلی سفید است. تخت بزرگ است. همه چیز خوب است.",
        transliteration:
          "otāgh man koochak ast. ammā kheyli tamiz ast. miz ghahve-i ast. sandali sefid ast. takht bozorg ast. hame chiz khoob ast.",
        translation:
          "My room is small. But it's very clean. The desk is brown. The chair is white. The bed is big. Everything is good.",
        questions: [
          { question: "Is the room big or small?", options: ["Big", "Small", "Dirty", "Dark"], correctAnswer: 1 },
          { question: "What color is the chair?", options: ["Brown", "White", "Black", "Red"], correctAnswer: 1 },
        ],
      },
      {
        title: "Shopping for Clothes",
        text: "من به مغازه می‌روم. لباس نو می‌خرم. یک پیراهن آبی می‌خرم. خیلی قشنگ است. یک شلوار سیاه هم می‌خرم. همه چیز خوب است.",
        transliteration:
          "man be maghāze miram. lebās now mikharam. yek pirāhan ābi mikharam. kheyli ghashang ast. yek shalvār siāh ham mikharam. hame chiz khoob ast.",
        translation:
          "I go to the store. I buy new clothes. I buy a blue shirt. It's very beautiful. I also buy black pants. Everything is good.",
        questions: [
          { question: "What color is the shirt?", options: ["Black", "White", "Blue", "Red"], correctAnswer: 2 },
          { question: "Are the clothes new or old?", options: ["Old", "New", "Dirty", "Big"], correctAnswer: 1 },
        ],
      },
      {
        title: "My Car",
        text: "ماشین من کوچک است. رنگش قرمز است. خیلی تمیز است. نو نیست اما خوب است. من ماشینم را دوست دارم.",
        transliteration:
          "māshin man koochak ast. rangash ghermez ast. kheyli tamiz ast. now nist ammā khoob ast. man māshinam rā doost dāram.",
        translation: "My car is small. Its color is red. It's very clean. It's not new but it's good. I love my car.",
        questions: [
          { question: "What color is the car?", options: ["Blue", "White", "Red", "Black"], correctAnswer: 2 },
          { question: "Is the car new?", options: ["Yes", "No", "Big", "Dirty"], correctAnswer: 1 },
        ],
      },
    ],
    writing: [
      { targetWord: "رنگ", availableLetters: ["ر", "ن", "گ", "م", "ب"], description: "Build the word for 'color'" },
      {
        targetWord: "سفید",
        availableLetters: ["س", "ف", "ی", "د", "ا", "م"],
        description: "Build the word for 'white'",
      },
      { targetWord: "قرمز", availableLetters: ["ق", "ر", "م", "ز", "ن", "ب"], description: "Build the word for 'red'" },
      { targetWord: "بزرگ", availableLetters: ["ب", "ز", "ر", "گ", "م", "ن"], description: "Build the word for 'big'" },
      {
        targetWord: "قشنگ",
        availableLetters: ["ق", "ش", "ن", "گ", "ز", "م"],
        description: "Build the word for 'beautiful'",
      },
    ],
  },

  7: {
    moduleId: 7,
    vocabulary: [
      {
        persian: "کجا",
        transliteration: "kojā",
        english: "where",
        example: "شما کجا هستید؟",
        exampleTranslation: "Where are you?",
      },
      {
        persian: "اینجا",
        transliteration: "injā",
        english: "here",
        example: "من اینجا هستم",
        exampleTranslation: "I am here",
      },
      {
        persian: "آنجا",
        transliteration: "ānjā",
        english: "there",
        example: "او آنجا است",
        exampleTranslation: "He/she is there",
      },
      {
        persian: "راست",
        transliteration: "rāst",
        english: "right",
        example: "به راست بروید",
        exampleTranslation: "Go right",
      },
      {
        persian: "چپ",
        transliteration: "chap",
        english: "left",
        example: "به چپ بپیچید",
        exampleTranslation: "Turn left",
      },
      {
        persian: "مستقیم",
        transliteration: "mostaghim",
        english: "straight",
        example: "مستقیم بروید",
        exampleTranslation: "Go straight",
      },
      {
        persian: "نزدیک",
        transliteration: "nazdik",
        english: "near/close",
        example: "خانه نزدیک است",
        exampleTranslation: "The house is close",
      },
      {
        persian: "دور",
        transliteration: "door",
        english: "far",
        example: "مغازه دور است",
        exampleTranslation: "The store is far",
      },
      {
        persian: "جلو",
        transliteration: "jolo",
        english: "front",
        example: "جلوی خانه",
        exampleTranslation: "In front of the house",
      },
      {
        persian: "پشت",
        transliteration: "posht",
        english: "back/behind",
        example: "پشت در",
        exampleTranslation: "Behind the door",
      },
      {
        persian: "بالا",
        transliteration: "bālā",
        english: "up/above",
        example: "بالای میز",
        exampleTranslation: "Above the table",
      },
      {
        persian: "پایین",
        transliteration: "pāyin",
        english: "down/below",
        example: "پایین ساختمان",
        exampleTranslation: "Below the building",
      },
      {
        persian: "داخل",
        transliteration: "dākhel",
        english: "inside",
        example: "داخل خانه",
        exampleTranslation: "Inside the house",
      },
      {
        persian: "بیرون",
        transliteration: "biroon",
        english: "outside",
        example: "بیرون رستوران",
        exampleTranslation: "Outside the restaurant",
      },
      {
        persian: "بین",
        transliteration: "beyn",
        english: "between",
        example: "بین دو خانه",
        exampleTranslation: "Between two houses",
      },
      {
        persian: "کنار",
        transliteration: "kenār",
        english: "beside/next to",
        example: "کنار مغازه",
        exampleTranslation: "Next to the store",
      },
      {
        persian: "خیابان",
        transliteration: "khiābān",
        english: "street",
        example: "این خیابان بزرگ است",
        exampleTranslation: "This street is big",
      },
      {
        persian: "پارک",
        transliteration: "pārk",
        english: "park",
        example: "پارک نزدیک است",
        exampleTranslation: "The park is close",
      },
      {
        persian: "بانک",
        transliteration: "bānk",
        english: "bank",
        example: "بانک کجاست؟",
        exampleTranslation: "Where is the bank?",
      },
      {
        persian: "بیمارستان",
        transliteration: "bimārestān",
        english: "hospital",
        example: "بیمارستان دور است",
        exampleTranslation: "The hospital is far",
      },
      {
        persian: "مدرسه",
        transliteration: "madrese",
        english: "school",
        example: "مدرسه آنجا است",
        exampleTranslation: "The school is there",
      },
      {
        persian: "مسجد",
        transliteration: "masjed",
        english: "mosque",
        example: "مسجد بزرگ است",
        exampleTranslation: "The mosque is big",
      },
      {
        persian: "ایستگاه",
        transliteration: "istgāh",
        english: "station/stop",
        example: "ایستگاه اتوبوس کجاست؟",
        exampleTranslation: "Where is the bus stop?",
      },
      {
        persian: "گردش کردن",
        transliteration: "gardesh kardan",
        english: "to turn",
        example: "اینجا گردش کنید",
        exampleTranslation: "Turn here",
      },
      {
        persian: "رفتن",
        transliteration: "raftan",
        english: "to go",
        example: "مستقیم بروید",
        exampleTranslation: "Go straight",
      },
    ],
    reading: [
      {
        title: "Finding the Park",
        text: "من پارک را می‌خواهم. مستقیم می‌روم. بعد به راست می‌پیچم. پارک نزدیک است. پارک آنجا است.",
        transliteration:
          "man pārk rā mikhāham. mostaghim miram. ba'd be rāst mipicham. pārk nazdik ast. pārk ānjā ast.",
        translation: "I want the park. I go straight. Then I turn right. The park is close. The park is there.",
        questions: [
          {
            question: "Where does the person want to go?",
            options: ["Bank", "Park", "School", "Hospital"],
            correctAnswer: 1,
          },
          {
            question: "Which direction does the person turn?",
            options: ["Left", "Right", "Straight", "Back"],
            correctAnswer: 1,
          },
        ],
      },
      {
        title: "Near My House",
        text: "خانه من اینجا است. مدرسه نزدیک است. بانک کنار مدرسه است. مغازه جلوی خانه است. همه چیز نزدیک است.",
        transliteration:
          "khāne man injā ast. madrese nazdik ast. bānk kenār madrese ast. maghāze jolo-ye khāne ast. hame chiz nazdik ast.",
        translation:
          "My house is here. The school is close. The bank is next to the school. The store is in front of the house. Everything is close.",
        questions: [
          { question: "Is the school near or far?", options: ["Far", "Near", "Inside", "Behind"], correctAnswer: 1 },
          {
            question: "Where is the store?",
            options: ["Behind the house", "In front of the house", "Far away", "Inside the house"],
            correctAnswer: 1,
          },
        ],
      },
      {
        title: "Going to the Bank",
        text: "من به بانک می‌روم. مستقیم می‌روم. به چپ می‌پیچم. بعد به راست می‌پیچم. بانک آنجا است. بانک بزرگ است.",
        transliteration:
          "man be bānk miram. mostaghim miram. be chap mipicham. ba'd be rāst mipicham. bānk ānjā ast. bānk bozorg ast.",
        translation:
          "I'm going to the bank. I go straight. I turn left. Then I turn right. The bank is there. The bank is big.",
        questions: [
          { question: "Where is the person going?", options: ["Park", "School", "Bank", "Hospital"], correctAnswer: 2 },
          {
            question: "First, which way does the person turn?",
            options: ["Right", "Left", "Back", "Straight only"],
            correctAnswer: 1,
          },
        ],
      },
      {
        title: "The Bus Stop",
        text: "ایستگاه اتوبوس کجاست؟ ایستگاه نزدیک است. مستقیم بروید. ایستگاه کنار پارک است. آنجا است.",
        transliteration: "istgāh otobus kojāst? istgāh nazdik ast. mostaghim beravid. istgāh kenār pārk ast. ānjā ast.",
        translation: "Where is the bus stop? The stop is close. Go straight. The stop is next to the park. It's there.",
        questions: [
          { question: "Is the bus stop near or far?", options: ["Far", "Near", "Inside", "Behind"], correctAnswer: 1 },
          {
            question: "Where is the bus stop?",
            options: ["Behind the park", "Next to the park", "In the park", "Far from the park"],
            correctAnswer: 1,
          },
        ],
      },
      {
        title: "In the City",
        text: "شهر بزرگ است. خیابان‌ها بزرگ است. مسجد بزرگ است. بیمارستان دور است. همه چیز بزرگ است.",
        transliteration:
          "shahr bozorg ast. khiābān-hā bozorg ast. masjed bozorg ast. bimārestān door ast. hame chiz bozorg ast.",
        translation: "The city is big. The streets are big. The mosque is big. The hospital is far. Everything is big.",
        questions: [
          { question: "Is the city big or small?", options: ["Small", "Big", "Near", "Clean"], correctAnswer: 1 },
          { question: "Is the hospital near or far?", options: ["Near", "Far", "Big", "Small"], correctAnswer: 1 },
        ],
      },
    ],
    writing: [
      {
        targetWord: "راست",
        availableLetters: ["ر", "ا", "س", "ت", "چ", "پ"],
        description: "Build the word for 'right'",
      },
      { targetWord: "چپ", availableLetters: ["چ", "پ", "ر", "ا", "س"], description: "Build the word for 'left'" },
      {
        targetWord: "نزدیک",
        availableLetters: ["ن", "ز", "د", "ی", "ک", "م", "ر"],
        description: "Build the word for 'near'",
      },
      {
        targetWord: "پارک",
        availableLetters: ["پ", "ا", "ر", "ک", "م", "ن"],
        description: "Build the word for 'park'",
      },
      {
        targetWord: "بانک",
        availableLetters: ["ب", "ا", "ن", "ک", "م", "ر"],
        description: "Build the word for 'bank'",
      },
    ],
  },

  8: {
    moduleId: 8,
    vocabulary: [
      {
        persian: "خرید",
        transliteration: "kharid",
        english: "shopping/purchase",
        example: "من خرید می‌کنم",
        exampleTranslation: "I'm shopping",
      },
      {
        persian: "فروش",
        transliteration: "foroosh",
        english: "sale",
        example: "این فروش ویژه است",
        exampleTranslation: "This is a special sale",
      },
      {
        persian: "قیمت",
        transliteration: "gheymat",
        english: "price",
        example: "قیمت چقدر است؟",
        exampleTranslation: "What is the price?",
      },
      {
        persian: "پول",
        transliteration: "pool",
        english: "money",
        example: "من پول دارم",
        exampleTranslation: "I have money",
      },
      {
        persian: "تومان",
        transliteration: "toomān",
        english: "toman (currency)",
        example: "ده هزار تومان",
        exampleTranslation: "Ten thousand toman",
      },
      {
        persian: "گران",
        transliteration: "gerān",
        english: "expensive",
        example: "این خیلی گران است",
        exampleTranslation: "This is very expensive",
      },
      {
        persian: "ارزان",
        transliteration: "arzān",
        english: "cheap",
        example: "این ارزان است",
        exampleTranslation: "This is cheap",
      },
      {
        persian: "تخفیف",
        transliteration: "takhfif",
        english: "discount",
        example: "تخفیف دارد؟",
        exampleTranslation: "Does it have a discount?",
      },
      {
        persian: "خریدن",
        transliteration: "kharidan",
        english: "to buy",
        example: "من این را می‌خرم",
        exampleTranslation: "I'm buying this",
      },
      {
        persian: "فروختن",
        transliteration: "forookhtan",
        english: "to sell",
        example: "او کتاب می‌فروشد",
        exampleTranslation: "He/she sells books",
      },
      {
        persian: "چقدر",
        transliteration: "cheghadr",
        english: "how much",
        example: "این چقدر است؟",
        exampleTranslation: "How much is this?",
      },
      {
        persian: "مغازه",
        transliteration: "maghāze",
        english: "store/shop",
        example: "مغازه بزرگ است",
        exampleTranslation: "The store is big",
      },
      {
        persian: "بازار",
        transliteration: "bāzār",
        english: "market/bazaar",
        example: "بازار شلوغ است",
        exampleTranslation: "The market is crowded",
      },
      {
        persian: "فروشگاه",
        transliteration: "forooshgāh",
        english: "department store",
        example: "فروشگاه نزدیک است",
        exampleTranslation: "The store is close",
      },
      {
        persian: "کیف",
        transliteration: "kif",
        english: "bag/purse",
        example: "این کیف قشنگ است",
        exampleTranslation: "This bag is beautiful",
      },
      {
        persian: "کیف پول",
        transliteration: "kif pool",
        english: "wallet",
        example: "کیف پول من کجاست؟",
        exampleTranslation: "Where is my wallet?",
      },
      {
        persian: "کارت",
        transliteration: "kārt",
        english: "card",
        example: "کارت دارید؟",
        exampleTranslation: "Do you have a card?",
      },
      {
        persian: "نقد",
        transliteration: "naghd",
        english: "cash",
        example: "نقد می‌دهم",
        exampleTranslation: "I'm paying cash",
      },
      {
        persian: "رسید",
        transliteration: "resid",
        english: "receipt",
        example: "رسید لطفا",
        exampleTranslation: "Receipt please",
      },
      {
        persian: "اندازه",
        transliteration: "andāze",
        english: "size",
        example: "اندازه من چهل است",
        exampleTranslation: "My size is forty",
      },
      {
        persian: "رنگ دیگر",
        transliteration: "rang-e digar",
        english: "other color",
        example: "رنگ دیگر دارید؟",
        exampleTranslation: "Do you have another color?",
      },
      {
        persian: "کمتر",
        transliteration: "kamtar",
        english: "less",
        example: "کمتر بدهید",
        exampleTranslation: "Give less",
      },
      {
        persian: "بیشتر",
        transliteration: "bishtar",
        english: "more",
        example: "بیشتر می‌خواهم",
        exampleTranslation: "I want more",
      },
      {
        persian: "حساب",
        transliteration: "hesāb",
        english: "bill/account",
        example: "حساب لطفا",
        exampleTranslation: "Bill please",
      },
      {
        persian: "چانه زدن",
        transliteration: "chāne zadan",
        english: "to bargain",
        example: "من چانه می‌زنم",
        exampleTranslation: "I'm bargaining",
      },
    ],
    reading: [
      {
        title: "At the Bazaar",
        text: "من به بازار می‌روم. یک کیف می‌خواهم. این کیف قشنگ است. قیمت چقدر است? صد هزار تومان. خیلی گران است!",
        transliteration:
          "man be bāzār miram. yek kif mikhāham. in kif ghashang ast. gheymat cheghadr ast? sad hezār toomān. kheyli gerān ast!",
        translation:
          "I go to the bazaar. I want a bag. This bag is beautiful. What is the price? One hundred thousand toman. It's very expensive!",
        questions: [
          { question: "Where does the person go?", options: ["Store", "Bazaar", "Home", "Park"], correctAnswer: 1 },
          {
            question: "How much is the bag?",
            options: ["One hundred thousand", "Ten thousand", "One thousand", "One million"],
            correctAnswer: 0,
          },
        ],
      },
      {
        title: "Bargaining",
        text: "این کیف خیلی گران است. تخفیف دارد؟ بله، کمی تخفیف دارد. هشتاد هزار تومان. خوب است. من می‌خرم.",
        transliteration:
          "in kif kheyli gerān ast. takhfif dārad? bale, kami takhfif dārad. hashtād hezār toomān. khoob ast. man mikharam.",
        translation:
          "This bag is very expensive. Does it have a discount? Yes, it has a little discount. Eighty thousand toman. That's good. I'll buy it.",
        questions: [
          {
            question: "Does the item have a discount?",
            options: ["No", "Yes", "Maybe", "Very expensive"],
            correctAnswer: 1,
          },
          {
            question: "What is the final price?",
            options: ["One hundred thousand", "Eighty thousand", "Sixty thousand", "Ninety thousand"],
            correctAnswer: 1,
          },
        ],
      },
      {
        title: "Buying Clothes",
        text: "من لباس می‌خرم. این پیراهن قشنگ است. اندازه من چهل است. رنگ دیگر دارید؟ بله، آبی هم داریم. خوب است.",
        transliteration:
          "man lebās mikharam. in pirāhan ghashang ast. andāze man chehel ast. rang-e digar dārid? bale, ābi ham dārim. khoob ast.",
        translation:
          "I'm buying clothes. This shirt is beautiful. My size is forty. Do you have another color? Yes, we also have blue. That's good.",
        questions: [
          { question: "What is the person buying?", options: ["Food", "Bag", "Clothes", "Books"], correctAnswer: 2 },
          {
            question: "What size does the person need?",
            options: ["Thirty", "Forty", "Fifty", "Sixty"],
            correctAnswer: 1,
          },
        ],
      },
      {
        title: "Payment",
        text: "حساب چقدر است؟ سیصد هزار تومان. نقد می‌دهم. کارت ندارم. خوب است. رسید لطفا. بفرمایید.",
        transliteration:
          "hesāb cheghadr ast? sisad hezār toomān. naghd midaham. kārt nadāram. khoob ast. resid lotfan. befarmāyid.",
        translation:
          "How much is the bill? Three hundred thousand toman. I'm paying cash. I don't have a card. That's fine. Receipt please. Here you go.",
        questions: [
          {
            question: "How much is the total?",
            options: [
              "Two hundred thousand",
              "Three hundred thousand",
              "Four hundred thousand",
              "Five hundred thousand",
            ],
            correctAnswer: 1,
          },
          { question: "How does the person pay?", options: ["Card", "Cash", "Check", "Credit"], correctAnswer: 1 },
        ],
      },
      {
        title: "Shopping Day",
        text: "من خرید می‌کنم. به فروشگاه می‌روم. همه چیز ارزان است. امروز فروش ویژه است. من خیلی خوشحال هستم.",
        transliteration:
          "man kharid mikonam. be forooshgāh miram. hame chiz arzān ast. emrooz foroosh vije ast. man kheyli khoshhāl hastam.",
        translation: "I'm shopping. I go to the store. Everything is cheap. Today is a special sale. I'm very happy.",
        questions: [
          {
            question: "What kind of day is it at the store?",
            options: ["Regular day", "Special sale", "Closed", "Expensive day"],
            correctAnswer: 1,
          },
          {
            question: "Are things expensive or cheap?",
            options: ["Expensive", "Cheap", "Very expensive", "Not for sale"],
            correctAnswer: 1,
          },
        ],
      },
    ],
    writing: [
      {
        targetWord: "خرید",
        availableLetters: ["خ", "ر", "ی", "د", "ف", "م"],
        description: "Build the word for 'shopping'",
      },
      {
        targetWord: "قیمت",
        availableLetters: ["ق", "ی", "م", "ت", "ن", "ر"],
        description: "Build the word for 'price'",
      },
      { targetWord: "پول", availableLetters: ["پ", "و", "ل", "م", "ن"], description: "Build the word for 'money'" },
      {
        targetWord: "گران",
        availableLetters: ["گ", "ر", "ا", "ن", "م", "ز"],
        description: "Build the word for 'expensive'",
      },
      {
        targetWord: "بازار",
        availableLetters: ["ب", "ا", "ز", "ر", "م", "ن"],
        description: "Build the word for 'bazaar'",
      },
    ],
  },

  9: {
    moduleId: 9,
    vocabulary: [
      {
        persian: "سفر",
        transliteration: "safar",
        english: "trip/travel",
        example: "من سفر می‌کنم",
        exampleTranslation: "I'm traveling",
      },
      {
        persian: "ماشین",
        transliteration: "māshin",
        english: "car",
        example: "ماشین من نو است",
        exampleTranslation: "My car is new",
      },
      {
        persian: "اتوبوس",
        transliteration: "otobus",
        english: "bus",
        example: "اتوبوس می‌آید",
        exampleTranslation: "The bus is coming",
      },
      {
        persian: "تاکسی",
        transliteration: "tāksi",
        english: "taxi",
        example: "تاکسی می‌خواهم",
        exampleTranslation: "I want a taxi",
      },
      {
        persian: "مترو",
        transliteration: "metro",
        english: "metro/subway",
        example: "مترو سریع است",
        exampleTranslation: "The metro is fast",
      },
      {
        persian: "قطار",
        transliteration: "ghatār",
        english: "train",
        example: "قطار بزرگ است",
        exampleTranslation: "The train is big",
      },
      {
        persian: "هواپیما",
        transliteration: "havāpeymā",
        english: "airplane",
        example: "هواپیما پرواز می‌کند",
        exampleTranslation: "The airplane is flying",
      },
      {
        persian: "کشتی",
        transliteration: "keshti",
        english: "ship",
        example: "کشتی در دریا است",
        exampleTranslation: "The ship is in the sea",
      },
      {
        persian: "دوچرخه",
        transliteration: "docharkheh",
        english: "bicycle",
        example: "من دوچرخه دارم",
        exampleTranslation: "I have a bicycle",
      },
      {
        persian: "موتور",
        transliteration: "motor",
        english: "motorcycle",
        example: "موتور سریع است",
        exampleTranslation: "The motorcycle is fast",
      },
      {
        persian: "راننده",
        transliteration: "rānande",
        english: "driver",
        example: "راننده خوب است",
        exampleTranslation: "The driver is good",
      },
      {
        persian: "مسافر",
        transliteration: "mosāfer",
        english: "passenger/traveler",
        example: "من مسافر هستم",
        exampleTranslation: "I am a passenger",
      },
      {
        persian: "بلیط",
        transliteration: "belit",
        english: "ticket",
        example: "بلیط چقدر است؟",
        exampleTranslation: "How much is the ticket?",
      },
      {
        persian: "فرودگاه",
        transliteration: "foroodgāh",
        english: "airport",
        example: "فرودگاه بزرگ است",
        exampleTranslation: "The airport is big",
      },
      {
        persian: "راه آهن",
        transliteration: "rāh āhan",
        english: "railway",
        example: "ایستگاه راه آهن کجاست؟",
        exampleTranslation: "Where is the railway station?",
      },
      {
        persian: "سریع",
        transliteration: "sari'",
        english: "fast",
        example: "ماشین سریع است",
        exampleTranslation: "The car is fast",
      },
      {
        persian: "آهسته",
        transliteration: "āheste",
        english: "slow",
        example: "اتوبوس آهسته است",
        exampleTranslation: "The bus is slow",
      },
      {
        persian: "رفتن",
        transliteration: "raftan",
        english: "to go",
        example: "من می‌روم",
        exampleTranslation: "I'm going",
      },
      {
        persian: "آمدن",
        transliteration: "āmadan",
        english: "to come",
        example: "او می‌آید",
        exampleTranslation: "He/she is coming",
      },
      {
        persian: "رسیدن",
        transliteration: "residan",
        english: "to arrive",
        example: "من رسیدم",
        exampleTranslation: "I arrived",
      },
      {
        persian: "راه",
        transliteration: "rāh",
        english: "way/road",
        example: "راه طولانی است",
        exampleTranslation: "The way is long",
      },
      {
        persian: "مسیر",
        transliteration: "masir",
        english: "route/path",
        example: "این مسیر خوب است",
        exampleTranslation: "This route is good",
      },
      {
        persian: "توقف",
        transliteration: "tavaghghof",
        english: "stop",
        example: "توقف نکنید",
        exampleTranslation: "Don't stop",
      },
      {
        persian: "ترافیک",
        transliteration: "terāfik",
        english: "traffic",
        example: "ترافیک زیاد است",
        exampleTranslation: "There's a lot of traffic",
      },
      {
        persian: "سوار شدن",
        transliteration: "savār shodan",
        english: "to get on/board",
        example: "من سوار می‌شوم",
        exampleTranslation: "I'm getting on",
      },
    ],
    reading: [
      {
        title: "Going to Work",
        text: "من هر روز با اتوبوس به کار می‌روم. اتوبوس ساعت هشت می‌آید. من سوار می‌شوم. راه کوتاه است. من راضی هستم.",
        transliteration:
          "man har rooz bā otobus be kār miram. otobus sā'at hasht miāyad. man savār mishovam. rāh kootāh ast. man rāzi hastam.",
        translation:
          "I go to work by bus every day. The bus comes at eight. I get on. The way is short. I'm satisfied.",
        questions: [
          { question: "How does the person go to work?", options: ["Car", "Bus", "Metro", "Taxi"], correctAnswer: 1 },
          { question: "When does the bus come?", options: ["Seven", "Eight", "Nine", "Ten"], correctAnswer: 1 },
        ],
      },
      {
        title: "Taking a Taxi",
        text: "من دیر کردم. تاکسی می‌خواهم. تاکسی می‌آید. من سوار می‌شوم. تاکسی سریع است. خیلی خوب است.",
        transliteration:
          "man dir kardam. tāksi mikhāham. tāksi miāyad. man savār mishovam. tāksi sari' ast. kheyli khoob ast.",
        translation: "I'm late. I want a taxi. The taxi comes. I get in. The taxi is fast. It's very good.",
        questions: [
          {
            question: "Why does the person want a taxi?",
            options: ["Happy", "Late", "Tired", "Rich"],
            correctAnswer: 1,
          },
          { question: "Is the taxi fast or slow?", options: ["Slow", "Fast", "Broken", "Old"], correctAnswer: 1 },
        ],
      },
      {
        title: "Metro Journey",
        text: "مترو خیلی خوب است. مترو سریع است. بلیط ارزان است. من هر روز با مترو می‌روم. ترافیک نیست.",
        transliteration:
          "metro kheyli khoob ast. metro sari' ast. belit arzān ast. man har rooz bā metro miram. terāfik nist.",
        translation:
          "The metro is very good. The metro is fast. The ticket is cheap. I go by metro every day. There's no traffic.",
        questions: [
          { question: "Is the metro fast or slow?", options: ["Slow", "Fast", "Expensive", "Bad"], correctAnswer: 1 },
          {
            question: "Is there traffic on the metro?",
            options: ["Yes", "No", "Sometimes", "Always"],
            correctAnswer: 1,
          },
        ],
      },
      {
        title: "Train Trip",
        text: "من با قطار سفر می‌کنم. قطار بزرگ است. بلیط دارم. من مسافر هستم. راه طولانی است. اما قطار راحت است.",
        transliteration:
          "man bā ghatār safar mikonam. ghatār bozorg ast. belit dāram. man mosāfer hastam. rāh toolāni ast. ammā ghatār rāhat ast.",
        translation:
          "I'm traveling by train. The train is big. I have a ticket. I'm a passenger. The way is long. But the train is comfortable.",
        questions: [
          { question: "How is the person traveling?", options: ["Bus", "Car", "Train", "Plane"], correctAnswer: 2 },
          { question: "Is the journey short or long?", options: ["Short", "Long", "Fast", "Bad"], correctAnswer: 1 },
        ],
      },
      {
        title: "At the Airport",
        text: "من به فرودگاه می‌روم. هواپیما بزرگ است. بلیط گران است. اما سفر سریع است. من خوشحال هستم.",
        transliteration:
          "man be foroodgāh miram. havāpeymā bozorg ast. belit gerān ast. ammā safar sari' ast. man khoshhāl hastam.",
        translation:
          "I'm going to the airport. The airplane is big. The ticket is expensive. But the trip is fast. I'm happy.",
        questions: [
          { question: "Where is the person going?", options: ["Station", "Airport", "Port", "Stop"], correctAnswer: 1 },
          {
            question: "Is the ticket cheap or expensive?",
            options: ["Cheap", "Expensive", "Free", "Fast"],
            correctAnswer: 1,
          },
        ],
      },
    ],
    writing: [
      { targetWord: "سفر", availableLetters: ["س", "ف", "ر", "م", "ن"], description: "Build the word for 'trip'" },
      {
        targetWord: "ماشین",
        availableLetters: ["م", "ا", "ش", "ی", "ن", "ر", "ب"],
        description: "Build the word for 'car'",
      },
      {
        targetWord: "قطار",
        availableLetters: ["ق", "ط", "ا", "ر", "م", "ن"],
        description: "Build the word for 'train'",
      },
      {
        targetWord: "بلیط",
        availableLetters: ["ب", "ل", "ی", "ط", "م", "ن"],
        description: "Build the word for 'ticket'",
      },
      {
        targetWord: "سریع",
        availableLetters: ["س", "ر", "ی", "ع", "آ", "ه"],
        description: "Build the word for 'fast'",
      },
    ],
  },

  10: {
    moduleId: 10,
    vocabulary: [
      {
        persian: "خانه",
        transliteration: "khāne",
        english: "house/home",
        example: "خانه من بزرگ است",
        exampleTranslation: "My house is big",
      },
      {
        persian: "اتاق",
        transliteration: "otāgh",
        english: "room",
        example: "اتاق تمیز است",
        exampleTranslation: "The room is clean",
      },
      {
        persian: "اتاق خواب",
        transliteration: "otāgh khāb",
        english: "bedroom",
        example: "اتاق خواب بزرگ است",
        exampleTranslation: "The bedroom is big",
      },
      {
        persian: "حمام",
        transliteration: "hammām",
        english: "bathroom",
        example: "حمام تمیز است",
        exampleTranslation: "The bathroom is clean",
      },
      {
        persian: "آشپزخانه",
        transliteration: "āshpazkhāne",
        english: "kitchen",
        example: "آشپزخانه کوچک است",
        exampleTranslation: "The kitchen is small",
      },
      {
        persian: "پذیرایی",
        transliteration: "pazirāyi",
        english: "living room",
        example: "پذیرایی راحت است",
        exampleTranslation: "The living room is comfortable",
      },
      {
        persian: "حیاط",
        transliteration: "hayāt",
        english: "yard/courtyard",
        example: "حیاط سبز است",
        exampleTranslation: "The yard is green",
      },
      {
        persian: "در",
        transliteration: "dar",
        english: "door",
        example: "در باز است",
        exampleTranslation: "The door is open",
      },
      {
        persian: "پنجره",
        transliteration: "panjere",
        english: "window",
        example: "پنجره بزرگ است",
        exampleTranslation: "The window is big",
      },
      {
        persian: "دیوار",
        transliteration: "divār",
        english: "wall",
        example: "دیوار سفید است",
        exampleTranslation: "The wall is white",
      },
      {
        persian: "سقف",
        transliteration: "saghf",
        english: "ceiling",
        example: "سقف بلند است",
        exampleTranslation: "The ceiling is high",
      },
      {
        persian: "کف",
        transliteration: "kaf",
        english: "floor",
        example: "کف تمیز است",
        exampleTranslation: "The floor is clean",
      },
      {
        persian: "مبل",
        transliteration: "mobl",
        english: "sofa",
        example: "مبل راحت است",
        exampleTranslation: "The sofa is comfortable",
      },
      {
        persian: "صندلی",
        transliteration: "sandali",
        english: "chair",
        example: "صندلی کوچک است",
        exampleTranslation: "The chair is small",
      },
      {
        persian: "میز",
        transliteration: "miz",
        english: "table",
        example: "میز بزرگ است",
        exampleTranslation: "The table is big",
      },
      {
        persian: "تخت",
        transliteration: "takht",
        english: "bed",
        example: "تخت نرم است",
        exampleTranslation: "The bed is soft",
      },
      {
        persian: "کمد",
        transliteration: "komad",
        english: "closet/wardrobe",
        example: "کمد بزرگ است",
        exampleTranslation: "The closet is big",
      },
      {
        persian: "فرش",
        transliteration: "farsh",
        english: "carpet/rug",
        example: "فرش قشنگ است",
        exampleTranslation: "The carpet is beautiful",
      },
      {
        persian: "پرده",
        transliteration: "parde",
        english: "curtain",
        example: "پرده آبی است",
        exampleTranslation: "The curtain is blue",
      },
      {
        persian: "چراغ",
        transliteration: "cherāgh",
        english: "lamp/light",
        example: "چراغ روشن است",
        exampleTranslation: "The light is on",
      },
      {
        persian: "تلویزیون",
        transliteration: "televizion",
        english: "television",
        example: "تلویزیون بزرگ است",
        exampleTranslation: "The TV is big",
      },
      {
        persian: "یخچال",
        transliteration: "yakhchāl",
        english: "refrigerator",
        example: "یخچال سرد است",
        exampleTranslation: "The refrigerator is cold",
      },
      {
        persian: "ظرف",
        transliteration: "zarf",
        english: "dish/container",
        example: "ظرف تمیز است",
        exampleTranslation: "The dish is clean",
      },
      {
        persian: "کتاب",
        transliteration: "ketāb",
        english: "book",
        example: "کتاب روی میز است",
        exampleTranslation: "The book is on the table",
      },
      {
        persian: "آینه",
        transliteration: "āine",
        english: "mirror",
        example: "آینه بزرگ است",
        exampleTranslation: "The mirror is big",
      },
    ],
    reading: [
      {
        title: "My House",
        text: "خانه من بزرگ است. سه اتاق خواب دارد. حمام تمیز است. آشپزخانه کوچک است. اما همه چیز خوب است.",
        transliteration:
          "khāne man bozorg ast. se otāgh khāb dārad. hammām tamiz ast. āshpazkhāne koochak ast. ammā hame chiz khoob ast.",
        translation:
          "My house is big. It has three bedrooms. The bathroom is clean. The kitchen is small. But everything is good.",
        questions: [
          {
            question: "How many bedrooms does the house have?",
            options: ["Two", "Three", "Four", "Five"],
            correctAnswer: 1,
          },
          { question: "Is the kitchen big or small?", options: ["Big", "Small", "Dirty", "Old"], correctAnswer: 1 },
        ],
      },
      {
        title: "Living Room",
        text: "پذیرایی من بزرگ است. یک مبل راحت دارد. تلویزیون بزرگ است. فرش قشنگ است. من پذیرایی را دوست دارم.",
        transliteration:
          "pazirāyi man bozorg ast. yek mobl rāhat dārad. televizion bozorg ast. farsh ghashang ast. man pazirāyi rā doost dāram.",
        translation:
          "My living room is big. It has a comfortable sofa. The TV is big. The carpet is beautiful. I love the living room.",
        questions: [
          { question: "Is the sofa comfortable?", options: ["No", "Yes", "Small", "Old"], correctAnswer: 1 },
          { question: "What is beautiful?", options: ["TV", "Sofa", "Carpet", "Room"], correctAnswer: 2 },
        ],
      },
      {
        title: "Bedroom",
        text: "اتاق خواب من کوچک است. تخت نرم است. کمد بزرگ است. پنجره بزرگ است. اتاق روشن است. خیلی راحت است.",
        transliteration:
          "otāgh khāb man koochak ast. takht narm ast. komad bozorg ast. panjere bozorg ast. otāgh roshan ast. kheyli rāhat ast.",
        translation:
          "My bedroom is small. The bed is soft. The closet is big. The window is big. The room is bright. It's very comfortable.",
        questions: [
          { question: "Is the bedroom big or small?", options: ["Big", "Small", "Dirty", "Dark"], correctAnswer: 1 },
          { question: "Is the bed soft?", options: ["No", "Yes", "Hard", "Old"], correctAnswer: 1 },
        ],
      },
      {
        title: "Kitchen",
        text: "آشپزخانه تمیز است. یخچال بزرگ است. میز کوچک است. صندلی‌ها سفید است. همه ظرف‌ها تمیز است.",
        transliteration:
          "āshpazkhāne tamiz ast. yakhchāl bozorg ast. miz koochak ast. sandali-hā sefid ast. hame zarf-hā tamiz ast.",
        translation:
          "The kitchen is clean. The refrigerator is big. The table is small. The chairs are white. All the dishes are clean.",
        questions: [
          { question: "Is the kitchen clean or dirty?", options: ["Dirty", "Clean", "Big", "Small"], correctAnswer: 1 },
          { question: "What color are the chairs?", options: ["Black", "Blue", "White", "Red"], correctAnswer: 2 },
        ],
      },
      {
        title: "Cleaning Day",
        text: "امروز خانه را تمیز می‌کنم. کف را تمیز می‌کنم. پنجره‌ها را تمیز می‌کنم. همه اتاق‌ها تمیز است. من خوشحال هستم.",
        transliteration:
          "emrooz khāne rā tamiz mikonam. kaf rā tamiz mikonam. panjere-hā rā tamiz mikonam. hame otāgh-hā tamiz ast. man khoshhāl hastam.",
        translation:
          "Today I'm cleaning the house. I clean the floor. I clean the windows. All the rooms are clean. I'm happy.",
        questions: [
          {
            question: "What is the person doing today?",
            options: ["Cooking", "Cleaning", "Sleeping", "Shopping"],
            correctAnswer: 1,
          },
          { question: "Are the rooms clean now?", options: ["No", "Yes", "Some", "Dirty"], correctAnswer: 1 },
        ],
      },
    ],
    writing: [
      {
        targetWord: "خانه",
        availableLetters: ["خ", "ا", "ن", "ه", "م", "ر"],
        description: "Build the word for 'house'",
      },
      {
        targetWord: "اتاق",
        availableLetters: ["ا", "ت", "ا", "ق", "م", "ن"],
        description: "Build the word for 'room'",
      },
      { targetWord: "مبل", availableLetters: ["م", "ب", "ل", "ر", "ن"], description: "Build the word for 'sofa'" },
      { targetWord: "تخت", availableLetters: ["ت", "خ", "ت", "م", "ر"], description: "Build the word for 'bed'" },
      { targetWord: "فرش", availableLetters: ["ف", "ر", "ش", "م", "ن"], description: "Build the word for 'carpet'" },
    ],
  },
  11: {
    moduleId: 11,
    vocabulary: [
      {
        persian: "هوا",
        transliteration: "havā",
        english: "weather/air",
        example: "هوا خوب است",
        exampleTranslation: "The weather is good",
      },
      {
        persian: "آفتابی",
        transliteration: "āftābi",
        english: "sunny",
        example: "امروز آفتابی است",
        exampleTranslation: "Today is sunny",
      },
      {
        persian: "بارانی",
        transliteration: "bārāni",
        english: "rainy",
        example: "امروز بارانی است",
        exampleTranslation: "Today is rainy",
      },
      {
        persian: "برفی",
        transliteration: "barfi",
        english: "snowy",
        example: "هوا برفی است",
        exampleTranslation: "The weather is snowy",
      },
      {
        persian: "گرم",
        transliteration: "garm",
        english: "warm",
        example: "گرم است",
        exampleTranslation: "It is hot",
      },
      {
        persian: "سرد",
        transliteration: "sard",
        english: "cold",
        example: "سرد است",
        exampleTranslation: "It is cold",
      },
      {
        persian: "ابری",
        transliteration: "abri",
        english: "cloudy",
        example: "آسمان ابری است",
        exampleTranslation: "The sky is cloudy",
      },
      {
        persian: "خنک",
        transliteration: "khonak",
        english: "cool",
        example: "هوا خنک است",
        exampleTranslation: "The weather is cool",
      },
      {
        persian: "خشک",
        transliteration: "khoshk",
        english: "dry",
        example: "هوا خشک است",
        exampleTranslation: "The weather is dry",
      },
      {
        persian: "شرجی",
        transliteration: "sharji",
        english: "dry",
        example: "هوا شرجی است",
        exampleTranslation: "The weather is humid",
      },
      {
        persian: "بهار",
        transliteration: "bahār",
        english: "spring",
        example: "الان بهار است",
        exampleTranslation: "It is spring now",
      },
      {
        persian: "تابستان",
        transliteration: "tābestān",
        english: "summer",
        example: "تابستان گرم است",
        exampleTranslation: "Summer is hot",
      },
      {
        persian: "زمستان",
        transliteration: "zemestān",
        english: "winter",
        example: "زمستان سرد است",
        exampleTranslation: "Winter is cold",
      },
    ],
    12: {
    moduleId: 12,
    vocabulary: [
      {
        persian: "ورزش",
        transliteration: "varzesh",
        english: "sport",
        example: "من ورزش دوست دارم",
        exampleTranslation: "I like sports",
      },
      {
        persian: "فوتبال",
        transliteration: "futbāl",
        english: "soccer",
        example: "فوتبال بازی می‌کنم",
        exampleTranslation: "I play soccer",
      },
      {
        persian: "بسکتبال",
        transliteration: "basketbāl",
        english: "basketball",
        example: "بسکتبال دوست دارم",
        exampleTranslation: "I like basketball",
      },
      {
        persian: "شنا",
        transliteration: "shenā",
        english: "swimming",
        example: "شنا می‌کنم",
        exampleTranslation: "I swim",
      },
      {
        persian: "دویدن",
        transliteration: "davidan",
        english: "running",
        example: "دویدن را دوست دارم",
        exampleTranslation: "I like running",
      },
      {
        persian: "یوگا",
        transliteration: "yogā",
        english: "yoga",
        example: "یوگا تمرین می‌کنم",
        exampleTranslation: "I practice yoga",
      },
      {
        persian: "بدنسازی",
        transliteration: "badansāzi",
        english: "weight training",
        example: "بدنسازی می‌کنم",
        exampleTranslation: "I do weight training",
      },
      {
        persian: "کوهنوردی",
        transliteration: "kuhnavardi",
        english: "hiking/mountain climbing",
        example: "کوهنوردی دوست دارم",
        exampleTranslation: "I like hiking",
      },
      {
        persian: "دوچرخه‌سواری",
        transliteration: "docharkhesavāri",
        english: "cycling",
        example: "دوچرخه‌سواری می‌کنم",
        exampleTranslation: "I ride a bike",
      },
      {
        persian: "تنیس",
        transliteration: "tenis",
        english: "tennis",
        example: "نیس بازی می‌کنم",
        exampleTranslation: "I play tennis",
      },
      {
        persian: "فیلم",
        transliteration: "film",
        english: "movie",
        example: "یلم می‌بینم",
        exampleTranslation: "I watch movies",
      },
      {
        persian: "موسیقی",
        transliteration: "musiqi",
        english: "music",
        example: "موسیقی گوش می‌دهم",
        exampleTranslation: "I listen to music",
      },
      {
        persian: "کنسرت",
        transliteration: "konsert",
        english: "concert",
        example: "به کنسرت می‌روم",
        exampleTranslation: "I go to concerts",
      },
      {
        persian: "آشپزی",
        transliteration: "āshpazi",
        english: "cooking",
        example: "آشپزی می‌کنم",
        exampleTranslation: "I cook",
      },
      {
        persian: "تلویزیون",
        transliteration: "televizion",
        english: "television",
        example: "لویزیون می‌بینم",
        exampleTranslation: "I watch TV",
      },
      {
        persian: "تئاتر",
        transliteration: "teātr",
        english: "theater",
        example: "تئاتر دوست دارم",
        exampleTranslation: "I like theater",
      },
      {
        persian: "بازی",
        transliteration: "bāzi",
        english: "game",
        example: "ازی می‌کنم",
        exampleTranslation: "I play games",
      },
      {
        persian: "سینما",
        transliteration: "sinemā",
        english: "cinema",
        example: "به سینما می‌روم",
        exampleTranslation: "I go to the cinema",
      },
      {
        persian: "کتاب",
        transliteration: "ketāb",
        english: "book",
        example: "کتاب می‌خوانم",
        exampleTranslation: "I read books",
      },
      {
        persian: "نقاشی",
        transliteration: "naqqāshi",
        english: "painting",
        example: "نقاشی می‌کنم",
        exampleTranslation: "I paint",
      },
      {
        persian: "عکاسی",
        transliteration: "akāsi",
        english: "photography",
        example: "عکاسی دوست دارم",
        exampleTranslation: "I like photography",
      },
      {
        persian: "نوشتن",
        transliteration: "neveshtan",
        english: "writing",
        example: "نوشتن دوست دارم",
        exampleTranslation: "I like writing",
      },
      {
        persian: "سفر",
        transliteration: "safar",
        english: "travel",
        example: "سفر دوست دارم",
        exampleTranslation: "I like traveling",
      },
      {
        persian: "باغبانی",
        transliteration: "bāghbāni",
        english: "gardening",
        example: "باغبانی می‌کنم",
        exampleTranslation: "I garden",
      },
      {
        persian: "پیاده‌روی",
        transliteration: "piyāde-ravi",
        english: "walking",
        example: "پیاده‌روی می‌کنم",
        exampleTranslation: "I walk",
      },
    ],
  },
}
