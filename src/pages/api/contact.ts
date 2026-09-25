import type { APIRoute } from 'astro';
import { insertContact } from '../../lib/db';
import { createRateLimiter, resolveClientKey } from '../../lib/rate-limit';

export const prerender = false;

const limiter = createRateLimiter({ windowMs: 60_000, max: 5 });

/**
 * POST /api/contact
 * Lab 05: validate JSON {name,email,message}, persist with insertContact, return 201.
 */
export const POST: APIRoute = async ({ request, clientAddress }) => {
  const clientKey = resolveClientKey(request, clientAddress);

  if (limiter.isRateLimited(clientKey)) {
    return new Response(JSON.stringify({ error: 'rate limited' }), {
      status: 429,
      headers: { 'content-type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const row = insertContact(body);
    return new Response(JSON.stringify(row), {
      status: 201,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err) {
    const raw = err instanceof Error ? err.message : 'error';
    if (raw.startsWith('NOT_IMPLEMENTED')) {
      return new Response(JSON.stringify({ error: raw }), {
        status: 501,
        headers: { 'content-type': 'application/json' },
      });
    }
    // Never leak raw SQL / stack / internal error text (D11 · #6).
    const message = raw.startsWith('VALIDATION') ? raw : 'invalid request';
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }
};
