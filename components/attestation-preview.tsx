"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { FileText, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import AttestationTemplateFr from "./attestation-template-fr"
import AttestationTemplateAr from "./attestation-template-ar"

interface AttestationPreviewProps {
  attestation: any
}

export function AttestationPreview({ attestation }: AttestationPreviewProps) {
  const router = useRouter()
  const [showGrade, setShowGrade] = useState(false)
  const [showFonction, setShowFonction] = useState(false)

  const handlePrint = () => {
    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    // Déterminer quel modèle utiliser en fonction des options sélectionnées
    let templateUrl = ""
    if (showGrade && showFonction) {
      templateUrl = "/templates/attestation-grade-fonction-fr.html"
    } else if (showGrade) {
      templateUrl = "/templates/attestation-grade-fr.html"
    } else {
      templateUrl = "/templates/attestation-simple-fr.html"
    }

    // Charger le modèle HTML
    fetch(templateUrl)
      .then((response) => response.text())
      .then((html) => {
        // Remplacer les valeurs dans le modèle
        const filledHtml = html.replace(/<span contenteditable="true">.*?<\/span>/g, (match) => {
          if (match.includes("WAHIB Abdenour") || match.includes("MEHDAOUI Fadhil")) {
            return `<span>${attestation.demandeur}</span>`
          }
          if (match.includes("15-01-1971") || match.includes("19-07-1957")) {
            return `<span>15-01-1971</span>`
          }
          if (match.includes("Belouizdad")) {
            return `<span>Alger</span>`
          }
          if (match.includes("27-12-2006") || match.includes("02-01-1982")) {
            return `<span>27-12-2006</span>`
          }
          if (match.includes("23-02-2025")) {
            const today = new Date()
            return `<span>${today.getDate().toString().padStart(2, "0")}-${(today.getMonth() + 1)
              .toString()
              .padStart(2, "0")}-${today.getFullYear()}</span>`
          }
          if (match.includes("______ / SDP / ESI / 2025")) {
            return `<span>${attestation.id} / SDP / ESI / 2025</span>`
          }
          return match
        })

        // Écrire le HTML dans la nouvelle fenêtre
        printWindow.document.open()
        printWindow.document.write(filledHtml)
        printWindow.document.close()

        // Imprimer après le chargement complet
        printWindow.onload = () => {
          setTimeout(() => {
            printWindow.print()
          }, 500)
        }
      })
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
        <div className="flex items-center gap-4">
          <Button onClick={handlePrint} className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Imprimer l&apos;attestation
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="showGrade"
                checked={showGrade}
                onCheckedChange={(checked) => {
                  const isChecked = checked === true
                  setShowGrade(isChecked)
                  if (!isChecked) {
                    setShowFonction(false)
                  }
                }}
              />
              <Label htmlFor="showGrade">Grade</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="showFonction"
                checked={showFonction}
                disabled={!showGrade}
                onCheckedChange={(checked) => setShowFonction(checked === true)}
              />
              <Label htmlFor="showFonction">Fonction</Label>
            </div>
          </div>

          <Tabs defaultValue="fr" className="w-full">
            <TabsList>
              <TabsTrigger value="fr">Français</TabsTrigger>
              <TabsTrigger value="ar">Arabe</TabsTrigger>
            </TabsList>
            <TabsContent value="fr" className="mt-0 attestation-template-container">
              <AttestationTemplateFr
                attestation={{
                  ...attestation,
                  employe: attestation.demandeur,
                  dateNaissance: "15-01-1971",
                  lieuNaissance: "Alger",
                  grade: "Maître Assistant Classe A",
                  fonction: "Enseignant Chercheur",
                  dateEmbauche: "27-12-2006",
                }}
                showGrade={showGrade}
                showFonction={showFonction}
              />
            </TabsContent>
            <TabsContent value="ar" className="mt-0 attestation-template-container">
              <AttestationTemplateAr
                attestation={{
                  ...attestation,
                  employe: attestation.demandeur,
                  dateNaissance: "15-01-1971",
                  lieuNaissance: "الجزائر",
                  grade: "أستاذ مساعد قسم أ",
                  fonction: "أستاذ باحث",
                  dateEmbauche: "27-12-2006",
                }}
                showGrade={showGrade}
                showFonction={showFonction}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
