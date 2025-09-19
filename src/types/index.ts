export type CategoryType = {
  id: number
  name: string
  order: number
}

export type DictionaryType = {
  id: number
  ukrainian: string
  latin: string
  category: CategoryType
  updatedAt: string
  createdAt: string
}

export type ExerciseCategoryType = {
  id: number
  name: string
  order: number
  exercises: ExerciseType[]
}

export type ExerciseType = {
  id: number
  title: string
  description?: string
  type: "test" | "card"
  category: CategoryType
  question: ExerciseQuestionType[]
  updatedAt: string
  createdAt: string
}

export type ExerciseQuestionType = {
  id: number
  correct: DictionaryType
  incorrect: DictionaryType[]
}

export type TransliterationVariantsType = "uk_la" | "la_uk"
