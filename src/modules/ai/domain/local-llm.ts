import type { MLCEngine } from '@mlc-ai/web-llm';
import type { LLMMessage, LocalLLMResponse } from '../types';
import { CreateMLCEngine, hasModelInCache } from '@mlc-ai/web-llm';
import { BaseLLM } from './base-llm';

const MODEL_NAME = 'Qwen3.5-2B-q4f16_1-MLC';
const TEMPERATURE = 0.2;
const CONTEXT_WINDOW_SIZE = 4096;
const MAX_OUTPUT_TOKENS = 512;
const CHARS_PER_TOKEN = 3;
const CHAT_TEMPLATE_OVERHEAD_CHARS = 128;

export class LocalLLM extends BaseLLM {
  private engine: MLCEngine | null = null;

  constructor() {
    super(
      'local',
      CONTEXT_WINDOW_SIZE,
      MAX_OUTPUT_TOKENS,
      CHARS_PER_TOKEN,
      CHAT_TEMPLATE_OVERHEAD_CHARS,
    );
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

  async onMessage(messages: LLMMessage[]): Promise<LocalLLMResponse | undefined> {
    if (!this.engine) {
      throw new Error('Local model is not loaded');
    }

    return this.engine.chat.completions.create({
      messages,
      stream: true,
      temperature: TEMPERATURE,
      max_tokens: MAX_OUTPUT_TOKENS,
    });
  }

  async isModelCached(): Promise<boolean> {
    return hasModelInCache(MODEL_NAME);
  }
}
