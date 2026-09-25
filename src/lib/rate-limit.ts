/**
 * Shared in-memory sliding-window rate limiter.
 * Separate bucket per (limiter instance) so contact/guestbook don't share a budget.
 */

export type RateLimiterOptions = {
  windowMs: number;
  max: number;
};

export function createRateLimiter({ windowMs, max }: RateLimiterOptions) {
  const hits = new Map<string, number[]>();

  function prune(now: number): void {
    for (const [key, timestamps] of hits) {
      const recent = timestamps.filter((t) => now - t < windowMs);
      if (recent.length === 0) {
        hits.delete(key);
      } else {
        hits.set(key, recent);
      }
    }
  }

  return {
    isRateLimited(key: string): boolean {
      const now = Date.now();
      prune(now);
      const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
      recent.push(now);
      hits.set(key, recent);
      return recent.length > max;
    },
    /** Exposed for tests only. */
    _size(): number {
      return hits.size;
    },
  };
}

/**
 * Resolve the client identity used for rate limiting.
 * Behind a reverse proxy (Coolify/Traefik) `clientAddress` is the proxy's own
 * IP for every request, so everyone would share one bucket. When TRUST_PROXY=true
 * we take the right-most X-Forwarded-For entry — the hop nearest to us, appended
 * by our own trusted proxy — never the left-most entry, which any client can forge.
 */
export function resolveClientKey(request: Request, clientAddress: string | undefined): string {
  const trustProxy = process.env.TRUST_PROXY === 'true';
  if (trustProxy) {
    const xff = request.headers.get('x-forwarded-for');
    if (xff) {
      const parts = xff.split(',').map((p) => p.trim()).filter(Boolean);
      if (parts.length > 0) {
        return parts[parts.length - 1];
      }
    }
  }
  return clientAddress ?? 'unknown';
}
