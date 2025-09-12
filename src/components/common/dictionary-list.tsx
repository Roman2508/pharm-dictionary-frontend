import { type FC } from 'react'
import { Languages, Loader2 } from 'lucide-react'
import type { UseQueryResult } from '@tanstack/react-query'

import { Card, CardContent } from '../../components/ui/card'
import type { DictionaryType, TransliterationVariantsType } from '@/types'

interface Props {
  query: UseQueryResult<any, Error>
  translationType: TransliterationVariantsType
}

const DictionaryList: FC<Props> = ({ query, translationType }) => {
  return (
    <main className="flex-1 space-y-6">
      {/* <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground border-0">
                    {filteredWords.length} word{filteredWords.length !== 1 ? 's' : ''} found
                  </Badge>
                </div>
              </div> */}

      {query.isFetching ? (
        <Card className="border bg-background">
          <CardContent className="text-center py-16">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Завантаження...</h3>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-2">
          {query.data?.docs.map((dict: DictionaryType) => (
            <Card
              key={dict.id}
              className="group hover:shadow-lg transition-all duration-300 border bg-background hover:bg-card/50 py-0"
            >
              <CardContent className="py-3 px-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        {translationType === 'la_uk' ? 'Латинська' : 'Українська'}
                      </label>
                      <p className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {translationType === 'la_uk' ? dict.latin : dict.ukrainian}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        {translationType === 'la_uk' ? 'Українська' : 'Латинська'}
                      </label>
                      <p className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                        {translationType === 'la_uk' ? dict.ukrainian : dict.latin}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!query.isFetching && !query.data?.docs.length && (
        <Card className="border bg-background">
          <CardContent className="text-center py-16">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Languages className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Нічого не знайдено</h3>
              <p className="text-muted-foreground max-w-md mx-auto">Спробуйте змінити пошукові запити або фільтри</p>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  )
}

export default DictionaryList
