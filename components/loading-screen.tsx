import { ESILogoAnimation } from "@/components/esi-logo-animation"

interface LoadingScreenProps {
  message?: string
}

export function LoadingScreen({ message = "Chargement en cours..." }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <ESILogoAnimation size="lg" autoReplay={true} />
      <p className="mt-4 text-lg font-medium text-muted-foreground">{message}</p>
    </div>
  )
}
