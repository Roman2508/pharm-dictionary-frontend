import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Repeat as RepeatIcon } from "lucide-react";

import { cn } from "./lib/utils";
import Card from "./components/common/Card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import Pagination from "./components/common/Pagination";

type DictionaryType = {
  id: number;
  ukrainian: string;
  latin: string;
  updatedAt: string;
  createdAt: string;
};

function App() {
  const [translationType, setTranslationType] = useState<"uk_la" | "la_uk">(
    "uk_la"
  );

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const query = useQuery({
    queryKey: ["dictionary"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/dictionary`,
        { withCredentials: true }
      );
      return data;
    },
  });

  const onCreateNewDictItem = () => {
    axios.post(`${import.meta.env.VITE_BASE_URL}/dictionary`, {
      latin: "test_latin",
      ukrainian: "test_ukrainian",
    });
  };
  const onUpdateDictItem = () => {
    axios.patch(`${import.meta.env.VITE_BASE_URL}/dictionary/4`, {
      latin: "_latin_",
      ukrainian: "test_ukrainian",
    });
  };

  const onChangeTranslationType = () => {
    setTranslationType((prev) => {
      if (prev === "uk_la") return "la_uk";
      else return "uk_la";
    });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle,_rgba(0,0,0,0.15)_1px,_transparent_1px)] [background-size:16px_16px] flex justify-center py-16 px-4">
      <Card>
        <div className="flex justify-between items-center gap-8 w-full flex-col-reverse md:flex-row">
          <div className="flex gap-2">
            <Input value={search} onChange={(e) => setSearch(e.target.value)} />
            <Button>Пошук</Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="w-28 cursor-default hover:bg-background"
            >
              {translationType === "la_uk" ? "Латинська" : "Український"}
            </Button>

            <Button variant="secondary" onClick={onChangeTranslationType}>
              <RepeatIcon />
            </Button>

            <Button
              variant="outline"
              className="w-28 cursor-default hover:bg-background"
            >
              {translationType === "la_uk" ? "Український" : "Латинська"}
            </Button>
          </div>
        </div>

        {/* <div className="flex gap-2">
          <Button onClick={onCreateNewDictItem}>Create New Entity</Button>
          <Button onClick={onUpdateDictItem}>Update Entity</Button>
        </div> */}

        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />

        <div className="w-full">
          <div className="grid grid-cols-2 gap-y-2 font-bold border-b">
            <div className="flex gap-4">
              <div className="flex-1">
                {translationType === "la_uk" ? "Латинська" : "Українська"}
              </div>
              <div className="flex-1">
                {translationType === "la_uk" ? "Українська" : "Латинська"}
              </div>
            </div>
            <div className="flex gap-4 border-l pl-4">
              <div className="flex-1">
                {translationType === "la_uk" ? "Латинська" : "Українська"}
              </div>
              <div className="flex-1">
                {translationType === "la_uk" ? "Українська" : "Латинська"}
              </div>
            </div>
          </div>

          {query.isFetching ? (
            <p className="py-2 text-center">Loading...</p>
          ) : (
            <div className="grid grid-cols-2">
              {query.data?.docs.map((dict: DictionaryType, index: number) => {
                const showStyle = Math.floor(index / 2) % 2 === 0;
                return (
                  <div
                    key={dict.id}
                    className={cn(
                      "flex gap-4 p-1 even:border-l even:pl-4",
                      showStyle ? "" : "bg-gray-50"
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
      </Card>
    </div>
  );
}

export default App;
