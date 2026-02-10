# LawGPT_RE

LawGPT_RE is a full-stack RAG (retrieval-augmented generation) app for answering legal questions. The backend retrieves case context from Pinecone, calls an LLM to draft the answer, and caches responses in Redis for faster repeats. The frontend is a Vite + React UI that hits the backend API.

## What This App Does

1. User submits a legal question from the frontend.
2. Backend checks Redis (LangCache) for a cached response.
3. If not cached, it embeds the query with Hugging Face, retrieves top-k relevant chunks from Pinecone, and sends those as context to OpenAI.
4. The LLM response is returned and stored in Redis for future queries.

## RAG Tools (How Retrieval Works)

RAG is implemented in `Back-end/src/services/vector.service.ts`:

- **Embeddings:** Hugging Face Inference API (`BAAI/bge-base-en-v1.5`) converts the query into a vector.
- **Vector Search:** Pinecone index is queried using the query vector and `topK` matches are returned with metadata.
- **Context Build:** Matching text chunks are concatenated into a single context string.

This context string is injected into the LLM prompt in `Back-end/src/services/llm.service.ts`.

## Redis Caching (LangCache)

Caching is implemented in `Back-end/src/services/cache.service.ts` using `@redis-ai/langcache`:

- `getFromCache(query)` searches Redis for a prior response to the same prompt.
- `setCache(query, response)` stores the model response keyed by prompt.

The cache is checked before calling the LLM, so repeated questions return quickly and reduce API costs.

## Tech Stack

- **Frontend:** React, Vite, TypeScript
- **Backend:** Node.js, Express, TypeScript
- **RAG:** Hugging Face Inference API + Pinecone
- **LLM:** OpenAI Responses API
- **Cache:** Redis LangCache
- **Infra:** Docker, docker-compose

## Project Structure

- `Back-end/` Express API, RAG pipeline, caching, Pinecone seeding script
- `Front-end/` React UI
- `docker-compose.yml` Local dev orchestration

## API

- `POST /api/message`
  - Body: `{ "query": "<user question>" }`
  - Response: `{ "reply": "<model answer>" }`

## Environment Variables

Backend (`Back-end/.env`):

- `PORT` (optional, default `3000`)
- `OPENAI_API_key`
- `HF_API_KEY`
- `PINECONE_API_KEY`
- `PINECONE_INDEX`
- `REDIS_HOST`
- `REDIS_CACHE_ID`
- `REDIS_API_KEY`
- `CSV_PATH` (path to CSV for seeding)

Frontend (`Front-end/.env`):

- `VITE_BACKEND_HOST` (default `localhost`)

Note: Do not commit real API keys. Use local `.env` files or secret managers.

## Setup (Local)

1. Install dependencies:

```bash
cd Back-end && npm install
cd ../Front-end && npm install
```

2. Run the backend:

```bash
cd Back-end
npm run dev
```

3. Run the frontend:

```bash
cd Front-end
npm run dev
```

Frontend will be at `http://localhost:5173`, backend at `http://localhost:3000`.

## Seed Pinecone Index

This uses `Back-end/src/scripts/loadDb.ts` to embed and upsert CSV case data:

```bash
cd Back-end
npm run seed
```

Make sure `CSV_PATH`, `PINECONE_API_KEY`, `PINECONE_INDEX`, and `HF_API_KEY` are set.

## Docker

```bash
docker-compose up --build
```

This will build and run both services using the Dockerfiles in `Back-end/` and `Front-end/`.

## Notes

- The backend uses the OpenAI Responses API via `openai` SDK in `Back-end/src/services/llm.service.ts`.
- Caching is prompt-based, so small changes in wording can bypass the cache.
