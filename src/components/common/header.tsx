import type { Dispatch, FC, ReactNode, SetStateAction } from "react"
import { Languages, Search as SearchIcon } from "lucide-react"

import Logo from "../icons/logo"
import NavLinks from "./nav-links"
import { Input } from "../ui/input"
import Pagination from "./Pagination"

interface Props {
  search: string
  children?: ReactNode
  isSearchDisable?: boolean
  setSearch: Dispatch<SetStateAction<string>>
}

const Header: FC<Props> = ({ search, children, setSearch, isSearchDisable }) => {
  return (
    <>
      <nav className="bg-white/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between lg:gap-12 lg:justify-start h-16">
            <div className="flex items-center gap-2">
              <Languages className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg text-foreground sm:block hidden">Pharm Dictionary</span>
            </div>

            <NavLinks />

            <div className="lg:hidden">{children}</div>
          </div>
        </div>
      </nav>

      <header className="relative overflow-hidden bg-primary header-gradient">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3),transparent_50%)]"></div>
        <div className="relative container mx-auto px-4 py-10">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Logo variant="default" className="animate-pulse w-40 h-40" />
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
                  disabled={isSearchDisable}
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
