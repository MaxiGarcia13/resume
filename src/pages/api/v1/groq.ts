import type { APIRoute } from 'astro';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: import.meta.env.PUBLIC_GROQ_API_KEY });

export const POST: APIRoute = async ({ request }) => {
  const { messages } = await request.json();

  const response = await groq.chat.completions.create({
    model: 'groq/compound',
    messages,
    stream: true,
  });

  return new Response(response.toReadableStream(), {
    headers: {
      'Content-Type': 'application/x-ndjson',
      'Cache-Control': 'no-cache',
    },
  });
};
