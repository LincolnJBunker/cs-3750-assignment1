# CS 3750 - Assignment 1

A full-stack app with a React + Vite frontend and an Express + PostgreSQL backend.

## Prerequisites

Before you start, make sure you have these installed:

- **[Node.js](https://nodejs.org/)** (v20 or newer) - includes `npm`
- **[PostgreSQL](https://www.postgresql.org/download/)** (v14 or newer) - and make sure the Postgres server is running

To check what you have installed:

```bash
node -v
npm -v
psql --version
```

## 1. Clone the repo

```bash
git clone <repo-url>
cd cs3750-assignment-1
```

## 2. Install dependencies

This installs everything for both the frontend and backend (there's only one `package.json`):

```bash
npm install
```

## 3. Set up your environment file

Copy the example env file and fill in your own local Postgres credentials:

```bash
cp .env.example .env
```

Open `.env` and update it if needed:

```
PGHOST=localhost
PGPORT=5432
PGUSER=your_postgres_user
PGPASSWORD=your_postgres_password
PGDATABASE=cs3750_assignment1

PORT=3001
```

- `PGUSER` / `PGPASSWORD` should be a Postgres role that exists on your machine (often just your Mac username with no password if you installed Postgres via Homebrew).
- You do **not** need to create the `cs3750_assignment1` database yourself - the app creates it automatically the first time you run it (see next step).

## 4. Run the app

```bash
npm run dev
```

This single command will:
1. Run any pending database migrations (creating the database and tables if they don't exist yet)
2. Start the Express API server
3. Start the Vite dev server for the React frontend

Once it's running, open the app at:

```
http://localhost:5173
```

The frontend automatically proxies API requests to the backend, so you don't need to open the backend port separately.

## Troubleshooting

**"Is PostgreSQL running?" error on startup**
Your local Postgres server isn't running, or the `PG*` values in `.env` don't match a real Postgres user on your machine. Start Postgres (e.g. `brew services start postgresql`) and double check your `.env`.

**Port already in use**
Something else is using port `3001` (API) or `5173` (frontend). Stop the other process, or change `PORT` in `.env` for the API.

**Still stuck?**
Delete `node_modules` and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

## Useful scripts

| Command | What it does |
|---|---|
| `npm run dev` | Run migrations, then start backend + frontend together |
| `npm run migrate` | Run database migrations only |
| `npm run build` | Type-check and build the frontend for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |
