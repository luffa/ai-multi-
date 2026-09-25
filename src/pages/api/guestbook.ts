import type { APIRoute } from 'astro';
import { insertGuestbook, listGuestbook } from '../../lib/db';
import { createRateLimiter, resolveClientKey } from '../../lib/rate-limit';

export const prerender = false;

const limiter = createRateLimiter({ windowMs: 60_000, max: 5 });

export const GET: APIRoute = async () => {
  try {
    const rows = listGuestbook();
    // #6/D6: never expose email — rows already omit it (guestbook table has no email column).
    const entries = rows.map(({ name, message, created_at }) => ({ name, message, created_at }));
    return new Response(JSON.stringify({ entries }), {
      status: 200,
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
    return new Response(JSON.stringify({ error: 'internal error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
};

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
    const row = insertGuestbook(body);
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
    const message = raw.startsWith('VALIDATION') ? raw : 'invalid request';
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }
};
