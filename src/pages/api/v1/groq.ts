import type { APIRoute } from 'astro';
import Groq, { APIError } from 'groq-sdk';
import { readLlmMessages, requireSecret } from '@/modules/ai/security';
import { getErrorMessage, getErrorStatus, withStreamErrors } from '@/modules/ai/services/stream';

export const POST: APIRoute = async ({ request }) => {
  try {
    const messages = await readLlmMessages(request);
    const groq = new Groq({ apiKey: requireSecret('GROQ_API_KEY') });

    const response = await groq.chat.completions.create({
      model: 'groq/compound',
      messages,
      stream: true,
    });

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
