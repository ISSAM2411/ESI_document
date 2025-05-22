"use client"

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
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { dataService, type Mission } from "@/services/data-service"

export default function MissionnaireMissions() {
  // Données simulées pour un missionnaire
  const user = {
    name: "Karim Messaoudi",
    email: "missionary@esi.dz",
    role: "missionnaire",
  }

  // État pour les missions
  const [missions, setMissions] = useState<Mission[]>([])

  // État pour les filtres
  const [searchQuery, setSearchQuery] = useState("")
  const [destinationFilter, setDestinationFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState({ debut: "", fin: "" })
  const [activeTab, setActiveTab] = useState("toutes")
  const [filteredMissions, setFilteredMissions] = useState<Mission[]>([])
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Toast
  const { toast } = useToast()

  // Effet pour charger les missions depuis le service
  useEffect(() => {
    const userMissions = dataService.getMissionsByEmail(user.email)
    setMissions(userMissions)
  }, [user.email])

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
        terminees: "Terminée",
      }
      result = result.filter((mission) => mission.statut === statusMap[activeTab])
    }

    // Filtre par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (mission) =>
          mission.id.toLowerCase().includes(query) ||
          mission.destination.toLowerCase().includes(query) ||
          mission.demandeur.toLowerCase().includes(query),
      )
      newActiveFilters.push(`Recherche: "${searchQuery}"`)
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
  }, [searchQuery, destinationFilter, dateFilter, missions, activeTab])

  // Réinitialiser les filtres
  const resetFilters = () => {
    setSearchQuery("")
    setDestinationFilter("all")
    setDateFilter({ debut: "", fin: "" })
    setActiveFilters([])
  }

  // Basculer l'affichage des filtres
  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  return (
    <DashboardLayout role="missionnaire" user={user}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Mes ordres de mission</h1>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/missionnaire/missions/new">
              <Plus className="mr-2 h-4 w-4" />
              Demander une mission
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
              <TabsTrigger value="terminees">Terminées</TabsTrigger>
              <TabsTrigger value="rejetees">Rejetées</TabsTrigger>
            </TabsList>
          </div>

          <div className="mt-4 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher par ID, destination..."
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
              <MissionList missions={filteredMissions} userRole="missionnaire" />
            </TabsContent>
            <TabsContent value="en-attente" className="mt-4">
              <MissionList missions={filteredMissions} userRole="missionnaire" />
            </TabsContent>
            <TabsContent value="en-cours" className="mt-4">
              <MissionList missions={filteredMissions} userRole="missionnaire" />
            </TabsContent>
            <TabsContent value="approuvees" className="mt-4">
              <MissionList missions={filteredMissions} userRole="missionnaire" />
            </TabsContent>
            <TabsContent value="terminees" className="mt-4">
              <MissionList missions={filteredMissions} userRole="missionnaire" />
            </TabsContent>
            <TabsContent value="rejetees" className="mt-4">
              <MissionList missions={filteredMissions} userRole="missionnaire" />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
