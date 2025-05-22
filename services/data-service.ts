// Types
export interface Attestation {
  id: string
  date: string
  demandeur: string
  matricule: string
  categorie: string
  motif: string
  statut: string
  raisonRejet?: string
  email?: string
  nom?: string
  prenom?: string
  fonction?: string
  grade?: string
  dateCreation?: string
  creePar?: string
  type?: string
  langue?: string
}

export interface Mission {
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
  email?: string
}

// Données initiales
const initialAttestations: Attestation[] = [
  {
    id: "ATT-2025-001",
    date: "15/03/2025",
    demandeur: "Ahmed Benali",
    matricule: "EMP-2010-042",
    categorie: "Employé actif",
    motif: "Démarche administrative",
    statut: "Complétée",
    email: "ahmed.benali@esi.dz",
  },
  {
    id: "ATT-2025-002",
    date: "18/03/2025",
    demandeur: "Samira Hadjri",
    matricule: "EMP-2015-103",
    categorie: "Employé actif",
    motif: "Démarche bancaire",
    statut: "En cours",
    email: "hr@esi.dz",
  },
  {
    id: "ATT-2025-003",
    date: "20/03/2025",
    demandeur: "Karim Mezouar",
    matricule: "EMP-2018-027",
    categorie: "Employé actif",
    motif: "Demande de visa",
    statut: "En attente",
    email: "missionary@esi.dz",
  },
  {
    id: "ATT-2025-004",
    date: "22/03/2025",
    demandeur: "Leila Benmansour",
    matricule: "EMP-2012-078",
    categorie: "Employé actif",
    motif: "Démarche administrative",
    statut: "En attente",
    email: "leila.benmansour@esi.dz",
  },
  {
    id: "ATT-2025-005",
    date: "25/03/2025",
    demandeur: "Omar Zerrouk",
    matricule: "RET-1980-015",
    categorie: "Retraité",
    motif: "Démarche administrative",
    statut: "En cours",
    email: "omar.zerrouk@esi.dz",
  },
  {
    id: "ATT-2025-006",
    date: "27/03/2025",
    demandeur: "Yasmine Kaddour",
    matricule: "STG-2024-003",
    categorie: "Stagiaire",
    motif: "Démarche administrative",
    statut: "Complétée",
    email: "yasmine.kaddour@esi.dz",
  },
  {
    id: "ATT-2025-007",
    date: "29/03/2025",
    demandeur: "Nadir Hamidi",
    matricule: "EMP-2013-056",
    categorie: "Employé actif",
    motif: "Démarche bancaire",
    statut: "Rejetée",
    raisonRejet: "Informations incomplètes",
    email: "nadir.hamidi@esi.dz",
  },
  {
    id: "ATT-2025-008",
    date: "02/04/2025",
    demandeur: "Fatima Zerrouki",
    matricule: "EMP-2009-031",
    categorie: "Employé actif",
    motif: "Démarche administrative",
    statut: "En attente",
    email: "sg@esi.dz",
  },
  {
    id: "ATT-2025-009",
    date: "05/04/2025",
    demandeur: "Rachid Mebarki",
    matricule: "RET-1985-007",
    categorie: "Retraité",
    motif: "Autre",
    statut: "Complétée",
    email: "rachid.mebarki@esi.dz",
  },
  {
    id: "ATT-2025-010",
    date: "08/04/2025",
    demandeur: "Meriem Belkacem",
    matricule: "EMP-2016-089",
    categorie: "Employé actif",
    motif: "Démarche bancaire",
    statut: "En cours",
    email: "meriem.belkacem@esi.dz",
  },
]

const initialMissions: Mission[] = [
  {
    id: "OM-2025-014",
    demandeur: "Département Réseaux",
    missionnaire: "Yacine Bouaziz",
    destination: "Annaba - Centre de Données",
    debut: "25/04/2025",
    fin: "27/04/2025",
    statut: "Approuvée",
    email: "yacine.bouaziz@esi.dz",
  },
  {
    id: "OM-2025-009",
    demandeur: "Département Intelligence Artificielle",
    missionnaire: "Leila Benmansour",
    destination: "Oran - Technopole",
    debut: "22/04/2025",
    fin: "24/04/2025",
    statut: "En cours",
    email: "leila.benmansour@esi.dz",
  },
  {
    id: "OM-2025-003",
    demandeur: "Département Systèmes d'Information",
    missionnaire: "Karim Messaoudi",
    destination: "Annaba - École Supérieure de Technologie",
    debut: "18/04/2025",
    fin: "20/04/2025",
    statut: "En cours",
    email: "missionary@esi.dz",
  },
  {
    id: "OM-2025-011",
    demandeur: "Département Génie Logiciel",
    missionnaire: "Nadir Hamidi",
    destination: "Blida - École Nationale Polytechnique",
    debut: "15/04/2025",
    fin: "16/04/2025",
    statut: "En attente",
    email: "nadir.hamidi@esi.dz",
  },
  {
    id: "OM-2025-001",
    demandeur: "Département Recherche et Innovation",
    missionnaire: "Karim Messaoudi",
    destination: "Oran - Université des Sciences et de la Technologie",
    debut: "12/04/2025",
    fin: "15/04/2025",
    statut: "Approuvée",
    email: "missionary@esi.dz",
  },
]

// Service de gestion des données
class DataService {
  private static instance: DataService

  private constructor() {
    // Initialiser les données si elles n'existent pas déjà
    if (!localStorage.getItem("attestations")) {
      localStorage.setItem("attestations", JSON.stringify(initialAttestations))
    }
    if (!localStorage.getItem("missions")) {
      localStorage.setItem("missions", JSON.stringify(initialMissions))
    }
  }

  public static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService()
    }
    return DataService.instance
  }

  // Méthodes pour les attestations
  public getAllAttestations(): Attestation[] {
    const data = localStorage.getItem("attestations")
    return data ? JSON.parse(data) : []
  }

  public getAttestationsByEmail(email: string): Attestation[] {
    const attestations = this.getAllAttestations()
    return attestations.filter((att) => att.email === email)
  }

  public getAttestationById(id: string): Attestation | undefined {
    const attestations = this.getAllAttestations()
    return attestations.find((att) => att.id === id)
  }

  public addAttestation(attestation: Attestation): void {
    const attestations = this.getAllAttestations()

    // Générer un ID si non fourni
    if (!attestation.id) {
      const lastId =
        attestations.length > 0 ? Number.parseInt(attestations[attestations.length - 1].id.split("-")[2]) : 0
      attestation.id = `ATT-2025-${(lastId + 1).toString().padStart(3, "0")}`
    }

    // Ajouter la date de création si non fournie
    if (!attestation.dateCreation) {
      const today = new Date()
      attestation.dateCreation = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getFullYear()}`
    }

    attestations.push(attestation)
    localStorage.setItem("attestations", JSON.stringify(attestations))
  }

  public updateAttestation(id: string, updates: Partial<Attestation>): void {
    const attestations = this.getAllAttestations()
    const index = attestations.findIndex((att) => att.id === id)

    if (index !== -1) {
      attestations[index] = { ...attestations[index], ...updates }
      localStorage.setItem("attestations", JSON.stringify(attestations))
    }
  }

  public deleteAttestation(id: string): void {
    const attestations = this.getAllAttestations()
    const filteredAttestations = attestations.filter((att) => att.id !== id)
    localStorage.setItem("attestations", JSON.stringify(filteredAttestations))
  }

  // Méthodes pour les missions
  public getAllMissions(): Mission[] {
    const data = localStorage.getItem("missions")
    return data ? JSON.parse(data) : []
  }

  public getMissionsByEmail(email: string): Mission[] {
    const missions = this.getAllMissions()
    return missions.filter((mission) => mission.email === email)
  }

  public getMissionById(id: string): Mission | undefined {
    const missions = this.getAllMissions()
    return missions.find((mission) => mission.id === id)
  }

  public addMission(mission: Mission): void {
    const missions = this.getAllMissions()

    // Générer un ID si non fourni
    if (!mission.id) {
      const lastId = missions.length > 0 ? Number.parseInt(missions[missions.length - 1].id.split("-")[2]) : 0
      mission.id = `OM-2025-${(lastId + 1).toString().padStart(3, "0")}`
    }

    // Ajouter la date de création si non fournie
    if (!mission.dateCreation) {
      const today = new Date()
      mission.dateCreation = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getFullYear()}`
    }

    missions.push(mission)
    localStorage.setItem("missions", JSON.stringify(missions))
  }

  public updateMission(id: string, updates: Partial<Mission>): void {
    const missions = this.getAllMissions()
    const index = missions.findIndex((mission) => mission.id === id)

    if (index !== -1) {
      missions[index] = { ...missions[index], ...updates }
      localStorage.setItem("missions", JSON.stringify(missions))
    }
  }

  public deleteMission(id: string): void {
    const missions = this.getAllMissions()
    const filteredMissions = missions.filter((mission) => mission.id !== id)
    localStorage.setItem("missions", JSON.stringify(filteredMissions))
  }
}

export const dataService = DataService.getInstance()
