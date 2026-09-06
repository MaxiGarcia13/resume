import type { LLMMessage } from '@/modules/ai/types';
import { LLMError } from '@/modules/ai/types';

const MAX_MESSAGES = 40;
const MAX_CONTENT_CHARS = 12_000;

function isChatRole(role: unknown): role is 'assistant' | 'system' | 'user' {
  return role === 'system' || role === 'user' || role === 'assistant';
}

export function parseLlmMessages(body: unknown): LLMMessage[] {
  if (!body || typeof body !== 'object' || !('messages' in body) || !Array.isArray(body.messages)) {
    throw new LLMError('Invalid request body', 400);
  }

  if (body.messages.length === 0 || body.messages.length > MAX_MESSAGES) {
    throw new LLMError('Invalid messages', 400);
  }

  return body.messages.map((message) => {
    if (!message || typeof message !== 'object') {
      throw new LLMError('Invalid messages', 400);
    }

    const { role, content } = message as { role?: unknown; content?: unknown };

    if (!isChatRole(role) || typeof content !== 'string' || content.length > MAX_CONTENT_CHARS) {
      throw new LLMError('Invalid messages', 400);
    }

    return { role, content };
  });
}

export async function readLlmMessages(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    throw new LLMError('Invalid request body', 400);
  }

  return parseLlmMessages(body);
}
