import type { MLCEngine } from '@mlc-ai/web-llm';
import type { Message } from '@/stores/ai';
import { CreateMLCEngine, hasModelInCache } from '@mlc-ai/web-llm';
import { useEffect } from 'react';
import { ASSISTANT_SYSTEM_PROMPT } from '@/data/assistant-system-prompt';
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
import { linkCvAnchors } from '@/utils/link-cv-anchors';

let engine: MLCEngine | null = null;
let cacheChecked = false;

const MODEL_NAME = 'Qwen3.5-2B-q4f16_1-MLC';
const CONTEXT_WINDOW_SIZE = 4096;
const TEMPERATURE = 0.2;
const CHARS_PER_TOKEN = 4;
const MAX_OUTPUT_TOKENS = 512;
const CHAT_TEMPLATE_OVERHEAD_CHARS = 32;

function getMessageCharCount(message: Message): number {
  const content = typeof message.content === 'string' ? message.content : '';
  return content.length + CHAT_TEMPLATE_OVERHEAD_CHARS;
}

function sliceMessagesByContextWindowSize(messages: Message[]): Message[] {
  const maxInputChars = (CONTEXT_WINDOW_SIZE - MAX_OUTPUT_TOKENS) * CHARS_PER_TOKEN;
  let remainingChars = maxInputChars - ASSISTANT_SYSTEM_PROMPT.length - CHAT_TEMPLATE_OVERHEAD_CHARS;

  const kept: Message[] = [];

  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i];
    const size = getMessageCharCount(message);

    if (kept.length > 0 && size > remainingChars) {
      break;
    }

    kept.push(message);
    remainingChars -= size;
  }

  kept.reverse();

  if (kept.length > 1 && kept[0]?.role === 'assistant') {
    kept.shift();
  }

  return kept;
}

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
        MODEL_NAME,
        {

          initProgressCallback: (progress) => {
            setDownloadProgress({ text: progress.text, value: progress.progress });
          },
        },
        {
          temperature: TEMPERATURE,
          repetition_penalty: 1.1,
          context_window_size: CONTEXT_WINDOW_SIZE,
          max_history_size: 1,
        },
      );
      setModelCached(true);
    } finally {
      setModelDownloading(false);
    }
  };

  const removeThinkingText = (text: string) => {
    return text
      ?.replace('```thinking', '')
      .replace('```', '')
      .replace('<think>', '')
      .replace('</think>', '');
  };

  const removeMultipleNewlines = (text: string) => {
    return text.replace(/\n{2,}/g, '\n');
  };

  const sanitizeReply = (reply: string) => {
    return removeThinkingText(removeMultipleNewlines(reply));
  };

  const loadAiResponse = async (userMessages: Message[]) => {
    if (!engine)
      return;

    const messages: Message[] = [
      {
        role: 'system',
        content: ASSISTANT_SYSTEM_PROMPT,
      },
      ...sliceMessagesByContextWindowSize(userMessages),
    ];

    try {
      const chunks = await engine.chat.completions.create({
        messages,
        stream: true,
        temperature: TEMPERATURE,
        max_tokens: MAX_OUTPUT_TOKENS,
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
          content: linkCvAnchors(sanitizeReply(reply)),
        });
      }

      setReplying(null);
      pushMessage({
        role: 'assistant',
        content: linkCvAnchors(sanitizeReply(reply)),
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

    hasModelInCache(MODEL_NAME)
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
