"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LoadingScreen } from "@/components/loading-screen"
import { User, Mail, Phone, Building, Calendar, Lock, Save, Upload, AlertTriangle, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    matricule: "",
    telephone: "",
    fonction: "",
    departement: "",
    dateEmbauche: "",
    dateNaissance: "",
    adresse: "",
    avatar: "",
  })

  // État pour les formulaires
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    telephone: "",
    adresse: "",
    dateNaissance: "",
  })

  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // État pour les erreurs et succès
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState("")

  const { toast } = useToast()

  // Récupérer les informations de l'utilisateur depuis le localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")

    if (!storedUser) {
      router.push("/login")
      return
    }

    try {
      const parsedUser = JSON.parse(storedUser)

      // Définir les données utilisateur par défaut en fonction du rôle
      const userData = {
        name: parsedUser.name || "Utilisateur",
        email: parsedUser.email || "",
        role: parsedUser.role || "",
        matricule: "ESI-" + Math.floor(Math.random() * 10000),
        telephone: "0555" + Math.floor(Math.random() * 1000000),
        fonction: "Non spécifié",
        departement: "Non spécifié",
        dateEmbauche: "2020-01-01",
        dateNaissance: "1990-01-01",
        adresse: "Alger, Algérie",
        avatar: "",
      }

      // Personnaliser les données en fonction du rôle
      switch (parsedUser.role) {
        case "admin":
          userData.fonction = "Administrateur système"
          userData.departement = "Direction des systèmes d'information"
          break
        case "rh":
          userData.fonction = "Responsable RH"
          userData.departement = "Ressources humaines"
          break
        case "employe":
          userData.fonction = "Enseignant-Chercheur"
          userData.departement = "Département Systèmes d'Information"
          break
        case "sg":
        case "assistant_sg":
          userData.fonction = "Secrétaire Général"
          userData.departement = "Secrétariat Général"
          break
        case "missionnaire":
          userData.fonction = "Chargé de mission"
          userData.departement = "Département des missions"
          break
      }

      setUser(userData)
      setPersonalInfo({
        name: userData.name,
        email: userData.email,
        telephone: userData.telephone,
        adresse: userData.adresse,
        dateNaissance: userData.dateNaissance,
      })

      setIsLoading(false)
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error)
      router.push("/login")
    }
  }, [router])

  // Gérer les changements dans le formulaire d'informations personnelles
  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Gérer les changements dans le formulaire de mot de passe
  const handlePasswordChange = (field: string, value: string) => {
    setPasswordError("")
    setPasswordSuccess("")
    setPasswordInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Soumettre le formulaire d'informations personnelles
  const handlePersonalInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuler un délai d'envoi
    setTimeout(() => {
      // Mettre à jour les informations de l'utilisateur
      setUser((prev) => ({
        ...prev,
        name: personalInfo.name,
        email: personalInfo.email,
        telephone: personalInfo.telephone,
        adresse: personalInfo.adresse,
        dateNaissance: personalInfo.dateNaissance,
      }))

      // Mettre à jour l'utilisateur dans le localStorage
      const storedUser = localStorage.getItem("currentUser")
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          parsedUser.name = personalInfo.name
          parsedUser.email = personalInfo.email
          localStorage.setItem("currentUser", JSON.stringify(parsedUser))
        } catch (error) {
          console.error("Erreur lors de la mise à jour de l'utilisateur:", error)
        }
      }

      // Afficher un toast de succès
      toast({
        title: "Profil mis à jour",
        description: "Vos informations personnelles ont été mises à jour avec succès.",
      })

      setIsLoading(false)
    }, 1500)
  }

  // Soumettre le formulaire de mot de passe
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError("")
    setPasswordSuccess("")

    // Vérifier que les mots de passe correspondent
    if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas.")
      return
    }

    // Vérifier la complexité du mot de passe
    if (passwordInfo.newPassword.length < 8) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères.")
      return
    }

    setIsLoading(true)

    // Simuler un délai d'envoi
    setTimeout(() => {
      // Réinitialiser le formulaire
      setPasswordInfo({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      // Afficher un message de succès
      setPasswordSuccess("Votre mot de passe a été modifié avec succès.")

      // Afficher un toast de succès
      toast({
        title: "Mot de passe mis à jour",
        description: "Votre mot de passe a été modifié avec succès.",
      })

      setIsLoading(false)
    }, 1500)
  }

  // Générer les initiales pour l'avatar
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  if (isLoading) {
    return <LoadingScreen message="Chargement du profil..." />
  }

  return (
    <DashboardLayout role={user.role} user={user}>
      {isLoading && <LoadingScreen message="Mise à jour en cours..." />}
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Mon profil</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Carte de profil */}
          <Card className="w-full md:w-1/3">
            <CardHeader>
              <CardTitle>Informations du profil</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative mb-6">
                <Avatar className="h-24 w-24">
                  {user.avatar && <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />}
                  <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
                </Avatar>
                <Button size="icon" variant="outline" className="absolute bottom-0 right-0 rounded-full bg-background">
                  <Upload className="h-4 w-4" />
                  <span className="sr-only">Changer la photo</span>
                </Button>
              </div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.fonction}</p>
              <p className="text-sm text-muted-foreground">{user.departement}</p>

              <div className="w-full mt-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.telephone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.matricule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Embauché le {new Date(user.dateEmbauche).toLocaleDateString("fr-FR")}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Onglets de paramètres */}
          <div className="flex-1">
            <Tabs defaultValue="personal">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal">Informations personnelles</TabsTrigger>
                <TabsTrigger value="security">Sécurité</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="mt-4">
                <Card>
                  <form onSubmit={handlePersonalInfoSubmit}>
                    <CardHeader>
                      <CardTitle>Informations personnelles</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom complet</Label>
                        <div className="relative">
                          <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            className="pl-8"
                            value={personalInfo.name}
                            onChange={(e) => handlePersonalInfoChange("name", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            className="pl-8"
                            value={personalInfo.email}
                            onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telephone">Téléphone</Label>
                        <div className="relative">
                          <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="telephone"
                            className="pl-8"
                            value={personalInfo.telephone}
                            onChange={(e) => handlePersonalInfoChange("telephone", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="adresse">Adresse</Label>
                        <Input
                          id="adresse"
                          value={personalInfo.adresse}
                          onChange={(e) => handlePersonalInfoChange("adresse", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateNaissance">Date de naissance</Label>
                        <div className="relative">
                          <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="dateNaissance"
                            type="date"
                            className="pl-8"
                            value={personalInfo.dateNaissance}
                            onChange={(e) => handlePersonalInfoChange("dateNaissance", e.target.value)}
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="ml-auto" disabled={isLoading}>
                        <Save className="mr-2 h-4 w-4" />
                        Enregistrer les modifications
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="mt-4">
                <Card>
                  <form onSubmit={handlePasswordSubmit}>
                    <CardHeader>
                      <CardTitle>Changer le mot de passe</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {passwordError && (
                        <div className="bg-destructive/10 p-3 rounded-md flex items-start gap-2">
                          <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                          <p className="text-sm text-destructive">{passwordError}</p>
                        </div>
                      )}
                      {passwordSuccess && (
                        <div className="bg-green-100 p-3 rounded-md flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <p className="text-sm text-green-600">{passwordSuccess}</p>
                        </div>
                      )}
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                        <div className="relative">
                          <Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="currentPassword"
                            type="password"
                            className="pl-8"
                            value={passwordInfo.currentPassword}
                            onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                        <div className="relative">
                          <Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="newPassword"
                            type="password"
                            className="pl-8"
                            value={passwordInfo.newPassword}
                            onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                        <div className="relative">
                          <Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            className="pl-8"
                            value={passwordInfo.confirmPassword}
                            onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="ml-auto" disabled={isLoading}>
                        <Save className="mr-2 h-4 w-4" />
                        Changer le mot de passe
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
