import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: string
  subtitle: string
  color?: "blue" | "green" | "red" | "yellow"
}

export function StatCard({ title, value, subtitle, color = "blue" }: StatCardProps) {
  const getProgressBarColor = () => {
    switch (color) {
      case "green":
        return "bg-green-500"
      case "red":
        return "bg-red-500"
      case "yellow":
        return "bg-yellow-500"
      default:
        return "bg-blue-500"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
        <div className="mt-2 h-1 w-full bg-gray-200 rounded-full">
          <div
            className={`h-1 rounded-full ${getProgressBarColor()}`}
            style={{ width: `${Math.min((Number.parseInt(value) * 100) / 20, 100)}%` }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
