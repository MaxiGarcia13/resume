import type { LLMMessage } from '@/modules/ai/types';
import { setError, setReplying } from '@/modules/ai';
import { fallbackToNext } from './fallback-to-next';
import { streamReply } from './stream-reply';

let responseInFlight = false;

export async function loadAiResponse(userMessages: LLMMessage[]) {
  if (responseInFlight) {
    return;
  }

  responseInFlight = true;
  setError(null);

  try {
    while (true) {
      try {
        await streamReply(userMessages);
        return;
      } catch (error) {
        console.error(error);
        setReplying(null);

        const shouldRetry = await fallbackToNext(error);

        if (!shouldRetry) {
          return;
        }
      }
    }
  } finally {
    responseInFlight = false;
  }
}
