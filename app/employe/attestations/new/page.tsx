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
import { LoadingScreen } from "@/components/loading-screen"

export default function NewAttestation() {
  // Données simulées pour un employé
  const user = {
    name: "Ahmed Benali",
    email: "ahmed.benali@esi.dz",
    role: "employe",
    matricule: "ESI-2010-1234",
    dateEmbauche: "15/09/2010",
    fonction: "Enseignant-Chercheur",
  }

  // État du formulaire
  const [formData, setFormData] = useState({
    categorie: "",
    motif: "",
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

    // Créer un nouvel objet attestation
    const newAttestation = {
      id: `ATT-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      date: new Date().toLocaleDateString("fr-FR"),
      categorie: formData.categorie,
      motif: formData.motif,
      statut: "En attente",
      commentaires: formData.commentaires,
    }

    // Simuler un délai d'envoi
    setTimeout(() => {
      try {
        // Récupérer les attestations existantes du localStorage ou initialiser un tableau vide
        const existingAttestations = JSON.parse(localStorage.getItem("employeAttestations") || "[]")

        // Ajouter la nouvelle attestation
        const updatedAttestations = [newAttestation, ...existingAttestations]

        // Sauvegarder dans localStorage
        localStorage.setItem("employeAttestations", JSON.stringify(updatedAttestations))

        // Afficher un toast de succès
        toast({
          title: "Demande soumise",
          description: `Votre demande d'attestation (${newAttestation.id}) a été soumise avec succès.`,
        })

        // Rediriger vers la liste des attestations
        router.push("/employe/attestations")
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la soumission de votre demande.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }, 3000) // Délai plus long pour voir l'animation
  }

  return (
    <DashboardLayout role="employe" user={user}>
      {isLoading && <LoadingScreen message="Soumission de votre demande..." />}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/employe/attestations">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Retour</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Nouvelle demande d&apos;attestation</h1>
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
                  <Input id="nom" defaultValue={user.name} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="matricule">Matricule</Label>
                  <Input id="matricule" defaultValue={user.matricule} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fonction">Fonction</Label>
                  <Input id="fonction" defaultValue={user.fonction} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateEmbauche">Date d&apos;embauche</Label>
                  <Input id="dateEmbauche" defaultValue={user.dateEmbauche} readOnly />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Détails de la demande</CardTitle>
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
                <Link href="/employe/attestations">Annuler</Link>
              </Button>
              <Button type="submit" disabled={isLoading || !formData.categorie || !formData.motif}>
                {isLoading ? "Soumission en cours..." : "Soumettre la demande"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </DashboardLayout>
  )
}
