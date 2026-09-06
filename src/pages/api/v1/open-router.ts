import type { APIRoute } from 'astro';
import { readLlmMessages, requireSecret } from '@/modules/ai/security';
import { getErrorMessage, getErrorStatus, sseToNdjson } from '@/modules/ai/services/stream';

export const POST: APIRoute = async ({ request }) => {
  try {
    const messages = await readLlmMessages(request);

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${requireSecret('OPEN_ROUTER_API_KEY')}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': new URL(request.url).origin,
        'X-Title': 'Maxi Garcia CV',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages,
        stream: true,
        reasoning: {
          exclude: true,
        },
      }),
    });

    if (!response.ok) {
      let message = `OpenRouter request failed: ${response.status}`;

      try {
        const body = await response.json() as { error?: string | { message?: string } };

        if (typeof body.error === 'string') {
          message = body.error;
        } else if (body.error?.message) {
          message = body.error.message;
        }
      } catch {
        // Keep the status fallback when the body is not JSON.
      }

      return new Response(JSON.stringify({ error: message }), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    if (!response.body) {
      throw new Error('OpenRouter response has no body');
    }

    return new Response(sseToNdjson(response.body), {
      headers: {
        'Content-Type': 'application/x-ndjson',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: getErrorMessage(error) }), {
      status: getErrorStatus(error),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
