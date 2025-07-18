# Full Stack Template

This repository provides a starter template for a full stack TypeScript project.
It features a React + Tailwind frontend and a Node.js API using Express (with
Fastify compatibility). PostgreSQL is managed via Prisma ORM and authentication
uses JWT with optional OIDC providers.

## Features

- **Frontend**: React, TypeScript, Tailwind CSS powered by Vite
- **Backend**: Node.js, Express/Fastify, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: JWT/OIDC
- **Docker**: Oracle Linux 8 based containers
- **CI/CD**: GitHub Actions workflow
- **Code Generation**: integrate with OpenAI Codex for automation

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
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Prisma

```bash
npx prisma db push
```

## GitHub Actions

A basic workflow installs dependencies, runs lints and builds the project. Feel
free to extend it with deployment steps.

## OpenAI Codex

This repository is optimized for the OpenAI Codex agent to automate routine
tasks. See `AGENTS.md` for tips on how to interact with Codex.
