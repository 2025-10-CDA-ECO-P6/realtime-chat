# Guide de Contribution

Merci de vouloir contribuer à Event Concept V1 ! Voici les règles et conventions à suivre pour maintenir la qualité "Prod-Ready" du projet.

## 🛠 Workflow de Développement

1. **Branchement** : Créez une branche pour chaque feature (`feat/ma-feature`) ou fix (`fix/mon-bug`).
2. **Commit** : Utilisez des messages clairs (Conventional Commits préférés).
   - `feat: ajout du layout asymétrique`
   - `fix: correction du scroll automatique`
3. **Pull Request** : Toute modification doit passer par une PR validée par la CI (Lint + Build).

## 🎨 Conventions CSS (SCSS + BEM)

Nous utilisons la méthodologie **BEM** (Block Element Modifier) pour nommer nos classes CSS.

- **Block** : `.chat`
- **Element** : `.chat__message`
- **Modifier** : `.chat__message--self`

### Structure des fichiers SCSS

- `_variables.scss` : Couleurs, fonts, breakpoints.
- `_mixins.scss` : Mixins pour le responsive (`@include mobile`).
- `layout.scss` : Styles globaux de la structure.
- `components.scss` : Styles spécifiques aux composants.

**Règle d'or** : Ne jamais utiliser de styles en ligne (inline styles) sauf pour des valeurs dynamiques très spécifiques.

## 🚀 Scripts Disponibles

Depuis la racine du monorepo :

- `pnpm dev` : Lance tout l'environnement de dev.
- `pnpm build` : Construit les paquets pour la production.
- `pnpm lint` : Vérifie la qualité du code (ESLint).

## 🧪 Tests

Pour l'instant, la CI vérifie le linting. Assurez-vous que `pnpm lint` passe avant de pousser votre code.
