# VEILLE TECHNIQUE / Justification des Choix

## Pourquoi cette Stack ?

### 1. Monorepo (pnpm)
**Pourquoi ?** Parce que c'était demandé.

### 2. Frontend : Vite + React
**Pourquoi ?**
- **Vite** : Parce que c'était demandé.
- **React** : Parce que c'était demandé.
- **SCSS + BEM** : Pour la flexibilité du design et parce que j'ai réutiliser le frontend d'un ancien projet, l'éco conception :)

### 3. Backend : Express + Socket.IO
**Pourquoi ?**
- **Express** : Parce que c'était demandé.
- **Socket.IO** : Parce que c'était demandé.

### 4. Déploiement : Render & Docker
**Pourquoi ?**
- **Docker** : Parce que c'était demandé.
- **Render** : Parce que c'était demandé (très peu pratique a utiliser, mais ça marche).

## Alternatives Existantes

- **Next.js** : La complexité du SSR n'était pas nécessaire pour une app "Concept" purement client-side (SPA) et temps réel, et pour garder une séparation nette API/Front.
- **Tailwind CSS** : Vu qu'on venait de voir le sass c'était l'occasion de s'entrainer.
- **Fastify** : Je ne connaissais pas, j'ai préféré rester sur Express (et express était demandé dans le brief).

## Sécurité & Performance

- **Helmet** : Sécurisation des headers HTTP.
- **Nginx** : Utilisé comme reverse proxy pour servir les fichiers statiques (performant) et gérer le routing API.
- **Multi-stage builds** : Réduction drastique de la taille des images Docker.
