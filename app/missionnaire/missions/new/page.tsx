"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { dataService } from "@/services/data-service"

export default function NewMission() {
  const router = useRouter()
  const { toast } = useToast()

  // Données simulées pour un missionnaire
  const user = {
    name: "Karim Messaoudi",
    email: "missionary@esi.dz",
    role: "missionnaire",
  }

  // État du formulaire
  const [formData, setFormData] = useState({
    demandeur: "",
    destination: "",
    debut: "",
    fin: "",
    objet: "",
    transport: "",
    avance: "",
    commentaires: "",
  })

  // Gérer les changements dans le formulaire
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Soumettre le formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation simple
    if (!formData.demandeur || !formData.destination || !formData.debut || !formData.fin) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      })
      return
    }

    // Formater les dates
    const formatDate = (dateString: string) => {
      const date = new Date(dateString)
      return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`
    }

    // Créer une nouvelle mission
    const today = new Date()
    const formattedToday = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getFullYear()}`

    const newMission = {
      id: "", // id will be generated in dataService.addMission if empty
      demandeur: formData.demandeur,
      missionnaire: user.name,
      destination: formData.destination,
      debut: formatDate(formData.debut),
      fin: formatDate(formData.fin),
      statut: "En attente",
      objet: formData.objet,
      transport: formData.transport,
      avance: formData.avance,
      commentaires: formData.commentaires,
      dateCreation: formattedToday,
      creePar: user.name,
      email: user.email,
    }

    // Ajouter la mission au service
    dataService.addMission(newMission)

    // Notification de succès
    toast({
      title: "Demande soumise",
      description: "Votre demande de mission a été soumise avec succès.",
    })

    // Redirection
    router.push("/missionnaire/missions")
  }

  return (
    <DashboardLayout role="missionnaire" user={user}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Demande d&apos;ordre de mission</h1>
          <p className="text-muted-foreground">
            Remplissez le formulaire ci-dessous pour demander un ordre de mission.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="demandeur">Département demandeur</Label>
                <Select value={formData.demandeur} onValueChange={(value) => handleChange("demandeur", value)} required>
                  <SelectTrigger id="demandeur">
                    <SelectValue placeholder="Sélectionnez un département" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Département Systèmes d'Information">Systèmes d'Information</SelectItem>
                    <SelectItem value="Département Recherche et Innovation">Recherche et Innovation</SelectItem>
                    <SelectItem value="Département Intelligence Artificielle">Intelligence Artificielle</SelectItem>
                    <SelectItem value="Département Réseaux">Réseaux</SelectItem>
                    <SelectItem value="Département Génie Logiciel">Génie Logiciel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  placeholder="Ville - Établissement"
                  value={formData.destination}
                  onChange={(e) => handleChange("destination", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="debut">Date de début</Label>
                  <Input
                    id="debut"
                    type="date"
                    value={formData.debut}
                    onChange={(e) => handleChange("debut", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="fin">Date de fin</Label>
                  <Input
                    id="fin"
                    type="date"
                    value={formData.fin}
                    onChange={(e) => handleChange("fin", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="objet">Objet de la mission</Label>
                <Textarea
                  id="objet"
                  placeholder="Décrivez l'objet de votre mission..."
                  value={formData.objet}
                  onChange={(e) => handleChange("objet", e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              <div>
                <Label htmlFor="transport">Moyen de transport</Label>
                <Select value={formData.transport} onValueChange={(value) => handleChange("transport", value)}>
                  <SelectTrigger id="transport">
                    <SelectValue placeholder="Sélectionnez un moyen de transport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Véhicule de service">Véhicule de service</SelectItem>
                    <SelectItem value="Transport en commun">Transport en commun</SelectItem>
                    <SelectItem value="Avion">Avion</SelectItem>
                    <SelectItem value="Véhicule personnel">Véhicule personnel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="avance">Avance demandée (DZD)</Label>
                <Input
                  id="avance"
                  type="number"
                  placeholder="0"
                  value={formData.avance}
                  onChange={(e) => handleChange("avance", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="commentaires">Commentaires (optionnel)</Label>
                <Textarea
                  id="commentaires"
                  placeholder="Ajoutez des commentaires si nécessaire..."
                  value={formData.commentaires}
                  onChange={(e) => handleChange("commentaires", e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
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
