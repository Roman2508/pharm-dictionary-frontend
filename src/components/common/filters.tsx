import { ChevronDown, Filter, Loader2, Repeat } from 'lucide-react'
import { useMemo, type Dispatch, type FC, type SetStateAction } from 'react'

import { Button } from '../ui/button'
import CategoryButton from '../custom/category-button'
import { LAT_ALPHABET } from '@/constants/lat-alphabet'
import { UKR_ALPHABET } from '@/constants/urk-alphabet'
import { useGetCategories } from '@/hooks/use-get-categories'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import type { CategoryType, TransliterationVariantsType } from '@/types'

interface Props {
  selectedLetter: string
  selectedCategory: number | null
  translationType: TransliterationVariantsType
  setSelectedLetter: Dispatch<SetStateAction<string>>
  setSelectedCategory: Dispatch<SetStateAction<number | null>>
  setTranslationType: Dispatch<SetStateAction<TransliterationVariantsType>>
}

const Filters: FC<Props> = ({
  selectedLetter,
  translationType,
  selectedCategory,
  setSelectedLetter,
  setTranslationType,
  setSelectedCategory,
}) => {
  const query = useGetCategories()

  const onChangeTranslationType = () => {
    setSelectedLetter('all')
    setTranslationType((prev) => {
      if (prev === 'uk_la') return 'la_uk'
      else return 'uk_la'
    })
  }

  const orderedCategories: CategoryType[] = useMemo(() => {
    if (!query.data) return []
    return query.data.docs.sort((a: CategoryType, b: CategoryType) => a.order - b.order)
  }, [query.data])

  return (
    <>
      <div>
        <label className="text-sm font-semibold text-card-foreground mb-2 block">Мова</label>
        <div className="flex justify-between gap-1">
          <Button
            variant="outline"
            className="w-[39%] cursor-default hover:bg-white hover:text-primary rounded-lg shadow-sm text-sm"
          >
            {translationType === 'la_uk' ? 'Латинська' : 'Українська'}
          </Button>

          <Button
            variant="secondary"
            onClick={onChangeTranslationType}
            className="rounded-lg shadow-sm bg-primary hover:bg-primary text-white"
          >
            <Repeat />
          </Button>

          <Button
            variant="outline"
            className="w-[39%] cursor-default hover:bg-white hover:text-primary rounded-lg shadow-sm text-sm"
          >
            {translationType === 'la_uk' ? 'Українська' : 'Латинська'}
          </Button>
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-card-foreground mb-2 block">Буква</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between bg-background border-primary/20 hover:bg-primary/5 hover:text-primary"
            >
              <span className="font-medium">{selectedLetter === 'all' ? 'Всі букви' : selectedLetter}</span>
              <ChevronDown className="h-4 w-4 text-primary" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-4 bg-background border shadow-xl">
            <div className="grid grid-cols-6 gap-2">
              <Button
                variant={selectedLetter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedLetter('all')}
                className="text-xs font-medium"
              >
                {translationType === 'la_uk' ? 'All' : 'Всі'}
              </Button>

              {(translationType === 'la_uk' ? LAT_ALPHABET : UKR_ALPHABET).map((letter) => (
                <Button
                  key={letter}
                  variant={selectedLetter === letter ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedLetter(letter)}
                  className="text-xs font-medium hover:scale-105 transition-transform"
                >
                  {letter}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <label className="text-sm font-semibold text-card-foreground mb-2 block">Категорії</label>
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

          {!query.isFetching && !query.data.docs.length && <p className="text-sm">Категорії не знайдено</p>}
        </div>
      </div>
    </>
  )
}

export default Filters
