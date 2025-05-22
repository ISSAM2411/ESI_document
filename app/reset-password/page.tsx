"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff, AlertCircle, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ESILogoStatic } from "@/components/esi-logo-static"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LoadingScreen } from "@/components/loading-screen"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [tokenValid, setTokenValid] = useState<boolean | null>(null)
  const [tokenChecking, setTokenChecking] = useState(true)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordFeedback, setPasswordFeedback] = useState("")

  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const token = searchParams?.get("token")
  const email = searchParams?.get("email")

  // Vérifier la validité du token au chargement de la page
  useEffect(() => {
    const checkToken = async () => {
      setTokenChecking(true)

      // Simuler un délai réseau
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const storedToken = localStorage.getItem("resetToken")
      const storedEmail = localStorage.getItem("resetEmail")
      const expiresStr = localStorage.getItem("resetExpires")

      if (!token || !storedToken || token !== storedToken) {
        setTokenValid(false)
        setError("Le lien de réinitialisation est invalide ou a expiré.")
      } else if (!email || !storedEmail || email !== storedEmail) {
        setTokenValid(false)
        setError("L'adresse email ne correspond pas à celle de la demande de réinitialisation.")
      } else if (!expiresStr || Number.parseInt(expiresStr) < Date.now()) {
        setTokenValid(false)
        setError("Le lien de réinitialisation a expiré. Veuillez faire une nouvelle demande.")
      } else {
        setTokenValid(true)
      }

      setTokenChecking(false)
    }

    checkToken()
  }, [token, email])

  // Évaluer la force du mot de passe
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0)
      setPasswordFeedback("")
      return
    }

    let strength = 0
    let feedback = ""

    // Longueur minimale
    if (password.length >= 8) {
      strength += 1
    } else {
      feedback = "Le mot de passe doit contenir au moins 8 caractères"
      setPasswordStrength(strength)
      setPasswordFeedback(feedback)
      return
    }

    // Contient des chiffres
    if (/\d/.test(password)) {
      strength += 1
    }

    // Contient des lettres minuscules
    if (/[a-z]/.test(password)) {
      strength += 1
    }

    // Contient des lettres majuscules
    if (/[A-Z]/.test(password)) {
      strength += 1
    }

    // Contient des caractères spéciaux
    if (/[^A-Za-z0-9]/.test(password)) {
      strength += 1
    }

    // Feedback basé sur la force
    if (strength <= 2) {
      feedback = "Mot de passe faible"
    } else if (strength <= 4) {
      feedback = "Mot de passe moyen"
    } else {
      feedback = "Mot de passe fort"
    }

    setPasswordStrength(strength)
    setPasswordFeedback(feedback)
  }, [password])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation du mot de passe
    if (!password) {
      setError("Veuillez entrer un nouveau mot de passe")
      return
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères")
      return
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      return
    }

    if (passwordStrength < 3) {
      setError("Veuillez choisir un mot de passe plus fort")
      return
    }

    setIsLoading(true)

    try {
      // Simulation d'un délai réseau
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Dans une application réelle, nous enverrions une requête au serveur pour mettre à jour le mot de passe
      console.log("Réinitialisation du mot de passe pour:", email)
      console.log("Nouveau mot de passe:", password)

      // Nettoyer les données de réinitialisation
      localStorage.removeItem("resetToken")
      localStorage.removeItem("resetEmail")
      localStorage.removeItem("resetExpires")

      // Afficher le message de succès
      setIsSuccess(true)
      toast({
        title: "Mot de passe réinitialisé",
        description: "Votre mot de passe a été réinitialisé avec succès.",
      })
    } catch (error) {
      console.error("Erreur lors de la réinitialisation du mot de passe:", error)
      setError("Une erreur est survenue lors de la réinitialisation du mot de passe. Veuillez réessayer.")
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la réinitialisation du mot de passe",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Afficher un écran de chargement pendant la vérification du token
  if (tokenChecking) {
    return <LoadingScreen message="Vérification du lien..." />
  }

  // Afficher un message d'erreur si le token est invalide
  if (tokenValid === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center justify-center">
            <ESILogoStatic size="sm" />
            <h1 className="mt-4 text-2xl font-bold text-center">Lien invalide</h1>
          </div>

          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>

          <Button variant="default" className="w-full" asChild>
            <Link href="/forgot-password">Demander un nouveau lien</Link>
          </Button>

          <Button variant="link" className="w-full" asChild>
            <Link href="/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la page de connexion
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {isLoading && <LoadingScreen message="Réinitialisation en cours..." />}
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center justify-center">
            <ESILogoStatic size="sm" />
            <h1 className="mt-4 text-2xl font-bold text-center">Réinitialisation du mot de passe</h1>
            {!isSuccess && (
              <p className="mt-2 text-sm text-center text-gray-600">Créez un nouveau mot de passe pour votre compte</p>
            )}
          </div>

          {isSuccess ? (
            <div className="space-y-6">
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Mot de passe réinitialisé</AlertTitle>
                <AlertDescription className="text-green-700">
                  Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre
                  nouveau mot de passe.
                </AlertDescription>
              </Alert>

              <Button variant="default" className="w-full" asChild>
                <Link href="/login">Se connecter</Link>
              </Button>
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
                <Input id="email" type="email" value={email || ""} disabled className="bg-gray-100" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center justify-between">
                  Nouveau mot de passe
                  {passwordFeedback && (
                    <span
                      className={`text-xs font-normal ${
                        passwordStrength <= 2
                          ? "text-destructive"
                          : passwordStrength <= 4
                            ? "text-yellow-500"
                            : "text-green-500"
                      }`}
                    >
                      {passwordFeedback}
                    </span>
                  )}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Entrez votre nouveau mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">
                      {showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                    </span>
                  </Button>
                </div>
                {password && (
                  <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        passwordStrength <= 2 ? "bg-red-500" : passwordStrength <= 4 ? "bg-yellow-500" : "bg-green-500"
                      }`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                )}
                <ul className="text-xs text-gray-500 mt-2 space-y-1">
                  <li className={password.length >= 8 ? "text-green-500" : ""}>• Au moins 8 caractères</li>
                  <li className={/\d/.test(password) ? "text-green-500" : ""}>• Au moins un chiffre</li>
                  <li className={/[a-z]/.test(password) ? "text-green-500" : ""}>• Au moins une lettre minuscule</li>
                  <li className={/[A-Z]/.test(password) ? "text-green-500" : ""}>• Au moins une lettre majuscule</li>
                  <li className={/[^A-Za-z0-9]/.test(password) ? "text-green-500" : ""}>
                    • Au moins un caractère spécial
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirmez votre nouveau mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={confirmPassword && password !== confirmPassword ? "border-destructive" : ""}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">
                      {showConfirmPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                    </span>
                  </Button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-destructive mt-1">Les mots de passe ne correspondent pas</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Réinitialisation en cours..." : "Réinitialiser le mot de passe"}
              </Button>

              <Button variant="link" className="w-full" asChild>
                <Link href="/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour à la page de connexion
                </Link>
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
