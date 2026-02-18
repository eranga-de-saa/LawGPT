import { Pinecone } from "@pinecone-database/pinecone";
import { InferenceClient } from "@huggingface/inference";
import OpenAI from "openai";
import { LangCache } from "@redis-ai/langcache";

let pinecone: Pinecone | null = null;
let pineconeIndex: ReturnType<Pinecone["index"]> | null = null;
let hf: InferenceClient | null = null;
let openaiClient: OpenAI | null = null;
let cache: LangCache | null = null;

/* ---------- Pinecone ---------- */
export function getPineconeIndex() {
  requireEnv("PINECONE_API_KEY");
  requireEnv("PINECONE_INDEX");

  if (!pinecone) {
    pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });

    pineconeIndex = pinecone.index(process.env.PINECONE_INDEX!);
  }

  return pineconeIndex!;
}

/* ---------- HuggingFace ---------- */
export function getHFClient() {
  requireEnv("HF_API_KEY");

  if (!hf) {
    hf = new InferenceClient(process.env.HF_API_KEY!);
  }

  return hf;
}

/* ---------- OpenAI ---------- */
export function getOpenAIClient() {
  requireEnv("OPENAI_API_KEY");

  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });
  }

  return openaiClient;
}

/* ---------- Redis / LangCache ---------- */
export function getLangCache() {
  requireEnv("REDIS_HOST");
  requireEnv("REDIS_CACHE_ID");
  requireEnv("REDIS_API_KEY");

  if (!cache) {
    cache = new LangCache({
      serverURL: process.env.REDIS_HOST!,
      cacheId: process.env.REDIS_CACHE_ID!,
      apiKey: process.env.REDIS_API_KEY!,
    });
  }

  return cache;
}

/* ---------- Helper ---------- */
function requireEnv(name: string) {
  if (!process.env[name]) {
    throw new Error(`Missing required env var: ${name}`);
  }
}
