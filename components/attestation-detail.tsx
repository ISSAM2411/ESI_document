"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import { useRouter } from "next/navigation"

interface Attestation {
  id: string
  date: string
  demandeur: string
  matricule: string
  categorie: string
  motif: string
  statut: string
}

interface AttestationDetailProps {
  attestation: Attestation
}

export function AttestationDetail({ attestation }: AttestationDetailProps) {
  const router = useRouter()

  // Données simulées supplémentaires pour l'attestation
  const detailsSupplementaires = {
    dateEmbauche: "15/09/2010",
    fonction: "Enseignant-Chercheur",
    departement: "Département Systèmes d'Information",
    commentaires: "Attestation demandée pour une démarche administrative auprès de la banque.",
    dateCreation: attestation.date,
    dateTraitement: attestation.statut !== "En attente" ? "22/03/2025" : "-",
    traitePar: attestation.statut !== "En attente" ? "Samira Hadjri" : "-",
  }

  const handleGenerateAttestation = () => {
    router.push(`/rh/attestations/edit/${attestation.id}`)
  }

  return (
    <div className="space-y-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations de la demande</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium text-muted-foreground">Référence</div>
              <div>{attestation.id}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium text-muted-foreground">Date de demande</div>
              <div>{attestation.date}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium text-muted-foreground">Statut</div>
              <div>
                <Badge
                  variant={
                    attestation.statut === "Complétée"
                      ? "default"
                      : attestation.statut === "En attente"
                        ? "outline"
                        : attestation.statut === "Rejetée"
                          ? "destructive"
                          : "secondary"
                  }
                >
                  {attestation.statut}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium text-muted-foreground">Catégorie</div>
              <div>{attestation.categorie}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium text-muted-foreground">Motif</div>
              <div>{attestation.motif}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informations de l&apos;employé</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium text-muted-foreground">Nom</div>
              <div>{attestation.demandeur}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium text-muted-foreground">Matricule</div>
              <div>{attestation.matricule}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium text-muted-foreground">Fonction</div>
              <div>{detailsSupplementaires.fonction}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium text-muted-foreground">Département</div>
              <div>{detailsSupplementaires.departement}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium text-muted-foreground">Date d&apos;embauche</div>
              <div>{detailsSupplementaires.dateEmbauche}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Détails supplémentaires</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Commentaires</h3>
              <p className="text-sm">{detailsSupplementaires.commentaires}</p>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium text-muted-foreground">Date de création</div>
                <div>{detailsSupplementaires.dateCreation}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium text-muted-foreground">Date de traitement</div>
                <div>{detailsSupplementaires.dateTraitement}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium text-muted-foreground">Traité par</div>
                <div>{detailsSupplementaires.traitePar}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {attestation.statut === "Complétée" && (
        <div className="flex justify-end">
          <Button onClick={handleGenerateAttestation} className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Générer l&apos;attestation
          </Button>
        </div>
      )}
    </div>
  )
}
