# Description

## Run in Dev mode

1. Clone repository.
2. Install dependencies with `pnpm i`
3. Modify the `.env.template` file to `.env` and change the environment variables.
4. Run the database with `docker compose up -d` (Docker Desktop is required).
5. Run Prisma migrations `pnpm dlx prisma migrate dev`
6. Run seed with `pnpm seed` to fill database with test information.
7. Run the project with `pnpm run dev`

## Run in Prod mode
