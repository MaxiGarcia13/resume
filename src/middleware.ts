import { defineMiddleware } from 'astro:middleware';
import { ensureAccessTokenCookie, guardLlmApiRequest } from '@/modules/ai/security';

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.url.pathname.startsWith('/api/v1/')) {
    const blocked = guardLlmApiRequest(context);

    if (blocked) {
      return blocked;
    }

    return next();
  }

  const accept = context.request.headers.get('accept') ?? '';

  if (accept.includes('text/html')) {
    ensureAccessTokenCookie(context.cookies);
  }

  return next();
});
