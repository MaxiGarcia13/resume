import type { APIContext } from 'astro';
import { jsonError } from '@/http';
import { isValidAccessToken, readAccessToken } from './access-token';

export function guardLlmApiRequest(context: Pick<APIContext, 'cookies'>) {
  if (!isValidAccessToken(readAccessToken(context.cookies))) {
    return jsonError('Unauthorized', 401);
  }

  return null;
}
