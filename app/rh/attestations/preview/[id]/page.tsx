"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { AttestationPreview } from "@/components/attestation-preview"
import { LoadingScreen } from "@/components/loading-screen"

// Données simulées pour les attestations
const attestationsData = [
  {
    id: "ATT-2025-001",
    date: "15/03/2025",
    demandeur: "Ahmed Benali",
    matricule: "EMP-2010-042",
    categorie: "Attestation de travail",
    motif: "Démarche administrative",
    statut: "Complétée",
  },
  {
    id: "ATT-2025-002",
    date: "18/03/2025",
    demandeur: "Samira Hadjri",
    matricule: "EMP-2015-103",
    categorie: "Attestation de travail",
    motif: "Dossier bancaire",
    statut: "En cours",
  },
  {
    id: "ATT-2025-003",
    date: "20/03/2025",
    demandeur: "Karim Mezouar",
    matricule: "EMP-2018-027",
    categorie: "Attestation de travail",
    motif: "Visa",
    statut: "En attente",
  },
]

export default function AttestationPreviewPage() {
  const params = useParams()
  const [attestation, setAttestation] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simuler un chargement depuis une API
    setTimeout(() => {
      const foundAttestation = attestationsData.find((a) => a.id === params.id)
      setAttestation(foundAttestation || null)
      setLoading(false)
    }, 1000)
  }, [params.id])

  if (loading) {
    return <LoadingScreen />
  }

  if (!attestation) {
    return <div className="container mx-auto py-6">Attestation non trouvée</div>
  }

  return <AttestationPreview attestation={attestation} />
}
