# BriefChat V1

> **Chat en temps réel - Proof of Concept (V1)**
> Plateforme de chat en temps réel, conçue pour être "Prod-Ready" dès le premier jour.

## Table des Matières

- [Aperçu](#aperçu)
- [Architecture](#architecture)
- [Prérequis](#prérequis)
- [Installation & Démarrage](#installation--démarrage)
- [Déploiement (Render)](#déploiement-render)
- [Documentation](#documentation)

## Aperçu

Ce projet est un **Monorepo** géré avec `pnpm`, séparant clairement le Frontend et le Backend. Il est conçu pour être déployé instantanément sur Render grâce à l'Infrastructure-as-Code (`render.yaml`).

### Fonctionnalités Clés
- **UI Asymétrique** : Design sobre mais structuré selon des principes de grille asymétrique.
- **Temps Réel** : Chat multi-rooms via Socket.IO.
- **Sécurité** : Helmet, Rate Limiting, CORS configuré.
- **Docker** : Conteneurisation complète (Multi-stage build pour le web).

## Architecture

```
/
├── api/                 # Backend Express + Socket.IO
│   ├── src/
│   │   ├── socket/      # Logique temps réel
│   │   ├── server.js    # Point d'entrée
│   └── Dockerfile       # Image Node Alpine
│
├── web/                 # Frontend React + Vite
│   ├── src/
│   │   ├── styles/      # SASS + Architecture BEM
│   │   ├── layouts/     # Composants de mise en page asymétrique
│   │   ├── components/  # Composants UI (Chat, etc.)
│   └── Dockerfile       # Build React -> Nginx Alpine
│
├── pnpm-workspace.yaml  # Configuration Monorepo
├── render.yaml          # Blueprint de déploiement
```

## Prérequis

- **Node.js** v18+
- **pnpm** (`npm install -g pnpm`)
- **Docker** (pour le build local ou la simulation prod)

## Installation & Démarrage

1. **Cloner le dépôt**
   ```bash
   git clone <repo-url>
   cd briefchat
   ```

2. **Installer les dépendances**
   ```bash
   pnpm install
   ```

3. **Lancer en mode développement**
   Lance le frontend et le backend en parallèle :
   ```bash
   pnpm dev
   ```
   - Frontend : `http://localhost:5173`
   - Backend : `http://localhost:3000`

4. **Linter le code**
   ```bash
   pnpm lint
   ```

## Optimisation Docker

Le projet utilise des **builds multi-stage** pour le Frontend afin de minimiser la taille de l'image finale :
1. **Builder** : Node.js compile les assets (Vite).
2. **Runner** : Nginx Alpine (~20MB) sert les fichiers statiques.

Configuration Nginx incluse pour faire proxy vers l'API et gérer les WebSockets (`/socket.io`).

## Déploiement Render

Le fichier `render.yaml` ("Blueprint") automatise le déploiement.
1. Connectez votre compte Render à ce dépôt GitHub.
2. Créez un nouveau **Blueprint Instance**.
3. Render détectera `render.yaml` et déploiera automatiquement :
   - Le service Web (Docker)
   - Le service API (Docker/Node)

## Ressources & Performance

- **CPU/RAM** : Les services sont configurés pour tourner sur les instances "Free" ou "Starter" de Render.
- **Cache** : Nginx est configuré pour servir les assets statiques efficacement.
- **Latence** : Les WebSockets assurent une latence minimale pour le chat.

---

**Auteur** : Hugo le goat
**Licence** : ISC
