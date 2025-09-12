import { useEffect, useState } from 'react'
import { useDebounceValue } from '@siberiacancode/reactuse'

import Sidebar from '../components/common/sidebar'
import { Header } from '../components/common/header'
import type { TransliterationVariantsType } from '../types'
import MobileFilters from '@/components/common/mobile-filters'
import DictionaryList from '../components/common/dictionary-list'
import { useGetDictionaries } from '../hooks/use-get-dictionaries'

export const DictionariesPage = () => {
  const [search, setSearch] = useState('')
  const [selectedLetter, setSelectedLetter] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [translationType, setTranslationType] = useState<TransliterationVariantsType>('uk_la')

  const debouncedSearch = useDebounceValue(search, 500)

  const query = useGetDictionaries(translationType, selectedLetter, debouncedSearch, selectedCategory)

  useEffect(() => {
    setSelectedLetter('all')
  }, [debouncedSearch])

  return (
    <div>
      <Header search={search} setSearch={setSearch}>
        <MobileFilters
          selectedLetter={selectedLetter}
          translationType={translationType}
          selectedCategory={selectedCategory}
          setSelectedLetter={setSelectedLetter}
          setTranslationType={setTranslationType}
          setSelectedCategory={setSelectedCategory}
        />
      </Header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block">
            <Sidebar
              selectedLetter={selectedLetter}
              translationType={translationType}
              selectedCategory={selectedCategory}
              setSelectedLetter={setSelectedLetter}
              setTranslationType={setTranslationType}
              setSelectedCategory={setSelectedCategory}
            />
          </div>

          <DictionaryList query={query} translationType={translationType} />
        </div>
      </div>
    </div>
  )
}

export default DictionariesPage
