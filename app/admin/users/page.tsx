"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { UserList } from "@/components/user-list"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

// Types
interface User {
  id: number
  name: string
  email: string
  role: string
  department: string
  status: string
}

export default function AdminUsers() {
  // Données simulées pour un admin
  const admin = {
    name: "Admin Système",
    email: "admin@esi.dz",
    role: "admin",
  }

  // État pour les utilisateurs
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Ahmed Benali",
      email: "ahmed.benali@esi.dz",
      role: "Employé",
      department: "Département Systèmes d'Information",
      status: "Actif",
    },
    {
      id: 2,
      name: "Samira Hadjri",
      email: "samira.hadjri@esi.dz",
      role: "RH",
      department: "Ressources Humaines",
      status: "Actif",
    },
    {
      id: 3,
      name: "Fatima Zerrouki",
      email: "fatima.zerrouki@esi.dz",
      role: "SG",
      department: "Secrétariat Général",
      status: "Actif",
    },
    {
      id: 4,
      name: "Karim Messaoudi",
      email: "karim.messaoudi@esi.dz",
      role: "Missionnaire",
      department: "Département Recherche et Innovation",
      status: "Actif",
    },
    {
      id: 5,
      name: "Leila Benmansour",
      email: "leila.benmansour@esi.dz",
      role: "Missionnaire",
      department: "Département Intelligence Artificielle",
      status: "Actif",
    },
    {
      id: 6,
      name: "Yacine Bouaziz",
      email: "yacine.bouaziz@esi.dz",
      role: "Missionnaire",
      department: "Département Réseaux",
      status: "Actif",
    },
    {
      id: 7,
      name: "Nadir Hamidi",
      email: "nadir.hamidi@esi.dz",
      role: "Missionnaire",
      department: "Département Génie Logiciel",
      status: "Actif",
    },
  ])

  // État pour les filtres
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users)

  // Toast et router
  const { toast } = useToast()
  const router = useRouter()

  // Effet pour filtrer les utilisateurs
  useEffect(() => {
    let result = [...users]

    // Filtre par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.department.toLowerCase().includes(query),
      )
    }

    // Filtre par rôle
    if (roleFilter !== "all") {
      result = result.filter((user) => user.role.toLowerCase() === roleFilter.toLowerCase())
    }

    // Filtre par département
    if (departmentFilter !== "all") {
      const deptMap: Record<string, string> = {
        si: "Systèmes d'Information",
        ri: "Recherche et Innovation",
        ia: "Intelligence Artificielle",
        reseaux: "Réseaux",
        gl: "Génie Logiciel",
        rh: "Ressources Humaines",
        sg: "Secrétariat Général",
      }
      result = result.filter((user) => user.department.includes(deptMap[departmentFilter] || ""))
    }

    setFilteredUsers(result)
  }, [searchQuery, roleFilter, departmentFilter, users])

  // Fonction pour supprimer un utilisateur
  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id))
    toast({
      title: "Utilisateur supprimé",
      description: "L'utilisateur a été supprimé avec succès.",
    })
  }

  // Fonction pour modifier un utilisateur
  const handleEditUser = (id: number) => {
    // Rediriger vers la page d'édition avec l'ID de l'utilisateur
    router.push(`/admin/users/edit/${id}`)
  }

  // Vérifier si un nouvel utilisateur a été ajouté via localStorage
  useEffect(() => {
    const newUser = localStorage.getItem("newUser")
    if (newUser) {
      const parsedUser = JSON.parse(newUser)
      // Générer un ID unique
      const newId = Math.max(...users.map((u) => u.id)) + 1
      const userToAdd = {
        ...parsedUser,
        id: newId,
      }
      setUsers((prevUsers) => [...prevUsers, userToAdd])
      localStorage.removeItem("newUser")
      toast({
        title: "Utilisateur ajouté",
        description: "Le nouvel utilisateur a été ajouté avec succès.",
      })
    }
  }, [toast, users])

  return (
    <DashboardLayout role="admin" user={admin}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Gestion des utilisateurs</h1>
          <Button asChild>
            <Link href="/admin/users/new">
              <Plus className="mr-2 h-4 w-4" />
              Nouvel utilisateur
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher un utilisateur..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Rôle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les rôles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="rh">RH</SelectItem>
              <SelectItem value="employé">Employé</SelectItem>
              <SelectItem value="sg">SG</SelectItem>
              <SelectItem value="assistant sg">Assistant SG</SelectItem>
              <SelectItem value="missionnaire">Missionnaire</SelectItem>
            </SelectContent>
          </Select>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Département" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les départements</SelectItem>
              <SelectItem value="si">Systèmes d'Information</SelectItem>
              <SelectItem value="ri">Recherche et Innovation</SelectItem>
              <SelectItem value="ia">Intelligence Artificielle</SelectItem>
              <SelectItem value="reseaux">Réseaux</SelectItem>
              <SelectItem value="gl">Génie Logiciel</SelectItem>
              <SelectItem value="rh">Ressources Humaines</SelectItem>
              <SelectItem value="sg">Secrétariat Général</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <UserList users={filteredUsers} onDelete={handleDeleteUser} onEdit={handleEditUser} />
      </div>
    </DashboardLayout>
  )
}
