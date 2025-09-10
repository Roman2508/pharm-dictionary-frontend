import { useState, type Dispatch, type FC, type SetStateAction } from 'react'
import { Languages as LanguagesIcon, Repeat as RepeatIcon, Search as SearchIcon } from 'lucide-react'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { LAT_ALPHABET } from '@/constants/lat-alphabet'
import { UKR_ALPHABET } from '@/constants/urk-alphabet'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

interface Props {
  search: string
  selectedLetter: string | null
  translationType: 'uk_la' | 'la_uk'
  onChangeTranslationType: () => void
  setSearch: Dispatch<SetStateAction<string>>
  setSelectedLetter: Dispatch<SetStateAction<string | null>>
}

const DictionaryActions: FC<Props> = ({
  search,
  setSearch,
  selectedLetter,
  translationType,
  setSelectedLetter,
  onChangeTranslationType,
}) => {
  const [isOpenLettersPopover, setIsOpenLettersPopover] = useState(false)

  return (
    <div className="mb-6 flex items-center space-x-3">
      {/* Search */}
      <div className="relative flex-1">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <SearchIcon size={18} className="text-primary" />
        </div>
        <Input
          value={search}
          placeholder="Пошук..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm"
        />
      </div>

      <div className="flex gap-2">
        <Button variant="outline" className="w-30 cursor-default hover:bg-background rounded-lg shadow-sm">
          {translationType === 'la_uk' ? 'Латинська' : 'Українська'}
        </Button>

        <Button variant="secondary" onClick={onChangeTranslationType} className="rounded-lg shadow-sm bg-gray-200">
          <RepeatIcon />
        </Button>

        <Button variant="outline" className="w-30 cursor-default hover:bg-background rounded-lg shadow-sm">
          {translationType === 'la_uk' ? 'Українська' : 'Латинська'}
        </Button>
      </div>

      <Popover open={isOpenLettersPopover} onOpenChange={setIsOpenLettersPopover}>
        <PopoverTrigger>
          <Button variant="secondary" className="w-30 text-md">
            {selectedLetter ? (
              <>
                <LanguagesIcon />
                Буква: <span className="font-extrabold">{selectedLetter}</span>
              </>
            ) : (
              <>
                <LanguagesIcon />
                Фільтр
              </>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0 pl-1.5">
          <div className="my-4">
            {(translationType === 'la_uk' ? LAT_ALPHABET : UKR_ALPHABET).map((letter) => (
              <Button
                key={letter}
                className="w-[39px]"
                variant={selectedLetter === letter ? 'default' : 'ghost'}
                onClick={() => {
                  setIsOpenLettersPopover(false)
                  if (selectedLetter === letter) {
                    setSelectedLetter(null)
                  } else {
                    setSelectedLetter(letter)
                  }
                }}
              >
                {letter}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DictionaryActions
