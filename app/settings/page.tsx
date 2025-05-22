"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { LoadingScreen } from "@/components/loading-screen"
import { Save, Moon, Sun, Palette } from "lucide-react"
import { useRouter } from "next/navigation"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  })

  // États pour les paramètres
  const [appearance, setAppearance] = useState({
    theme: "light",
    fontSize: "medium",
    language: "fr",
  })

  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    mobile: false,
    updates: true,
    marketing: false,
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: "all",
    activityTracking: true,
    dataSharing: false,
  })

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
      setUser({
        name: parsedUser.name || "Utilisateur",
        email: parsedUser.email || "",
        role: parsedUser.role || "",
      })

      // Charger les paramètres depuis le localStorage si disponibles
      const storedSettings = localStorage.getItem("userSettings")
      if (storedSettings) {
        const parsedSettings = JSON.parse(storedSettings)
        if (parsedSettings.appearance) setAppearance(parsedSettings.appearance)
        if (parsedSettings.notifications) setNotifications(parsedSettings.notifications)
        if (parsedSettings.privacy) setPrivacy(parsedSettings.privacy)
      }

      setIsLoading(false)
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error)
      router.push("/login")
    }
  }, [router])

  // Gérer les changements dans les paramètres d'apparence
  const handleAppearanceChange = (field: string, value: string) => {
    setAppearance((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Gérer les changements dans les paramètres de notifications
  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Gérer les changements dans les paramètres de confidentialité
  const handlePrivacyChange = (field: string, value: string | boolean) => {
    setPrivacy((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Soumettre les paramètres
  const handleSubmit = (e: React.FormEvent, section: string) => {
    e.preventDefault()
    setIsSaving(true)

    // Simuler un délai d'envoi
    setTimeout(() => {
      // Sauvegarder les paramètres dans le localStorage
      const settings = {
        appearance,
        notifications,
        privacy,
      }
      localStorage.setItem("userSettings", JSON.stringify(settings))

      // Afficher un toast de succès
      toast({
        title: "Paramètres mis à jour",
        description: `Les paramètres de ${section} ont été mis à jour avec succès.`,
      })

      setIsSaving(false)
    }, 1000)
  }

  if (isLoading) {
    return <LoadingScreen message="Chargement des paramètres..." />
  }

  return (
    <DashboardLayout role={user.role} user={user}>
      {isSaving && <LoadingScreen message="Enregistrement des paramètres..." />}
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Paramètres</h1>

        <Tabs defaultValue="appearance">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="appearance">Apparence</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Confidentialité</TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="mt-4">
            <Card>
              <form onSubmit={(e) => handleSubmit(e, "apparence")}>
                <CardHeader>
                  <CardTitle>Apparence</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Thème</Label>
                    <RadioGroup
                      value={appearance.theme}
                      onValueChange={(value) => handleAppearanceChange("theme", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="light" id="theme-light" />
                        <Label htmlFor="theme-light" className="flex items-center">
                          <Sun className="mr-2 h-4 w-4" />
                          Clair
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dark" id="theme-dark" />
                        <Label htmlFor="theme-dark" className="flex items-center">
                          <Moon className="mr-2 h-4 w-4" />
                          Sombre
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="system" id="theme-system" />
                        <Label htmlFor="theme-system" className="flex items-center">
                          <Palette className="mr-2 h-4 w-4" />
                          Système
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="font-size">Taille du texte</Label>
                    <Select
                      value={appearance.fontSize}
                      onValueChange={(value) => handleAppearanceChange("fontSize", value)}
                    >
                      <SelectTrigger id="font-size">
                        <SelectValue placeholder="Sélectionner une taille" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Petite</SelectItem>
                        <SelectItem value="medium">Moyenne</SelectItem>
                        <SelectItem value="large">Grande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Langue</Label>
                    <Select
                      value={appearance.language}
                      onValueChange={(value) => handleAppearanceChange("language", value)}
                    >
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Sélectionner une langue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ar">العربية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="ml-auto" disabled={isSaving}>
                    <Save className="mr-2 h-4 w-4" />
                    Enregistrer les modifications
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-4">
            <Card>
              <form onSubmit={(e) => handleSubmit(e, "notifications")}>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Notifications par email</Label>
                      <p className="text-sm text-muted-foreground">Recevoir des notifications par email</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notifications.email}
                      onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="browser-notifications">Notifications du navigateur</Label>
                      <p className="text-sm text-muted-foreground">Recevoir des notifications dans le navigateur</p>
                    </div>
                    <Switch
                      id="browser-notifications"
                      checked={notifications.browser}
                      onCheckedChange={(checked) => handleNotificationChange("browser", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="mobile-notifications">Notifications mobiles</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir des notifications sur votre appareil mobile
                      </p>
                    </div>
                    <Switch
                      id="mobile-notifications"
                      checked={notifications.mobile}
                      onCheckedChange={(checked) => handleNotificationChange("mobile", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="updates-notifications">Mises à jour du système</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir des notifications sur les mises à jour du système
                      </p>
                    </div>
                    <Switch
                      id="updates-notifications"
                      checked={notifications.updates}
                      onCheckedChange={(checked) => handleNotificationChange("updates", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing-notifications">Communications marketing</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir des emails sur les nouveaux produits et fonctionnalités
                      </p>
                    </div>
                    <Switch
                      id="marketing-notifications"
                      checked={notifications.marketing}
                      onCheckedChange={(checked) => handleNotificationChange("marketing", checked)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="ml-auto" disabled={isSaving}>
                    <Save className="mr-2 h-4 w-4" />
                    Enregistrer les modifications
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="mt-4">
            <Card>
              <form onSubmit={(e) => handleSubmit(e, "confidentialité")}>
                <CardHeader>
                  <CardTitle>Confidentialité</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="profile-visibility">Visibilité du profil</Label>
                    <Select
                      value={privacy.profileVisibility}
                      onValueChange={(value) => handlePrivacyChange("profileVisibility", value)}
                    >
                      <SelectTrigger id="profile-visibility">
                        <SelectValue placeholder="Sélectionner la visibilité" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tout le monde</SelectItem>
                        <SelectItem value="colleagues">Collègues uniquement</SelectItem>
                        <SelectItem value="none">Personne</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="activity-tracking">Suivi d'activité</Label>
                      <p className="text-sm text-muted-foreground">
                        Autoriser le suivi de votre activité pour améliorer l'expérience utilisateur
                      </p>
                    </div>
                    <Switch
                      id="activity-tracking"
                      checked={privacy.activityTracking}
                      onCheckedChange={(checked) => handlePrivacyChange("activityTracking", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-sharing">Partage de données</Label>
                      <p className="text-sm text-muted-foreground">
                        Autoriser le partage de vos données avec des services tiers
                      </p>
                    </div>
                    <Switch
                      id="data-sharing"
                      checked={privacy.dataSharing}
                      onCheckedChange={(checked) => handlePrivacyChange("dataSharing", checked)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="ml-auto" disabled={isSaving}>
                    <Save className="mr-2 h-4 w-4" />
                    Enregistrer les modifications
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
