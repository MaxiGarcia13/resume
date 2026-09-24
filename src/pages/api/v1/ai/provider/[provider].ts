import type { APIRoute } from 'astro';
import OpenAI, { APIError } from 'openai';
import { getAiProvider } from '@/modules/ai/providers';
import { readLlmMessages } from '@/modules/ai/security';
import { getErrorMessage, getErrorStatus, withStreamErrors } from '@/modules/ai/services/stream';

export const POST: APIRoute = async ({ request, params }) => {
  const provider = getAiProvider(params.provider);

  if (!provider) {
    return new Response(JSON.stringify({ error: 'Unknown AI provider' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const messages = await readLlmMessages(request);
    const client = new OpenAI(provider.getClientOptions(request));
    const response = await client.chat.completions.create(provider.getCreateParams(messages));

    return new Response(withStreamErrors(response.toReadableStream()), {
      headers: {
        'Content-Type': 'application/x-ndjson',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    const status = error instanceof APIError ? error.status ?? 500 : getErrorStatus(error);

    return new Response(JSON.stringify({ error: getErrorMessage(error) }), {
      status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
