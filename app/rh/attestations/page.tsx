"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, X, CalendarIcon, FileDown } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AttestationListRH } from "@/components/attestation-list-rh"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import type { DateRange } from "react-day-picker"
import { format, isWithinInterval, parse } from "date-fns"
import { fr } from "date-fns/locale"
import { exportToExcel, formatAttestationsForExcel } from "@/utils/excel-export"
import { dataService, type Attestation } from "@/services/data-service"

export default function RHAttestations() {
  // Données simulées pour un RH
  const user = {
    name: "Samira Hadjri",
    email: "hr@esi.dz",
    role: "rh",
  }

  // État pour les attestations
  const [attestations, setAttestations] = useState<Attestation[]>([])
  const [filteredAttestations, setFilteredAttestations] = useState<Attestation[]>([])
  const [activeTab, setActiveTab] = useState("toutes")

  // État pour les filtres
  const [searchQuery, setSearchQuery] = useState("")
  const [categorieFilter, setCategorieFilter] = useState("all")
  const [motifFilter, setMotifFilter] = useState("all")
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)

  // Toast
  const { toast } = useToast()

  // Charger les attestations depuis le service
  useEffect(() => {
    const allAttestations = dataService.getAllAttestations()
    setAttestations(allAttestations)
  }, [])

  // Effet pour filtrer les attestations
  useEffect(() => {
    let result = [...attestations]
    const newActiveFilters: string[] = []

    // Filtre par statut (tab)
    if (activeTab !== "toutes") {
      const statusMap: Record<string, string> = {
        "en-attente": "En attente",
        "en-cours": "En cours",
        completees: "Complétée",
        rejetees: "Rejetée",
      }
      result = result.filter((attestation) => attestation.statut === statusMap[activeTab])
    }

    // Filtre par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (attestation) =>
          attestation.id.toLowerCase().includes(query) ||
          attestation.demandeur.toLowerCase().includes(query) ||
          attestation.matricule.toLowerCase().includes(query),
      )
      newActiveFilters.push(`Recherche: "${searchQuery}"`)
    }

    // Filtre par catégorie
    if (categorieFilter !== "all") {
      const categorieMap: Record<string, string> = {
        employe: "Employé actif",
        stagiaire: "Stagiaire",
        retraite: "Retraité",
      }
      result = result.filter((attestation) => attestation.categorie === categorieMap[categorieFilter])
      newActiveFilters.push(`Catégorie: ${categorieMap[categorieFilter]}`)
    }

    // Filtre par motif
    if (motifFilter !== "all") {
      const motifMap: Record<string, string> = {
        administrative: "Démarche administrative",
        bancaire: "Démarche bancaire",
        visa: "Demande de visa",
        autre: "Autre",
      }
      result = result.filter((attestation) => attestation.motif === motifMap[motifFilter])
      newActiveFilters.push(`Motif: ${motifMap[motifFilter]}`)
    }

    // Filtre par plage de dates
    if (dateRange?.from) {
      const from = dateRange.from
      const to = dateRange.to || dateRange.from

      result = result.filter((attestation) => {
        const attestationDate = parse(attestation.date, "dd/MM/yyyy", new Date())
        return isWithinInterval(attestationDate, { start: from, end: to })
      })

      const dateRangeText = dateRange.to
        ? `${format(dateRange.from, "dd/MM/yyyy")} - ${format(dateRange.to, "dd/MM/yyyy")}`
        : format(dateRange.from, "dd/MM/yyyy")

      newActiveFilters.push(`Période: ${dateRangeText}`)
    }

    setFilteredAttestations(result)
    setActiveFilters(newActiveFilters)
  }, [searchQuery, categorieFilter, motifFilter, dateRange, attestations, activeTab])

  // Fonction pour approuver une attestation
  const handleApproveAttestation = (id: string) => {
    dataService.updateAttestation(id, { statut: "Complétée" })
    setAttestations(dataService.getAllAttestations())

    toast({
      title: "Attestation approuvée",
      description: `L'attestation ${id} a été approuvée avec succès.`,
    })
  }

  // Fonction pour rejeter une attestation
  const handleRejectAttestation = (id: string, reason: string) => {
    dataService.updateAttestation(id, { statut: "Rejetée", raisonRejet: reason })
    setAttestations(dataService.getAllAttestations())

    toast({
      title: "Attestation rejetée",
      description: `L'attestation ${id} a été rejetée.`,
    })
  }

  // Fonction pour mettre en cours une attestation
  const handleProcessAttestation = (id: string) => {
    dataService.updateAttestation(id, { statut: "En cours" })
    setAttestations(dataService.getAllAttestations())

    toast({
      title: "Attestation en cours",
      description: `L'attestation ${id} est maintenant en cours de traitement.`,
    })
  }

  // Réinitialiser les filtres
  const resetFilters = () => {
    setSearchQuery("")
    setCategorieFilter("all")
    setMotifFilter("all")
    setDateRange(undefined)
    setActiveFilters([])
  }

  // Basculer l'affichage des filtres
  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  // Fonction pour exporter les attestations filtrées au format Excel
  const handleExportExcel = () => {
    try {
      const formattedData = formatAttestationsForExcel(filteredAttestations)

      // Générer un nom de fichier avec la date actuelle
      const today = format(new Date(), "yyyy-MM-dd")
      const statusText = activeTab !== "toutes" ? `-${activeTab}` : ""
      const filename = `attestations${statusText}-${today}`

      exportToExcel(formattedData, filename, "Attestations")

      toast({
        title: "Export réussi",
        description: `Les attestations ont été exportées au format Excel.`,
      })
    } catch (error) {
      console.error("Erreur lors de l'export Excel:", error)
      toast({
        title: "Erreur d'export",
        description: "Une erreur est survenue lors de l'export des attestations.",
        variant: "destructive",
      })
    }
  }

  return (
    <DashboardLayout role="rh" user={user}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Gestion des attestations</h1>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2" onClick={handleExportExcel}>
              <FileDown className="h-4 w-4" />
              Exporter Excel
            </Button>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/rh/attestations/new">
                <Plus className="mr-2 h-4 w-4" />
                Créer une nouvelle attestation
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="toutes" onValueChange={setActiveTab}>
          <div className="overflow-x-auto pb-2">
            <TabsList>
              <TabsTrigger value="toutes">Toutes</TabsTrigger>
              <TabsTrigger value="en-attente">En attente</TabsTrigger>
              <TabsTrigger value="en-cours">En cours</TabsTrigger>
              <TabsTrigger value="completees">Complétées</TabsTrigger>
              <TabsTrigger value="rejetees">Rejetées</TabsTrigger>
            </TabsList>
          </div>

          <div className="mt-4 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher..."
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

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date-range">Période</Label>
                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dateRange && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange?.from ? (
                            dateRange.to ? (
                              <>
                                {format(dateRange.from, "dd/MM/yyyy")} - {format(dateRange.to, "dd/MM/yyyy")}
                              </>
                            ) : (
                              format(dateRange.from, "dd/MM/yyyy")
                            )
                          ) : (
                            <span>Sélectionner une période</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={dateRange?.from}
                          selected={dateRange}
                          onSelect={(range) => {
                            setDateRange(range)
                            if (range?.to) {
                              setCalendarOpen(false)
                            }
                          }}
                          numberOfMonths={2}
                          locale={fr}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="categorie">Catégorie</Label>
                      <Select value={categorieFilter} onValueChange={setCategorieFilter}>
                        <SelectTrigger id="categorie">
                          <SelectValue placeholder="Catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Toutes les catégories</SelectItem>
                          <SelectItem value="employe">Employé actif</SelectItem>
                          <SelectItem value="stagiaire">Stagiaire</SelectItem>
                          <SelectItem value="retraite">Retraité</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="motif">Motif</Label>
                      <Select value={motifFilter} onValueChange={setMotifFilter}>
                        <SelectTrigger id="motif">
                          <SelectValue placeholder="Motif" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous les motifs</SelectItem>
                          <SelectItem value="administrative">Démarche administrative</SelectItem>
                          <SelectItem value="bancaire">Démarche bancaire</SelectItem>
                          <SelectItem value="visa">Demande de visa</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
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
          </div>

          <TabsContent value="toutes" className="mt-4">
            <AttestationListRH
              attestations={filteredAttestations}
              onApprove={handleApproveAttestation}
              onReject={handleRejectAttestation}
              onProcess={handleProcessAttestation}
            />
          </TabsContent>
          <TabsContent value="en-attente" className="mt-4">
            <AttestationListRH
              attestations={filteredAttestations}
              onApprove={handleApproveAttestation}
              onReject={handleRejectAttestation}
              onProcess={handleProcessAttestation}
            />
          </TabsContent>
          <TabsContent value="en-cours" className="mt-4">
            <AttestationListRH
              attestations={filteredAttestations}
              onApprove={handleApproveAttestation}
              onReject={handleRejectAttestation}
              onProcess={handleProcessAttestation}
            />
          </TabsContent>
          <TabsContent value="completees" className="mt-4">
            <AttestationListRH
              attestations={filteredAttestations}
              onApprove={handleApproveAttestation}
              onReject={handleRejectAttestation}
              onProcess={handleProcessAttestation}
            />
          </TabsContent>
          <TabsContent value="rejetees" className="mt-4">
            <AttestationListRH
              attestations={filteredAttestations}
              onApprove={handleApproveAttestation}
              onReject={handleRejectAttestation}
              onProcess={handleProcessAttestation}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

// Fonction utilitaire pour concaténer des noms de classe
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
