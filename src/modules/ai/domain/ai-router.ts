import type { LLMMessage, LocalLLMResponse } from '../types';
import { streamChatCompletion } from '@maxigarcia/ai-client';
import { BaseLLM } from './base-llm';

export class AiRouter extends BaseLLM {
  constructor() {
    super('router');
  }

  async loadModel(_callback: (progress: { text: string; value: number }) => void) {}

  async onMessage(messages: LLMMessage[]): Promise<LocalLLMResponse> {
    return streamChatCompletion('/api/v1/ai', {
      body: {
        messages,
      },
    });
  }

  async isModelCached(): Promise<boolean> {
    return true;
  }
}
