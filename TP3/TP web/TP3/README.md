# TypeScript Travaux Pratiques (TP)

Un projet complet d'exercices TypeScript couvrant les concepts fondamentaux et avancés, culminant avec un système de gestion de bibliothèque.

## 🚀 Démarrage rapide

```bash
# Installation des dépendances
npm install

# Compilation du projet
npm run build

# Exécution du projet final
npm run dev

# Exécution d'un exercice spécifique
npm run exercise exercises/exercise1.ts
```

## 📁 Structure du projet

```
├── exercises/              # Exercices 1-9
│   ├── exercise1.ts        # Introduction TypeScript
│   ├── exercise2.ts        # Types de base
│   ├── exercise3.ts        # Types avancés
│   ├── exercise4.ts        # Objets & Interfaces
│   ├── exercise5.ts        # Fonctions
│   ├── exercise6.ts        # Programmation Orientée Objet
│   ├── exercise7.ts        # Génériques
│   ├── exercise8.ts        # Modules & Organisation
│   ├── exercise9.md        # Outils & Bonnes pratiques
│   ├── types.ts           # Types partagés
│   ├── math.ts            # Fonctions mathématiques
│   ├── calculator.ts      # Calculateur avancé
│   ├── index.ts           # Ré-exports
│   └── main.ts            # Tests d'imports
├── final-project/          # Exercice 10 - Projet final
│   ├── models/            # Modèles de données
│   ├── services/          # Logique métier
│   ├── utils/             # Utilitaires
│   └── index.ts           # Point d'entrée
├── dist/                  # Fichiers compilés
├── .eslintrc.json         # Configuration ESLint
├── .prettierrc.json       # Configuration Prettier
├── tsconfig.json          # Configuration TypeScript
└── package.json           # Configuration npm
```

## 📚 Exercices inclus

### Exercices 1-5 : Fondamentaux
- **Exercice 1** : Introduction et setup TypeScript
- **Exercice 2** : Types de base (string, number, boolean, array, tuple, enum)
- **Exercice 3** : Types avancés (union, intersection, type aliases, type guards)
- **Exercice 4** : Objets & Interfaces (interfaces, héritage, propriétés optionnelles)
- **Exercice 5** : Fonctions (annotations, surcharges, paramètres optionnels/défaut)

### Exercices 6-8 : Concepts avancés
- **Exercice 6** : POO (classes, héritage, classes abstraites, interfaces)
- **Exercice 7** : Génériques (fonctions, classes, contraintes génériques)
- **Exercice 8** : Modules (import/export, organisation du code)

### Exercice 9 : Outils et bonnes pratiques
- Configuration TypeScript strict
- ESLint avec règles TypeScript
- Prettier pour le formatage
- Scripts npm optimisés

### Exercice 10 : Projet final - Système de bibliothèque
Un système complet de gestion de bibliothèque démontrant :

#### 🏗️ Architecture
- **Models** : `Book`, `User`, `Admin` (héritage, classes abstraites)
- **Services** : `Library`, `ApiService` (logique métier, simulation API)
- **Utils** : `Repository<T>` (génériques, CRUD générique)

#### ✨ Fonctionnalités
- ✅ Gestion des livres (ajout, suppression, recherche)
- ✅ Gestion des utilisateurs (utilisateurs/admins)
- ✅ Système d'emprunts/retours avec limitations
- ✅ Recherche multicritères
- ✅ Chargement depuis API fictive
- ✅ Statistiques et rapports
- ✅ Gestion des permissions

#### 🔧 Technologies utilisées
- **TypeScript strict** : Types stricts, vérifications avancées
- **POO avancée** : Héritage, polymorphisme, classes abstraites
- **Génériques** : Repository générique, types flexibles
- **Modules ES6** : Organisation modulaire
- **Async/Await** : Gestion asynchrone
- **Design Patterns** : Singleton, Repository Pattern

## 🛠️ Scripts disponibles

```bash
# Développement
npm run dev          # Exécute le projet final en mode dev
npm run build        # Compile tout le TypeScript
npm run clean        # Nettoie le dossier dist

# Qualité de code
npm run lint         # Vérifie le code avec ESLint
npm run format       # Formate le code avec Prettier

# Exercices individuels
npm run exercise exercises/exercise1.ts
npm run exercise exercises/exercise2.ts
# ... etc
```

## 🎯 Objectifs pédagogiques

### Compétences TypeScript
- [x] Maîtrise des types de base et avancés
- [x] Programmation orientée objet
- [x] Génériques et contraintes
- [x] Modules et organisation du code
- [x] Configuration d'outils de développement

### Bonnes pratiques
- [x] Code maintenable et lisible
- [x] Gestion d'erreurs robuste
- [x] Tests et validations
- [x] Documentation complète
- [x] Architecture modulaire

### Concepts avancés
- [x] Design patterns (Repository, Singleton)
- [x] Programmation asynchrone
- [x] Type safety avancée
- [x] API design
- [x] Gestion d'état

## 🧪 Exemples d'utilisation

### Exécution d'un exercice
```bash
npx ts-node exercises/exercise2.ts
```

### Exécution du projet final
```bash
npm run dev
```

### Compilation et exécution
```bash
npm run build
node dist/final-project/index.js
```

## 📖 Documentation supplémentaire

Chaque exercice contient :
- Énoncé détaillé en commentaires
- Code d'exemple complet
- Tests et démonstrations
- Explications des concepts

Le projet final inclut :
- Architecture détaillée
- Documentation des API
- Exemples d'utilisation
- Guide de contribution

## 🎉 Résultats attendus

À la fin de ces travaux pratiques, vous maîtriserez :
- TypeScript avancé avec configuration stricte
- Programmation orientée objet complète
- Génériques et types complexes
- Organisation modulaire d'applications
- Outils de développement modernes
- Bonnes pratiques de développement

Bonne programmation ! 🚀