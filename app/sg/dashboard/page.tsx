"use client"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Briefcase, Plus } from "lucide-react"
import Link from "next/link"
import { MissionList } from "@/components/mission-list"
import { StatCard } from "@/components/stat-card"
import { EnhancedChartContainer } from "@/components/enhanced-chart-container"

export default function SGDashboard() {
  // Données simulées pour un SG
  const user = {
    name: "Fatima Zerrouki",
    email: "sg@esi.dz",
    role: "sg",
  }

  const missions = [
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
  ]

  // Données pour les graphiques
  const missionsByMonth = [
    { name: "Jan", approuvées: 5, enCours: 2, enAttente: 1, rejetées: 0 },
    { name: "Fév", approuvées: 6, enCours: 1, enAttente: 2, rejetées: 1 },
    { name: "Mar", approuvées: 7, enCours: 2, enAttente: 1, rejetées: 0 },
    { name: "Avr", approuvées: 5, enCours: 3, enAttente: 2, rejetées: 1 },
    { name: "Mai", approuvées: 8, enCours: 2, enAttente: 1, rejetées: 0 },
    { name: "Juin", approuvées: 9, enCours: 1, enAttente: 2, rejetées: 1 },
    { name: "Juil", approuvées: 7, enCours: 2, enAttente: 1, rejetées: 0 },
    { name: "Août", approuvées: 4, enCours: 1, enAttente: 1, rejetées: 0 },
    { name: "Sep", approuvées: 6, enCours: 2, enAttente: 2, rejetées: 1 },
    { name: "Oct", approuvées: 8, enCours: 3, enAttente: 1, rejetées: 0 },
    { name: "Nov", approuvées: 7, enCours: 2, enAttente: 2, rejetées: 1 },
    { name: "Déc", approuvées: 10, enCours: 1, enAttente: 2, rejetées: 0 },
  ]

  const missionsByDepartment = [
    { name: "Systèmes d'Information", value: 25 },
    { name: "Réseaux", value: 20 },
    { name: "Intelligence Artificielle", value: 15 },
    { name: "Sécurité", value: 12 },
    { name: "Recherche", value: 10 },
    { name: "Autres", value: 5 },
  ]

  const missionsByDestination = [
    { name: "Alger", value: 30 },
    { name: "Oran", value: 20 },
    { name: "Constantine", value: 15 },
    { name: "Annaba", value: 12 },
    { name: "Autres villes", value: 10 },
  ]

  const missionsTrend = [
    { name: "2022-T1", missions: 15, budget: 150000 },
    { name: "2022-T2", missions: 18, budget: 180000 },
    { name: "2022-T3", missions: 16, budget: 160000 },
    { name: "2022-T4", missions: 20, budget: 200000 },
    { name: "2023-T1", missions: 19, budget: 190000 },
    { name: "2023-T2", missions: 22, budget: 220000 },
    { name: "2023-T3", missions: 25, budget: 250000 },
    { name: "2023-T4", missions: 28, budget: 280000 },
    { name: "2024-T1", missions: 26, budget: 260000 },
    { name: "2024-T2", missions: 30, budget: 300000 },
    { name: "2024-T3", missions: 32, budget: 320000 },
    { name: "2024-T4", missions: 35, budget: 350000 },
  ]

  return (
    <DashboardLayout role="sg" user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Tableau de bord - Missions</h1>
          <Button asChild>
            <Link href="/sg/missions/new">
              <Plus className="mr-2 h-4 w-4" />
              Créer un ordre de mission
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <StatCard title="Total" value="87" subtitle="missions" color="blue" />
          <StatCard title="En attente" value="15" subtitle="missions" color="yellow" />
          <StatCard title="En cours" value="18" subtitle="missions" color="blue" />
          <StatCard title="Approuvées" value="49" subtitle="missions" color="green" />
          <StatCard title="Rejetées" value="5" subtitle="missions" color="red" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <EnhancedChartContainer
            title="Missions par mois"
            type="bar"
            data={missionsByMonth}
            dataKeys={["approuvées", "enCours", "enAttente", "rejetées"]}
            stacked={true}
            showGrid={true}
            showLegend={true}
            showTooltip={true}
          />
          <EnhancedChartContainer
            title="Missions par département"
            type="pie"
            data={missionsByDepartment}
            dataKeys={["value"]}
            showLegend={true}
            showTooltip={true}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <EnhancedChartContainer
            title="Missions par destination"
            type="pie"
            data={missionsByDestination}
            dataKeys={["value"]}
            showLegend={true}
            showTooltip={true}
          />
          <EnhancedChartContainer
            title="Tendance des missions et budget"
            type="composed"
            data={missionsTrend}
            dataKeys={["missions", "budget"]}
            showGrid={true}
            showLegend={true}
            showTooltip={true}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Missions récentes</h2>
            <Button variant="outline" asChild>
              <Link href="/sg/missions">
                <Briefcase className="mr-2 h-4 w-4" />
                Voir toutes
              </Link>
            </Button>
          </div>
          <MissionList missions={missions} />
        </div>
      </div>
    </DashboardLayout>
  )
}
