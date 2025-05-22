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
import { ArrowLeft, Calendar, Upload } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { LoadingScreen } from "@/components/loading-screen"

export default function NewMissionRequest() {
  // Données simulées pour un missionnaire
  const user = {
    name: "Karim Messaoudi",
    email: "karim.messaoudi@esi.dz",
    role: "missionnaire",
    departement: "Département Recherche et Innovation",
    fonction: "Chercheur",
  }

  // État du formulaire
  const [formData, setFormData] = useState({
    destination: "",
    dateDebut: "",
    dateFin: "",
    objet: "",
    transport: "",
    justification: "",
    commentaires: "",
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

  // Soumettre le formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Créer un nouvel objet mission
    const newMission = {
      id: `OM-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      demandeur: user.departement,
      missionnaire: user.name,
      destination: formData.destination,
      debut: formatDate(formData.dateDebut),
      fin: formatDate(formData.dateFin),
      statut: "En attente",
      objet: formData.objet,
      transport: formData.transport,
      justification: formData.justification,
      commentaires: formData.commentaires,
      dateCreation: new Date().toLocaleDateString("fr-FR"),
      creePar: user.name,
    }

    // Simuler un délai d'envoi
    setTimeout(() => {
      try {
        // Récupérer les missions existantes du localStorage ou initialiser un tableau vide
        const existingMissions = JSON.parse(localStorage.getItem("missionnaireMissions") || "[]")

        // Ajouter la nouvelle mission
        const updatedMissions = [newMission, ...existingMissions]

        // Sauvegarder dans localStorage
        localStorage.setItem("missionnaireMissions", JSON.stringify(updatedMissions))

        // Afficher un toast de succès
        toast({
          title: "Demande soumise",
          description: `Votre demande de mission (${newMission.id}) a été soumise avec succès.`,
        })

        // Rediriger vers la liste des missions
        router.push("/missionnaire/missions")
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la soumission de votre demande.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }, 2000)
  }

  // Formater la date pour l'affichage
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR")
  }

  return (
    <DashboardLayout role="missionnaire" user={user}>
      {isLoading && <LoadingScreen message="Soumission de votre demande..." />}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/missionnaire/missions">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Retour</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Demande d&apos;ordre de mission</h1>
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
                  <Input id="nom" value={user.name} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user.email} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="departement">Département</Label>
                  <Input id="departement" value={user.departement} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fonction">Fonction</Label>
                  <Input id="fonction" value={user.fonction} readOnly />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Informations de la mission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  placeholder="Entrez la destination"
                  value={formData.destination}
                  onChange={(e) => handleChange("destination", e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date-debut">Date de début</Label>
                  <div className="relative">
                    <Input
                      id="date-debut"
                      type="date"
                      value={formData.dateDebut}
                      onChange={(e) => handleChange("dateDebut", e.target.value)}
                      required
                    />
                    <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-fin">Date de fin</Label>
                  <div className="relative">
                    <Input
                      id="date-fin"
                      type="date"
                      value={formData.dateFin}
                      onChange={(e) => handleChange("dateFin", e.target.value)}
                      required
                    />
                    <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="objet">Objet de la mission</Label>
                <Textarea
                  id="objet"
                  placeholder="Décrivez l'objet de la mission"
                  className="min-h-[100px]"
                  value={formData.objet}
                  onChange={(e) => handleChange("objet", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="justification">Justification de la mission</Label>
                <Textarea
                  id="justification"
                  placeholder="Justifiez la nécessité de cette mission"
                  className="min-h-[100px]"
                  value={formData.justification}
                  onChange={(e) => handleChange("justification", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transport">Type de transport</Label>
                <Select value={formData.transport} onValueChange={(value) => handleChange("transport", value)} required>
                  <SelectTrigger id="transport">
                    <SelectValue placeholder="Sélectionnez un type de transport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Voiture">Voiture</SelectItem>
                    <SelectItem value="Train">Train</SelectItem>
                    <SelectItem value="Avion">Avion</SelectItem>
                    <SelectItem value="Autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Pièce jointe (optionnel)</Label>
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">Glissez-déposez un fichier ici ou</p>
                  <Button variant="outline" size="sm">
                    Parcourir
                  </Button>
                </div>
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
                <Link href="/missionnaire/missions">Annuler</Link>
              </Button>
              <Button
                type="submit"
                disabled={
                  isLoading ||
                  !formData.destination ||
                  !formData.dateDebut ||
                  !formData.dateFin ||
                  !formData.objet ||
                  !formData.justification ||
                  !formData.transport
                }
              >
                {isLoading ? "Soumission en cours..." : "Soumettre la demande"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </DashboardLayout>
  )
}
