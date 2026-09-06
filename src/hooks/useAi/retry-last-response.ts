import { $messages } from '@/modules/ai';
import { loadAiResponse } from './load-ai-response';

export async function retryLastResponse() {
  const messages = $messages.get();

  if (messages.at(-1)?.role !== 'user') {
    return;
  }

  await loadAiResponse(messages);
}
