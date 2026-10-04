import type { APIContext } from 'astro';
import { jsonError } from '@/http';
import { isValidAccessToken, readAccessToken } from './access-token';
import { isAllowedOrigin, isAllowedRequestOrigin } from './origin';
import { consumeRateLimit, getClientIp } from './rate-limit';

export { ensureAccessTokenCookie } from './access-token';
export { requireSecret } from './env';

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

  if (!isValidAccessToken(readAccessToken(context.cookies))) {
    return jsonError('Unauthorized', 401);
  }

  if (!consumeRateLimit(getClientIp(context.request))) {
    return jsonError('Too many requests', 429, { 'Retry-After': '60' });
  }

  return null;
}
