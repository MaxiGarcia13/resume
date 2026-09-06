import type { ChatCompletionChunk } from '@mlc-ai/web-llm';
import type { LLMMessage } from '@/modules/ai/types';
import { LLMError } from '@/modules/ai/types';

function parseGroqStreamLine(line: string): ChatCompletionChunk {
  const parsed = JSON.parse(line) as ChatCompletionChunk | { error?: string };

  if ('error' in parsed && parsed.error) {
    throw new LLMError(parsed.error);
  }

  return parsed as ChatCompletionChunk;
}

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

        yield parseGroqStreamLine(trimmed);
      }
    }

    const remaining = buffer.trim();

    if (remaining) {
      yield parseGroqStreamLine(remaining);
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
    let message = `Groq request failed: ${response.status}`;

    try {
      const body = await response.json() as { error?: string };

      if (body.error) {
        message = body.error;
      }
    } catch {
      // Keep the status fallback when the body is not JSON.
    }

    throw new LLMError(message, response.status);
  }

  if (!response.body) {
    throw new LLMError('Groq response has no body', response.status);
  }

  return readNdjsonStream(response.body);
}
