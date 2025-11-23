# Atelier Angular - Les Ateliers Pratiques

## Description
Cette application Angular démontre toutes les techniques de binding et de communication entre composants à travers 8 activités pratiques.

## Activités Implémentées

### Activité 1 : Interpolation de chaînes de caractères ✅
- **Composant:** `Bienvenue`
- **Concepts:** Interpolation `{{ }}`
- **Fonctionnalité:** Affiche un message de bienvenue en utilisant l'interpolation de chaînes

### Activité 2 : Property Binding ✅
- **Composant:** `Produit`
- **Concepts:** Property binding `[propriété]`
- **Fonctionnalité:** Affiche une image de produit en utilisant le property binding pour l'attribut `src`

### Activité 3 : Event Binding ✅
- **Composant:** `Produit`
- **Concepts:** Event binding `(événement)`
- **Fonctionnalité:** Bouton "Ajouter au panier" qui déclenche une alerte lors du clic

### Activité 4 : Two-Way Data Binding avec ngModel ✅
- **Composant:** `Utilisateur`
- **Concepts:** Two-way binding `[(ngModel)]`, FormsModule
- **Fonctionnalité:** Champ de saisie lié à une propriété avec affichage en temps réel

### Activité 5 : Binding des Attributs et des Styles ✅
- **Composant:** `Produit`
- **Concepts:** Class binding `[class.nom]`, Style binding `[style.propriété]`
- **Fonctionnalité:** 
  - Affichage conditionnel du statut de stock avec classes CSS
  - Couleurs et styles dynamiques selon l'état du stock
  - Bouton pour basculer l'état du stock

### Activité 6 : Communication entre Composants avec @Input et @Output ✅
- **Composants:** `Produit`, `Panier`, `App`
- **Concepts:** `@Output`, `EventEmitter`, communication parent-enfant
- **Fonctionnalité:** 
  - Le composant Produit émet un événement lors de l'ajout au panier
  - Le composant parent reçoit et traite l'événement
  - Le composant Panier gère une liste d'articles

### Activité 7 : Utilisation de @Input pour Passer des Données au Composant Enfant ✅
- **Composant:** `Produit`
- **Concepts:** `@Input`, passage de données parent vers enfant
- **Fonctionnalité:** 
  - Trois instances du composant Produit avec différents noms
  - Noms passés depuis le composant parent via @Input

### Activité 8 : Binding avec les Pipes ✅
- **Composant:** `Produit`
- **Concepts:** Pipes Angular, formatage des données
- **Fonctionnalité:** Affichage du prix formaté en devise européenne (EUR)

## Structure des Composants

```
src/app/
├── app.ts                 # Composant principal
├── app.html              # Template principal
├── app.css               # Styles globaux
├── bienvenue/            # Activité 1
│   ├── bienvenue.ts
│   ├── bienvenue.html
│   └── bienvenue.css
├── produit/              # Activités 2, 3, 5, 7, 8
│   ├── produit.ts
│   ├── produit.html
│   └── produit.css
├── utilisateur/          # Activité 4
│   ├── utilisateur.ts
│   ├── utilisateur.html
│   └── utilisateur.css
└── panier/               # Activité 6
    ├── panier.ts
    ├── panier.html
    └── panier.css
```

## Technologies Utilisées
- **Angular 18+** (Version zoneless)
- **TypeScript**
- **CSS3**
- **FormsModule** (pour ngModel)
- **CommonModule** (pour les directives)

## Comment Exécuter
1. Installer les dépendances: `npm install`
2. Démarrer l'application: `ng serve`
3. Ouvrir le navigateur à l'adresse: `http://localhost:4200`

## Fonctionnalités Démontrées

### Binding de Données
- **Interpolation:** `{{ propriété }}`
- **Property Binding:** `[attribut]="propriété"`
- **Event Binding:** `(événement)="méthode()"`
- **Two-Way Binding:** `[(ngModel)]="propriété"`

### Communication Composants
- **@Input:** Réception de données du parent
- **@Output:** Émission d'événements vers le parent
- **EventEmitter:** Gestion des événements personnalisés

### Styles Dynamiques
- **Class Binding:** `[class.nom]="condition"`
- **Style Binding:** `[style.propriété]="valeur"`
- **Styles conditionnels** basés sur l'état des données

### Formatage avec Pipes
- **Currency Pipe:** Formatage monétaire
- **Paramètres:** Devise, symbole, précision décimale

## Points Techniques Importants

### Imports Nécessaires
- `FormsModule` pour `ngModel`
- `CommonModule` pour `*ngIf`, `*ngFor`
- `CurrencyPipe` pour le formatage des prix

### Architecture des Composants
- Séparation claire des responsabilités
- Composants réutilisables
- Communication unidirectionnelle des données
- Gestion d'état locale appropriée

Cette application constitue un exemple complet des techniques de binding Angular et peut servir de référence pour l'apprentissage des concepts fondamentaux du framework.