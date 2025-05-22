### ESI_DOC - Système de Gestion Documentaire

## Description

ESI_DOC est une application web de gestion documentaire développée pour l'École Nationale Supérieure d'Informatique (ESI) d'Algérie. Cette plateforme centralise et automatise la gestion des documents administratifs, notamment les attestations de travail et les ordres de mission, facilitant ainsi les processus administratifs internes de l'établissement.

## Fonctionnalités principales

### Gestion des utilisateurs

- Système d'authentification multi-rôles (Admin, RH, SG, Employé, Missionnaire)
- Récupération de mot de passe
- Gestion des profils utilisateurs


### Gestion des attestations de travail

- Création et soumission de demandes d'attestation
- Traitement des demandes (approbation, rejet, mise en cours)
- Génération de documents au format PDF
- Plusieurs modèles d'attestation (simple, avec grade, avec grade et fonction)
- Versions bilingues (arabe et français)


### Gestion des ordres de mission

- Création et soumission de demandes de mission
- Traitement des demandes par le secrétariat général
- Génération de documents au format PDF
- Versions bilingues (arabe et français)


### Tableaux de bord et statistiques

- Tableaux de bord personnalisés selon le rôle de l'utilisateur
- Statistiques sur les documents traités
- Filtres avancés pour la recherche de documents


### Fonctionnalités avancées

- Export des données au format Excel
- Filtrage multi-critères des documents
- Sélection de plages de dates
- Prévisualisation des documents avant impression


## Technologies utilisées

- **Frontend** : Next.js 14 (App Router), React, TypeScript
- **UI/UX** : Tailwind CSS, shadcn/ui
- **Gestion d'état** : React Hooks
- **Icônes** : Lucide React
- **Formatage de dates** : date-fns
- **Export de données** : SheetJS (xlsx)
- **Génération de PDF** : Rendu HTML/CSS optimisé pour l'impression


## Installation et démarrage

### Prérequis

- Node.js 18.x ou supérieur
- npm ou yarn


### Installation

```shellscript
# Cloner le dépôt
git clone https://github.com/votre-organisation/esi-doc.git
cd esi-doc

# Installer les dépendances
npm install
# ou
yarn install

# Démarrer le serveur de développement
npm run dev
# ou
yarn dev
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## Structure du projet

```plaintext
esi-doc/
├── app/                    # Pages de l'application (App Router)
│   ├── admin/              # Pages pour les administrateurs
│   ├── rh/                 # Pages pour les RH
│   ├── sg/                 # Pages pour le secrétariat général
│   ├── employe/            # Pages pour les employés
│   ├── missionnaire/       # Pages pour les missionnaires
│   ├── login/              # Page de connexion
│   ├── forgot-password/    # Page de récupération de mot de passe
│   └── reset-password/     # Page de réinitialisation de mot de passe
├── components/             # Composants React réutilisables
│   ├── ui/                 # Composants UI de base (shadcn/ui)
│   └── ...                 # Autres composants spécifiques
├── public/                 # Fichiers statiques
│   ├── templates/          # Modèles de documents HTML
│   └── ...                 # Autres ressources statiques
├── utils/                  # Fonctions utilitaires
├── hooks/                  # Hooks React personnalisés
├── types/                  # Définitions de types TypeScript
└── ...                     # Autres fichiers de configuration
```

## Comptes de test

L'application inclut plusieurs comptes de test pour démontrer les différentes fonctionnalités selon les rôles :

| Email | Mot de passe | Rôle |
|-----|-----|-----|
| [admin@esi.dz](mailto:admin@esi.dz) | password123 | Admin |
| [hr@esi.dz](mailto:hr@esi.dz) | password123 | RH |
| [employee@esi.dz](mailto:employee@esi.dz) | password123 | Employé |
| [sg@esi.dz](mailto:sg@esi.dz) | password123 | SG |
| [missionary@esi.dz](mailto:missionary@esi.dz) | password123 | Missionnaire | 


## Fonctionnalités en développement

- Signatures électroniques pour les documents
- Historique des versions des documents
- Notifications par email
- Authentification à deux facteurs
- Intégration avec d'autres systèmes de l'ESI


## Captures d'écran

*Des captures d'écran de l'application peuvent être ajoutées ici pour illustrer les principales fonctionnalités.*

## Contribution

Ce projet a été développé pour répondre aux besoins spécifiques de l'École Nationale Supérieure d'Informatique (ESI) d'Algérie. Pour contribuer au projet, veuillez contacter l'équipe de développement.

## Licence

© 2025 École Nationale Supérieure d'Informatique (ESI). Tous droits réservés.
