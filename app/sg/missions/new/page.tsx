"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { LoadingScreen } from "@/components/loading-screen"

// Types
interface Employee {
  id: string
  name: string
  matricule: string
  fonction: string
  departement: string
  email: string
  telephone: string
}

export default function NewMission() {
  // Données simulées pour un SG
  const user = {
    name: "Fatima Zerrouki",
    email: "fatima.zerrouki@esi.dz",
    role: "sg",
  }

  // État du formulaire
  const [formData, setFormData] = useState({
    missionnaireId: "",
    nom: "",
    matricule: "",
    fonction: "",
    departement: "",
    email: "",
    telephone: "",
    destination: "",
    dateDebut: "",
    dateFin: "",
    objet: "",
    transport: "",
    avance: "",
    commentaires: "",
  })

  // État de chargement
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([])

  const router = useRouter()
  const { toast } = useToast()

  // Liste simulée des employés
  const employees: Employee[] = [
    {
      id: "1",
      name: "Ahmed Benali",
      matricule: "ESI-2010-1234",
      fonction: "Enseignant-Chercheur",
      departement: "Département Systèmes d'Information",
      email: "ahmed.benali@esi.dz",
      telephone: "0555123456",
    },
    {
      id: "2",
      name: "Karim Messaoudi",
      matricule: "ESI-2005-0456",
      fonction: "Chercheur",
      departement: "Département Recherche et Innovation",
      email: "karim.messaoudi@esi.dz",
      telephone: "0555789012",
    },
    {
      id: "3",
      name: "Leila Benmansour",
      matricule: "ESI-2018-1357",
      fonction: "Enseignante",
      departement: "Département Intelligence Artificielle",
      email: "leila.benmansour@esi.dz",
      telephone: "0555246810",
    },
    {
      id: "4",
      name: "Yacine Bouaziz",
      matricule: "ESI-2015-2468",
      fonction: "Ingénieur Réseau",
      departement: "Département Réseaux",
      email: "yacine.bouaziz@esi.dz",
      telephone: "0555135790",
    },
    {
      id: "5",
      name: "Nadir Hamidi",
      matricule: "ESI-2013-3579",
      fonction: "Développeur",
      departement: "Département Génie Logiciel",
      email: "nadir.hamidi@esi.dz",
      telephone: "0555864209",
    },
  ]

  // Filtrer les employés en fonction du terme de recherche
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredEmployees([])
      return
    }

    const lowercasedSearch = searchTerm.toLowerCase()
    const filtered = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(lowercasedSearch) ||
        employee.matricule.toLowerCase().includes(lowercasedSearch) ||
        employee.departement.toLowerCase().includes(lowercasedSearch),
    )
    setFilteredEmployees(filtered)
  }, [searchTerm])

  // Gérer la sélection d'un employé
  const handleEmployeeSelect = (id: string) => {
    const employee = employees.find((e) => e.id === id)
    if (employee) {
      setFormData({
        ...formData,
        missionnaireId: employee.id,
        nom: employee.name,
        matricule: employee.matricule,
        fonction: employee.fonction,
        departement: employee.departement,
        email: employee.email,
        telephone: employee.telephone,
      })
      setSearchTerm("")
    }
  }

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
      demandeur: formData.departement,
      missionnaire: formData.nom,
      destination: formData.destination,
      debut: formatDate(formData.dateDebut),
      fin: formatDate(formData.dateFin),
      statut: "En attente",
      objet: formData.objet,
      transport: formData.transport,
      avance: formData.avance,
      commentaires: formData.commentaires,
      dateCreation: new Date().toLocaleDateString("fr-FR"),
      creePar: user.name,
    }

    // Simuler un délai d'envoi
    setTimeout(() => {
      try {
        // Récupérer les missions existantes du localStorage ou initialiser un tableau vide
        const existingMissions = JSON.parse(localStorage.getItem("sgMissions") || "[]")

        // Ajouter la nouvelle mission
        const updatedMissions = [newMission, ...existingMissions]

        // Sauvegarder dans localStorage
        localStorage.setItem("sgMissions", JSON.stringify(updatedMissions))

        // Afficher un toast de succès
        toast({
          title: "Ordre de mission créé",
          description: `L'ordre de mission ${newMission.id} a été créé avec succès.`,
        })

        // Rediriger vers la liste des missions
        router.push("/sg/missions")
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la création de l'ordre de mission.",
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
    <DashboardLayout role="sg" user={user}>
      {isLoading && <LoadingScreen message="Génération de l'ordre de mission..." />}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/sg/missions">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Retour</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Création d&apos;un ordre de mission</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Sélection du missionnaire</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="search-missionnaire">Rechercher un missionnaire</Label>
                <div className="relative">
                  <Input
                    id="search-missionnaire"
                    placeholder="Rechercher par nom, matricule ou département..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {filteredEmployees.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                      {filteredEmployees.map((employee) => (
                        <div
                          key={employee.id}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleEmployeeSelect(employee.id)}
                        >
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-gray-500">
                            {employee.matricule} - {employee.departement}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom du missionnaire</Label>
                  <Input
                    id="nom"
                    placeholder="Entrez le nom du missionnaire"
                    value={formData.nom}
                    onChange={(e) => handleChange("nom", e.target.value)}
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
                  <Label htmlFor="departement">Département</Label>
                  <Input
                    id="departement"
                    placeholder="Entrez le département"
                    value={formData.departement}
                    onChange={(e) => handleChange("departement", e.target.value)}
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
              <CardTitle>Détails de la mission</CardTitle>
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
                <Label htmlFor="transport">Type de transport (optionnel)</Label>
                <Select value={formData.transport} onValueChange={(value) => handleChange("transport", value)}>
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
                <Label htmlFor="avance">Avance sur frais (optionnel)</Label>
                <Input
                  id="avance"
                  placeholder="Montant de l'avance"
                  type="number"
                  value={formData.avance}
                  onChange={(e) => handleChange("avance", e.target.value)}
                />
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
                <Link href="/sg/missions">Annuler</Link>
              </Button>
              <Button
                type="submit"
                disabled={
                  isLoading ||
                  !formData.nom ||
                  !formData.matricule ||
                  !formData.fonction ||
                  !formData.destination ||
                  !formData.dateDebut ||
                  !formData.dateFin ||
                  !formData.objet
                }
              >
                {isLoading ? "Génération en cours..." : "Générer l'ordre de mission"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </DashboardLayout>
  )
}
