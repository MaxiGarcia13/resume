import type { MLCEngine } from '@mlc-ai/web-llm';
import type { Message } from '@/stores/ai';
import { CreateMLCEngine, hasModelInCache } from '@mlc-ai/web-llm';
import { useEffect } from 'react';
import { getAssistantSystemPrompt } from '@/data/assistant-system-prompt';
import {
  pushMessage,
  setDownloadProgress,
  setModelCached,
  setModelDownloading,
  setReplying,
  useModelCached,
  useModelDownloading,
  useReplying,
} from '@/stores/ai';

let engine: MLCEngine | null = null;
let cacheChecked = false;
const selectedModel = 'Llama-3.1-8B-Instruct-q4f16_1-MLC';

export function useAi() {
  const replying = useReplying();
  const modelCached = useModelCached();
  const modelDownloading = useModelDownloading();

  const loadModel = async () => {
    if (engine) {
      return;
    }

    setModelDownloading(true);
    setDownloadProgress({ text: '', value: 0 });

    try {
      engine = await CreateMLCEngine(
        selectedModel,
        {

          initProgressCallback: (progress) => {
            setDownloadProgress({ text: progress.text, value: progress.progress });
          },
        },
        {
          temperature: 0,
        },
      );
      setModelCached(true);
    } finally {
      setModelDownloading(false);
    }
  };

  const loadAiResponse = async (userMessages: Message[]) => {
    if (!engine)
      return;

    const messages: Message[] = [
      {
        role: 'system',
        content: getAssistantSystemPrompt(),
      },
      ...userMessages,
    ];

    try {
      const chunks = await engine.chat.completions.create({
        messages,
        stream: true,
        temperature: 0,
      });

      let reply = '';

      setReplying({
        role: 'assistant',
        content: '...',
      });

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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (cacheChecked) {
      return;
    }

    cacheChecked = true;

    hasModelInCache(selectedModel)
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
