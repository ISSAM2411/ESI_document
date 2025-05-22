"use client"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { FileText, Plus } from "lucide-react"
import Link from "next/link"
import { AttestationList } from "@/components/attestation-list"
import { StatCard } from "@/components/stat-card"
import { EnhancedChartContainer } from "@/components/enhanced-chart-container"

export default function RHDashboard() {
  // Données simulées pour un RH
  const user = {
    name: "Samira Hadjri",
    email: "hr@esi.dz",
    role: "rh",
  }

  const attestations = [
    {
      id: "ATT-2025-009",
      date: "20/03/2025",
      categorie: "Employé actif",
      motif: "Demande de visa",
      statut: "En attente",
    },
    {
      id: "ATT-2025-001",
      date: "18/03/2025",
      categorie: "Employé actif",
      motif: "Démarche administrative",
      statut: "En attente",
    },
    {
      id: "ATT-2025-002",
      date: "17/03/2025",
      categorie: "Employé actif",
      motif: "Démarche bancaire",
      statut: "En attente",
    },
  ]

  // Données pour les graphiques
  const attestationsByMonth = [
    { name: "Jan", complétées: 8, enAttente: 3, rejetées: 1 },
    { name: "Fév", complétées: 10, enAttente: 4, rejetées: 2 },
    { name: "Mar", complétées: 12, enAttente: 5, rejetées: 1 },
    { name: "Avr", complétées: 9, enAttente: 3, rejetées: 2 },
    { name: "Mai", complétées: 11, enAttente: 4, rejetées: 1 },
    { name: "Juin", complétées: 14, enAttente: 6, rejetées: 2 },
    { name: "Juil", complétées: 13, enAttente: 5, rejetées: 1 },
    { name: "Août", complétées: 10, enAttente: 4, rejetées: 1 },
    { name: "Sep", complétées: 12, enAttente: 5, rejetées: 2 },
    { name: "Oct", complétées: 15, enAttente: 6, rejetées: 1 },
    { name: "Nov", complétées: 14, enAttente: 5, rejetées: 2 },
    { name: "Déc", complétées: 16, enAttente: 7, rejetées: 1 },
  ]

  const attestationsByCategory = [
    { name: "Employé actif", value: 85 },
    { name: "Congé", value: 35 },
    { name: "Salaire", value: 25 },
    { name: "Autre", value: 7 },
  ]

  const attestationsByReason = [
    { name: "Démarche administrative", value: 45 },
    { name: "Démarche bancaire", value: 30 },
    { name: "Demande de visa", value: 25 },
    { name: "Autre", value: 52 },
  ]

  const attestationsTrend = [
    { name: "2022-T1", attestations: 25 },
    { name: "2022-T2", attestations: 30 },
    { name: "2022-T3", attestations: 28 },
    { name: "2022-T4", attestations: 35 },
    { name: "2023-T1", attestations: 32 },
    { name: "2023-T2", attestations: 38 },
    { name: "2023-T3", attestations: 42 },
    { name: "2023-T4", attestations: 48 },
    { name: "2024-T1", attestations: 45 },
    { name: "2024-T2", attestations: 52 },
    { name: "2024-T3", attestations: 58 },
    { name: "2024-T4", attestations: 65 },
  ]

  return (
    <DashboardLayout role="rh" user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Tableau de bord - Attestations</h1>
          <Button asChild>
            <Link href="/rh/attestations/new">
              <Plus className="mr-2 h-4 w-4" />
              Créer une nouvelle attestation
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <StatCard title="Total" value="152" subtitle="attestations" color="blue" />
          <StatCard title="En attente" value="15" subtitle="attestations" color="blue" />
          <StatCard title="En cours" value="8" subtitle="attestations" color="blue" />
          <StatCard title="Complétées" value="124" subtitle="attestations" color="blue" />
          <StatCard title="Rejetées" value="5" subtitle="attestations" color="blue" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <EnhancedChartContainer
            title="Attestations par mois"
            type="bar"
            data={attestationsByMonth}
            dataKeys={["complétées", "enAttente", "rejetées"]}
            stacked={true}
            showGrid={true}
            showLegend={true}
            showTooltip={true}
          />
          <EnhancedChartContainer
            title="Attestations par catégorie"
            type="pie"
            data={attestationsByCategory}
            dataKeys={["value"]}
            showLegend={true}
            showTooltip={true}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <EnhancedChartContainer
            title="Attestations par motif"
            type="pie"
            data={attestationsByReason}
            dataKeys={["value"]}
            showLegend={true}
            showTooltip={true}
          />
          <EnhancedChartContainer
            title="Tendance des attestations"
            type="line"
            data={attestationsTrend}
            dataKeys={["attestations"]}
            showGrid={true}
            showLegend={true}
            showTooltip={true}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Demandes récentes</h2>
            <Button variant="outline" asChild>
              <Link href="/rh/attestations">
                <FileText className="mr-2 h-4 w-4" />
                Voir toutes
              </Link>
            </Button>
          </div>
          <AttestationList attestations={attestations} />
        </div>
      </div>
    </DashboardLayout>
  )
}
