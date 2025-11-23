# TP Angular - Directives Structurelles et Attributs

## Objectifs Pédagogiques

Ce TP a pour objectif d'apprendre à utiliser les **directives structurelles** (`*ngIf`, `*ngFor`) et les **directives d'attributs** (`[ngClass]`, `[ngStyle]`) en Angular à travers un jeu interactif de questions-réponses.

## Concepts Abordés

### 1. Directives Structurelles

#### A. Affichage Conditionnel avec `*ngIf`
- **Principe** : Afficher ou masquer des éléments selon une condition
- **Syntaxe** : `*ngIf="condition"`
- **Avec template alternatif** : `*ngIf="condition; else templateRef"`

**Exemple dans le projet :**
```html
<!-- Affichage conditionnel du feedback -->
<div *ngIf="currentQuestion.isCorrect; else incorrectMessage">
  <p>🎉 Bonne réponse ! Vous gagnez des points.</p>
</div>
<ng-template #incorrectMessage>
  <p>❌ Mauvaise réponse. Essayez encore !</p>
</ng-template>
```

#### B. Itération Dynamique avec `*ngFor`
- **Principe** : Répéter un élément pour chaque item d'une collection
- **Syntaxe** : `*ngFor="let item of collection"`
- **Variables locales** : `index`, `first`, `last`, `even`, `odd`

**Exemple dans le projet :**
```html
<!-- Affichage des options de réponse -->
<button *ngFor="let option of currentQuestion.options" 
        (click)="onSelectOption(option, currentQuestion)">
  {{ option }}
</button>
```

#### C. Combinaison `*ngIf` et `*ngFor`
- **Principe** : Combiner les deux directives pour un contrôle fin de l'affichage
- **Usage** : Afficher certains éléments d'une liste selon des conditions

**Exemple dans le projet :**
```html
<!-- Afficher seulement les questions non répondues -->
<div *ngFor="let question of questions">
  <div *ngIf="!question.answered">
    <h3>{{ question.question }}</h3>
    <!-- Options de réponse -->
  </div>
</div>
```

### 2. Directives d'Attributs

#### A. Classes CSS Dynamiques avec `[ngClass]`
- **Principe** : Appliquer des classes CSS conditionnellement
- **Syntaxes multiples** :
  - Objet : `[ngClass]="{'classe': condition}"`
  - String : `[ngClass]="expression"`
  - Array : `[ngClass]="['classe1', 'classe2']"`

**Exemple dans le projet :**
```html
<button [ngClass]="{
  'correct-answer': isCorrect(option, question),
  'incorrect-answer': isIncorrect(option, question),
  'disabled': question.answered
}">
  {{ option }}
</button>
```

#### B. Styles en Ligne Dynamiques avec `[ngStyle]`
- **Principe** : Appliquer des styles CSS inline conditionnellement
- **Syntaxe** : `[ngStyle]="{'propriété': valeur}"`

**Exemple dans le projet :**
```html
<button [ngStyle]="{
  'opacity': question.answered ? '0.7' : '1',
  'background-color': isSelected(option) ? 'lightblue' : null,
  'transform': isHovered(option) ? 'scale(1.05)' : 'scale(1)'
}">
  {{ option }}
</button>
```

## Structure du Projet

### Modèles de Données (`models/game.models.ts`)

```typescript
export interface Question {
  id: number;
  question: string;
  options: string[];
  reponse: string;
  answered?: boolean;
  selectedAnswer?: string;
  isCorrect?: boolean;
}

export interface GameStats {
  score: number;
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
}
```

### Composant Principal (`app.ts`)

Le composant contient :
- **État du jeu** : questions, statistiques, historique
- **Méthodes d'interaction** : sélection de réponses, navigation
- **Getters** : propriétés calculées pour l'interface
- **Logique conditionnelle** : vérification des réponses

### Template (`app.html`)

Le template démontre :
1. **`*ngIf`** : Affichage conditionnel des sections
2. **`*ngFor`** : Itération sur les questions et options
3. **`[ngClass]`** : Classes CSS dynamiques pour le feedback visuel
4. **`[ngStyle]`** : Styles inline pour les interactions
5. **Combinaisons** : Usage simultané des directives

## Fonctionnalités Implémentées

### 1. Questions Une par Une
- Affichage séquentiel des questions
- Navigation automatique après réponse
- Feedback immédiat (correct/incorrect)

### 2. Feedback Visuel Avancé
- **Couleurs** : Vert pour correct, rouge pour incorrect
- **Animations** : Survol, sélection, transitions
- **États** : Boutons désactivés après réponse
- **Icônes** : Confirmation visuelle des réponses

### 3. Vue d'Ensemble
- Liste de toutes les questions avec leur état
- Progression en temps réel
- Historique détaillé des réponses

### 4. Écran de Résultats
- Score final avec classification
- Historique complet des réponses
- Statistiques détaillées
- Option de recommencer

## Défis Implémentés

### ✅ Défi 1 : Questions Séquentielles
Questions affichées une à la fois avec progression automatique.

### ✅ Défi 2 : Historique des Réponses
Tableau complet avec `*ngFor` montrant toutes les réponses avec leur statut.

### ✅ Défi 3 : Bouton Conditionnel
Bouton "Terminer le jeu" apparaît seulement quand toutes les questions sont répondues (avec `*ngIf`).

## Aspects Visuels avec `ngClass` et `ngStyle`

### 1. Feedback Immédiat
- **Classes dynamiques** pour les bonnes/mauvaises réponses
- **Styles inline** pour les états de survol et sélection
- **Transitions CSS** pour une expérience fluide

### 2. Système de Verrouillage Visuel
- **Opacité réduite** pour les boutons désactivés
- **Styles distincts** pour les réponses données
- **Indicateurs visuels** (icônes, bordures) pour les réponses correctes

### 3. Progression Visuelle
- **Barre de progression** avec styles dynamiques
- **Classification des scores** avec couleurs conditionnelles
- **Animations** pour les transitions d'état

## Installation et Lancement

```bash
# Installation des dépendances
cd directives-game
npm install

# Lancement du serveur de développement
ng serve

# Ouverture dans le navigateur
# http://localhost:4200
```

## Points d'Apprentissage Clés

1. **`*ngIf`** permet un contrôle précis de l'affichage conditionnel
2. **`*ngFor`** facilite l'affichage de listes dynamiques
3. **`[ngClass]`** offre une gestion flexible des styles CSS
4. **`[ngStyle]`** permet des styles inline réactifs
5. **Combinaisons** de directives créent des interfaces riches et interactives

## Extensions Possibles

- Ajout de `*ngSwitch` pour des conditions multiples
- Implémentation de pipes personnalisés
- Création de directives d'attributs customisées
- Ajout d'animations Angular avancées

---

**FST - Département TI - Mohamed Lassoued**
*TP Angular - Directives Structurelles et Attributs*