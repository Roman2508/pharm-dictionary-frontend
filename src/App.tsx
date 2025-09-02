import { useEffect, useState } from 'react'
import { Repeat as RepeatIcon } from 'lucide-react'
import { useDebounceValue } from '@siberiacancode/reactuse'

import { cn } from './lib/utils'
import Card from './components/common/Card'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { UKR_ALPHABET } from './helpers/urk-alphabet'
import { LAT_ALPHABET } from './helpers/lat-alphabet'
import { useGetDictionaries } from './hooks/use-get-dictionaries'
// import Pagination from './components/common/Pagination'

import Logo from './components/icons/logo'

type DictionaryType = {
  id: number
  ukrainian: string
  latin: string
  updatedAt: string
  createdAt: string
}

// const onCreateNewDictItem = () => {
//   axios.post(`${import.meta.env.VITE_BASE_URL}/dictionary`, {
//     latin: 'test_latin',
//     ukrainian: 'test_ukrainian',
//   })
// }
// const onUpdateDictItem = () => {
//   axios.patch(`${import.meta.env.VITE_BASE_URL}/dictionary/4`, {
//     latin: '_latin_',
//     ukrainian: 'test_ukrainian',
//   })
// }

function App() {
  const [translationType, setTranslationType] = useState<'uk_la' | 'la_uk'>('uk_la')

  const [search, setSearch] = useState('')
  // const [currentPage, setCurrentPage] = useState(1)
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
    <div className="min-h-screen bg-[radial-gradient(circle,_rgba(0,0,0,0.15)_1px,_transparent_1px)] [background-size:16px_16px] flex justify-center flex-col px-4 overflow-hidden">
      {/* style={{ color: '#1d5d9b' }} */}

      {/* <div className="absolute top-1 left-4 flex items-center gap-2">
        <Logo variant="color" />
        <div>
          <h1 className="font-extrabold text-lg leading-none">ЖБФФК</h1>
          <p className="text-sm opacity-[0.7]">Українсько-Латинський словник</p>
        </div>
      </div> */}

      <header
        style={{ backgroundColor: '#1d5d9b' }}
        className="mx-auto w-full max-w-3xl mb-4 px-4 flex items-center gap-2 p-2 rounded-b-sm text-white"
      >
        <Logo variant="color" />
        <div>
          <h1 className="font-extrabold text-lg leading-none">ЖБФФК</h1>
          <p className="text-sm opacity-[0.7]">Українсько-Латинський словник</p>
        </div>
      </header>

      <Card>
        <div className="flex justify-between items-center gap-8 w-full flex-col-reverse md:flex-row">
          <Input value={search} onChange={(e) => setSearch(e.target.value)} className="w-60" placeholder="Знайти..." />

          <div className="flex gap-2">
            <Button variant="outline" className="w-28 cursor-default hover:bg-background">
              {translationType === 'la_uk' ? 'Латинська' : 'Український'}
            </Button>

            <Button variant="secondary" onClick={onChangeTranslationType}>
              <RepeatIcon />
            </Button>

            <Button variant="outline" className="w-28 cursor-default hover:bg-background">
              {translationType === 'la_uk' ? 'Українська' : 'Латинська'}
            </Button>
          </div>
        </div>

        {/* <div className="flex gap-2">
          <Button onClick={onCreateNewDictItem}>Create New Entity</Button>
          <Button onClick={onUpdateDictItem}>Update Entity</Button>
        </div> */}

        {/* <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} /> */}

        <div className="">
          {(translationType === 'la_uk' ? LAT_ALPHABET : UKR_ALPHABET).map((letter) => (
            <Button
              key={letter}
              className="w-[42px]"
              variant={selectedLetter === letter ? 'default' : 'ghost'}
              onClick={() => {
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

        <div className="w-full">
          <div className="grid grid-cols-2 gap-y-2 font-bold border-b">
            <div className="flex gap-4">
              <div className="flex-1">{translationType === 'la_uk' ? 'Латинська' : 'Українська'}</div>
              <div className="flex-1">{translationType === 'la_uk' ? 'Українська' : 'Латинська'}</div>
            </div>
            <div className="flex gap-4 pl-4">
              {/* <div className="flex gap-4 border-l pl-4"> */}
              <div className="flex-1">{translationType === 'la_uk' ? 'Латинська' : 'Українська'}</div>
              <div className="flex-1">{translationType === 'la_uk' ? 'Українська' : 'Латинська'}</div>
            </div>
          </div>

          <div className="max-h-[calc(100vh-350px)] overflow-auto">
            {!query.isFetching && !query.data.docs.length && <p className="py-6 text-center">Нічого не знайдено</p>}

            {query.isFetching ? (
              <p className="py-6 text-center">Завантаження...</p>
            ) : (
              <div className="grid grid-cols-2">
                {query.data?.docs.map((dict: DictionaryType, index: number) => {
                  const showStyle = Math.floor(index / 2) % 2 === 0
                  return (
                    <div
                      key={dict.id}
                      className={cn('flex gap-4 p-1 even:border-l even:pl-4', showStyle ? '' : 'bg-gray-50')}
                    >
                      <div className="flex-1">{translationType === 'la_uk' ? dict.latin : dict.ukrainian}</div>
                      <div className="flex-1 border-gray-300">
                        {translationType === 'la_uk' ? dict.ukrainian : dict.latin}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default App
