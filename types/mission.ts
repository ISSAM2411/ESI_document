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
}
