import { describe, expect, it } from 'vitest';
import { LLMError } from '@/modules/ai/types';
import { parseLlmMessages, readLlmMessages } from './messages';

function expectLlmError(fn: () => unknown, message: string) {
  try {
    fn();
    expect.unreachable();
  } catch (error) {
    expect(error).toBeInstanceOf(LLMError);
    expect(error).toMatchObject({ message, status: 400 });
  }
}

describe('parseLlmMessages', () => {
  it('accepts a valid messages payload', () => {
    expect(parseLlmMessages({
      messages: [
        { role: 'system', content: 'You are helpful.' },
        { role: 'user', content: 'Hello' },
        { role: 'assistant', content: 'Hi' },
      ],
    })).toEqual([
      { role: 'system', content: 'You are helpful.' },
      { role: 'user', content: 'Hello' },
      { role: 'assistant', content: 'Hi' },
    ]);
  });

  it('rejects missing or non-array messages', () => {
    expectLlmError(() => parseLlmMessages(null), 'Invalid request body');
    expectLlmError(() => parseLlmMessages({}), 'Invalid request body');
    expectLlmError(() => parseLlmMessages({ messages: 'nope' }), 'Invalid request body');
  });

  it('rejects empty and oversized message lists', () => {
    expectLlmError(() => parseLlmMessages({ messages: [] }), 'Invalid messages');
    expectLlmError(() => parseLlmMessages({
      messages: Array.from({ length: 41 }, () => ({ role: 'user', content: 'x' })),
    }), 'Invalid messages');
  });

  it('rejects invalid roles, non-string content, and oversized content', () => {
    expectLlmError(() => parseLlmMessages({ messages: [{ role: 'tool', content: 'x' }] }), 'Invalid messages');
    expectLlmError(() => parseLlmMessages({ messages: [{ role: 'user', content: { text: 'x' } }] }), 'Invalid messages');
    expectLlmError(() => parseLlmMessages({ messages: [null] }), 'Invalid messages');
    expectLlmError(() => parseLlmMessages({
      messages: [{ role: 'user', content: 'a'.repeat(12_001) }],
    }), 'Invalid messages');
  });
});

describe('readLlmMessages', () => {
  it('parses a JSON request body', async () => {
    const request = new Request('http://localhost/api/v1/groq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'user', content: 'Hi' }] }),
    });

    await expect(readLlmMessages(request)).resolves.toEqual([
      { role: 'user', content: 'Hi' },
    ]);
  });

  it('rejects invalid JSON', async () => {
    const request = new Request('http://localhost/api/v1/groq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{',
    });

    await expect(readLlmMessages(request)).rejects.toMatchObject({
      message: 'Invalid request body',
      status: 400,
    });
  });
});
