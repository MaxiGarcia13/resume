import type { AiProviderConfig } from './types';
import { requireSecret } from '../security';

export const openRouterProvider: AiProviderConfig = {
  getClientOptions: (request) => ({
    apiKey: requireSecret('OPEN_ROUTER_API_KEY'),
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
      'HTTP-Referer': new URL(request.url).origin,
      'X-Title': 'Maxi Garcia CV',
    },
  }),
  getCreateParams: (messages) => ({
    model: 'openrouter/free',
    messages,
    stream: true,
    // OpenRouter-specific: omit reasoning tokens from the stream.
    reasoning: { exclude: true },
  }),
};
