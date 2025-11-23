# Exercice 9 : Outils & Bonnes pratiques

Ce fichier documente la configuration des outils pour le développement TypeScript.

## Configuration réalisée

### 1. TypeScript avec strict mode
- ✅ `tsc --init` exécuté
- ✅ `"strict": true` activé dans `tsconfig.json`
- ✅ Options strictes supplémentaires activées :
  - `noUncheckedIndexedAccess`
  - `exactOptionalPropertyTypes`
  - `noImplicitReturns`
  - `noImplicitOverride`
  - `noUnusedLocals`
  - `noUnusedParameters`
  - `noFallthroughCasesInSwitch`

### 2. ESLint installé et configuré
- ✅ Packages installés : `eslint`, `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`
- ✅ Configuration dans `.eslintrc.json` avec :
  - Règles TypeScript recommandées
  - Intégration avec tsconfig.json
  - Règles de style et qualité de code

### 3. Prettier installé et configuré
- ✅ Package `prettier` installé
- ✅ Configuration dans `.prettierrc.json` avec :
  - Formatage cohérent
  - Intégration avec TypeScript
  - Style de code uniforme

## Commandes disponibles

```bash
# Compilation TypeScript
npm run build

# Linting
npm run lint

# Formatage du code
npm run format

# Exécution en mode développement
npm run dev
```

## Bonnes pratiques appliquées

1. **Types stricts** : Utilisation de `strict: true` pour une vérification maximale
2. **Linting** : Règles ESLint pour la qualité du code
3. **Formatage** : Prettier pour un style cohérent
4. **Organisation** : Structure modulaire du projet
5. **Documentation** : Commentaires JSDoc et README détaillés