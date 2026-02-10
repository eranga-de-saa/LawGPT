import { LangCache } from "@redis-ai/langcache";

export async function getFromCache(query: string): Promise<string | null> {
  const cache = new LangCache({
    serverURL: process.env.REDIS_HOST as string,
    cacheId: process.env.REDIS_CACHE_ID as string,
    apiKey: process.env.REDIS_API_KEY as string,
  });

  const res = await cache.search({
    prompt: query,
  });

  if (!res) {
    throw new Error("Failed to get from cache");
  }

  return res?.data[0]?.response || null;
}

export async function setCache(query: string, response: string): Promise<void> {
  const cache = new LangCache({
    serverURL: process.env.REDIS_HOST as string,
    cacheId: process.env.REDIS_CACHE_ID as string,
    apiKey: process.env.REDIS_API_KEY as string,
  });

  const res = await cache.set({
    prompt: query,
    response: response,
  });

  if (!res) {
    throw new Error("Failed to set cache");
  }
}
