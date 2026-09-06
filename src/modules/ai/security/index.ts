import type { APIContext } from 'astro';
import { isAllowedOrigin, isAllowedRequestOrigin } from './origin';
import { consumeRateLimit, getClientIp } from './rate-limit';
import { readSession } from './session';

export { requireSecret } from './env';
export { readLlmMessages } from './messages';
export { ensureSessionCookie } from './session';

function jsonError(message: string, status: number, headers?: Record<string, string>) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
}

export function applyCorsHeaders(request: Request, response: Response) {
  const origin = request.headers.get('origin');

  if (origin && isAllowedOrigin(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Vary', 'Origin');
  }

  return response;
}

export function guardLlmApiRequest(context: Pick<APIContext, 'cookies' | 'request'>) {
  if (!isAllowedRequestOrigin(context.request)) {
    return jsonError('Forbidden', 403);
  }

  const session = readSession(context.cookies);

  if (!session) {
    return jsonError('Unauthorized', 401);
  }

  if (!consumeRateLimit(session.id, getClientIp(context.request))) {
    return jsonError('Too many requests', 429, { 'Retry-After': '60' });
  }

  return null;
}
