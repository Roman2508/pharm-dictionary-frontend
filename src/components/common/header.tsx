import type { Dispatch, FC, SetStateAction } from 'react'
import { Languages, Search as SearchIcon } from 'lucide-react'

import Logo from '../icons/logo'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

interface Props {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}

const Header: FC<Props> = ({ search, setSearch }) => {
  return (
    <>
      <nav className="bg-white/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center gap-2">
                <Languages className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg text-foreground">PharmDictApp</span>
              </div>
              <div className="flex space-x-6">
                <Button variant="ghost" className="text-primary font-medium hover:bg-primary/10 bg-primary/10">
                  Словник
                </Button>
                <Button variant="ghost" className="text-muted-foreground font-medium hover:bg-muted/50">
                  Тренажер
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <header className="relative overflow-hidden bg-primary header-gradient">
        {/* from-blue-400 via-blue-500 to-blue-600 */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3),transparent_50%)]"></div>
        <div className="relative container mx-auto px-4 py-10">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              {/* <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Languages className="h-8 w-8 text-white" />
                  </div> */}

              <Logo variant="default" className="animate-pulse w-40 h-40" />

              {/* <Sparkles className="h-6 w-6 text-white animate-pulse" /> */}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white text-balance">
              Житомирський фармацевтичний коледж
            </h1>
            <p className="text-2xl text-white/90 max-w-4xl mx-auto text-pretty">
              Латинсько-український словник фармацевтично-медичних термінів
            </p>

            <div className="relative max-w-2xl mx-auto mt-8">
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 z-[1]" />
                <Input
                  type="text"
                  value={search}
                  placeholder="Знайти..."
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-12 pr-4 h-14 text-lg bg-white backdrop-blur-sm border-0 shadow-xl focus:shadow-2xl transition-all duration-300 focus:ring-4 focus:ring-white/20"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export { Header }
