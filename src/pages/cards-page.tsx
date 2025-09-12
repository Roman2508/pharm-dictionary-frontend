import { Link } from 'react-router'

import { Card, CardContent } from '@/components/ui/card'

const CardsPage = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      {[...Array(3)].map((_, index) => (
        <div className="mb-10" key={index}>
          <h3 className="text-3xl font-bold mb-2">Lesson {index + 1}</h3>
          <div className="grid grid-cols-3 lg:flex-row gap-8">
            {[...Array(Math.floor(Math.random() * 4) + 1)].map((_, index) => (
              <Link to=":id">
                <Card className="group hover:shadow-lg transition-all duration-300 border bg-background hover:bg-card/50 cursor-pointer">
                  <CardContent className="py-4">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-foreground">Картки {index + 1}</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Відкривайте картки з термінами та перевертайте їх, щоб побачити переклад.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CardsPage
