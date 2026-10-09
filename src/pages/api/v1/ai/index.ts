import type { APIRoute } from 'astro';
import type { LLMMessage } from '@/modules/ai';
import { AiRouter, writeNdjsonStream } from '@maxigarcia/ai-router';
import { isAiErrorArray } from '@maxigarcia/ai-utils';
import { ASSISTANT_SYSTEM_PROMPT } from '@/data/assistant-system-prompt';
import { jsonError } from '@/http';
import { requireSecret } from '@/modules/ai/security';

const router = AiRouter({
  fallback: ['groq', 'open-router'],
  providers: {
    'groq': {
      apiKey: requireSecret('GROQ_API_KEY'),
    },
    'open-router': {
      apiKey: requireSecret('OPEN_ROUTER_API_KEY'),
    },
  },
});

interface EndpointProps {
  messages: LLMMessage[];
}

export const POST: APIRoute<EndpointProps> = async ({ request }) => {
  try {
    const { messages } = await request.json() as EndpointProps;

    if (messages.length === 0) {
      return jsonError('No messages provided', 400);
    }

    const sanitizedMessages: LLMMessage[] = [
      {
        role: 'system',
        content: ASSISTANT_SYSTEM_PROMPT,
      },
      ...messages.filter((message) => message.role !== 'system'),
    ];
    const stream = await router.create(sanitizedMessages);

    if (isAiErrorArray(stream)) {
      throw stream;
    }

    const body = writeNdjsonStream(stream);

    return new Response(body, {
      headers: {
        'Content-Type': 'application/x-ndjson',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error(error);

    if (isAiErrorArray(error)) {
      return jsonError(
        error.map((e) => `${e.providerName} - ${e.status}`).join(', '),
        503,
      );
    }

    return jsonError('Internal server error', 500);
  }
};
