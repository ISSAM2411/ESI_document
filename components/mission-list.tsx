"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, FileText, Check, X, Clock, Eye } from "lucide-react"
import { MapPin } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MissionDetail } from "@/components/mission-detail"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

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

interface MissionListProps {
  missions: Mission[]
  onApprove?: (id: string) => void
  onReject?: (id: string, reason: string) => void
  onProcess?: (id: string) => void
  userRole?: string
}

export function MissionList({ missions, onApprove, onReject, onProcess, userRole = "missionnaire" }: MissionListProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [rejectReason, setRejectReason] = useState("")
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null)

  const handleReject = () => {
    if (selectedMissionId && onReject) {
      onReject(selectedMissionId, rejectReason)
      setSelectedMissionId(null)
      setRejectReason("")
    }
  }

  const handleViewDetail = (mission: Mission) => {
    setSelectedMission(mission)
    setIsDetailOpen(true)
  }

  const handleEditDocument = (id: string) => {
    if (userRole === "sg") {
      router.push(`/sg/missions/edit/${id}`)
    } else {
      // Pour les missionnaires, on simule un téléchargement
      toast({
        title: "Téléchargement",
        description: "L'ordre de mission est en cours de téléchargement.",
      })

      // Ouvrir une nouvelle fenêtre pour simuler le téléchargement
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        const mission = missions.find((m) => m.id === id)
        if (mission) {
          printWindow.document.write(`
            <!DOCTYPE html>
            <html lang="fr">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ordre de Mission - ${mission.id}</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Roboto:wght@400;700&display=swap');
                    body {
                        font-family: 'Roboto', sans-serif;
                        line-height: 1.5;
                        padding: 20mm;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 20px;
                        border-bottom: 1px solid #0056b3;
                        padding-bottom: 10px;
                    }
                    .mission-title {
                        text-align: center;
                        font-size: 18px;
                        font-weight: bold;
                        margin: 20px 0;
                        text-decoration: underline;
                    }
                    .info-row {
                        margin-bottom: 10px;
                    }
                    .info-label {
                        font-weight: bold;
                        width: 200px;
                        display: inline-block;
                    }
                    .footer {
                        margin-top: 50px;
                        text-align: center;
                        font-size: 12px;
                        border-top: 1px solid #ccc;
                        padding-top: 10px;
                    }
                    @media print {
                        body {
                            padding: 0;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>École nationale Supérieure d'Informatique</h1>
                    <p>REPUBLIQUE ALGERIENNE DEMOCRATIQUE ET POPULAIRE</p>
                    <p>MINISTERE DE L'ENSEIGNEMENT SUPERIEUR ET DE LA RECHERCHE SCIENTIFIQUE</p>
                </div>
                
                <div class="mission-title">ORDRE DE MISSION N° ${mission.id}</div>
                
                <div class="info-row">
                    <span class="info-label">Missionnaire:</span>
                    <span>${mission.missionnaire}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">Demandeur:</span>
                    <span>${mission.demandeur}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">Destination:</span>
                    <span>${mission.destination}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">Date de départ:</span>
                    <span>${mission.debut}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">Date de retour:</span>
                    <span>${mission.fin}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">Objet de la mission:</span>
                    <span>${mission.objet || ""}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">Moyen de transport:</span>
                    <span>${mission.transport || ""}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">Statut:</span>
                    <span>${mission.statut}</span>
                </div>
                
                <div class="footer">
                    ESI (Ecole nationale Supérieure d'Informatique) BP 68M, 16059, Oued Smar, Algérie<br>
                    Tél : 023.93.91.32  Fax : 023.93.91.34 ; http://www.esi.dz
                </div>
                
                <script>
                    window.onload = function() {
                        window.print();
                    }
                </script>
            </body>
            </html>
          `)
          printWindow.document.close()
        }
      }
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Référence</TableHead>
              <TableHead>Demandeur</TableHead>
              <TableHead>Missionnaire</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Début</TableHead>
              <TableHead>Fin</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {missions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  Aucune mission trouvée
                </TableCell>
              </TableRow>
            ) : (
              missions.map((mission) => (
                <TableRow key={mission.id}>
                  <TableCell className="font-medium">{mission.id}</TableCell>
                  <TableCell>{mission.demandeur}</TableCell>
                  <TableCell>{mission.missionnaire}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                      {mission.destination}
                    </div>
                  </TableCell>
                  <TableCell>{mission.debut}</TableCell>
                  <TableCell>{mission.fin}</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleViewDetail(mission)}
                        title="Voir les détails"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Voir les détails</span>
                      </Button>

                      {mission.statut === "En attente" && onProcess && (
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => onProcess(mission.id)}
                          title="Mettre en cours"
                        >
                          <Clock className="h-4 w-4" />
                          <span className="sr-only">Mettre en cours</span>
                        </Button>
                      )}

                      {(mission.statut === "En attente" || mission.statut === "En cours") && onApprove && (
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => onApprove(mission.id)}
                          className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 border-green-200"
                          title="Approuver"
                        >
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Approuver</span>
                        </Button>
                      )}

                      {(mission.statut === "En attente" || mission.statut === "En cours") && onReject && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="icon"
                              variant="outline"
                              className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border-red-200"
                              onClick={() => setSelectedMissionId(mission.id)}
                              title="Rejeter"
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Rejeter</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Rejeter l&apos;ordre de mission</DialogTitle>
                              <DialogDescription>
                                Veuillez fournir une raison pour le rejet de cet ordre de mission.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="reason">Raison du rejet</Label>
                                <Textarea
                                  id="reason"
                                  placeholder="Entrez la raison du rejet..."
                                  value={rejectReason}
                                  onChange={(e) => setRejectReason(e.target.value)}
                                  className="min-h-[100px]"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setSelectedMissionId(null)}>
                                Annuler
                              </Button>
                              <Button variant="destructive" onClick={handleReject} disabled={!rejectReason.trim()}>
                                Rejeter
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}

                      {mission.statut === "Approuvée" && (
                        <Button
                          size="icon"
                          variant="outline"
                          title={userRole === "sg" ? "Éditer l'ordre de mission" : "Télécharger l'ordre de mission"}
                          onClick={() => handleEditDocument(mission.id)}
                        >
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">
                            {userRole === "sg" ? "Éditer l'ordre de mission" : "Télécharger l'ordre de mission"}
                          </span>
                        </Button>
                      )}

                      <Button size="icon" variant="outline" title="Copier la référence">
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copier la référence</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto p-6 md:p-8">
          <DialogHeader className="sticky top-0 bg-background z-10 pb-4">
            <DialogTitle>Détails de l&apos;ordre de mission</DialogTitle>
          </DialogHeader>
          <div className="py-2">{selectedMission && <MissionDetail mission={selectedMission} />}</div>
          <DialogFooter className="sticky bottom-0 bg-background pt-4 mt-4">
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
              Fermer
            </Button>
            {selectedMission?.statut === "Approuvée" && (
              <Button onClick={() => handleEditDocument(selectedMission.id)}>
                <FileText className="mr-2 h-4 w-4" />
                {userRole === "sg" ? "Éditer l'ordre de mission" : "Télécharger l'ordre de mission"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
