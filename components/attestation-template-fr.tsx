"use client"

import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

interface AttestationTemplateFrProps {
  attestation: any
  showGrade: boolean
  showFonction: boolean
}

export default function AttestationTemplateFr({ attestation, showGrade, showFonction }: AttestationTemplateFrProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        let templatePath = "/templates/attestation-simple-fr.html"

        if (showGrade && showFonction) {
          templatePath = "/templates/attestation-grade-fonction-fr.html"
        } else if (showGrade) {
          templatePath = "/templates/attestation-grade-fr.html"
        }

        const response = await fetch(templatePath)
        const html = await response.text()

        if (iframeRef.current) {
          const iframeDoc = iframeRef.current.contentDocument
          if (iframeDoc) {
            iframeDoc.open()
            iframeDoc.write(html)
            iframeDoc.close()

            // Remplir les données de l'attestation
            setTimeout(() => {
              if (iframeDoc.body) {
                // Nom et prénom
                const nameElement = iframeDoc.querySelector(".attestation-content p:nth-child(3) span:nth-child(1)")
                if (nameElement) nameElement.textContent = attestation.demandeur || ""

                // Date de naissance
                const birthDateElement = iframeDoc.querySelector(
                  ".attestation-content p:nth-child(3) span:nth-child(2)",
                )
                if (birthDateElement) birthDateElement.textContent = attestation.dateNaissance || ""

                // Lieu de naissance (uniquement pour le modèle simple)
                if (!showGrade) {
                  const birthPlaceElement = iframeDoc.querySelector(
                    ".attestation-content p:nth-child(3) span:nth-child(3)",
                  )
                  if (birthPlaceElement) birthPlaceElement.textContent = attestation.lieuNaissance || ""
                }

                // Grade (pour les modèles avec grade)
                if (showGrade) {
                  const gradeElement = iframeDoc.querySelector(".attestation-content p:nth-child(3) span:nth-child(3)")
                  if (gradeElement) gradeElement.textContent = attestation.grade || ""
                }

                // Fonction (pour le modèle avec grade et fonction)
                if (showGrade && showFonction) {
                  const fonctionElement = iframeDoc.querySelector(
                    ".attestation-content p:nth-child(3) span:nth-child(4)",
                  )
                  if (fonctionElement) fonctionElement.textContent = attestation.fonction || ""
                }

                // Date d'embauche
                const hireDateElement = iframeDoc.querySelector(".attestation-content p:nth-child(3) span:last-child")
                if (hireDateElement) hireDateElement.textContent = attestation.dateEmbauche || ""

                // Date de l'attestation
                const attestationDateElement = iframeDoc.querySelector(".attestation-footer .attestation-date span")
                if (attestationDateElement) {
                  const today = new Date()
                  const formattedDate = `${today.getDate().toString().padStart(2, "0")}-${(today.getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}-${today.getFullYear()}`
                  attestationDateElement.textContent = formattedDate
                }

                // Référence
                const referenceElement = iframeDoc.querySelector(".reference span")
                if (referenceElement) {
                  referenceElement.textContent = `${attestation.id.split("-")[1]} / SDP / ESI / ${new Date().getFullYear()}`
                }
              }
            }, 100)
          }
        }
      } catch (error) {
        console.error("Erreur lors du chargement du modèle d'attestation:", error)
      }
    }

    loadTemplate()
  }, [attestation, showGrade, showFonction])

  const handlePrint = () => {
    if (iframeRef.current) {
      const iframeWindow = iframeRef.current.contentWindow
      if (iframeWindow) {
        try {
          // Créer une nouvelle fenêtre pour l'impression
          const printWindow = window.open("", "_blank")
          if (printWindow) {
            // Récupérer le contenu de l'iframe
            const iframeDocument = iframeRef.current.contentDocument
            if (iframeDocument) {
              // Écrire le contenu dans la nouvelle fenêtre
              printWindow.document.write(`
                <html>
                <head>
                  <title>Attestation de Travail</title>
                  ${iframeDocument.head.innerHTML}
                  <style>
                    @media print {
                      body {
                        margin: 0;
                        padding: 0;
                      }
                      .print-btn {
                        display: none !important;
                      }
                    }
                  </style>
                </head>
                <body>
                  ${iframeDocument.body.innerHTML}
                </body>
                </html>
              `)

              printWindow.document.close()

              // Attendre que le contenu soit chargé avant d'imprimer
              printWindow.onload = () => {
                printWindow.focus()
                printWindow.print()
                // Ne pas fermer la fenêtre après l'impression pour permettre à l'utilisateur de voir le document
              }
            }
          }
        } catch (error) {
          console.error("Erreur lors de l'impression:", error)
        }
      }
    }
  }

  return (
    <div className="relative w-full h-[842px] border rounded-md overflow-hidden">
      <iframe ref={iframeRef} className="w-full h-full" title="Attestation de travail" />
      <Button
        onClick={handlePrint}
        className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 flex items-center gap-2"
      >
        <FileText className="h-4 w-4" />
        Imprimer
      </Button>
    </div>
  )
}
