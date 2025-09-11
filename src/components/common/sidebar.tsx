import { Filter } from 'lucide-react'
import { type Dispatch, type FC, type SetStateAction } from 'react'

import Filters from './filters'
import type { TransliterationVariantsType } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface Props {
  selectedLetter: string
  selectedCategory: number | null
  translationType: TransliterationVariantsType
  setSelectedLetter: Dispatch<SetStateAction<string>>
  setSelectedCategory: Dispatch<SetStateAction<number | null>>
  setTranslationType: Dispatch<SetStateAction<TransliterationVariantsType>>
}

const Sidebar: FC<Props> = ({
  selectedLetter,
  translationType,
  selectedCategory,
  setSelectedLetter,
  setTranslationType,
  setSelectedCategory,
}) => {
  return (
    <aside className="lg:w-72">
      <Card className="backdrop-blur-sm bg-card border shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <Filter className="h-5 w-5 text-primary" />
            Фільтри
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <Filters
            selectedLetter={selectedLetter}
            translationType={translationType}
            selectedCategory={selectedCategory}
            setSelectedLetter={setSelectedLetter}
            setTranslationType={setTranslationType}
            setSelectedCategory={setSelectedCategory}
          />
        </CardContent>
      </Card>
    </aside>
  )
}

export default Sidebar
