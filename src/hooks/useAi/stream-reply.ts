import type { LLMMessage } from '@/modules/ai/types';
import { ASSISTANT_SYSTEM_PROMPT } from '@/data/assistant-system-prompt';
import { getLLM, LLMError, pushMessage, setReplying } from '@/modules/ai';

export async function streamReply(userMessages: LLMMessage[]) {
  const llm = getLLM();
  const messages: LLMMessage[] = [
    {
      role: 'system',
      content: ASSISTANT_SYSTEM_PROMPT,
    },
    ...llm.sliceMessagesByContextWindowSize(userMessages),
  ];

  setReplying({
    role: 'assistant',
    content: '...',
  });

  const chunks = await llm.onMessage(messages);

  if (!chunks) {
    throw new LLMError('No response from the model');
  }

  let reply = '';

  for await (const chunk of chunks) {
    reply += chunk.choices[0]?.delta.content || '';
    setReplying({
      role: 'assistant',
      content: llm.sanitizeReply(reply),
    });
  }

  setReplying(null);
  pushMessage({
    role: 'assistant',
    content: llm.sanitizeReply(reply),
  });
}
