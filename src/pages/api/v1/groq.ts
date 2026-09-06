import type { APIRoute } from 'astro';
import Groq, { APIError } from 'groq-sdk';

const groq = new Groq({ apiKey: import.meta.env.PUBLIC_GROQ_API_KEY });

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Groq request failed';
}

function withStreamErrors(stream: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
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
    const status = error instanceof APIError ? error.status ?? 500 : 500;

    return new Response(JSON.stringify({ error: getErrorMessage(error) }), {
      status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
