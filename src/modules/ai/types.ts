import type { ChatCompletionChunk, ChatCompletionMessageParam } from '@mlc-ai/web-llm';

export type LLMMessage = ChatCompletionMessageParam;

export type LocalLLMResponse = Promise<AsyncIterable<ChatCompletionChunk> | undefined>;

export type LLMServiceType = 'local' | 'groq';
