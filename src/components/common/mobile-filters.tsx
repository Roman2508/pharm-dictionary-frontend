import { Filter } from "lucide-react"
import type { Dispatch, FC, SetStateAction } from "react"

import Filters from "./filters"
import { Button } from "@/components/ui/button"
import type { TransliterationVariantsType } from "@/types"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface Props {
  selectedLetter: string
  selectedCategory: number | null
  translationType: TransliterationVariantsType
  setCurrentPage: Dispatch<SetStateAction<number>>
  setSelectedLetter: Dispatch<SetStateAction<string>>
  setSelectedCategory: Dispatch<SetStateAction<number | null>>
  setTranslationType: Dispatch<SetStateAction<TransliterationVariantsType>>
}

const MobileFilters: FC<Props> = ({
  setCurrentPage,
  selectedLetter,
  translationType,
  selectedCategory,
  setSelectedLetter,
  setTranslationType,
  setSelectedCategory,
}) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" className="text-primary font-medium hover:bg-primary/10 bg-primary/10">
          <Filter className="text-primary" />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 mb-8">
            <Filter />
            <p>Фільтри</p>
          </SheetTitle>
          <SheetDescription className="flex flex-col gap-8">
            <Filters
              setCurrentPage={setCurrentPage}
              selectedLetter={selectedLetter}
              translationType={translationType}
              selectedCategory={selectedCategory}
              setSelectedLetter={setSelectedLetter}
              setTranslationType={setTranslationType}
              setSelectedCategory={setSelectedCategory}
            />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default MobileFilters
