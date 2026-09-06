import type { LLMMessage, LocalLLMResponse } from '../types';
import { postMessageToGroq } from '../services/groq';
import { BaseLLM } from './base-llm';

const CONTEXT_WINDOW_SIZE = 128000;
const MAX_OUTPUT_TOKENS = 1024;
const CHARS_PER_TOKEN = 4;
const CHAT_TEMPLATE_OVERHEAD_CHARS = 32;

export class GroqService extends BaseLLM {
  constructor() {
    super(
      'groq',
      CONTEXT_WINDOW_SIZE,
      MAX_OUTPUT_TOKENS,
      CHARS_PER_TOKEN,
      CHAT_TEMPLATE_OVERHEAD_CHARS,
    );
  }

  async loadModel(_callback: (progress: { text: string; value: number }) => void) {}

  async onMessage(messages: LLMMessage[]): Promise<LocalLLMResponse> {
    return postMessageToGroq(messages);
  }

  async isModelCached(): Promise<boolean> {
    return true;
  }

  sanitizeReply(reply: string) {
    return super.sanitizeReply(this.removeReasoning(reply));
  }

  private removeReasoning(text: string) {
    const lines = text.split(/\r?\n/);
    const index = lines.findIndex((line) => this.isReasoningHeading(line));

    if (index === -1) {
      return text;
    }

    return lines.slice(0, index).join('\n').trimEnd();
  }

  private isReasoningHeading(line: string) {
    const stripped = line.replace(/[#|*_`>~]/g, ' ').trim();

    return /^reasoning\s*:/i.test(stripped) || /^reasoning\s*$/i.test(stripped);
  }
}
