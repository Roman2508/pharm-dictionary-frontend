import { Link } from 'react-router'
import { Layers2 as Layers2Icon, ListTodo as ListTodoIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

const SimulatorPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <Link to="/simulator/cards" className="flex-1">
          <Card className="group hover:shadow-lg transition-all duration-300 border bg-background hover:bg-card/50 cursor-pointer">
            <CardContent className="text-center py-16">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Layers2Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Картки</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Відкривайте картки з термінами та перевертайте їх, щоб побачити переклад.
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/simulator/tests" className="flex-1">
          <Card className="group hover:shadow-lg flex-1 transition-all duration-300 border bg-background hover:bg-card/50 cursor-pointer">
            <CardContent className="text-center py-16">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <ListTodoIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Тест</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Пройдіть тест із кількома варіантами відповідей та отримайте результат наприкінці.
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

export default SimulatorPage
