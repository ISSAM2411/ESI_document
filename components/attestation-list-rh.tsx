"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, Copy, FileText, X, Clock, Eye } from "lucide-react"
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
import { AttestationDetail } from "@/components/attestation-detail"

interface Attestation {
  id: string
  date: string
  demandeur: string
  matricule: string
  categorie: string
  motif: string
  statut: string
}

interface AttestationListRHProps {
  attestations: Attestation[]
  onApprove: (id: string) => void
  onReject: (id: string, reason: string) => void
  onProcess: (id: string) => void
}

export function AttestationListRH({ attestations, onApprove, onReject, onProcess }: AttestationListRHProps) {
  const router = useRouter()
  const [rejectReason, setRejectReason] = useState("")
  const [selectedAttestationId, setSelectedAttestationId] = useState<string | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [selectedAttestation, setSelectedAttestation] = useState<Attestation | null>(null)

  const handleReject = () => {
    if (selectedAttestationId) {
      onReject(selectedAttestationId, rejectReason)
      setSelectedAttestationId(null)
      setRejectReason("")
    }
  }

  const handleViewDetail = (attestation: Attestation) => {
    setSelectedAttestation(attestation)
    setIsDetailOpen(true)
  }

  const handleDownload = (attestation: Attestation) => {
    router.push(`/rh/attestations/edit/${attestation.id}`)
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Référence</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Demandeur</TableHead>
              <TableHead>Matricule</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Motif</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attestations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  Aucune attestation trouvée
                </TableCell>
              </TableRow>
            ) : (
              attestations.map((attestation) => (
                <TableRow key={attestation.id}>
                  <TableCell className="font-medium">{attestation.id}</TableCell>
                  <TableCell>{attestation.date}</TableCell>
                  <TableCell>{attestation.demandeur}</TableCell>
                  <TableCell>{attestation.matricule}</TableCell>
                  <TableCell>{attestation.categorie}</TableCell>
                  <TableCell>{attestation.motif}</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleViewDetail(attestation)}
                        title="Voir les détails"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Voir les détails</span>
                      </Button>

                      {attestation.statut === "En attente" && (
                        <>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => onProcess(attestation.id)}
                            title="Mettre en cours"
                          >
                            <Clock className="h-4 w-4" />
                            <span className="sr-only">Mettre en cours</span>
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => onApprove(attestation.id)}
                            className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 border-green-200"
                            title="Approuver"
                          >
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Approuver</span>
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="icon"
                                variant="outline"
                                className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border-red-200"
                                onClick={() => setSelectedAttestationId(attestation.id)}
                                title="Rejeter"
                              >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Rejeter</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Rejeter l&apos;attestation</DialogTitle>
                                <DialogDescription>
                                  Veuillez fournir une raison pour le rejet de cette attestation.
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
                                <Button variant="outline" onClick={() => setSelectedAttestationId(null)}>
                                  Annuler
                                </Button>
                                <Button variant="destructive" onClick={handleReject} disabled={!rejectReason.trim()}>
                                  Rejeter
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </>
                      )}

                      {attestation.statut === "En cours" && (
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => onApprove(attestation.id)}
                          className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 border-green-200"
                          title="Approuver"
                        >
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Approuver</span>
                        </Button>
                      )}

                      {attestation.statut === "Complétée" && (
                        <Button
                          size="icon"
                          variant="outline"
                          title="Télécharger"
                          onClick={() => handleDownload(attestation)}
                        >
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">Télécharger</span>
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
            <DialogTitle>Détails de l&apos;attestation</DialogTitle>
          </DialogHeader>
          <div className="py-2">{selectedAttestation && <AttestationDetail attestation={selectedAttestation} />}</div>
          <DialogFooter className="sticky bottom-0 bg-background pt-4 mt-4">
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
