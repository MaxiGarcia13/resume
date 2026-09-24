import type { AiProviderConfig } from './types';
import { requireSecret } from '../security';

export const groqProvider: AiProviderConfig = {
  getClientOptions: () => ({
    apiKey: requireSecret('GROQ_API_KEY'),
    baseURL: 'https://api.groq.com/openai/v1',
  }),
  getCreateParams: (messages) => ({
    model: 'openai/gpt-oss-120b',
    messages,
    stream: true,
  }),
};
