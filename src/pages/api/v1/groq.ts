import type { APIRoute } from 'astro';
import Groq, { APIError } from 'groq-sdk';
import { getErrorMessage, getErrorStatus, withStreamErrors } from '@/modules/ai/services/stream';

const groq = new Groq({ apiKey: import.meta.env.PUBLIC_GROQ_API_KEY });

export const POST: APIRoute = async ({ request }) => {
  try {
    const { messages } = await request.json();

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
