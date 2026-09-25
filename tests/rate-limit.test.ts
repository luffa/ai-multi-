import { describe, it, expect, afterEach } from 'vitest';
import { createRateLimiter, resolveClientKey } from '../src/lib/rate-limit';

function req(headers: Record<string, string> = {}): Request {
  return new Request('http://localhost/api/guestbook', { headers });
}

describe('createRateLimiter', () => {
  it('allows up to max requests within the window', () => {
    const limiter = createRateLimiter({ windowMs: 1000, max: 3 });
    expect(limiter.isRateLimited('a')).toBe(false);
    expect(limiter.isRateLimited('a')).toBe(false);
    expect(limiter.isRateLimited('a')).toBe(false);
    expect(limiter.isRateLimited('a')).toBe(true);
  });

  it('resets after the window elapses', async () => {
    const limiter = createRateLimiter({ windowMs: 30, max: 1 });
    expect(limiter.isRateLimited('b')).toBe(false);
    expect(limiter.isRateLimited('b')).toBe(true);
    await new Promise((r) => setTimeout(r, 40));
    expect(limiter.isRateLimited('b')).toBe(false);
  });

  it('keeps separate buckets per key', () => {
    const limiter = createRateLimiter({ windowMs: 1000, max: 1 });
    expect(limiter.isRateLimited('x')).toBe(false);
    expect(limiter.isRateLimited('y')).toBe(false);
    expect(limiter.isRateLimited('x')).toBe(true);
    expect(limiter.isRateLimited('y')).toBe(true);
  });

  it('prunes keys with no timestamps left in the window', async () => {
    const limiter = createRateLimiter({ windowMs: 20, max: 5 });
    limiter.isRateLimited('stale');
    expect(limiter._size()).toBe(1);
    await new Promise((r) => setTimeout(r, 30));
    // Triggers a prune pass as a side effect of checking a different key.
    limiter.isRateLimited('other');
    expect(limiter._size()).toBe(1);
  });
});

describe('resolveClientKey', () => {
  const originalTrustProxy = process.env.TRUST_PROXY;

  afterEach(() => {
    if (originalTrustProxy === undefined) {
      delete process.env.TRUST_PROXY;
    } else {
      process.env.TRUST_PROXY = originalTrustProxy;
    }
  });

  it('uses clientAddress when TRUST_PROXY is not true', () => {
    delete process.env.TRUST_PROXY;
    const key = resolveClientKey(req({ 'x-forwarded-for': '1.1.1.1, 2.2.2.2' }), '9.9.9.9');
    expect(key).toBe('9.9.9.9');
  });

  it('uses the right-most X-Forwarded-For entry when TRUST_PROXY=true', () => {
    process.env.TRUST_PROXY = 'true';
    const key = resolveClientKey(req({ 'x-forwarded-for': '1.1.1.1, 2.2.2.2, 3.3.3.3' }), '9.9.9.9');
    expect(key).toBe('3.3.3.3');
  });

  it('falls back to clientAddress when TRUST_PROXY=true but header is missing', () => {
    process.env.TRUST_PROXY = 'true';
    const key = resolveClientKey(req(), '9.9.9.9');
    expect(key).toBe('9.9.9.9');
  });

  it('falls back to "unknown" when both are missing', () => {
    delete process.env.TRUST_PROXY;
    const key = resolveClientKey(req(), undefined);
    expect(key).toBe('unknown');
  });
});
