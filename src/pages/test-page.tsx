import { useState } from "react";
import { useParams } from "react-router";

import type {
  ExerciseQuestionType,
  TransliterationVariantsType,
} from "@/types";
import { Button } from "@/components/ui/button";
import LoaderCard from "@/components/common/loader-card";
import { Card, CardContent } from "@/components/ui/card";
import { useGetExercises } from "@/hooks/use-get-exersises";
import SwitchLanguage from "@/components/common/switch-language";

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const TestPage = () => {
  const params = useParams();

  const query = useGetExercises(params.id);

  const [translationType, setTranslationType] =
    useState<TransliterationVariantsType>("uk_la");

  if (query.isFetching) {
    return (
      <div className="container mx-auto px-4 py-10">
        <LoaderCard />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="w-lg mx-auto mb-6">
        <h1 className="font-bold text-2xl mb-3">{query.data?.title}</h1>
        <p className="opacity-[0.7]">{query.data?.description}</p>
      </div>

      <div className="w-lg mx-auto mb-10">
        <SwitchLanguage
          translationType={translationType}
          setTranslationType={setTranslationType}
        />
      </div>

      <div className="flex flex-col items-center">
        {query.data?.question.map(
          (question: ExerciseQuestionType, index: number) => (
            <Card
              key={question.id}
              className="w-lg group mb-6 hover:shadow-lg transition-all duration-300 border bg-background hover:bg-card/50 cursor-pointer"
            >
              <CardContent className="px-4 py-0">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <h3 className="text-xl font-semibold text-foreground">
                      {translationType === "uk_la"
                        ? question.correct.ukrainian
                        : question.correct.latin}
                    </h3>

                    <p className="text-muted-foreground max-w-md">
                      {index + 1} з {query.data.question.length}
                    </p>
                  </div>

                  <p className="text-muted-foreground max-w-md">
                    Виберіть правильну відповідь:
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    {shuffleArray([
                      ...question.incorrect,
                      question.correct,
                    ]).map((item) => (
                      <div key={item.id} className="">
                        <Button
                          variant="outline"
                          className="w-full hover:bg-primary"
                        >
                          {translationType === "uk_la"
                            ? item.latin
                            : item.ukrainian}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        )}

        <Button className="mt-10 bg-primary text-primary-foreground">
          Відправити тест
        </Button>
      </div>
    </div>
  );
};

export default TestPage;
