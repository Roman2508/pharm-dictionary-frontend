import { ChevronDown, Loader2, Repeat } from "lucide-react";
import { useEffect, type Dispatch, type FC, type SetStateAction } from "react";

import { Button } from "../ui/button";
import useOrder from "@/hooks/useOrder";
import CategoryButton from "../custom/category-button";
import { LAT_ALPHABET } from "@/constants/lat-alphabet";
import { UKR_ALPHABET } from "@/constants/urk-alphabet";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import type { CategoryType, TransliterationVariantsType } from "@/types";
import { useGetDictionaryCategories } from "@/hooks/use-get-dictionary-categories";
import SwitchLanguage from "./switch-language";

interface Props {
  selectedLetter: string;
  selectedCategory: number | null;
  translationType: TransliterationVariantsType;
  setSelectedLetter: Dispatch<SetStateAction<string>>;
  setSelectedCategory: Dispatch<SetStateAction<number | null>>;
  setTranslationType: Dispatch<SetStateAction<TransliterationVariantsType>>;
}

const Filters: FC<Props> = ({
  selectedLetter,
  translationType,
  selectedCategory,
  setSelectedLetter,
  setTranslationType,
  setSelectedCategory,
}) => {
  const query = useGetDictionaryCategories();

  const orderedCategories: CategoryType[] = useOrder(query.data);

  useEffect(() => {
    setSelectedLetter("all");
  }, [translationType]);

  return (
    <>
      <div>
        <label className="text-sm font-semibold text-card-foreground mb-2 block">
          Мова
        </label>
        <SwitchLanguage
          translationType={translationType}
          setTranslationType={setTranslationType}
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-card-foreground mb-2 block">
          Буква
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between bg-background border-primary/20 hover:bg-primary/5 hover:text-primary"
            >
              <span className="font-medium">
                {selectedLetter === "all" ? "Всі букви" : selectedLetter}
              </span>
              <ChevronDown className="h-4 w-4 text-primary" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-4 bg-background border shadow-xl">
            <div className="grid grid-cols-6 gap-2">
              <Button
                variant={selectedLetter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLetter("all")}
                className="text-xs font-medium"
              >
                {translationType === "la_uk" ? "All" : "Всі"}
              </Button>

              {(translationType === "la_uk" ? LAT_ALPHABET : UKR_ALPHABET).map(
                (letter) => (
                  <Button
                    key={letter}
                    variant={selectedLetter === letter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLetter(letter)}
                    className="text-xs font-medium hover:scale-105 transition-transform"
                  >
                    {letter}
                  </Button>
                )
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <label className="text-sm font-semibold text-card-foreground mb-2 block">
          Категорії
        </label>
        <div className="space-y-1">
          {query.isFetching ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
          ) : (
            <>
              <CategoryButton
                id={null}
                label="Всі категорії"
                selectedCategory={selectedCategory}
                onClick={() => setSelectedCategory(null)}
              />

              {orderedCategories.map((category) => (
                <CategoryButton
                  id={category.id}
                  key={category.id}
                  label={category.name}
                  selectedCategory={selectedCategory}
                  onClick={() => setSelectedCategory(category.id)}
                />
              ))}
            </>
          )}

          {!query.isFetching && !query.data?.docs.length && (
            <p className="text-sm">Категорії не знайдено</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Filters;
