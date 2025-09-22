import { useState } from "react"
import { useParams } from "react-router"

import LoaderCard from "@/components/common/loader-card"
import { useGetExercises } from "@/hooks/use-get-exersises"
import SwitchLanguage from "@/components/common/switch-language"
import type { ExerciseQuestionType, TransliterationVariantsType } from "@/types"

const CardPage = () => {
  const params = useParams()

  const query = useGetExercises(params.id)

  const [flipped, setFlipped] = useState<number[]>([])
  const [translationType, setTranslationType] = useState<TransliterationVariantsType>("uk_la")

  const handleFlipped = (id: number) => {
    setFlipped((prev) => {
      const isExist = prev.includes(id)
      if (isExist) {
        return prev.filter((i) => i !== id)
      }
      return [...prev, id]
    })
  }

  if (query.isFetching) {
    return (
      <div className="container mx-auto px-4 py-10">
        <LoaderCard />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-lg w-full mx-auto mb-6">
        <h1 className="font-bold text-2xl mb-3">{query.data?.title}</h1>
        <p className="opacity-[0.7]">{query.data?.description}</p>
      </div>

      <div className="max-w-lg w-full mx-auto mb-10">
        <SwitchLanguage translationType={translationType} setTranslationType={setTranslationType} />
      </div>

      <div className="flex flex-col items-center">
        {query.data?.question.map((question: ExerciseQuestionType, index: number) => (
          <div key={question.id} className="mb-6 max-w-lg w-full" onClick={() => handleFlipped(question.id)}>
            <div className="h-50 cursor-pointer">
              <div
                className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
                  flipped.some((el) => el === question.id) ? "[transform:rotateY(180deg)]" : ""
                }`}
              >
                {/* Front */}
                <div className="absolute inset-0 flex items-center justify-center bg-white border rounded-xl shadow [backface-visibility:hidden] bg-background hover:bg-card/50 hover:shadow-lg hover:text-primary">
                  <span className="text-xl font-bold transition-colors">
                    {translationType === "uk_la" ? question.correct.ukrainian : question.correct.latin}
                  </span>
                  <p className="absolute top-4 right-4 text-muted-foreground max-w-md">
                    {index + 1} з {query.data.question.length}
                  </p>
                </div>

                {/* Back */}
                <div className="absolute inset-0 flex items-center justify-center bg-background hover:bg-card/50 hover:shadow-lg hover:text-primary border rounded-xl shadow [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <span className="text-xl font-bold transition-colors">
                    {translationType === "uk_la" ? question.correct.latin : question.correct.ukrainian}
                  </span>
                  <p className="absolute top-4 right-4 text-muted-foreground max-w-md">
                    {index + 1} з {query.data.question.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CardPage
