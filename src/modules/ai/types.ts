import type { ChatCompletionChunk, ChatCompletionMessageParam } from '@mlc-ai/web-llm';

export type LLMMessage = ChatCompletionMessageParam;

export type LocalLLMResponse = Promise<AsyncIterable<ChatCompletionChunk> | undefined>;

export type LLMServiceType = 'local' | 'groq';

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
