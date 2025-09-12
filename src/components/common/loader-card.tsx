import { Loader2 as Loader2Icon } from "lucide-react";

import { Card, CardContent } from "../ui/card";

const LoaderCard = () => {
  return (
    <Card className="border bg-background">
      <CardContent className="text-center py-16">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Loader2Icon className="h-8 w-8 text-primary animate-spin" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">
            Завантаження...
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoaderCard;
