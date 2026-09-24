import type { ClientOptions } from 'openai';
import type { ChatCompletionCreateParamsStreaming } from 'openai/resources/chat/completions';
import type { LLMMessage } from '../types';

export type AiProviderName = 'groq' | 'open-router';

export interface AiProviderConfig {
  getClientOptions: (request: Request) => ClientOptions;
  getCreateParams: (messages: LLMMessage[]) => ChatCompletionCreateParamsStreaming;
}
