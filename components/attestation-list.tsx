import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, FileText } from "lucide-react"

interface Attestation {
  id: string
  date: string
  categorie: string
  motif: string
  statut: string
}

interface AttestationListProps {
  attestations: Attestation[]
}

export function AttestationList({ attestations }: AttestationListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Référence</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Motif</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attestations.map((attestation) => (
            <TableRow key={attestation.id}>
              <TableCell className="font-medium">{attestation.id}</TableCell>
              <TableCell>{attestation.date}</TableCell>
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
                  {attestation.statut === "Complétée" && (
                    <Button size="icon" variant="outline">
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">Télécharger</span>
                    </Button>
                  )}
                  <Button size="icon" variant="outline">
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copier la référence</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
