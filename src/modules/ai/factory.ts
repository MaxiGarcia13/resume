import type { LLMServiceType } from './types';
import { GroqService } from './domain/groq';
import { LocalLLM } from './domain/local-llm';

export function createLLM(type: LLMServiceType) {
  switch (type) {
    case 'groq':
      return new GroqService();
    case 'local':
      return new LocalLLM();
    default:
      throw new Error(`Unsupported LLM service type: ${type}`);
  }
}
