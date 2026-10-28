import type { AiRouterInterface } from '@maxigarcia/ai-router';

export type LLMMessage = Parameters<AiRouterInterface['create']>[0];

export interface LLMStreamChunk {
  choices: Array<{
    delta?: {
      content?: string | null;
    } | null;
  }>;
}

export type LocalLLMResponse = AsyncIterable<LLMStreamChunk>;

export type LLMServiceType = 'local' | 'router';

export class LLMError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'LLMError';
    this.status = status;
  }
}

export function toLLMError(error: unknown): LLMError {
  if (error instanceof LLMError) {
    return error;
  }

  if (error instanceof Error) {
    return new LLMError(error.message);
  }

  return new LLMError('Unknown error');
}
