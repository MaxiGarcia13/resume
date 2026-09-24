import type { AiProviderConfig, AiProviderName } from './types';
import { groqProvider } from './groq';
import { openRouterProvider } from './open-router';

export type { AiProviderConfig, AiProviderName } from './types';

const providers: Record<AiProviderName, AiProviderConfig> = {
  groq: groqProvider,
  'open-router': openRouterProvider,
};

export function getAiProvider(name: string | undefined): AiProviderConfig | null {
  if (!name || !(name in providers)) {
    return null;
  }

  return providers[name as AiProviderName];
}
