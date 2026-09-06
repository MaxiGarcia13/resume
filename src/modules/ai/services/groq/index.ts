import type { ChatCompletionChunk } from '@mlc-ai/web-llm';
import type { LLMMessage } from '@/modules/ai/types';

async function* readNdjsonStream(
  body: ReadableStream<Uint8Array>,
): AsyncGenerator<ChatCompletionChunk> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        const trimmed = line.trim();

        if (!trimmed) {
          continue;
        }

        yield JSON.parse(trimmed) as ChatCompletionChunk;
      }
    }

    const remaining = buffer.trim();

    if (remaining) {
      yield JSON.parse(remaining) as ChatCompletionChunk;
    }
  } finally {
    reader.releaseLock();
  }
}

export async function postMessageToGroq(messages: LLMMessage[]) {
  const response = await fetch('/api/v1/groq', {
    method: 'POST',
    body: JSON.stringify({ messages }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Groq request failed: ${response.status}`);
  }

  if (!response.body) {
    throw new Error('Groq response has no body');
  }

  return readNdjsonStream(response.body);
}
