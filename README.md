# Atemschutzverwaltung

Dieses Projekt entwickelt eine Verwaltungssoftware für Atemschutzgeräte und
Masken nach dem Konzept aus `concept.md`. Basis ist ein Full-Stack-Template mit
React/Tailwind im Frontend und einer Express API. PostgreSQL wird über Prisma
angebunden und die Authentifizierung nutzt JWT.

## Features

- **Frontend**: React, TypeScript, Tailwind CSS powered by Vite
- **Backend**: Node.js, Express/Fastify, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: JWT/OIDC
- **Docker**: Oracle Linux 8 based containers
- **CI/CD**: GitHub Actions workflow
- **Code Generation**: integrate with OpenAI Codex for automation
- **Fire Stations**: CRUD via Prisma and Express
- **Equipment**: Inventarverwaltung mit Seriennummern
- **Masks**: Verwaltung von Atemschutzmasken
- **Inspections**: Prüfprotokolle für Geräte und Masken

## Getting Started

1. Copy `.env.example` to `.env` and fill in the variables.
2. Run `docker compose up --build` to start the stack.
3. Access the frontend at `http://localhost:5173` and the API at
   `http://localhost:3000`.

## Development

### Backend

```bash
cd backend
npm install
npm run dev
npm run lint
```

### Frontend

```bash
cd frontend
npm install
npm run dev
npm run lint
```

### Prisma

```bash
npx prisma db push
```

## Deployment auf Vercel

1. Erstelle ein Konto auf [vercel.com](https://vercel.com/) und importiere
   dieses Repository.
2. Beim Import erkennt Vercel die bereitgestellte `vercel.json`. Das Frontend
   wird mit `npm run build` in `frontend` gebaut und als statische Dateien
   ausgeliefert.
3. Die Express-API wird als Serverless Function unter `/api` bereitgestellt.
4. Lege in den Projekteinstellungen die notwendigen Umgebungsvariablen an,
   z.B. `DATABASE_URL` und `JWT_SECRET`.
5. Starte den ersten Deploy. Anschließend ist das Frontend über die vergebene
   Vercel‑URL erreichbar und API‑Aufrufe laufen über `/api`.

## GitHub Actions

A basic workflow installs dependencies, runs lints and builds the project. Feel
free to extend it with deployment steps.

## OpenAI Codex

This repository is optimized for the OpenAI Codex agent to automate routine
tasks. See `AGENTS.md` for tips on how to interact with Codex.
