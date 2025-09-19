import { Card, CardContent } from "../ui/card"
import { Languages as LanguagesIcon } from "lucide-react"

const NotFoundCard = () => {
  return (
    <Card className="border bg-background">
      <CardContent className="text-center py-16">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <LanguagesIcon className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">Нічого не знайдено</h3>
          <p className="text-muted-foreground max-w-md mx-auto">Спробуйте змінити пошукові запити або фільтри</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default NotFoundCard
