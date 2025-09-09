import { useEffect, useState } from 'react'
import { useDebounceValue } from '@siberiacancode/reactuse'

import Sidebar from './components/common/sidebar'
import { Header } from './components/common/header'
import type { TransliterationVariantsType } from './types'
import { useGetDictionaries } from './hooks/use-get-dictionaries'
import DictionaryTable from './components/common/dictionary-table'
import DictionaryActions from './components/common/dictionary-actions'

export function App() {
  const [translationType, setTranslationType] = useState<TransliterationVariantsType>('uk_la')

  const [search, setSearch] = useState('')
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)

  const debouncedSearch = useDebounceValue(search, 500)

  const query = useGetDictionaries(translationType, selectedLetter, debouncedSearch)

  const onChangeTranslationType = () => {
    setSelectedLetter(null)
    setTranslationType((prev) => {
      if (prev === 'uk_la') return 'la_uk'
      else return 'uk_la'
    })
  }

  useEffect(() => {
    setSelectedLetter(null)
  }, [debouncedSearch])

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="">
          <Header />

          <DictionaryActions
            search={search}
            setSearch={setSearch}
            selectedLetter={selectedLetter}
            translationType={translationType}
            setSelectedLetter={setSelectedLetter}
            onChangeTranslationType={onChangeTranslationType}
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border">
          <DictionaryTable query={query} translationType={translationType} />
        </div>
      </main>
    </div>
  )
}

export default App
