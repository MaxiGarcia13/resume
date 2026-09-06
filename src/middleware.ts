import { defineMiddleware } from 'astro:middleware';
import { applyCorsHeaders, ensureSessionCookie, guardLlmApiRequest } from '@/modules/ai/security';

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.url.pathname.startsWith('/api/v1/')) {
    ensureSessionCookie(context.cookies);

    const blocked = guardLlmApiRequest(context);

    if (blocked) {
      return applyCorsHeaders(context.request, blocked);
    }

    return applyCorsHeaders(context.request, await next());
  }

  const accept = context.request.headers.get('accept') ?? '';

  if (accept.includes('text/html')) {
    ensureSessionCookie(context.cookies);
  }

  return next();
});
