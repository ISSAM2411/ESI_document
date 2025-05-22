import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

interface Mission {
  id: string
  demandeur: string
  missionnaire: string
  destination: string
  debut: string
  fin: string
  statut: string
  objet?: string
  transport?: string
  avance?: string
  commentaires?: string
  dateCreation?: string
  creePar?: string
}

interface MissionDetailProps {
  mission: Mission
}

export function MissionDetail({ mission }: MissionDetailProps) {
  // Données simulées supplémentaires pour la mission
  const detailsSupplementaires = {
    fonction: "Enseignant-Chercheur",
    email: "missionnaire@esi.dz",
    telephone: "0555123456",
    dateTraitement: mission.statut !== "En attente" ? "22/04/2025" : "-",
    traitePar: mission.statut !== "En attente" ? "Fatima Zerrouki" : "-",
  }

  return (
    <div className="space-y-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations de la mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium text-muted-foreground">Référence</div>
              <div>{mission.id}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium text-muted-foreground">Statut</div>
              <div>
                <Badge
                  variant={
                    mission.statut === "Approuvée"
                      ? "default"
                      : mission.statut === "En attente"
                        ? "outline"
                        : mission.statut === "Rejetée"
                          ? "destructive"
                          : "secondary"
                  }
                >
                  {mission.statut}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium text-muted-foreground">Demandeur</div>
              <div>{mission.demandeur}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium text-muted-foreground">Destination</div>
              <div className="flex items-center">
                <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                {mission.destination}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium text-muted-foreground">Date de début</div>
              <div>{mission.debut}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium text-muted-foreground">Date de fin</div>
              <div>{mission.fin}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium text-muted-foreground">Type de transport</div>
              <div>{mission.transport || "Non spécifié"}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium text-muted-foreground">Avance sur frais</div>
              <div>{mission.avance ? `${mission.avance} DA` : "Non spécifié"}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informations du missionnaire</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium text-muted-foreground">Nom</div>
              <div>{mission.missionnaire}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium text-muted-foreground">Fonction</div>
              <div>{detailsSupplementaires.fonction}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium text-muted-foreground">Email</div>
              <div>{detailsSupplementaires.email}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium text-muted-foreground">Téléphone</div>
              <div>{detailsSupplementaires.telephone}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium text-muted-foreground">Département</div>
              <div>{mission.demandeur}</div>
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
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Objet de la mission</h3>
              <p className="text-sm">{mission.objet || "Non spécifié"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Commentaires</h3>
              <p className="text-sm">{mission.commentaires || "Aucun commentaire"}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium text-muted-foreground">Date de création</div>
                <div>{mission.dateCreation || "20/04/2025"}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium text-muted-foreground">Créé par</div>
                <div>{mission.creePar || "Fatima Zerrouki"}</div>
              </div>
            </div>
            <div className="space-y-4">
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
    </div>
  )
}
