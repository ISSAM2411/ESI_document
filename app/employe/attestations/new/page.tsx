"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { dataService } from "@/services/data-service"

export default function NewAttestation() {
  const router = useRouter()
  const { toast } = useToast()

  // Données simulées pour un employé
  const user = {
    name: "Ahmed Benali",
    email: "ahmed.benali@esi.dz",
    role: "employe",
  }

  // État du formulaire
  const [formData, setFormData] = useState({
    categorie: "",
    motif: "",
    details: "",
  })

  // Gérer les changements dans le formulaire
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Soumettre le formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation simple
    if (!formData.categorie || !formData.motif) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      })
      return
    }

    // Créer une nouvelle attestation
    const today = new Date()
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getFullYear()}`

    const newAttestation = {
      id: "", // Laisser vide, le service générera l'ID
      date: formattedDate,
      demandeur: user.name,
      matricule: "EMP-2010-042", // Simulé
      categorie: formData.categorie,
      motif: formData.motif,
      statut: "En attente",
      email: user.email,
      dateCreation: formattedDate,
      creePar: user.name,
    }

    // Ajouter l'attestation au service
    dataService.addAttestation(newAttestation)

    // Notification de succès
    toast({
      title: "Demande soumise",
      description: "Votre demande d'attestation a été soumise avec succès.",
    })

    // Redirection
    router.push("/employe/attestations")
  }

  return (
    <DashboardLayout role="employe" user={user}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Demande d&apos;attestation</h1>
          <p className="text-muted-foreground">Remplissez le formulaire ci-dessous pour demander une attestation.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="categorie">Catégorie d&apos;attestation</Label>
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

            <div>
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

            <div>
              <Label htmlFor="details">Détails supplémentaires (optionnel)</Label>
              <Textarea
                id="details"
                placeholder="Précisez votre demande si nécessaire..."
                value={formData.details}
                onChange={(e) => handleChange("details", e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Annuler
            </Button>
            <Button type="submit">Soumettre la demande</Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
