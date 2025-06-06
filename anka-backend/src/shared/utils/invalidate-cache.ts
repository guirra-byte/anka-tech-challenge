import { redis } from "../infra/lib/cache/index.ts";

export async function invalidateCachePrefix(prefix: string) {
  const pattern = `${prefix}:*`;
  let cursor = "0";
  const keysToDelete: string[] = [];

  try {
    do {
      const [nextCursor, keys] = await redis.scan(cursor, 'MATCH', pattern, 'COUNT', '100');

      if (keys.length > 0) {
        keysToDelete.push(...keys);
      }

      cursor = nextCursor;
    } while (cursor !== "0");

    if (keysToDelete.length === 0) {
      console.log(`[CACHE] No keys found with prefix "${prefix}"`);
      return;
    }

    await redis.del(...keysToDelete);

    console.log(`[CACHE] Invalidated ${keysToDelete.length} key(s) with prefix "${prefix}"`);
  } catch (error) {
    console.error(`[CACHE] Error invalidating keys with prefix "${prefix}":`, error);
  }
}