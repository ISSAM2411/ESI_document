"use client"

import { Label } from "@/components/ui/label"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, Calendar, X } from "lucide-react"
import Link from "next/link"
import { MissionList } from "@/components/mission-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

// Types
interface Mission {
  id: string
  demandeur: string
  missionnaire: string
  destination: string
  debut: string
  fin: string
  statut: string
  objet?: string
  transport?: string
  avance?: string
  commentaires?: string
  dateCreation?: string
  creePar?: string
}

export default function SGMissions() {
  // Données simulées pour un SG
  const user = {
    name: "Fatima Zerrouki",
    email: "sg@esi.dz",
    role: "sg",
  }

  // État pour les missions
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: "OM-2025-014",
      demandeur: "Département Réseaux",
      missionnaire: "Yacine Bouaziz",
      destination: "Annaba - Centre de Données",
      debut: "25/04/2025",
      fin: "27/04/2025",
      statut: "Approuvée",
    },
    {
      id: "OM-2025-009",
      demandeur: "Département Intelligence Artificielle",
      missionnaire: "Leila Benmansour",
      destination: "Oran - Technopole",
      debut: "22/04/2025",
      fin: "24/04/2025",
      statut: "En cours",
    },
    {
      id: "OM-2025-003",
      demandeur: "Département Systèmes d'Information",
      missionnaire: "Karim Messaoudi",
      destination: "Annaba - École Supérieure de Technologie",
      debut: "18/04/2025",
      fin: "20/04/2025",
      statut: "En cours",
    },
    {
      id: "OM-2025-011",
      demandeur: "Département Génie Logiciel",
      missionnaire: "Nadir Hamidi",
      destination: "Blida - École Nationale Polytechnique",
      debut: "15/04/2025",
      fin: "16/04/2025",
      statut: "En attente",
    },
    {
      id: "OM-2025-001",
      demandeur: "Département Recherche et Innovation",
      missionnaire: "Karim Messaoudi",
      destination: "Oran - Université des Sciences et de la Technologie",
      debut: "12/04/2025",
      fin: "15/04/2025",
      statut: "Approuvée",
    },
  ])

  // État pour les filtres
  const [searchQuery, setSearchQuery] = useState("")
  const [demandeurFilter, setDemandeurFilter] = useState("all")
  const [destinationFilter, setDestinationFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState({ debut: "", fin: "" })
  const [activeTab, setActiveTab] = useState("toutes")
  const [filteredMissions, setFilteredMissions] = useState<Mission[]>(missions)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Toast
  const { toast } = useToast()

  // Effet pour charger les missions depuis localStorage
  useEffect(() => {
    try {
      const storedMissions = localStorage.getItem("sgMissions")
      if (storedMissions) {
        const parsedMissions = JSON.parse(storedMissions)
        setMissions((prevMissions) => {
          // Fusionner les missions stockées avec les missions par défaut
          // en évitant les doublons basés sur l'ID
          const existingIds = new Set(prevMissions.map((mission) => mission.id))
          const newMissions = parsedMissions.filter((mission: Mission) => !existingIds.has(mission.id))
          return [...newMissions, ...prevMissions]
        })
      }
    } catch (error) {
      console.error("Erreur lors du chargement des missions:", error)
    }
  }, [])

  // Effet pour filtrer les missions
  useEffect(() => {
    let result = [...missions]
    const newActiveFilters: string[] = []

    // Filtre par statut (tab)
    if (activeTab !== "toutes") {
      const statusMap: Record<string, string> = {
        "en-attente": "En attente",
        "en-cours": "En cours",
        approuvees: "Approuvée",
        rejetees: "Rejetée",
      }
      result = result.filter((mission) => mission.statut === statusMap[activeTab])
    }

    // Filtre par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (mission) =>
          mission.id.toLowerCase().includes(query) ||
          mission.missionnaire.toLowerCase().includes(query) ||
          mission.demandeur.toLowerCase().includes(query) ||
          mission.destination.toLowerCase().includes(query),
      )
      newActiveFilters.push(`Recherche: "${searchQuery}"`)
    }

    // Filtre par demandeur
    if (demandeurFilter !== "all") {
      const demandeurMap: Record<string, string> = {
        si: "Systèmes d'Information",
        ri: "Recherche et Innovation",
        ia: "Intelligence Artificielle",
        reseaux: "Réseaux",
        gl: "Génie Logiciel",
      }
      result = result.filter((mission) => mission.demandeur.includes(demandeurMap[demandeurFilter] || ""))
      newActiveFilters.push(`Département: ${demandeurMap[demandeurFilter]}`)
    }

    // Filtre par destination
    if (destinationFilter !== "all") {
      const destinationMap: Record<string, string> = {
        annaba: "Annaba",
        oran: "Oran",
        alger: "Alger",
        blida: "Blida",
        constantine: "Constantine",
      }
      result = result.filter((mission) => mission.destination.includes(destinationMap[destinationFilter] || ""))
      newActiveFilters.push(`Destination: ${destinationMap[destinationFilter]}`)
    }

    // Filtre par date
    if (dateFilter.debut) {
      const debutDate = new Date(dateFilter.debut)
      result = result.filter((mission) => {
        const missionDate = new Date(mission.debut.split("/").reverse().join("-"))
        return missionDate >= debutDate
      })
      newActiveFilters.push(`Après le: ${new Date(dateFilter.debut).toLocaleDateString("fr-FR")}`)
    }

    if (dateFilter.fin) {
      const finDate = new Date(dateFilter.fin)
      result = result.filter((mission) => {
        const missionDate = new Date(mission.debut.split("/").reverse().join("-"))
        return missionDate <= finDate
      })
      newActiveFilters.push(`Avant le: ${new Date(dateFilter.fin).toLocaleDateString("fr-FR")}`)
    }

    setFilteredMissions(result)
    setActiveFilters(newActiveFilters)
  }, [searchQuery, demandeurFilter, destinationFilter, dateFilter, missions, activeTab])

  // Réinitialiser les filtres
  const resetFilters = () => {
    setSearchQuery("")
    setDemandeurFilter("all")
    setDestinationFilter("all")
    setDateFilter({ debut: "", fin: "" })
    setActiveFilters([])
  }

  // Basculer l'affichage des filtres
  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  // Fonction pour approuver une mission
  const handleApproveMission = (id: string) => {
    setMissions(missions.map((mission) => (mission.id === id ? { ...mission, statut: "Approuvée" } : mission)))

    // Mettre à jour le localStorage
    try {
      const storedMissions = JSON.parse(localStorage.getItem("sgMissions") || "[]")
      const updatedMissions = storedMissions.map((mission: Mission) =>
        mission.id === id ? { ...mission, statut: "Approuvée" } : mission,
      )
      localStorage.setItem("sgMissions", JSON.stringify(updatedMissions))
    } catch (error) {
      console.error("Erreur lors de la mise à jour des missions:", error)
    }

    toast({
      title: "Mission approuvée",
      description: `L'ordre de mission ${id} a été approuvé avec succès.`,
    })
  }

  // Fonction pour rejeter une mission
  const handleRejectMission = (id: string, reason: string) => {
    setMissions(missions.map((mission) => (mission.id === id ? { ...mission, statut: "Rejetée" } : mission)))

    // Mettre à jour le localStorage
    try {
      const storedMissions = JSON.parse(localStorage.getItem("sgMissions") || "[]")
      const updatedMissions = storedMissions.map((mission: Mission) =>
        mission.id === id ? { ...mission, statut: "Rejetée" } : mission,
      )
      localStorage.setItem("sgMissions", JSON.stringify(updatedMissions))
    } catch (error) {
      console.error("Erreur lors de la mise à jour des missions:", error)
    }

    toast({
      title: "Mission rejetée",
      description: `L'ordre de mission ${id} a été rejeté.`,
    })
  }

  // Fonction pour mettre en cours une mission
  const handleProcessMission = (id: string) => {
    setMissions(missions.map((mission) => (mission.id === id ? { ...mission, statut: "En cours" } : mission)))

    // Mettre à jour le localStorage
    try {
      const storedMissions = JSON.parse(localStorage.getItem("sgMissions") || "[]")
      const updatedMissions = storedMissions.map((mission: Mission) =>
        mission.id === id ? { ...mission, statut: "En cours" } : mission,
      )
      localStorage.setItem("sgMissions", JSON.stringify(updatedMissions))
    } catch (error) {
      console.error("Erreur lors de la mise à jour des missions:", error)
    }

    toast({
      title: "Mission en cours",
      description: `L'ordre de mission ${id} est maintenant en cours de traitement.`,
    })
  }

  return (
    <DashboardLayout role="sg" user={user}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Demandes d&apos;ordres de mission</h1>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/sg/missions/new">
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle mission
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="toutes" onValueChange={setActiveTab}>
          <div className="overflow-x-auto pb-2">
            <TabsList>
              <TabsTrigger value="toutes">Toutes</TabsTrigger>
              <TabsTrigger value="en-attente">En attente</TabsTrigger>
              <TabsTrigger value="en-cours">En cours</TabsTrigger>
              <TabsTrigger value="approuvees">Approuvées</TabsTrigger>
              <TabsTrigger value="rejetees">Rejetées</TabsTrigger>
            </TabsList>
          </div>

          <div className="mt-4 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher par ID, missionnaire, département..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2" onClick={toggleFilters}>
                <Filter className="h-4 w-4" />
                Filtres
                {activeFilters.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {activeFilters.length}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Filtres déroulants */}
            {showFilters && (
              <Card className="p-4 animate-in fade-in-50 slide-in-from-top-5 duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Filtres avancés</h4>
                  <Button variant="ghost" size="icon" onClick={toggleFilters}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Fermer</span>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="departement">Département</Label>
                    <Select value={demandeurFilter} onValueChange={setDemandeurFilter}>
                      <SelectTrigger id="departement">
                        <SelectValue placeholder="Tous les départements" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les départements</SelectItem>
                        <SelectItem value="si">Systèmes d'Information</SelectItem>
                        <SelectItem value="ri">Recherche et Innovation</SelectItem>
                        <SelectItem value="ia">Intelligence Artificielle</SelectItem>
                        <SelectItem value="reseaux">Réseaux</SelectItem>
                        <SelectItem value="gl">Génie Logiciel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <Select value={destinationFilter} onValueChange={setDestinationFilter}>
                      <SelectTrigger id="destination">
                        <SelectValue placeholder="Toutes les destinations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes les destinations</SelectItem>
                        <SelectItem value="annaba">Annaba</SelectItem>
                        <SelectItem value="oran">Oran</SelectItem>
                        <SelectItem value="alger">Alger</SelectItem>
                        <SelectItem value="blida">Blida</SelectItem>
                        <SelectItem value="constantine">Constantine</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date-debut">Date de début (après le)</Label>
                    <div className="relative">
                      <Input
                        id="date-debut"
                        type="date"
                        value={dateFilter.debut}
                        onChange={(e) => setDateFilter({ ...dateFilter, debut: e.target.value })}
                      />
                      <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date-fin">Date de fin (avant le)</Label>
                    <div className="relative">
                      <Input
                        id="date-fin"
                        type="date"
                        value={dateFilter.fin}
                        onChange={(e) => setDateFilter({ ...dateFilter, fin: e.target.value })}
                      />
                      <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      resetFilters()
                      setShowFilters(false)
                    }}
                  >
                    Réinitialiser les filtres
                  </Button>
                </div>
              </Card>
            )}

            {/* Affichage des filtres actifs */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    {filter}
                  </Badge>
                ))}
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={resetFilters}>
                  Effacer tous les filtres
                </Button>
              </div>
            )}

            <TabsContent value="toutes" className="mt-4">
              <MissionList
                missions={filteredMissions}
                onApprove={handleApproveMission}
                onReject={handleRejectMission}
                onProcess={handleProcessMission}
                userRole="sg"
              />
            </TabsContent>
            <TabsContent value="en-attente" className="mt-4">
              <MissionList
                missions={filteredMissions}
                onApprove={handleApproveMission}
                onReject={handleRejectMission}
                onProcess={handleProcessMission}
                userRole="sg"
              />
            </TabsContent>
            <TabsContent value="en-cours" className="mt-4">
              <MissionList
                missions={filteredMissions}
                onApprove={handleApproveMission}
                onReject={handleRejectMission}
                onProcess={handleProcessMission}
                userRole="sg"
              />
            </TabsContent>
            <TabsContent value="approuvees" className="mt-4">
              <MissionList
                missions={filteredMissions}
                onApprove={handleApproveMission}
                onReject={handleRejectMission}
                onProcess={handleProcessMission}
                userRole="sg"
              />
            </TabsContent>
            <TabsContent value="rejetees" className="mt-4">
              <MissionList
                missions={filteredMissions}
                onApprove={handleApproveMission}
                onReject={handleRejectMission}
                onProcess={handleProcessMission}
                userRole="sg"
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
