"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { AttestationList } from "@/components/attestation-list"
import { dataService, type Attestation } from "@/services/data-service"

export default function EmployeAttestations() {
  // Données simulées pour un employé
  const user = {
    name: "Ahmed Benali",
    email: "ahmed.benali@esi.dz",
    role: "employe",
  }

  // État pour les attestations
  const [attestations, setAttestations] = useState<Attestation[]>([])

  // État pour la recherche
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredAttestations, setFilteredAttestations] = useState<Attestation[]>([])

  // Effet pour charger les attestations depuis le service
  useEffect(() => {
    const userAttestations = dataService.getAttestationsByEmail(user.email)
    setAttestations(userAttestations)
  }, [user.email])

  // Effet pour filtrer les attestations
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const filtered = attestations.filter(
        (attestation) =>
          attestation.id.toLowerCase().includes(query) ||
          attestation.categorie.toLowerCase().includes(query) ||
          attestation.motif.toLowerCase().includes(query),
      )
      setFilteredAttestations(filtered)
    } else {
      setFilteredAttestations(attestations)
    }
  }, [searchQuery, attestations])

  return (
    <DashboardLayout role="employe" user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Mes attestations</h1>
          <Button asChild>
            <Link href="/employe/attestations/new">
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle demande
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-4">
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
        </div>

        <AttestationList attestations={filteredAttestations} />
      </div>
    </DashboardLayout>
  )
}
