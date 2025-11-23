# 🎮 Jeu de Quiz Interactif - Angular

## 📋 Cahier des Charges Implémenté

Cette application Angular implémente **toutes les fonctionnalités demandées** dans le cahier des charges :

### ✅ **Fonctionnalités Principales**

#### 1. **Gestion des Questions**
- ✅ Questions à choix multiples
- ✅ Questions à saisie libre (input)
- ✅ Base de données de questions avec réponses correctes
- ✅ Affichage dynamique avec interpolation `{{ }}`

#### 2. **Système de Scoring**
- ✅ +10 points pour chaque bonne réponse
- ✅ -5 points pour chaque mauvaise réponse
- ✅ Score affiché en temps réel
- ✅ Statistiques complètes (bonnes/mauvaises réponses)

### ✅ **Techniques de Binding Utilisées**

#### **1. Interpolation** `{{ }}`
- Affichage du texte des questions
- Affichage du score et des statistiques
- Affichage du temps restant

#### **2. Property Binding** `[propriété]`
- `[disabled]` pour désactiver les boutons après réponse
- `[class.selected]` pour styliser la réponse sélectionnée
- `[class.correct]` et `[class.incorrect]` pour les couleurs

#### **3. Event Binding** `(événement)`
- `(click)` pour les boutons de réponse
- `(click)` pour valider les réponses saisies
- `(keyup.enter)` pour validation avec Entrée

#### **4. Two-Way Data Binding** `[(ngModel)]`
- Champ de saisie pour les réponses écrites
- Liaison bidirectionnelle avec la propriété `inputAnswer`

### ✅ **Défis Implémentés**

#### **Défi 1 : Blocage des réponses** 🔒
- ❌ Impossibilité de répondre deux fois à la même question
- ✅ Boutons désactivés après sélection
- ✅ Champs de saisie désactivés après validation

#### **Défi 2 : Interface temps réel** 📊
- ✅ Affichage du nombre de bonnes réponses
- ✅ Affichage du nombre de mauvaises réponses  
- ✅ Score mis à jour instantanément
- ✅ Progression de la question actuelle

#### **Défi 3 : Chronomètre** ⏰
- ✅ Compte à rebours de 15 secondes par question
- ✅ Animation visuelle quand temps faible (≤5s)
- ✅ Réponse automatiquement incorrecte si temps écoulé
- ✅ Arrêt automatique du timer après réponse

### 🏗️ **Architecture des Composants**

```
src/app/
├── models/
│   └── quiz.models.ts        # Interfaces TypeScript
├── home/                     # Page d'accueil
│   ├── home.ts
│   ├── home.html
│   └── home.css
├── game/                     # Jeu principal
│   ├── game.ts              # Logique complète du jeu
│   ├── game.html            # Interface utilisateur
│   └── game.css             # Styles responsive
├── question/                 # Composant question (préparé)
├── score/                   # Composant score (préparé)
└── app.*                    # Composant racine + routes
```

### 🎯 **Fonctionnalités Avancées**

#### **Interface Utilisateur**
- 🎨 Design moderne et responsive
- 🌈 Animations CSS (pulse pour le timer)
- 📱 Compatible mobile et desktop
- 🎯 Feedback visuel immédiat

#### **Logique de Jeu**
- 🔄 Mélange automatique des questions
- 🏆 Calcul automatique du taux de réussite
- 🔁 Possibilité de rejouer
- 🏠 Retour à l'accueil

#### **Gestion d'État**
- 📊 Suivi complet des statistiques
- ⏱️ Gestion asynchrone du timer
- 💾 État persistant pendant la session
- 🔄 Réinitialisation propre

### 🧪 **Types de Questions Implémentées**

#### **Questions à Choix Multiple**
```typescript
{
  question: 'Quel est le plus grand océan du monde ?',
  options: ['Pacifique', 'Atlantique', 'Indien', 'Arctique'],
  reponse: 'Pacifique',
  type: 'multiple'
}
```

#### **Questions à Saisie Libre**
```typescript
{
  question: 'Combien fait 5 + 3 ?',
  options: [],
  reponse: '8',
  type: 'input'
}
```

### 🚀 **Comment Utiliser**

1. **Installation**
   ```bash
   cd quiz-game
   npm install
   ```

2. **Lancement**
   ```bash
   ng serve
   ```

3. **Utilisation**
   - Ouvrir http://localhost:4200
   - Cliquer sur "Commencer le Quiz"
   - Répondre aux questions dans le temps imparti
   - Consulter les résultats finaux

### 📊 **Statistiques en Temps Réel**

L'application affiche constamment :
- **Score actuel** (points accumulés)
- **Question courante** (x/total)
- **Bonnes réponses** (compteur vert)
- **Mauvaises réponses** (compteur rouge)
- **Temps restant** (avec animations)
- **Taux de réussite final** (pourcentage)

### 🔧 **Technologies Utilisées**

- **Angular 18+** (version zoneless)
- **TypeScript** (interfaces strictes)
- **CSS3** (animations et responsive)
- **RxJS** (gestion asynchrone)
- **Angular Router** (navigation)
- **FormsModule** (two-way binding)

### 🎖️ **Conformité au Cahier des Charges**

✅ **100% des exigences respectées**
- ✅ Interpolation et property binding
- ✅ Event binding pour les réponses
- ✅ Two-way data binding avec ngModel  
- ✅ Système de scoring fonctionnel
- ✅ Tous les défis implémentés
- ✅ Interface utilisateur complète
- ✅ Code structuré et documenté

Cette application constitue un **exemple complet et fonctionnel** d'utilisation des techniques de data binding Angular dans un contexte ludique et interactif.