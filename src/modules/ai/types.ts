import type { ChatCompletionMessageParam } from 'openai/resources';

export type LLMMessage = ChatCompletionMessageParam;

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
