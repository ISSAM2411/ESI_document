"use client"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { MissionList } from "@/components/mission-list"
import { EnhancedChartContainer } from "@/components/enhanced-chart-container"
import { StatCard } from "@/components/stat-card"

export default function MissionnairesDashboard() {
  // Données simulées pour un missionnaire
  const user = {
    name: "Karim Messaoudi",
    email: "missionary@esi.dz",
    role: "missionnaire",
  }

  const missions = [
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
      id: "OM-2025-001",
      demandeur: "Département Recherche et Innovation",
      missionnaire: "Karim Messaoudi",
      destination: "Oran - Université des Sciences et de la Technologie",
      debut: "12/04/2025",
      fin: "15/04/2025",
      statut: "Approuvée",
    },
  ]

  // Données pour les graphiques
  const missionsByMonth = [
    { name: "Jan", missions: 0 },
    { name: "Fév", missions: 1 },
    { name: "Mar", missions: 0 },
    { name: "Avr", missions: 2 },
    { name: "Mai", missions: 1 },
    { name: "Juin", missions: 0 },
    { name: "Juil", missions: 1 },
    { name: "Août", missions: 0 },
    { name: "Sep", missions: 1 },
    { name: "Oct", missions: 0 },
    { name: "Nov", missions: 1 },
    { name: "Déc", missions: 0 },
  ]

  const missionsByStatus = [
    { name: "Approuvées", value: 5 },
    { name: "En cours", value: 2 },
    { name: "Terminées", value: 2 },
    { name: "En attente", value: 0 },
  ]

  const missionsByDestination = [
    { name: "Alger", value: 3 },
    { name: "Oran", value: 2 },
    { name: "Constantine", value: 1 },
    { name: "Annaba", value: 3 },
  ]

  return (
    <DashboardLayout role="missionnaire" user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Mes missions</h1>
          <Button asChild>
            <Link href="/missionnaire/missions/new">
              <Plus className="mr-2 h-4 w-4" />
              Demander une mission
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <StatCard title="Total" value="7" subtitle="missions" color="blue" />
          <StatCard title="À venir" value="2" subtitle="missions" color="yellow" />
          <StatCard title="Terminées" value="2" subtitle="missions" color="green" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <EnhancedChartContainer
            title="Mes missions par mois"
            type="bar"
            data={missionsByMonth}
            dataKeys={["missions"]}
            showGrid={true}
            showLegend={false}
            showTooltip={true}
          />
          <EnhancedChartContainer
            title="Statut de mes missions"
            type="pie"
            data={missionsByStatus}
            dataKeys={["value"]}
            showLegend={true}
            showTooltip={true}
          />
        </div>

        <EnhancedChartContainer
          title="Mes destinations"
          type="pie"
          data={missionsByDestination}
          dataKeys={["value"]}
          showLegend={true}
          showTooltip={true}
        />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Mes ordres de mission</h2>
          <div className="flex space-x-2 mb-4">
            <Button variant="outline" className="text-sm">
              Toutes
            </Button>
            <Button variant="outline" className="text-sm">
              À venir
            </Button>
            <Button variant="outline" className="text-sm">
              Terminées
            </Button>
          </div>
          <MissionList missions={missions} />
        </div>
      </div>
    </DashboardLayout>
  )
}
