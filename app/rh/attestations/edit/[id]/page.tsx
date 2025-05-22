"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { FileText, ArrowLeft } from "lucide-react"
import { LoadingScreen } from "@/components/loading-screen"
import AttestationTemplateFr from "@/components/attestation-template-fr"
import AttestationTemplateAr from "@/components/attestation-template-ar"

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
    dateNaissance: "15-01-1971",
    lieuNaissance: "Alger",
    lieuNaissanceAr: "الجزائر",
    grade: "Maître Assistant Classe A",
    gradeAr: "أستاذ مساعد قسم أ",
    fonction: "Enseignant Chercheur",
    fonctionAr: "أستاذ باحث",
    dateEmbauche: "27-12-2006",
  },
  {
    id: "ATT-2025-002",
    date: "18/03/2025",
    demandeur: "Samira Hadjri",
    matricule: "EMP-2015-103",
    categorie: "Attestation de travail",
    motif: "Dossier bancaire",
    statut: "En cours",
    dateNaissance: "05-06-1985",
    lieuNaissance: "Oran",
    lieuNaissanceAr: "وهران",
    grade: "Administrateur Principal",
    gradeAr: "متصرف رئيسي",
    fonction: "Chef de Service",
    fonctionAr: "رئيس مصلحة",
    dateEmbauche: "10-09-2015",
  },
  {
    id: "ATT-2025-003",
    date: "20/03/2025",
    demandeur: "Karim Mezouar",
    matricule: "EMP-2018-027",
    categorie: "Attestation de travail",
    motif: "Visa",
    statut: "En attente",
    dateNaissance: "12-11-1990",
    lieuNaissance: "Constantine",
    lieuNaissanceAr: "قسنطينة",
    grade: "Ingénieur d'État",
    gradeAr: "مهندس دولة",
    fonction: "Développeur",
    fonctionAr: "مطور",
    dateEmbauche: "15-03-2018",
  },
]

export default function AttestationEditPage() {
  const params = useParams()
  const router = useRouter()
  const [attestation, setAttestation] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showGrade, setShowGrade] = useState(false)
  const [showFonction, setShowFonction] = useState(false)

  useEffect(() => {
    // Simuler un chargement depuis une API
    setTimeout(() => {
      const foundAttestation = attestationsData.find((a) => a.id === params.id)
      setAttestation(foundAttestation || null)
      setLoading(false)
    }, 1000)
  }, [params.id])

  const handlePrint = () => {
    const printButton = document.querySelector(".attestation-template-container button") as HTMLButtonElement
    if (printButton) {
      printButton.click()
    }
  }

  if (loading) {
    return <LoadingScreen />
  }

  if (!attestation) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
        </div>
        <Card>
          <CardContent className="flex items-center justify-center h-[400px]">
            <p className="text-muted-foreground">Attestation non trouvée</p>
          </CardContent>
        </Card>
      </div>
    )
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
              <AttestationTemplateFr attestation={attestation} showGrade={showGrade} showFonction={showFonction} />
            </TabsContent>
            <TabsContent value="ar" className="mt-0 attestation-template-container">
              <AttestationTemplateAr attestation={attestation} showGrade={showGrade} showFonction={showFonction} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
