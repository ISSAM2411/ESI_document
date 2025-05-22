import * as XLSX from "xlsx"

export function exportToExcel<T>(data: T[], filename: string, sheetName = "Feuille1") {
  // Créer un nouveau classeur
  const workbook = XLSX.utils.book_new()

  // Convertir les données en feuille de calcul
  const worksheet = XLSX.utils.json_to_sheet(data)

  // Ajouter la feuille au classeur
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)

  // Générer le fichier Excel et le télécharger
  XLSX.writeFile(workbook, `${filename}.xlsx`)
}

export function formatAttestationsForExcel(attestations: any[]) {
  return attestations.map((attestation) => ({
    Référence: attestation.id,
    Date: attestation.date,
    Demandeur: attestation.demandeur,
    Matricule: attestation.matricule,
    Catégorie: attestation.categorie,
    Motif: attestation.motif,
    Statut: attestation.statut,
    "Raison du rejet": attestation.raisonRejet || "",
  }))
}
