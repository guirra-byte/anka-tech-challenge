import { redis } from "../lib/cache/index.ts";

export const lookupCache = async (requestCacheKey: string) => {
  try {
    const cachedReply = await redis.get(requestCacheKey);
    return cachedReply;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
};
