import type { MLCEngine } from '@mlc-ai/web-llm';
import type { Message } from '@/stores/ai/messages.store';
import { CreateMLCEngine, hasModelInCache } from '@mlc-ai/web-llm';
import { useEffect } from 'react';
import { useReplying } from '@/stores/ai/messages.react';
import {
  $downloadProgress,
  $modelCached,
  $modelDownloading,
  pushMessage,
  setReplying,
} from '@/stores/ai/messages.store';

let engine: MLCEngine | null = null;
let cacheChecked = false;
const selectedModel = 'Llama-3.2-1B-Instruct-q4f32_1-MLC';

export function useAi() {
  const replying = useReplying();

  const loadEngine = async () => {
    if (engine) {
      return;
    }

    $modelDownloading.set(true);
    $downloadProgress.set({ text: '', value: 0 });

    try {
      engine = await CreateMLCEngine(
        selectedModel,
        {
          initProgressCallback: (progress) => {
            $downloadProgress.set({ text: progress.text, value: progress.progress });
          },
        },
      );
      $modelCached.set(true);
    } finally {
      $modelDownloading.set(false);
    }
  };

  const downloadModel = () => {
    loadEngine();
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
    if (cacheChecked) {
      return;
    }

    cacheChecked = true;

    hasModelInCache(selectedModel).then((cached) => {
      $modelCached.set(cached);

      if (cached) {
        loadEngine();
      }
    });
  }, []);

  return {
    replying,
    loadAiResponse,
    downloadModel,
  };
}
