import { useParams } from "react-router"
import { useEffect, useMemo, useState } from "react"
import { Check as CheckIcon, X as XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import LoaderCard from "@/components/common/loader-card"
import { Card, CardContent } from "@/components/ui/card"
import { useGetExercises } from "@/hooks/use-get-exersises"
import SwitchLanguage from "@/components/common/switch-language"
import type { ExerciseQuestionType, TransliterationVariantsType } from "@/types"
import { toast } from "sonner"

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

const TestPage = () => {
  const params = useParams()

  const query = useGetExercises(params.id)

  const shaffledQuestions = useMemo(() => {
    if (!query.data?.question) return []
    const questions = query.data.question.map((question: ExerciseQuestionType) => ({
      ...question,
      incorrect: shuffleArray([...question.incorrect, question.correct]),
    }))
    return shuffleArray(questions)
  }, [query.data?.question]) as ExerciseQuestionType[]

  const [isShowResults, setIsShowResults] = useState(false)
  const [answers, setAnswers] = useState<{ questionId: number; answerId: number }[]>([])
  const [translationType, setTranslationType] = useState<TransliterationVariantsType>("uk_la")

  const makeAnswer = (questionId: number, answerId: number) => {
    setAnswers((prev) => {
      const isExisting = prev.find((answer) => answer.questionId === questionId)
      if (isExisting) {
        return prev.map((answer) => (answer.questionId === questionId ? { questionId, answerId } : answer))
      }
      const answers = [...prev, { questionId, answerId }]
      localStorage.setItem("testAnswers", JSON.stringify({ answers, testId: params.id }))
      return answers
    })
  }

  const checkIsAnswered = (questionId: number, answerId: number) => {
    return answers.find((answer) => answer.questionId === questionId && answer.answerId === answerId)
  }

  const checkAnswer = (questionId: number, answerId: number) => {
    const question = shaffledQuestions.find((q) => q.id === questionId)
    if (!question) return false
    return question.correct.id === answerId
  }

  const checkIsAllAnswered = useMemo(() => {
    return answers.length === shaffledQuestions.length
  }, [answers.length, shaffledQuestions.length])

  useEffect(() => {
    const existingAnswers = JSON.parse(localStorage.getItem("testAnswers") || "[]")
    if (existingAnswers && existingAnswers.testId === params.id) setAnswers(existingAnswers.answers || [])
  }, [])

  if (query.isFetching) {
    return (
      <div className="container mx-auto px-4 py-10">
        <LoaderCard />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-[50px_1fr_50px] items-baseline gap-10">
      <div className="sticky top-20 z-10 mb-10 flex flex-col ml-4">
        {isShowResults && (
          <>
            {shaffledQuestions.map((question, index) => (
              <div className="flex items-center gap-2" key={question.id}>
                <span className="text-muted-foreground">{index + 1}</span>
                {checkAnswer(question.id, answers.find((a) => a.questionId === question.id)?.answerId || -1) ? (
                  <CheckIcon size={20} className="text-green-500" />
                ) : (
                  <XIcon size={20} className="text-red-500" />
                )}
              </div>
            ))}
          </>
        )}
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="w-lg mx-auto mb-6">
          <h1 className="font-bold text-2xl mb-3">{query.data?.title}</h1>
          <p className="opacity-[0.7]">{query.data?.description}</p>
        </div>

        <div className="w-lg mx-auto mb-10">
          <SwitchLanguage
            translationType={translationType}
            setTranslationType={setTranslationType}
            isDisabled={!isShowResults && !!answers.length}
          />
        </div>

        <div className="flex flex-col items-center">
          {shaffledQuestions.map((question: ExerciseQuestionType, index: number) => (
            <Card
              key={question.id}
              className="w-lg group mb-6 hover:shadow-lg transition-all duration-300 border bg-background hover:bg-card/50 cursor-pointer"
            >
              <CardContent className="px-4 py-0">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <h3 className="text-xl font-semibold text-foreground">
                      {translationType === "uk_la" ? question.correct.ukrainian : question.correct.latin}
                    </h3>

                    <p className="text-muted-foreground max-w-md">
                      {index + 1} з {shaffledQuestions.length}
                    </p>
                  </div>

                  <p className="text-muted-foreground max-w-md">Виберіть правильну відповідь:</p>

                  <div className="grid grid-cols-2 gap-4">
                    {question.incorrect.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          if (isShowResults) return
                          makeAnswer(question.id, item.id)
                        }}
                      >
                        <div
                          className={cn(
                            "w-full h-full min-h-10 px-4 py-2 text-center hover:bg-primary border bg-background cursor-pointer inline-flex items-center justify-center gap-2 rounded-md shadow-sm rounded-lg text-md font-medium transition-all outline-none",
                            "hover:bg-blue-50",
                            checkIsAnswered(question.id, item.id) && "!bg-primary !text-accent-foreground",
                            isShowResults && "cursor-default",
                            isShowResults && checkAnswer(question.id, item.id) && "!bg-green-500 !text-white",
                            isShowResults &&
                              checkIsAnswered(question.id, item.id) &&
                              !checkAnswer(question.id, item.id) &&
                              "!bg-red-500 !text-white",
                          )}
                        >
                          {translationType === "uk_la" ? item.latin : item.ukrainian}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {isShowResults ? (
            <Button
              className="mt-10 bg-primary text-primary-foreground"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" })
                localStorage.removeItem("testAnswers")
                setIsShowResults(false)
                setAnswers([])
              }}
            >
              Спробувати ще раз
            </Button>
          ) : (
            <Button
              className="mt-10 bg-primary text-primary-foreground"
              onClick={() => {
                if (checkIsAllAnswered) {
                  setIsShowResults(true)
                  window.scrollTo({ top: 0, behavior: "smooth" })
                } else {
                  toast.error("Будь ласка, дайте відповіді на всі питання перед відправкою тесту.")
                }
              }}
            >
              Відправити тест
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default TestPage
