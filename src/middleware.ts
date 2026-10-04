import { defineMiddleware } from 'astro:middleware';
import { applyCorsHeaders, ensureAccessTokenCookie, guardLlmApiRequest } from '@/modules/ai/security';

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.url.pathname.startsWith('/api/v1/')) {
    const blocked = guardLlmApiRequest(context);

    if (blocked) {
      return applyCorsHeaders(context.request, blocked);
    }

    return applyCorsHeaders(context.request, await next());
  }

  const accept = context.request.headers.get('accept') ?? '';

  if (accept.includes('text/html')) {
    ensureAccessTokenCookie(context.cookies);
  }

  return next();
});
