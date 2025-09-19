import { Link } from "react-router"

import useOrder from "@/hooks/useOrder"
import type { ExerciseCategoryType } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import LoaderCard from "@/components/common/loader-card"
import { useGetExerciseCategories } from "@/hooks/use-get-exersise-categories"
import NotFoundCard from "@/components/common/not-found-card"

const ExerciseListPage = ({ variant }: { variant: "test" | "card" }) => {
  const query = useGetExerciseCategories(variant)

  const orderedCategories = useOrder(query.data)

  return (
    <div className="container mx-auto px-4 py-10">
      {query.isFetching && <LoaderCard />}

      {!orderedCategories.length && !query.isFetching && <NotFoundCard />}

      {orderedCategories.map((category: ExerciseCategoryType) => {
        if (!category.exercises.length) return

        return (
          <div className="mb-10" key={category.id}>
            <h3 className="text-3xl font-bold mb-4">{category.name}</h3>

            <div className="grid grid-cols-3 lg:flex-row gap-8">
              {category.exercises.map((exercise) => (
                <Link to={String(exercise.id)} key={exercise.id}>
                  <Card className="group hover:shadow-lg transition-all duration-300 border bg-background hover:bg-card/50 cursor-pointer">
                    <CardContent className="px-4 py-0">
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-foreground">{exercise.title}</h3>
                        <p className="text-muted-foreground max-w-md mx-auto">{exercise.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ExerciseListPage
