"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function NewAttestation() {
  // Données simulées pour un RH
  const user = {
    name: "Samira Hadjri",
    email: "samira.hadjri@esi.dz",
    role: "rh",
  }

  // État du formulaire
  const [formData, setFormData] = useState({
    employe: "",
    matricule: "",
    dateNaissance: "",
    lieuNaissance: "",
    fonction: "",
    dateEmbauche: "",
    categorie: "",
    motif: "",
    commentaires: "",
  })

  // État de chargement
  const [isLoading, setIsLoading] = useState(false)
  const [selectedEmploye, setSelectedEmploye] = useState<string | null>(null)

  const router = useRouter()
  const { toast } = useToast()

  // Liste simulée des employés
  const employes = [
    {
      id: "1",
      name: "Ahmed Benali",
      matricule: "ESI-2010-1234",
      dateNaissance: "1985-05-15",
      lieuNaissance: "Alger",
      fonction: "Enseignant-Chercheur",
      dateEmbauche: "2010-09-15",
      departement: "Département Systèmes d'Information",
    },
    {
      id: "2",
      name: "Samira Hadjri",
      matricule: "ESI-2008-0789",
      dateNaissance: "1983-11-20",
      lieuNaissance: "Oran",
      fonction: "Responsable RH",
      dateEmbauche: "2008-03-20",
      departement: "Ressources Humaines",
    },
    {
      id: "3",
      name: "Karim Messaoudi",
      matricule: "ESI-2005-0456",
      dateNaissance: "1980-07-10",
      lieuNaissance: "Constantine",
      fonction: "Chercheur",
      dateEmbauche: "2005-02-01",
      departement: "Département Recherche et Innovation",
    },
  ]

  // Gérer les changements dans le formulaire
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Gérer la sélection d'un employé
  const handleEmployeSelect = (id: string) => {
    const employe = employes.find((e) => e.id === id)
    if (employe) {
      setSelectedEmploye(id)
      setFormData((prev) => ({
        ...prev,
        employe: employe.name,
        matricule: employe.matricule,
        dateNaissance: employe.dateNaissance,
        lieuNaissance: employe.lieuNaissance,
        fonction: employe.fonction,
        dateEmbauche: employe.dateEmbauche,
      }))
    }
  }

  // Soumettre le formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuler un délai d'envoi
    setTimeout(() => {
      // Afficher un toast de succès
      toast({
        title: "Attestation créée",
        description: "L'attestation a été créée avec succès.",
      })

      // Rediriger vers la liste des attestations
      router.push("/rh/attestations")
    }, 1000)
  }

  return (
    <DashboardLayout role="rh" user={user}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/rh/attestations">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Retour</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Créer une nouvelle attestation</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Sélection de l&apos;employé</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employe">Employé</Label>
                <Select value={selectedEmploye || ""} onValueChange={handleEmployeSelect}>
                  <SelectTrigger id="employe">
                    <SelectValue placeholder="Sélectionnez un employé" />
                  </SelectTrigger>
                  <SelectContent>
                    {employes.map((employe) => (
                      <SelectItem key={employe.id} value={employe.id}>
                        {employe.name} ({employe.matricule})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom complet</Label>
                  <Input
                    id="nom"
                    value={formData.employe}
                    onChange={(e) => handleChange("employe", e.target.value)}
                    readOnly={!!selectedEmploye}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="matricule">Matricule</Label>
                  <Input
                    id="matricule"
                    value={formData.matricule}
                    onChange={(e) => handleChange("matricule", e.target.value)}
                    readOnly={!!selectedEmploye}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-naissance">Date de naissance</Label>
                  <Input
                    id="date-naissance"
                    type="date"
                    value={formData.dateNaissance}
                    onChange={(e) => handleChange("dateNaissance", e.target.value)}
                    readOnly={!!selectedEmploye}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lieu-naissance">Lieu de naissance</Label>
                  <Input
                    id="lieu-naissance"
                    value={formData.lieuNaissance}
                    onChange={(e) => handleChange("lieuNaissance", e.target.value)}
                    readOnly={!!selectedEmploye}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fonction">Fonction</Label>
                  <Input
                    id="fonction"
                    value={formData.fonction}
                    onChange={(e) => handleChange("fonction", e.target.value)}
                    readOnly={!!selectedEmploye}
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
                    readOnly={!!selectedEmploye}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Détails de l&apos;attestation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="categorie">Catégorie</Label>
                <Select value={formData.categorie} onValueChange={(value) => handleChange("categorie", value)} required>
                  <SelectTrigger id="categorie">
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Employé actif">Employé actif</SelectItem>
                    <SelectItem value="Stagiaire">Stagiaire</SelectItem>
                    <SelectItem value="Retraité">Retraité</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="motif">Motif de la demande</Label>
                <Select value={formData.motif} onValueChange={(value) => handleChange("motif", value)} required>
                  <SelectTrigger id="motif">
                    <SelectValue placeholder="Sélectionnez un motif" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Démarche administrative">Démarche administrative</SelectItem>
                    <SelectItem value="Démarche bancaire">Démarche bancaire</SelectItem>
                    <SelectItem value="Demande de visa">Demande de visa</SelectItem>
                    <SelectItem value="Autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="commentaires">Commentaires (optionnel)</Label>
                <Textarea
                  id="commentaires"
                  placeholder="Informations complémentaires"
                  className="min-h-[100px]"
                  value={formData.commentaires}
                  onChange={(e) => handleChange("commentaires", e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" asChild>
                <Link href="/rh/attestations">Annuler</Link>
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Création en cours..." : "Générer l'attestation"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </DashboardLayout>
  )
}
