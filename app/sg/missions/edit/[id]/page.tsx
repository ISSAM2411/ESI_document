"use client"

import { useRef } from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Download, Printer } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { MissionTemplateAr } from "@/components/mission-template-ar"
import { MissionTemplateFr } from "@/components/mission-template-fr"
import type { Mission } from "@/types/mission"

export default function EditMissionPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [mission, setMission] = useState<Mission | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("ar")
  const arTemplateRef = useRef<any>(null)
  const frTemplateRef = useRef<any>(null)

  // Données simulées pour un SG
  const user = {
    name: "Fatima Zerrouki",
    email: "sg@esi.dz",
    role: "sg",
  }

  useEffect(() => {
    const fetchMission = () => {
      setLoading(true)
      try {
        // Simuler la récupération des données depuis localStorage
        const storedMissions = JSON.parse(localStorage.getItem("sgMissions") || "[]")
        const foundMission = storedMissions.find((m: Mission) => m.id === params.id)

        // Si la mission n'est pas trouvée dans localStorage, chercher dans les missions par défaut
        if (!foundMission) {
          const defaultMissions = [
            {
              id: "OM-2025-014",
              demandeur: "Département Réseaux",
              missionnaire: "Yacine Bouaziz",
              destination: "Annaba - Centre de Données",
              debut: "25/04/2025",
              fin: "27/04/2025",
              statut: "Approuvée",
              objet: "Installation et configuration des équipements réseau",
              transport: "Véhicule de service",
            },
            {
              id: "OM-2025-009",
              demandeur: "Département Intelligence Artificielle",
              missionnaire: "Leila Benmansour",
              destination: "Oran - Technopole",
              debut: "22/04/2025",
              fin: "24/04/2025",
              statut: "En cours",
              objet: "Participation à un séminaire sur l'IA",
              transport: "Train",
            },
            {
              id: "OM-2025-003",
              demandeur: "Département Systèmes d'Information",
              missionnaire: "Karim Messaoudi",
              destination: "Annaba - École Supérieure de Technologie",
              debut: "18/04/2025",
              fin: "20/04/2025",
              statut: "En cours",
              objet: "Audit des systèmes d'information",
              transport: "Véhicule personnel",
            },
          ]
          const defaultMission = defaultMissions.find((m) => m.id === params.id)
          setMission(defaultMission || null)
        } else {
          setMission(foundMission)
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la mission:", error)
        toast({
          title: "Erreur",
          description: "Impossible de récupérer les détails de la mission.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchMission()
    }
  }, [params.id, toast])

  const handleSave = () => {
    toast({
      title: "Ordre de mission enregistré",
      description: "Les modifications ont été enregistrées avec succès.",
    })
  }

  const handlePrint = () => {
    // Déclencher l'impression en fonction de l'onglet actif
    if (activeTab === "ar" && arTemplateRef.current) {
      // Trouver le bouton d'impression dans le template arabe et le cliquer
      const printButton = document.querySelector(".ar-template .print-btn") as HTMLButtonElement
      if (printButton) {
        printButton.click()
      }
    } else if (activeTab === "fr" && frTemplateRef.current) {
      // Trouver le bouton d'impression dans le template français et le cliquer
      const printButton = document.querySelector(".fr-template .print-btn") as HTMLButtonElement
      if (printButton) {
        printButton.click()
      }
    }
  }

  const handleDownload = () => {
    toast({
      title: "Téléchargement",
      description: "L'ordre de mission a été téléchargé.",
    })
  }

  if (loading) {
    return (
      <DashboardLayout role="sg" user={user}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4">Chargement de l&apos;ordre de mission...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!mission) {
    return (
      <DashboardLayout role="sg" user={user}>
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-xl font-bold">Mission non trouvée</h2>
          <p className="text-muted-foreground mt-2">La mission demandée n&apos;existe pas.</p>
          <Button className="mt-4" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout role="sg" user={user}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Retour</span>
            </Button>
            <h1 className="text-2xl font-bold">Édition de l&apos;ordre de mission {mission.id}</h1>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Imprimer
            </Button>
            <Button variant="outline" className="w-full sm:w-auto" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Télécharger
            </Button>
            <Button className="w-full sm:w-auto" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Enregistrer
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-md border">
          <Tabs defaultValue="ar" onValueChange={setActiveTab}>
            <div className="border-b px-4">
              <TabsList className="bg-transparent">
                <TabsTrigger value="ar">Version Arabe</TabsTrigger>
                <TabsTrigger value="fr">Version Française</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="ar" className="p-4">
              <div className="bg-white rounded-md border h-[800px] overflow-auto">
                <MissionTemplateAr mission={mission} ref={arTemplateRef} />
              </div>
            </TabsContent>

            <TabsContent value="fr" className="p-4">
              <div className="bg-white rounded-md border h-[800px] overflow-auto">
                <MissionTemplateFr mission={mission} ref={frTemplateRef} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
