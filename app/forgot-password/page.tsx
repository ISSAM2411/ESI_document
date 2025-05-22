"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Mail, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ESILogoStatic } from "@/components/esi-logo-static"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LoadingScreen } from "@/components/loading-screen"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  // Liste des comptes prédéfinis pour la vérification
  const accounts = [
    { identifier: "admin@esi.dz", name: "Admin Système" },
    { identifier: "hr@esi.dz", name: "Samira Hadjri" },
    { identifier: "employee@esi.dz", name: "Ahmed Benali" },
    { identifier: "sg@esi.dz", name: "Fatima Zerrouki" },
    { identifier: "missionary@esi.dz", name: "Karim Messaoudi" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation de l'email
    if (!email.trim()) {
      setError("Veuillez entrer votre adresse email")
      return
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Veuillez entrer une adresse email valide")
      return
    }

    setIsLoading(true)

    try {
      // Simulation d'un délai réseau
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Vérifier si l'email existe dans notre liste de comptes
      const account = accounts.find((acc) => acc.identifier === email)

      if (!account) {
        // Pour des raisons de sécurité, ne pas indiquer si l'email existe ou non
        // Simuler un succès même si l'email n'existe pas
        console.log("Email non trouvé dans la base de données:", email)
      } else {
        console.log("Email trouvé, envoi d'un lien de réinitialisation à:", email)

        // Dans une application réelle, nous enverrions un email ici
        // Stocker le token dans localStorage pour la démonstration
        const resetToken = Math.random().toString(36).substring(2, 15)
        localStorage.setItem("resetToken", resetToken)
        localStorage.setItem("resetEmail", email)
        localStorage.setItem("resetExpires", (Date.now() + 3600000).toString()) // Expire dans 1 heure
      }

      // Afficher le message de succès
      setEmailSent(true)
      toast({
        title: "Email envoyé",
        description: "Si votre email existe dans notre système, vous recevrez un lien de réinitialisation.",
      })
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error)
      setError("Une erreur est survenue lors de l'envoi de l'email. Veuillez réessayer.")
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de l'email",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading && <LoadingScreen message="Envoi en cours..." />}
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center justify-center">
            <ESILogoStatic size="sm" />
            <h1 className="mt-4 text-2xl font-bold text-center">Mot de passe oublié</h1>
            <p className="mt-2 text-sm text-center text-gray-600">
              Entrez votre adresse email pour recevoir un lien de réinitialisation
            </p>
          </div>

          {emailSent ? (
            <div className="space-y-6">
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Email envoyé</AlertTitle>
                <AlertDescription className="text-green-700">
                  Si votre adresse email existe dans notre système, vous recevrez un lien de réinitialisation de mot de
                  passe dans quelques minutes. Veuillez vérifier votre boîte de réception et vos spams.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Pour les besoins de cette démonstration, vous pouvez cliquer sur le lien ci-dessous pour simuler la
                  réception de l'email :
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    router.push(`/reset-password?token=${localStorage.getItem("resetToken")}&email=${email}`)
                  }
                >
                  Simuler la réception de l'email
                </Button>
                <Button variant="link" className="w-full" asChild>
                  <Link href="/login">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour à la page de connexion
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Entrez votre adresse email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Envoi en cours..." : "Envoyer le lien de réinitialisation"}
              </Button>

              <Button variant="link" className="w-full" asChild>
                <Link href="/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour à la page de connexion
                </Link>
              </Button>

              {/* Aide pour les tests */}
              <div className="mt-4 rounded-md bg-muted p-3 text-xs">
                <p className="font-semibold">Emails de test :</p>
                <ul className="mt-1 space-y-1">
                  <li>admin@esi.dz</li>
                  <li>hr@esi.dz</li>
                  <li>sg@esi.dz</li>
                  <li>employee@esi.dz</li>
                  <li>missionary@esi.dz</li>
                </ul>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
