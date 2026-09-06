import type { ChatCompletionChunk } from '@mlc-ai/web-llm';
import type { LLMMessage } from '@/modules/ai/types';
import { LLMError } from '@/modules/ai/types';

export function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Request failed';
}

export function getErrorStatus(error: unknown) {
  if (error && typeof error === 'object') {
    if ('statusCode' in error && typeof error.statusCode === 'number') {
      return error.statusCode;
    }

    if ('status' in error && typeof error.status === 'number') {
      return error.status;
    }
  }

  return 500;
}

export function withStreamErrors(stream: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const reader = stream.getReader();
  const encoder = new TextEncoder();

  return new ReadableStream({
    async pull(controller) {
      try {
        const { done, value } = await reader.read();

        if (done) {
          controller.close();
          return;
        }

        controller.enqueue(value);
      } catch (error) {
        controller.enqueue(encoder.encode(`${JSON.stringify({ error: getErrorMessage(error) })}\n`));
        controller.close();
      }
    },
    cancel() {
      return reader.cancel();
    },
  });
}

export function sseToNdjson(stream: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = '';

  return new ReadableStream({
    async pull(controller) {
      try {
        while (true) {
          const newline = buffer.indexOf('\n');

          if (newline !== -1) {
            const line = buffer.slice(0, newline).trim();
            buffer = buffer.slice(newline + 1);

            if (enqueueSseDataLine(line, controller, encoder)) {
              return;
            }

            continue;
          }

          const { done, value } = await reader.read();

          if (done) {
            enqueueSseDataLine(buffer.trim(), controller, encoder);
            controller.close();
            return;
          }

          buffer += decoder.decode(value, { stream: true });
        }
      } catch (error) {
        controller.enqueue(encoder.encode(`${JSON.stringify({ error: getErrorMessage(error) })}\n`));
        controller.close();
      }
    },
    cancel() {
      return reader.cancel();
    },
  });
}

function enqueueSseDataLine(
  line: string,
  controller: ReadableStreamDefaultController<Uint8Array>,
  encoder: TextEncoder,
) {
  if (!line.startsWith('data:')) {
    return false;
  }

  const payload = line.slice(5).trim();

  if (!payload || payload === '[DONE]') {
    return false;
  }

  controller.enqueue(encoder.encode(`${payload}\n`));
  return true;
}

function parseLlmStreamLine(line: string): ChatCompletionChunk {
  const parsed = JSON.parse(line) as ChatCompletionChunk | { error?: string | { message?: string } };

  if ('error' in parsed && parsed.error) {
    const error = parsed.error;
    const message = typeof error === 'string' ? error : error.message ?? 'Request failed';
    throw new LLMError(message);
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

        yield parseLlmStreamLine(trimmed);
      }
    }

    const remaining = buffer.trim();

    if (remaining) {
      yield parseLlmStreamLine(remaining);
    }
  } finally {
    reader.releaseLock();
  }
}

export async function postMessageToLlmEndpoint(url: string, messages: LLMMessage[]) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ messages }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    let message = `Request failed: ${response.status}`;

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
    throw new LLMError('Response has no body', response.status);
  }

  return readNdjsonStream(response.body);
}
