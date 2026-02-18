import { getLangCache } from "../clients/clients";

export async function getFromCache(query: string): Promise<string | null> {
  const cache = getLangCache();

  const res = await cache.search({
    prompt: query,
  });

  if (!res) {
    throw new Error("Failed to get from cache");
  }

  return res?.data[0]?.response || null;
}

export async function setCache(query: string, response: string): Promise<void> {
  const cache = getLangCache();

  const res = await cache.set({
    prompt: query,
    response: response,
  });

  if (!res) {
    throw new Error("Failed to set cache");
  }
}
