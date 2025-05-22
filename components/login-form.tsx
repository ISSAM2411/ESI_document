"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { LoadingScreen } from "@/components/loading-screen"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface LoginFormProps {
  setLoading?: (loading: boolean) => void
}

interface FormErrors {
  identifier?: string
  password?: string
  general?: string
}

export function LoginForm({ setLoading }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<FormErrors>({})
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [lockTime, setLockTime] = useState(0)
  const router = useRouter()
  const { toast } = useToast()

  // Liste des comptes prédéfinis
  const accounts = [
    { identifier: "admin@esi.dz", password: "password123", role: "admin", name: "Admin Système" },
    { identifier: "hr@esi.dz", password: "password123", role: "rh", name: "Samira Hadjri" },
    { identifier: "employee@esi.dz", password: "password123", role: "employe", name: "Ahmed Benali" },
    { identifier: "sg@esi.dz", password: "password123", role: "sg", name: "Fatima Zerrouki" },
    { identifier: "missionary@esi.dz", password: "password123", role: "missionnaire", name: "Karim Messaoudi" },
  ]

  // Effet pour gérer le déverrouillage du formulaire après un certain temps
  useEffect(() => {
    if (isLocked && lockTime > 0) {
      const timer = setTimeout(() => {
        setLockTime((prev) => {
          if (prev <= 1) {
            setIsLocked(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isLocked, lockTime])

  // Validation du formulaire
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    // Vérification de l'identifiant
    if (!identifier.trim()) {
      newErrors.identifier = "L'identifiant est requis"
      isValid = false
    } else if (!identifier.includes("@")) {
      newErrors.identifier = "Veuillez entrer une adresse email valide"
      isValid = false
    }

    // Vérification du mot de passe
    if (!password) {
      newErrors.password = "Le mot de passe est requis"
      isValid = false
    } else if (password.length < 8) {
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Vérifier si le formulaire est verrouillé
    if (isLocked) {
      toast({
        title: "Compte temporairement verrouillé",
        description: `Veuillez réessayer dans ${lockTime} secondes`,
        variant: "destructive",
      })
      return
    }

    // Réinitialiser les erreurs
    setErrors({})

    // Valider le formulaire
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    if (setLoading) setLoading(true)

    try {
      // Simulation d'une authentification
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Vérifier les identifiants
      const account = accounts.find((acc) => acc.identifier === identifier && acc.password === password)

      if (!account) {
        // Incrémenter le compteur de tentatives
        const newAttempts = loginAttempts + 1
        setLoginAttempts(newAttempts)

        // Vérifier si le compte doit être verrouillé
        if (newAttempts >= 3) {
          const lockDuration = 30 // 30 secondes
          setIsLocked(true)
          setLockTime(lockDuration)
          setLoginAttempts(0)

          setErrors({
            general: `Trop de tentatives échouées. Compte verrouillé pour ${lockDuration} secondes.`,
          })

          toast({
            title: "Compte temporairement verrouillé",
            description: `Trop de tentatives échouées. Veuillez réessayer dans ${lockDuration} secondes.`,
            variant: "destructive",
          })
        } else {
          setErrors({
            general: `Identifiants incorrects. Tentative ${newAttempts}/3.`,
          })
        }

        setIsLoading(false)
        if (setLoading) setLoading(false)
        return
      }

      // Réinitialiser le compteur de tentatives
      setLoginAttempts(0)

      // Stocker les informations de l'utilisateur dans localStorage
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          name: account.name,
          email: account.identifier,
          role: account.role,
          lastLogin: new Date().toISOString(),
        }),
      )

      // Afficher un toast de succès
      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${account.name}!`,
      })

      // Redirection en fonction du rôle
      switch (account.role) {
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
          router.push("/login")
      }
    } catch (error) {
      console.error("Erreur de connexion:", error)
      setErrors({
        general: "Une erreur est survenue lors de la connexion. Veuillez réessayer.",
      })
      toast({
        title: "Erreur de connexion",
        description: "Une erreur est survenue lors de la connexion",
        variant: "destructive",
      })
      setIsLoading(false)
      if (setLoading) setLoading(false)
    }
  }

  return (
    <>
      {isLoading && <LoadingScreen message="Connexion en cours..." />}
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errors.general}</AlertDescription>
          </Alert>
        )}

        {isLocked && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Compte temporairement verrouillé. Veuillez réessayer dans {lockTime} secondes.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="identifier" className="flex items-center justify-between">
            Email / Matricule
            {errors.identifier && <span className="text-xs font-normal text-destructive">{errors.identifier}</span>}
          </Label>
          <Input
            id="identifier"
            placeholder="Entrez votre email ou matricule"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className={errors.identifier ? "border-destructive" : ""}
            disabled={isLoading || isLocked}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="flex items-center justify-between">
            Mot de passe
            {errors.password && <span className="text-xs font-normal text-destructive">{errors.password}</span>}
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? "border-destructive" : ""}
              disabled={isLoading || isLocked}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading || isLocked}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="sr-only">{showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              disabled={isLoading || isLocked}
            />
            <Label htmlFor="remember" className="text-sm">
              Se souvenir de moi
            </Label>
          </div>
          <Button variant="link" className="px-0 text-sm" asChild>
            <a href="/forgot-password">Mot de passe oublié ?</a>
          </Button>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading || isLocked}>
          {isLoading ? "Connexion en cours..." : isLocked ? `Verrouillé (${lockTime}s)` : "Se connecter"}
        </Button>

        {/* Aide pour les tests */}
        <div className="mt-4 rounded-md bg-muted p-3 text-xs">
          <p className="font-semibold">Comptes de test :</p>
          <ul className="mt-1 space-y-1">
            <li>Admin: admin@esi.dz / password123</li>
            <li>RH: hr@esi.dz / password123</li>
            <li>SG: sg@esi.dz / password123</li>
            <li>Employé: employee@esi.dz / password123</li>
            <li>Missionnaire: missionary@esi.dz / password123</li>
          </ul>
        </div>
      </form>
    </>
  )
}
