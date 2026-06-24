import type { MLCEngine } from '@mlc-ai/web-llm';
import type { Message } from '@/stores/ai/messages.store';
import { CreateMLCEngine } from '@mlc-ai/web-llm';
import { useEffect, useState } from 'react';
import { pushMessage } from '@/stores/ai/messages.store';

let engine: MLCEngine | null = null;
const selectedModel = 'Llama-3.1-8B-Instruct-q4f32_1-MLC';

export function useAi() {
  const [replying, setReplying] = useState<Message | null>(null);

  const loadEngine = async () => {
    engine = await CreateMLCEngine(
      selectedModel,
      {
        initProgressCallback: (progress) => {
          console.warn('Progress:', progress);
        },
      },
    );
  };

  const loadAiResponse = async (userMessages: Message[]) => {
    if (!engine)
      return;

    const messages: Message[] = [
      { role: 'system', content: 'You are a helpful AI assistant.' },
      ...userMessages,
    ];

    const chunks = await engine.chat.completions.create({
      messages,
      stream: true,
    });

    let reply = '';

    for await (const chunk of chunks) {
      reply += chunk.choices[0]?.delta.content || '';
      setReplying({
        role: 'assistant',
        content: reply,
      });
    }

    setReplying(null);
    pushMessage({
      role: 'assistant',
      content: reply,
    });
  };

  useEffect(() => {
    if (engine)
      return;

    loadEngine();
  }, []);

  return {
    replying,
    loadAiResponse,
  };
}
