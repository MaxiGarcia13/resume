import type { LLMMessage } from '@/modules/ai/types';
import { postMessageToLlmEndpoint } from '../stream';

export function postMessageToGroq(messages: LLMMessage[]) {
  return postMessageToLlmEndpoint('/api/v1/groq', messages);
}
