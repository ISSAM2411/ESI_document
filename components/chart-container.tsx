import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ChartContainerProps {
  title: string
  type: "bar" | "line" | "pie"
}

export function ChartContainer({ title, type }: ChartContainerProps) {
  // Utilisons des classes Tailwind pour les couleurs au lieu de gradients qui pourraient causer des problèmes
  const colors = {
    bar: "bg-blue-500",
    line: "bg-green-500",
    pie: "bg-primary",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] flex items-center justify-center">
        <div className="w-full h-full flex items-center justify-center">
          {type === "bar" && (
            <div className="w-full h-full flex items-end justify-around px-4">
              {[65, 40, 85, 30, 55, 60, 45, 80, 35, 70, 50, 75].map((height, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`${colors.bar} rounded-t-sm w-8`} style={{ height: `${height}%` }}></div>
                  <span className="text-xs mt-1">
                    {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i]}
                  </span>
                </div>
              ))}
            </div>
          )}

          {type === "line" && (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-full h-full relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">Graphique de tendance</p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-200"></div>
                <div className="absolute left-0 bottom-0 h-full w-[1px] bg-gray-200"></div>
                <div className="absolute bottom-[20%] left-[10%] w-[80%] h-[60%]">
                  <div className={`${colors.line} h-1 w-full absolute top-1/2 opacity-30`}></div>
                </div>
              </div>
            </div>
          )}

          {type === "pie" && (
            <div className="w-[200px] h-[200px] relative">
              <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
              <div
                className="absolute inset-0 rounded-full border-8 border-primary"
                style={{ clipPath: "polygon(50% 50%, 100% 50%, 100% 0, 0 0, 0 50%)" }}
              ></div>
              <div
                className="absolute inset-0 rounded-full border-8 border-blue-500"
                style={{ clipPath: "polygon(50% 50%, 0 50%, 0 100%, 50% 100%)" }}
              ></div>
              <div
                className="absolute inset-0 rounded-full border-8 border-yellow-500"
                style={{ clipPath: "polygon(50% 50%, 50% 100%, 100% 100%, 100% 75%)" }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-lg font-bold">75%</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
