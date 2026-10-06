import type { LLMMessage, LocalLLMResponse } from '../types';
import { http } from '@maxigarcia/js-utils';
import { BaseLLM } from './base-llm';

export class AiRouter extends BaseLLM {
  private http = http('/api/v1/ai');

  constructor() {
    super('router');
  }

  async loadModel(_callback: (progress: { text: string; value: number }) => void) {}

  async onMessage(messages: LLMMessage[]): Promise<LocalLLMResponse> {
    return this.http.stream({
      method: 'POST',
      format: 'ndjson',
      body: {
        messages,
      },
    });
  }

  async isModelCached(): Promise<boolean> {
    return true;
  }
}
