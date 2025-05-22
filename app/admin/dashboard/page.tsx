"use client"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Settings, Users } from "lucide-react"
import Link from "next/link"
import { StatCard } from "@/components/stat-card"
import { EnhancedChartContainer } from "@/components/enhanced-chart-container"
import { UserList } from "@/components/user-list"

export default function AdminDashboard() {
  // Données simulées pour un admin
  const user = {
    name: "Admin Système",
    email: "admin@esi.dz",
    role: "admin",
  }

  const users = [
    {
      id: 1,
      name: "Ahmed Benali",
      email: "employee@esi.dz",
      role: "Employé",
      department: "Département Systèmes d'Information",
      status: "Actif",
    },
    {
      id: 2,
      name: "Samira Hadjri",
      email: "hr@esi.dz",
      role: "RH",
      department: "Ressources Humaines",
      status: "Actif",
    },
    {
      id: 3,
      name: "Fatima Zerrouki",
      email: "sg@esi.dz",
      role: "SG",
      department: "Secrétariat Général",
      status: "Actif",
    },
  ]

  // Données pour les graphiques
  const activityData = [
    { name: "Jan", attestations: 12, missions: 8, users: 2 },
    { name: "Fév", attestations: 19, missions: 10, users: 3 },
    { name: "Mar", attestations: 15, missions: 12, users: 1 },
    { name: "Avr", attestations: 22, missions: 15, users: 4 },
    { name: "Mai", attestations: 18, missions: 9, users: 2 },
    { name: "Juin", attestations: 25, missions: 14, users: 5 },
    { name: "Juil", attestations: 20, missions: 11, users: 3 },
    { name: "Août", attestations: 17, missions: 8, users: 2 },
    { name: "Sep", attestations: 24, missions: 13, users: 4 },
    { name: "Oct", attestations: 28, missions: 16, users: 6 },
    { name: "Nov", attestations: 23, missions: 12, users: 3 },
    { name: "Déc", attestations: 30, missions: 18, users: 5 },
  ]

  const departmentData = [
    { name: "Informatique", value: 35 },
    { name: "Réseaux", value: 25 },
    { name: "IA", value: 20 },
    { name: "Sécurité", value: 15 },
    { name: "Autres", value: 5 },
  ]

  const documentTypeData = [
    { name: "Attestations", value: 152 },
    { name: "Missions", value: 87 },
    { name: "Congés", value: 45 },
    { name: "Certificats", value: 30 },
  ]

  const userGrowthData = [
    { name: "Jan", actifs: 30, inactifs: 5, nouveaux: 3 },
    { name: "Fév", actifs: 32, inactifs: 6, nouveaux: 2 },
    { name: "Mar", actifs: 34, inactifs: 5, nouveaux: 2 },
    { name: "Avr", actifs: 36, inactifs: 4, nouveaux: 3 },
    { name: "Mai", actifs: 38, inactifs: 4, nouveaux: 2 },
    { name: "Juin", actifs: 40, inactifs: 3, nouveaux: 3 },
    { name: "Juil", actifs: 42, inactifs: 3, nouveaux: 2 },
    { name: "Août", actifs: 43, inactifs: 4, nouveaux: 1 },
    { name: "Sep", actifs: 45, inactifs: 3, nouveaux: 2 },
    { name: "Oct", actifs: 47, inactifs: 3, nouveaux: 3 },
    { name: "Nov", actifs: 49, inactifs: 2, nouveaux: 2 },
    { name: "Déc", actifs: 52, inactifs: 2, nouveaux: 3 },
  ]

  // Statistiques globales
  const stats = [
    { title: "Utilisateurs", value: "52", subtitle: "comptes actifs", color: "blue" },
    { title: "Attestations", value: "152", subtitle: "documents générés", color: "green" },
    { title: "Missions", value: "87", subtitle: "ordres créés", color: "yellow" },
    { title: "Demandes", value: "12", subtitle: "en attente", color: "red" },
  ]

  return (
    <DashboardLayout role="admin" user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Tableau de bord administrateur</h1>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/admin/settings">
                <Settings className="mr-2 h-4 w-4" />
                Paramètres
              </Link>
            </Button>
            <Button asChild>
              <Link href="/admin/users/new">
                <Users className="mr-2 h-4 w-4" />
                Nouvel utilisateur
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              subtitle={stat.subtitle}
              color={stat.color as any}
            />
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <EnhancedChartContainer
            title="Activité par mois"
            type="bar"
            data={activityData}
            dataKeys={["attestations", "missions", "users"]}
            showGrid={true}
            showLegend={true}
            showTooltip={true}
          />
          <EnhancedChartContainer
            title="Répartition par département"
            type="pie"
            data={departmentData}
            dataKeys={["value"]}
            showLegend={true}
            showTooltip={true}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <EnhancedChartContainer
            title="Types de documents"
            type="pie"
            data={documentTypeData}
            dataKeys={["value"]}
            showLegend={true}
            showTooltip={true}
          />
          <EnhancedChartContainer
            title="Évolution des utilisateurs"
            type="area"
            data={userGrowthData}
            dataKeys={["actifs", "inactifs", "nouveaux"]}
            stacked={false}
            showGrid={true}
            showLegend={true}
            showTooltip={true}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Utilisateurs récents</h2>
            <Button variant="outline" asChild>
              <Link href="/admin/users">
                <Users className="mr-2 h-4 w-4" />
                Gérer les utilisateurs
              </Link>
            </Button>
          </div>
          <UserList users={users} readOnly={true} />
        </div>
      </div>
    </DashboardLayout>
  )
}
