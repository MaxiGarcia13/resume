import type { APIRoute } from 'astro';
import type { LLMMessage } from '@/modules/ai';
import { AiRouter, writeNdjsonStream } from '@maxigarcia/ai-router';
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
    const { messages } = await request.json();
    const stream = await router.create(messages);

    if (Array.isArray(stream)) {
      console.error(stream);

      return new Response(
        JSON.stringify({
          error: stream.map((error) => error.error).join(', '),
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    const body = writeNdjsonStream(stream);

    return new Response(body, {
      headers: {
        'Content-Type': 'application/x-ndjson',
        'Cache-Control': 'no-cache',
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
