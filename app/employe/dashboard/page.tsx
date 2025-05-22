"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Plus } from "lucide-react"
import Link from "next/link"
import { AttestationList } from "@/components/attestation-list"
import { EnhancedChartContainer } from "@/components/enhanced-chart-container"

interface Attestation {
  id: string
  date: string
  categorie: string
  motif: string
  statut: string
}

export default function EmployeDashboard() {
  // Données simulées pour un employé
  const user = {
    name: "Ahmed Benali",
    email: "employee@esi.dz",
    role: "employe",
  }

  // État pour les attestations
  const [attestations, setAttestations] = useState<Attestation[]>([
    {
      id: "ATT-2025-001",
      date: "18/03/2025",
      categorie: "Employé actif",
      motif: "Démarche administrative",
      statut: "En attente",
    },
    {
      id: "ATT-2025-005",
      date: "10/03/2025",
      categorie: "Employé actif",
      motif: "Autre",
      statut: "Complétée",
    },
  ])

  // Effet pour charger les attestations depuis localStorage
  useEffect(() => {
    try {
      const storedAttestations = localStorage.getItem("employeAttestations")
      if (storedAttestations) {
        const parsedAttestations = JSON.parse(storedAttestations)
        setAttestations((prevAttestations) => {
          // Fusionner les attestations stockées avec les attestations par défaut
          // en évitant les doublons basés sur l'ID
          const existingIds = new Set(prevAttestations.map((att) => att.id))
          const newAttestations = parsedAttestations.filter((att: Attestation) => !existingIds.has(att.id))
          return [...newAttestations, ...prevAttestations]
        })
      }
    } catch (error) {
      console.error("Erreur lors du chargement des attestations:", error)
    }
  }, [])

  // Calculer les statistiques
  const totalAttestations = attestations.length
  const enAttente = attestations.filter((att) => att.statut === "En attente").length
  const completees = attestations.filter((att) => att.statut === "Complétée").length

  // Récupérer les attestations récentes (max 3)
  const recentAttestations = [...attestations]
    .sort((a, b) => {
      return (
        new Date(b.date.split("/").reverse().join("-")).getTime() -
        new Date(a.date.split("/").reverse().join("-")).getTime()
      )
    })
    .slice(0, 3)

  // Données pour les graphiques
  const attestationsByMonth = [
    { name: "Jan", attestations: 1 },
    { name: "Fév", attestations: 0 },
    { name: "Mar", attestations: 2 },
    { name: "Avr", attestations: 0 },
    { name: "Mai", attestations: 1 },
    { name: "Juin", attestations: 0 },
    { name: "Juil", attestations: 1 },
    { name: "Août", attestations: 0 },
    { name: "Sep", attestations: 1 },
    { name: "Oct", attestations: 0 },
    { name: "Nov", attestations: 1 },
    { name: "Déc", attestations: 0 },
  ]

  const attestationsByStatus = [
    { name: "Complétées", value: completees },
    { name: "En attente", value: enAttente },
  ]

  return (
    <DashboardLayout role="employe" user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Tableau de bord</h1>
          <Button asChild>
            <Link href="/employe/attestations/new">
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle demande
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total des attestations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAttestations}</div>
              <p className="text-xs text-muted-foreground">Depuis votre inscription</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">En attente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enAttente}</div>
              <p className="text-xs text-muted-foreground">Demandes en cours de traitement</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Complétées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completees}</div>
              <p className="text-xs text-muted-foreground">Demandes traitées</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <EnhancedChartContainer
            title="Mes attestations par mois"
            type="bar"
            data={attestationsByMonth}
            dataKeys={["attestations"]}
            showGrid={true}
            showLegend={false}
            showTooltip={true}
          />
          <EnhancedChartContainer
            title="Statut de mes attestations"
            type="pie"
            data={attestationsByStatus}
            dataKeys={["value"]}
            showLegend={true}
            showTooltip={true}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Mes attestations récentes</h2>
            <Button variant="outline" asChild>
              <Link href="/employe/attestations">
                <FileText className="mr-2 h-4 w-4" />
                Voir toutes
              </Link>
            </Button>
          </div>
          <AttestationList attestations={recentAttestations} />
        </div>
      </div>
    </DashboardLayout>
  )
}
