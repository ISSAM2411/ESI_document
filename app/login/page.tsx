"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "@/components/login-form"
import { ESILogoAnimation } from "@/components/esi-logo-animation"
import { ESILogoStatic } from "@/components/esi-logo-static"
import { useRouter } from "next/navigation"

// Ajouter une vérification pour rediriger l'utilisateur s'il est déjà connecté
export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [animationComplete, setAnimationComplete] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const storedUser = localStorage.getItem("currentUser")

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)

        // Rediriger vers le tableau de bord correspondant au rôle de l'utilisateur
        switch (parsedUser.role) {
          case "admin":
            router.push("/admin/dashboard")
            break
          case "rh":
            router.push("/rh/dashboard")
            break
          case "employe":
            router.push("/employe/dashboard")
            break
          case "sg":
          case "assistant_sg":
            router.push("/sg/dashboard")
            break
          case "missionnaire":
            router.push("/missionnaire/dashboard")
            break
          default:
            // Continuer l'affichage de la page de connexion
            if (animationComplete) {
              const timer = setTimeout(() => {
                setIsLoading(false)
              }, 500)
              return () => clearTimeout(timer)
            }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur:", error)
        // Continuer l'affichage de la page de connexion
        if (animationComplete) {
          const timer = setTimeout(() => {
            setIsLoading(false)
          }, 500)
          return () => clearTimeout(timer)
        }
      }
    } else {
      // Après l'animation initiale, on affiche le formulaire
      if (animationComplete) {
        const timer = setTimeout(() => {
          setIsLoading(false)
        }, 500)
        return () => clearTimeout(timer)
      }
    }
  }, [animationComplete, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <ESILogoAnimation size="xl" onAnimationComplete={() => setAnimationComplete(true)} />
        <p className="mt-4 text-lg font-medium text-muted-foreground">Bienvenue sur ESI Doc</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center justify-center">
          <ESILogoStatic size="sm" />
          <h1 className="mt-4 text-2xl font-bold text-center">Connexion</h1>
          <p className="mt-2 text-sm text-center text-gray-600">Connectez-vous à votre espace</p>
         
        </div>
        <LoginForm setLoading={setIsLoading} />
      </div>
    </div>
  )
}
