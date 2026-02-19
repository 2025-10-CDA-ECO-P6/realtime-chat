# VEILLE TECHNIQUE / Justification des Choix

## Pourquoi cette Stack ?

### 1. Monorepo (pnpm)
**Pourquoi ?** Pour centraliser la gestion des dépendances et faciliter le partage de code (si besoin à l'avenir) entre le front et le back. `pnpm` est choisi pour sa rapidité et son efficacité disque (symlinks) par rapport à npm/yarn.

### 2. Frontend : Vite + React
**Pourquoi ?**
- **Vite** : Build ultra-rapide et HMR (Hot Module Replacement) instantané, critique pour une itération rapide en startup mode.
- **React** : Écosystème riche, composants réutilisables, idéal pour une UI dynamique comme un chat.
- **SCSS + BEM** : SCSS offre la puissance (mixins, variables) et BEM garantit la maintenabilité du CSS sur le long terme sans conflits.

### 3. Backend : Express + Socket.IO
**Pourquoi ?**
- **Express** : Standard industriel, minimaliste, robuste.
- **Socket.IO** : Solution éprouvée pour le temps réel (WebSockets avec fallback polling), gère nativement les "rooms" et la reconnexion. Essentiel pour la fiabilité demandée (J1).

### 4. Déploiement : Render & Docker
**Pourquoi ?**
- **Docker** : "Write once, run anywhere". Assure que l'environnement de dev est identique à la prod.
- **Render** : Simplicité du déploiement via Blueprint (`render.yaml`). Offre SSL, CI/CD basique, et scalabilité automatique.

## Alternatives Considérées

- **Next.js** : Rejeté pour V1 car la complexité du SSR n'était pas nécessaire pour une app "Concept" purement client-side (SPA) et temps réel, et pour garder une séparation nette API/Front.
- **Tailwind CSS** : Rejeté pour respecter la demande explicite de conventions SCSS/BEM et pour avoir un contrôle total sur le design "asymétrique" sans surcharge de classes utilitaires.
- **Fastify** : Considéré pour la perf, mais Express reste plus standard pour une équipe qui doit itérer vite.

## Sécurité & Performance

- **Helmet** : Sécurisation des headers HTTP.
- **Nginx** : Utilisé comme reverse proxy pour servir les fichiers statiques (performant) et gérer le routing API, déchargeant Node.js de ces tâches.
- **Multi-stage builds** : Réduction drastique de la taille des images Docker (dist seulement).
