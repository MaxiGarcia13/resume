import type { LLMMessage } from '@/modules/ai/types';
import { useEffect } from 'react';
import { ASSISTANT_SYSTEM_PROMPT } from '@/data/assistant-system-prompt';
import {
  pushMessage,
  setDownloadProgress,
  setError,
  setModelCached,
  setModelDownloading,
  setReplying,
  useError,
  useModelCached,
  useModelDownloading,
  useReplying,
} from '@/modules/ai';
import { createLLM } from '@/modules/ai/factory';

const llm = createLLM('groq');

let cacheChecked = false;

export function useAi() {
  const replying = useReplying();
  const modelCached = useModelCached();
  const modelDownloading = useModelDownloading();
  const messagesError = useError();

  const loadModel = async () => {
    setModelDownloading(true);
    setDownloadProgress({ text: '', value: 0 });

    llm.loadModel((progress) => {
      setDownloadProgress({ text: progress.text, value: progress.value });
    }).finally(() => {
      setModelCached(true);
      setModelDownloading(false);
    });
  };

  const loadAiResponse = async (userMessages: LLMMessage[]) => {
    const messages: LLMMessage[] = [
      {
        role: 'system',
        content: ASSISTANT_SYSTEM_PROMPT,
      },
      ...llm.sliceMessagesByContextWindowSize(userMessages),
    ];

    try {
      const chunks = await llm.onMessage(messages);

      let reply = '';

      setReplying({
        role: 'assistant',
        content: '...',
      });

      if (chunks) {
        for await (const chunk of chunks) {
          reply += chunk.choices[0]?.delta.content || '';
          setReplying({
            role: 'assistant',
            content: llm.sanitizeReply(reply),
          });
        }
      }

      setReplying(null);
      pushMessage({
        role: 'assistant',
        content: llm.sanitizeReply(reply),
      });
    } catch (error) {
      console.error(error);
      setError(new Error(error ?? error.message ?? 'Unknown error'));
    }
  };

  useEffect(() => {
    if (cacheChecked) {
      return;
    }

    cacheChecked = true;

    llm.isModelCached()
      .then((cached) => {
        setModelCached(cached);

        if (cached) {
          loadModel();
        }
      });
  }, []);

  return {
    replying,
    modelCached,
    modelDownloading,
    loadAiResponse,
    loadModel,
  };
}
