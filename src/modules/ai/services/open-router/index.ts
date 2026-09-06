import type { LLMMessage } from '@/modules/ai/types';
import { postMessageToLlmEndpoint } from '../stream';

export function postMessageToOpenRouter(messages: LLMMessage[]) {
  return postMessageToLlmEndpoint('/api/v1/open-router', messages);
}
