import type { ChatCompletionMessageParam, MLCEngine } from '@mlc-ai/web-llm';
import type { LLMMessage, LocalLLMResponse } from '../types';
import { trimMessagesToContext } from '@maxigarcia/ai-utils';
import { CreateMLCEngine, hasModelInCache } from '@mlc-ai/web-llm';
import { ASSISTANT_SYSTEM_PROMPT } from '@/data/assistant-system-prompt';
import { BaseLLM } from './base-llm';

const MODEL_NAME = 'Qwen3.5-2B-q4f16_1-MLC';
const TEMPERATURE = 0.2;
const CONTEXT_WINDOW_SIZE = 4096;
const MAX_OUTPUT_TOKENS = 512;
const CHARS_PER_TOKEN = 3;
const CHAT_TEMPLATE_OVERHEAD_CHARS = 128;

export class LocalLLM extends BaseLLM {
  private engine: MLCEngine | null = null;
  public readonly isLocalModel: boolean = true;

  constructor() {
    super('local');
  }

  async loadModel(callback: (progress: { text: string; value: number }) => void) {
    if (this.engine) {
      return;
    }

    this.engine = await CreateMLCEngine(
      MODEL_NAME,
      {

        initProgressCallback: (progress) => {
          callback({
            text: progress.text,
            value: progress.progress,
          });
        },
      },
      {
        temperature: TEMPERATURE,
        repetition_penalty: 1.1,
        context_window_size: CONTEXT_WINDOW_SIZE,
        max_history_size: 1,
      },
    );
  }

  async onMessage(messages: LLMMessage[]): Promise<LocalLLMResponse> {
    if (!this.engine) {
      throw new Error('Local model is not loaded');
    }

    const sanitizedMessages: LLMMessage[] = [
      {
        role: 'system',
        content: ASSISTANT_SYSTEM_PROMPT,
      },
      ...messages.filter((message) => message.role !== 'system'),
    ];

    return this.engine.chat.completions.create({
      messages: sanitizedMessages as ChatCompletionMessageParam[],
      stream: true,
      temperature: TEMPERATURE,
      max_tokens: MAX_OUTPUT_TOKENS,
    });
  }

  async isModelCached(): Promise<boolean> {
    return hasModelInCache(MODEL_NAME);
  }

  trimMessagesToContext(messages: LLMMessage[]): LLMMessage[] {
    return trimMessagesToContext({
      messages,
      contextWindowSize: CONTEXT_WINDOW_SIZE,
      charsPerToken: CHARS_PER_TOKEN,
      chatTemplateOverheadChars: CHAT_TEMPLATE_OVERHEAD_CHARS,
      systemPrompt: ASSISTANT_SYSTEM_PROMPT,
      maxOutputTokens: MAX_OUTPUT_TOKENS,
    });
  }
}
