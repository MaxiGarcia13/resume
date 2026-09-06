import type { LLMMessage, LLMServiceType, LocalLLMResponse } from '../types';
import { ASSISTANT_SYSTEM_PROMPT } from '@/data/assistant-system-prompt';
import { linkCvAnchors } from '@/utils/link-cv-anchors';

export class BaseLLM {
  private readonly CONTEXT_WINDOW_SIZE: number;
  private readonly MAX_OUTPUT_TOKENS: number;
  private readonly CHARS_PER_TOKEN: number;
  private readonly CHAT_TEMPLATE_OVERHEAD_CHARS: number;
  readonly type: LLMServiceType;

  constructor(
    type: LLMServiceType,
    contextWindowSize: number,
    maxOutputTokens: number,
    charsPerToken: number,
    chatTemplateOverheadChars: number,
  ) {
    this.type = type;
    this.CONTEXT_WINDOW_SIZE = contextWindowSize;
    this.MAX_OUTPUT_TOKENS = maxOutputTokens;
    this.CHARS_PER_TOKEN = charsPerToken;
    this.CHAT_TEMPLATE_OVERHEAD_CHARS = chatTemplateOverheadChars;
  }

  async loadModel(_callback: (progress: { text: string; value: number }) => void) {
    throw new Error('Not implemented');
  }

  async onMessage(_messages: LLMMessage[]): Promise<LocalLLMResponse | undefined> {
    throw new Error('Not implemented');
  }

  private removeThinkingText(text: string) {
    return text
      ?.replace('```thinking', '')
      .replace('```', '')
      .replace('<think>', '')
      .replace('</think>', '');
  }

  private removeMultipleNewlines(text: string) {
    return text.replace(/\n{2,}/g, '\n');
  }

  sanitizeReply(reply: string) {
    return linkCvAnchors(
      this.removeThinkingText(
        this.removeMultipleNewlines(
          reply,
        ),
      ),
    );
  }

  private getMessageCharCount(message: LLMMessage): number {
    const content = typeof message.content === 'string' ? message.content : '';
    return content.length + this.CHAT_TEMPLATE_OVERHEAD_CHARS;
  }

  sliceMessagesByContextWindowSize(messages: LLMMessage[]): LLMMessage[] {
    const maxInputChars = (this.CONTEXT_WINDOW_SIZE - this.MAX_OUTPUT_TOKENS) * this.CHARS_PER_TOKEN;
    let remainingChars = maxInputChars - ASSISTANT_SYSTEM_PROMPT.length - this.CHAT_TEMPLATE_OVERHEAD_CHARS;

    const kept: LLMMessage[] = [];

    for (let i = messages.length - 1; i >= 0; i--) {
      const message = messages[i];
      const size = this.getMessageCharCount(message);

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
}
