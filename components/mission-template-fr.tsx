"use client"

import { useRef, useEffect } from "react"
import type { Mission } from "@/types/mission"

interface MissionTemplateFrProps {
  mission: Mission
  onPrint?: () => void
}

export function MissionTemplateFr({ mission, onPrint }: MissionTemplateFrProps) {
  const printButtonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Fonction pour imprimer le document
  const handlePrint = () => {
    if (containerRef.current) {
      const printContent = containerRef.current.innerHTML
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <title>Ordre de Mission - ${mission.id}</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Roboto:wght@400;700&display=swap');
              
              body {
                font-family: 'Roboto', sans-serif;
                margin: 0;
                padding: 0;
              }
              
              .page {
                width: 210mm;
                height: 297mm;
                margin: 0 auto;
                background-color: white;
                position: relative;
                padding: 20mm 15mm;
                page-break-after: always;
              }
              
              .page:last-child {
                page-break-after: auto;
              }
              
              .header {
                text-align: center;
                margin-bottom: 15px;
                border-bottom: 1px solid #0056b3;
                padding-bottom: 10px;
              }
              
              .header-ar {
                font-family: 'Amiri', serif;
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 3px;
                direction: rtl;
              }
              
              .header-fr {
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 3px;
              }
              
              .school-name {
                display: flex;
                justify-content: space-between;
                margin: 10px 0;
              }
              
              .school-name-ar {
                font-family: 'Amiri', serif;
                font-size: 14px;
                font-weight: bold;
                direction: rtl;
              }
              
              .school-name-fr {
                font-size: 14px;
                font-weight: bold;
              }
              
              .document-number {
                display: flex;
                justify-content: flex-start;
                margin: 15px 0;
              }
              
              .mission-title {
                text-align: center;
                font-size: 16px;
                font-weight: bold;
                margin: 15px 0;
                text-decoration: underline;
              }
              
              .form-group {
                margin-bottom: 8px;
                display: flex;
                align-items: center;
                font-size: 12px;
              }
              
              .form-group label {
                width: 180px;
                font-weight: bold;
              }
              
              .form-group input, .form-group select {
                flex: 1;
                padding: 4px;
                border: 1px solid #ccc;
                border-radius: 2px;
                font-size: 12px;
                font-family: 'Roboto', sans-serif;
              }
              
              .signature-section {
                margin-top: 15px;
                text-align: right;
                font-size: 12px;
              }
              
              .signature-date {
                margin-bottom: 5px;
              }
              
              .signature-title {
                font-weight: bold;
                margin-bottom: 30px;
              }
              
              .visa-section {
                margin-top: 15px;
                border: 1px solid #ccc;
                padding: 10px;
                font-size: 12px;
              }
              
              .visa-title {
                font-weight: bold;
                text-align: center;
                margin-bottom: 10px;
              }
              
              .visa-table {
                width: 100%;
                border-collapse: collapse;
              }
              
              .visa-table th, .visa-table td {
                border: 1px solid #ccc;
                padding: 5px;
                text-align: center;
              }
              
              .footer {
                position: absolute;
                bottom: 10mm;
                left: 15mm;
                right: 15mm;
                text-align: center;
                font-size: 10px;
                border-top: 1px solid #ccc;
                padding-top: 5px;
              }
              
              .travel-table {
                width: 100%;
                border-collapse: collapse;
                margin: 10px 0;
                font-size: 11px;
              }
              
              .travel-table th, .travel-table td {
                border: 1px solid #ccc;
                padding: 4px;
                text-align: center;
              }
              
              .travel-table th {
                background-color: #f9f9f9;
              }
              
              .certification {
                margin-top: 15px;
                font-size: 12px;
              }
              
              .notes {
                margin-top: 15px;
                font-size: 10px;
              }
              
              @media print {
                @page {
                  size: A4;
                  margin: 0;
                }
                
                body {
                  margin: 0;
                  padding: 0;
                }
                
                .page {
                  margin: 0;
                  padding: 20mm 15mm;
                  page-break-after: always;
                  width: 100%;
                  height: 100%;
                }
                
                .page:last-child {
                  page-break-after: auto;
                }
                
                .print-btn {
                  display: none;
                }
              }
            </style>
          </head>
          <body>
            ${printContent}
          </body>
          </html>
        `)
        printWindow.document.close()
        printWindow.focus()
        setTimeout(() => {
          printWindow.print()
          // printWindow.close()
        }, 1000)
      }
    }
  }

  useEffect(() => {
    // Attacher l'événement au bouton interne
    if (printButtonRef.current) {
      printButtonRef.current.addEventListener("click", handlePrint)
    }

    return () => {
      // Nettoyer l'événement lors du démontage du composant
      if (printButtonRef.current) {
        printButtonRef.current.removeEventListener("click", handlePrint)
      }
    }
  }, [mission.id])

  // Exposer la fonction d'impression au parent
  useEffect(() => {
    if (onPrint) {
      // Remplacer la fonction onPrint par notre fonction handlePrint
      const originalOnPrint = onPrint
      onPrint = () => {
        handlePrint()
        originalOnPrint()
      }
    }
  }, [onPrint])

  return (
    <div className="bg-white h-full w-full overflow-auto">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Roboto:wght@400;700&display=swap');

        .fr-template {
          font-family: 'Roboto', sans-serif;
          line-height: 1.5;
          color: #333;
          background-color: #fff;
          margin: 0;
          padding: 0;
        }

        .fr-template .page {
          width: 210mm;
          margin: 0 auto 20px auto;
          background-color: white;
          position: relative;
          padding: 20mm 15mm;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          min-height: 297mm;
        }

        .fr-template .header {
          text-align: center;
          margin-bottom: 15px;
          border-bottom: 1px solid #0056b3;
          padding-bottom: 10px;
        }

        .fr-template .header-ar {
          font-family: 'Amiri', serif;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 3px;
          direction: rtl;
        }

        .fr-template .header-fr {
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 3px;
        }

        .fr-template .school-name {
          display: flex;
          justify-content: space-between;
          margin: 10px 0;
        }

        .fr-template .school-name-ar {
          font-family: 'Amiri', serif;
          font-size: 14px;
          font-weight: bold;
          direction: rtl;
        }

        .fr-template .school-name-fr {
          font-size: 14px;
          font-weight: bold;
        }

        .fr-template .document-number {
          display: flex;
          justify-content: flex-start;
          margin: 15px 0;
        }

        .fr-template .mission-title {
          text-align: center;
          font-size: 16px;
          font-weight: bold;
          margin: 15px 0;
          text-decoration: underline;
        }

        .fr-template .form-group {
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          font-size: 12px;
        }

        .fr-template .form-group label {
          width: 180px;
          font-weight: bold;
        }

        .fr-template .form-group input, .fr-template .form-group select {
          flex: 1;
          padding: 4px;
          border: 1px solid #ccc;
          border-radius: 2px;
          font-size: 12px;
          font-family: 'Roboto', sans-serif;
        }

        .fr-template .signature-section {
          margin-top: 15px;
          text-align: right;
          font-size: 12px;
        }

        .fr-template .signature-date {
          margin-bottom: 5px;
        }

        .fr-template .signature-title {
          font-weight: bold;
          margin-bottom: 30px;
        }

        .fr-template .visa-section {
          margin-top: 15px;
          border: 1px solid #ccc;
          padding: 10px;
          font-size: 12px;
        }

        .fr-template .visa-title {
          font-weight: bold;
          text-align: center;
          margin-bottom: 10px;
        }

        .fr-template .visa-table {
          width: 100%;
          border-collapse: collapse;
        }

        .fr-template .visa-table th, .fr-template .visa-table td {
          border: 1px solid #ccc;
          padding: 5px;
          text-align: center;
        }

        .fr-template .footer {
          position: absolute;
          bottom: 10mm;
          left: 15mm;
          right: 15mm;
          text-align: center;
          font-size: 10px;
          border-top: 1px solid #ccc;
          padding-top: 5px;
        }

        .fr-template .travel-table {
          width: 100%;
          border-collapse: collapse;
          margin: 10px 0;
          font-size: 11px;
        }

        .fr-template .travel-table th, .fr-template .travel-table td {
          border: 1px solid #ccc;
          padding: 4px;
          text-align: center;
        }

        .fr-template .travel-table th {
          background-color: #f9f9f9;
        }

        .fr-template .certification {
          margin-top: 15px;
          font-size: 12px;
        }

        .fr-template .notes {
          margin-top: 15px;
          font-size: 10px;
        }

        .fr-template .print-btn {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 8px 16px;
          background-color: #0056b3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          z-index: 1000;
        }

        .fr-template .print-btn:hover {
          background-color: #003d7a;
        }

        @media print {
          .fr-template .print-btn {
            display: none;
          }
        }
      `}</style>

      <div className="fr-template" ref={containerRef}>
        <button ref={printButtonRef} className="print-btn">
          Imprimer le formulaire
        </button>

        {/* Page 1 */}
        <div className="page">
          <div className="header">
            <div className="header-ar">الـجــمھـوریة الجـزائــریة الـدیـمقراطـیة الـشـعبـیة</div>
            <div className="header-fr">REPUBLIQUE ALGERIENNE DEMOCRATIQUE ET POPULAIRE</div>
            <div className="header-ar">وزارة الـتعـلـیـم الـعـالـي والـبحــث الـعـلمي</div>
            <div className="header-fr">MINISTERE DE L'ENSEIGNEMENT SUPERIEUR ET DE LA RECHERCHE SCIENTIFIQUE</div>
          </div>

          <div className="school-name">
            <div className="school-name-fr">Ecole nationale Supérieure d'Informatique</div>
            <div className="school-name-ar">الـمـدرسة الـوطنیة العلیا للإعلام</div>
          </div>

          <div className="document-number">
            <div>N°: {mission.id.replace("OM-", "")}</div>
          </div>

          <div className="mission-title">ORDRE DE MISSION</div>

          <div className="form-group">
            <label>Le (La) Soussigné(e):</label>
            <input type="text" name="signe" defaultValue="Fatima Zerrouki" />
          </div>

          <div className="form-group">
            <label>Ordonne à M./Mme:</label>
            <input type="text" name="personne" defaultValue={mission.missionnaire} />
          </div>

          <div className="form-group">
            <label>Fonction:</label>
            <input type="text" name="fonction" defaultValue="Maître de conférences" />
          </div>

          <div className="form-group">
            <label>Service:</label>
            <input type="text" name="service" defaultValue={mission.demandeur} />
          </div>

          <div className="form-group">
            <label>De se rendre en mission de:</label>
            <input type="text" name="lieu_depart" defaultValue="Alger" />
            <span style={{ margin: "0 5px" }}>à</span>
            <input type="text" name="lieu_arrivee" defaultValue={mission.destination} />
          </div>

          <div className="form-group">
            <label>Objet complet de la mission:</label>
            <input type="text" name="objet" defaultValue={mission.objet} />
          </div>

          <div className="form-group">
            <label>Moyen de transport:</label>
            <input type="text" name="transport" defaultValue={mission.transport} />
          </div>

          <div className="form-group">
            <label>Date de départ:</label>
            <input type="text" name="date_depart" defaultValue={mission.debut} />
          </div>

          <div className="form-group">
            <label>Date de retour:</label>
            <input type="text" name="date_retour" defaultValue={mission.fin} />
          </div>

          <div className="form-group">
            <label>Prière aux autorités civiles et militaires de bien vouloir faciliter à M./Mme:</label>
            <input type="text" name="nom_facilitation" defaultValue={mission.missionnaire} />
            <span style={{ margin: "0 5px" }}>l'accomplissement de sa mission.</span>
          </div>

          <div className="form-group">
            <label>Pièce d'identité:</label>
            <input type="text" name="piece_identite" defaultValue="Carte Nationale d'Identité" />
            <span style={{ margin: "0 5px" }}>délivrée le:</span>
            <input type="text" name="date_piece" defaultValue="15/01/2020" />
            <span style={{ margin: "0 5px" }}>à:</span>
            <input type="text" name="lieu_piece" defaultValue="Alger" />
          </div>

          <div className="signature-section">
            <div className="signature-date">
              Fait à: <input type="text" style={{ width: "150px" }} defaultValue="Alger" />
              le: <input type="text" style={{ width: "150px" }} defaultValue={new Date().toLocaleDateString("fr-FR")} />
            </div>
            <div className="signature-title">Le Responsable du service émetteur de l'ordre de mission</div>
            <div style={{ height: "50px" }}></div>
          </div>

          <div className="visa-section">
            <div className="visa-title">
              Cadre réservé aux visas<sup>(1)</sup>
            </div>
            <table className="visa-table">
              <thead>
                <tr>
                  <th>Date et heure d'arrivée</th>
                  <th>Date et heure de départ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ height: "30px" }}></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="footer">
            ESI (Ecole nationale Supérieure d'Informatique) BP 68M, 16059, Oued Smar, Algérie
            <br />
            Tél : 023.93.91.32 Fax : 023.93.91.34 ; http://www.esi.dz
          </div>
        </div>

        {/* Page 2 */}
        <div className="page">
          <div className="header">
            <div className="header-ar">الـجــمھـوریة الجـزائــریة الـدیـمقراطـیة الـشـعبـیة</div>
            <div className="header-fr">REPUBLIQUE ALGERIENNE DEMOCRATIQUE ET POPULAIRE</div>
            <div className="header-ar">وزارة الـتعـلـیـم الـعـالـي والـبحــث الـعـلمي</div>
            <div className="header-fr">MINISTERE DE L'ENSEIGNEMENT SUPERIEUR ET DE LA RECHERCHE SCIENTIFIQUE</div>
          </div>

          <div className="school-name">
            <div className="school-name-fr">Ecole nationale Supérieure d'Informatique</div>
            <div className="school-name-ar">الـمـدرسة الـوطنیة العلیا للإعلام</div>
          </div>

          <div className="form-group">
            <label>Avance perçue au départ - Reçu la somme de:</label>
            <input type="text" name="avance" defaultValue="" />
          </div>

          <div className="form-group">
            <label>À titre d'avance suivant état n°:</label>
            <input type="text" name="etat_numero" defaultValue="" />
            <span style={{ margin: "0 5px" }}>de ce jour:</span>
            <input type="text" name="date_etat" defaultValue="" />
          </div>

          <div className="form-group">
            <label>À:</label>
            <input type="text" name="lieu_avance" defaultValue="" />
            <span style={{ margin: "0 5px" }}>le:</span>
            <input type="text" name="date_avance" defaultValue="" />
          </div>

          <h3 style={{ margin: "10px 0", textAlign: "center", fontSize: "14px" }}>EXÉCUTION DU DÉPLACEMENT</h3>

          <table className="travel-table">
            <thead>
              <tr>
                <th colSpan={9}>ITINÉRAIRES - DATES - HEURES</th>
              </tr>
              <tr>
                <th colSpan={2}>DÉPART DU POSTE</th>
                <th colSpan={2}>ARRIVÉE À DESTINATION</th>
                <th colSpan={2}>RETOUR AU POSTE</th>
                <th colSpan={2}>ARRIVÉE AU POSTE</th>
                <th rowSpan={2}>MOYEN DE TRANSPORT</th>
              </tr>
              <tr>
                <th>DATE</th>
                <th>HEURE</th>
                <th>DATE</th>
                <th>HEURE</th>
                <th>DATE</th>
                <th>HEURE</th>
                <th>DATE</th>
                <th>HEURE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>De: Alger</td>
                <td></td>
                <td>À: {mission.destination}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>{mission.transport}</td>
              </tr>
              <tr>
                <td>De: ........</td>
                <td></td>
                <td>À: ........</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>De: ........</td>
                <td></td>
                <td>À: ........</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>

          <div className="form-group">
            <label>Durée totale du déplacement:</label>
            <input type="text" name="jours" placeholder="jours" style={{ width: "80px" }} />
            <input type="text" name="heures" placeholder="heures" style={{ width: "80px" }} />
          </div>

          <div className="form-group">
            <label>Nombre de nuitées prises en charge par le service d'accueil:</label>
            <input type="text" name="nuitees" defaultValue="" />
          </div>

          <div className="certification">
            <p>
              Le/La<sup>(2)</sup> M./Mme:{" "}
              <input type="text" name="nom_certif" style={{ width: "200px" }} defaultValue={mission.missionnaire} />{" "}
              certifie l'exactitude des renseignements portés ci-dessus
            </p>
            <div style={{ marginTop: "5px" }}>
              <span>
                À: <input type="text" style={{ width: "120px" }} defaultValue="Alger" />
              </span>
              <span style={{ marginLeft: "20px" }}>
                Le:{" "}
                <input type="text" style={{ width: "120px" }} defaultValue={new Date().toLocaleDateString("fr-FR")} />
              </span>
            </div>
            <div style={{ marginTop: "5px", fontWeight: "bold" }}>Signature</div>
            <div style={{ height: "30px" }}></div>
          </div>

          <div style={{ marginTop: "15px", fontSize: "12px" }}>
            <p>
              Certifie<sup>(3)</sup> la réalité du service fait et l'exactitude des renseignements portés ci-dessus
            </p>
            <div style={{ marginTop: "5px" }}>
              <span>
                Fait à: <input type="text" style={{ width: "120px" }} defaultValue="Alger" />
              </span>
              <span style={{ marginLeft: "20px" }}>
                Le:{" "}
                <input type="text" style={{ width: "120px" }} defaultValue={new Date().toLocaleDateString("fr-FR")} />
              </span>
            </div>
          </div>

          <div className="notes">
            <p>
              <sup>(1)</sup> : Organisme ou service d'accueil
            </p>
            <p>
              <sup>(2)</sup> : Nom et prénom du missionné
            </p>
            <p>
              <sup>(3)</sup> : Chef de service ou d'organisme d'accueil
            </p>
            <p>(Rayer les mentions inutiles)</p>
            <p>
              <strong>Note:</strong> Chaque administration, établissement ou organisme doit remplir la case
              correspondante.
            </p>
          </div>

          <div className="footer">
            ESI (Ecole nationale Supérieure d'Informatique) BP 68M, 16059, Oued Smar, Algérie
            <br />
            Tél : 023.93.91.32 Fax : 023.93.91.34 ; http://www.esi.dz
          </div>
        </div>
      </div>
    </div>
  )
}
