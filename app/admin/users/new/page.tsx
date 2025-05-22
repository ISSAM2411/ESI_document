"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function NewUser() {
  // Données simulées pour un admin
  const user = {
    name: "Admin Système",
    email: "admin@esi.dz",
    role: "admin",
  }

  // État du formulaire
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    matricule: "",
    telephone: "",
    role: "",
    department: "",
    fonction: "",
    dateEmbauche: "",
    status: "Actif",
    permissions: {
      attestations: false,
      missions: false,
      users: false,
      templates: false,
    },
  })

  // État de chargement
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { toast } = useToast()

  // Gérer les changements dans le formulaire
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Gérer les changements de permissions
  const handlePermissionChange = (permission: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: checked,
      },
    }))
  }

  // Soumettre le formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuler un délai d'envoi
    setTimeout(() => {
      // Stocker le nouvel utilisateur dans localStorage pour le récupérer dans la page de liste
      localStorage.setItem("newUser", JSON.stringify(formData))

      // Afficher un toast de succès
      toast({
        title: "Utilisateur créé",
        description: "L'utilisateur a été créé avec succès.",
      })

      // Rediriger vers la liste des utilisateurs
      router.push("/admin/users")
    }, 1000)
  }

  return (
    <DashboardLayout role="admin" user={user}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/users">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Retour</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Nouvel utilisateur</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom complet</Label>
                  <Input
                    id="nom"
                    placeholder="Entrez le nom complet"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Entrez l'email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="matricule">Matricule</Label>
                  <Input
                    id="matricule"
                    placeholder="Entrez le matricule"
                    value={formData.matricule}
                    onChange={(e) => handleChange("matricule", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telephone">Téléphone</Label>
                  <Input
                    id="telephone"
                    placeholder="Entrez le numéro de téléphone"
                    value={formData.telephone}
                    onChange={(e) => handleChange("telephone", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Informations professionnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Rôle</Label>
                  <Select value={formData.role} onValueChange={(value) => handleChange("role", value)} required>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Sélectionnez un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="RH">RH</SelectItem>
                      <SelectItem value="Employé">Employé</SelectItem>
                      <SelectItem value="SG">SG</SelectItem>
                      <SelectItem value="Assistant SG">Assistant SG</SelectItem>
                      <SelectItem value="Missionnaire">Missionnaire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="departement">Département</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => handleChange("department", value)}
                    required
                  >
                    <SelectTrigger id="departement">
                      <SelectValue placeholder="Sélectionnez un département" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Département Systèmes d'Information">Systèmes d'Information</SelectItem>
                      <SelectItem value="Département Recherche et Innovation">Recherche et Innovation</SelectItem>
                      <SelectItem value="Département Intelligence Artificielle">Intelligence Artificielle</SelectItem>
                      <SelectItem value="Département Réseaux">Réseaux</SelectItem>
                      <SelectItem value="Département Génie Logiciel">Génie Logiciel</SelectItem>
                      <SelectItem value="Ressources Humaines">Ressources Humaines</SelectItem>
                      <SelectItem value="Secrétariat Général">Secrétariat Général</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fonction">Fonction</Label>
                  <Input
                    id="fonction"
                    placeholder="Entrez la fonction"
                    value={formData.fonction}
                    onChange={(e) => handleChange("fonction", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-embauche">Date d&apos;embauche</Label>
                  <Input
                    id="date-embauche"
                    type="date"
                    value={formData.dateEmbauche}
                    onChange={(e) => handleChange("dateEmbauche", e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Droits d&apos;accès</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="attestations"
                    checked={formData.permissions.attestations}
                    onCheckedChange={(checked) => handlePermissionChange("attestations", checked === true)}
                  />
                  <Label htmlFor="attestations">Gestion des attestations</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="missions"
                    checked={formData.permissions.missions}
                    onCheckedChange={(checked) => handlePermissionChange("missions", checked === true)}
                  />
                  <Label htmlFor="missions">Gestion des missions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="users"
                    checked={formData.permissions.users}
                    onCheckedChange={(checked) => handlePermissionChange("users", checked === true)}
                  />
                  <Label htmlFor="users">Gestion des utilisateurs</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="templates"
                    checked={formData.permissions.templates}
                    onCheckedChange={(checked) => handlePermissionChange("templates", checked === true)}
                  />
                  <Label htmlFor="templates">Gestion des templates</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" asChild>
                <Link href="/admin/users">Annuler</Link>
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Création en cours..." : "Créer l'utilisateur"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </DashboardLayout>
  )
}
