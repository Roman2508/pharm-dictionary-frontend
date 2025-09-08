import { useEffect, useState } from "react";
import {
  Check as CheckIcon,
  Languages,
  Repeat as RepeatIcon,
} from "lucide-react";
import { useDebounceValue } from "@siberiacancode/reactuse";

import { cn } from "./lib/utils";
import Card from "./components/common/Card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { UKR_ALPHABET } from "./helpers/urk-alphabet";
import { LAT_ALPHABET } from "./helpers/lat-alphabet";
import { useGetDictionaries } from "./hooks/use-get-dictionaries";
// import Pagination from './components/common/Pagination'

import Logo from "./components/icons/logo";

type DictionaryType = {
  id: number;
  ukrainian: string;
  latin: string;
  updatedAt: string;
  createdAt: string;
};

const categories = [
  "Назви рослин",
  "Алфавітний покажчик ботанічних назв",
  "Назви лікарських форм",
  "Рецептурні вирази, рецептурні скорочення",
  "Частотні відрізки",
  "Клінічна термінологія",
  "Хімічна номенклатура",
  "Крилаті фрази",
];

function App() {
  const [translationType, setTranslationType] = useState<"uk_la" | "la_uk">(
    "uk_la"
  );

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const debouncedSearch = useDebounceValue(search, 500);

  const query = useGetDictionaries(
    translationType,
    selectedLetter,
    debouncedSearch
  );

  const onChangeTranslationType = () => {
    setSelectedLetter(null);
    setTranslationType((prev) => {
      if (prev === "uk_la") return "la_uk";
      else return "uk_la";
    });
  };

  useEffect(() => {
    setSelectedLetter(null);
  }, [debouncedSearch]);

  return (
    <div className="min-h-screen">
      <div className="border-b flex justify-center p-2 text-lg">
        Латинсько-український словник фармацевтично-медичних термінів
      </div>

      <div className="sticky top-0 z-10">
        <header className="flex justify-between h-[70px] w-full max-w-5xl rounded-full bg-[hsla(0,0%,93%,0.72)] backdrop-blur-xl absolute left-1/2 top-4 z-10 -translate-x-1/2 items-center gap-x-24 pl-6 pr-3 py-2">
          <div className="flex items-center gap-2">
            <Logo variant="color" />
            <h1 className="font-bold text-lg leading-none text-primary">
              ЖБФФК
            </h1>
          </div>

          <div className="flex gap-2">
            <button className="rounded-full h-11 px-4 bg-primary text-white font-semibold cursor-pointer">
              Словник
            </button>

            <button className="rounded-full h-11 px-4 text-primary font-semibold cursor-pointer">
              Тренажер
            </button>
          </div>
        </header>
      </div>

      <div className="pt-30 pb-10 max-w-5xl mx-auto flex items-baseline gap-8">
        <div className="w-80 sticky top-24">
          {categories.map((el) => (
            <div
              onClick={() =>
                setSelectedCategory(el === selectedCategory ? "" : el)
              }
              key={el}
              className={cn(
                "flex justify-between items-center mb-0 py-3 px-0 border-b cursor-pointer",
                selectedCategory === el ? "font-bold text-primary" : ""
              )}
            >
              <p className="text-sm">{el}</p>
            </div>
          ))}
        </div>

        <Card>
          <div className="flex justify-between items-center gap-8 w-full flex-col-reverse md:flex-row">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-60"
              placeholder="Знайти..."
            />

            <div className="">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="w-28 cursor-default hover:bg-background rounded-full"
                >
                  {translationType === "la_uk" ? "Латинська" : "Український"}
                </Button>

                <Button
                  variant="secondary"
                  onClick={onChangeTranslationType}
                  className="rounded-full"
                >
                  <RepeatIcon />
                </Button>

                <Button
                  variant="outline"
                  className="w-28 cursor-default hover:bg-background rounded-full"
                >
                  {translationType === "la_uk" ? "Українська" : "Латинська"}
                </Button>
              </div>

              <Button className="rounded-full" variant="secondary">
                <Languages />
              </Button>
            </div>
          </div>

          <div className="my-4">
            {(translationType === "la_uk" ? LAT_ALPHABET : UKR_ALPHABET).map(
              (letter) => (
                <Button
                  key={letter}
                  className="w-[39px]"
                  variant={selectedLetter === letter ? "default" : "ghost"}
                  onClick={() => {
                    if (selectedLetter === letter) {
                      setSelectedLetter(null);
                    } else {
                      setSelectedLetter(letter);
                    }
                  }}
                >
                  {letter}
                </Button>
              )
            )}
          </div>

          <div>
            <div className="gap-y-2 font-bold border-b">
              <div className="flex gap-4">
                <div className="flex-1">
                  {translationType === "la_uk" ? "Латинська" : "Українська"}
                </div>
                <div className="flex-1">
                  {translationType === "la_uk" ? "Українська" : "Латинська"}
                </div>
              </div>
            </div>

            <div className="">
              {!query.isFetching && !query.data.docs.length && (
                <p className="py-6 text-center">Нічого не знайдено</p>
              )}

              {query.isFetching ? (
                <p className="py-6 text-center">Завантаження...</p>
              ) : (
                <div className="grid grid-cols-1">
                  {query.data?.docs.map((dict: DictionaryType) => {
                    return (
                      <div
                        key={dict.id}
                        className={cn(
                          "flex gap-4 p-1 border-b"
                          // "flex gap-4 p-1 even:bg-[hsla(0,0%,93%,0.72)]",
                        )}
                      >
                        <div className="flex-1">
                          {translationType === "la_uk"
                            ? dict.latin
                            : dict.ukrainian}
                        </div>
                        <div className="flex-1 border-gray-300">
                          {translationType === "la_uk"
                            ? dict.ukrainian
                            : dict.latin}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;
