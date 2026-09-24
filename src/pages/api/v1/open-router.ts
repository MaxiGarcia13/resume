import type { APIRoute } from 'astro';
import OpenAI, { APIError } from 'openai';
import { readLlmMessages, requireSecret } from '@/modules/ai/security';
import { getErrorMessage, getErrorStatus, withStreamErrors } from '@/modules/ai/services/stream';

export const POST: APIRoute = async ({ request }) => {
  try {
    const messages = await readLlmMessages(request);
    const openRouter = new OpenAI({
      apiKey: requireSecret('OPEN_ROUTER_API_KEY'),
      baseURL: 'https://openrouter.ai/api/v1',
      defaultHeaders: {
        'HTTP-Referer': new URL(request.url).origin,
        'X-Title': 'Maxi Garcia CV',
      },
    });

    const response = await openRouter.chat.completions.create({
      model: 'openrouter/free',
      messages,
      stream: true,
      // OpenRouter-specific: omit reasoning tokens from the stream.
      reasoning: { exclude: true },
    } as OpenAI.Chat.ChatCompletionCreateParamsStreaming);

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
