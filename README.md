# product-ai

An AI-powered natural language interface for querying e-commerce data (products, users, orders) from a PostgreSQL database. Ask questions in plain English and get structured answers powered by Claude.

## Prerequisites

- Node.js 18+
- PostgreSQL database

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   Copy `.env.example` to `.env` and fill in your values:

   ```bash
   cp .env.example .env
   ```

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/dbname
   PORT=3000
   ```

3. **Push the database schema**

   ```bash
   npm run db:push
   ```

4. **Seed the database** (optional — loads sample products, users, and orders)

   ```bash
   npm run db:seed
   ```

## Running the server

```bash
# Production
npm start

# Development (auto-restarts on file changes)
npm run dev
```

The server starts on `http://localhost:3000` (or the `PORT` from your `.env`).

## API

### Health check

```
GET /health
```

### Ask a natural language question

```
GET /api/ai/query?question=<your question>
```

**Example:**

```bash
curl "http://localhost:3000/api/ai/query?question=What%20are%20the%20top%205%20most%20expensive%20products?"
```

**Response:**

```json
{
  "answer": "Here are the top 5 most expensive products: ..."
}
```

### List products

```
GET /api/products
```

## Database commands

| Command | Description |
|---|---|
| `npm run db:push` | Push schema changes to the database |
| `npm run db:generate` | Generate migration files |
| `npm run db:migrate` | Run migrations |
| `npm run db:seed` | Seed the database with sample data |
