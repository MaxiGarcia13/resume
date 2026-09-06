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

  async isModelCached(): Promise<boolean> {
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

  private getMessageContent(message: LLMMessage): string {
    return typeof message.content === 'string' ? message.content : '';
  }

  private getMessageCharCount(message: LLMMessage): number {
    return this.getMessageContent(message).length + this.CHAT_TEMPLATE_OVERHEAD_CHARS;
  }

  private truncateMessage(message: LLMMessage, maxChars: number): LLMMessage {
    const maxContent = Math.max(0, maxChars - this.CHAT_TEMPLATE_OVERHEAD_CHARS);

    return {
      ...message,
      content: this.getMessageContent(message).slice(-maxContent),
    };
  }

  sliceMessagesByContextWindowSize(messages: LLMMessage[]): LLMMessage[] {
    const maxInputChars = (this.CONTEXT_WINDOW_SIZE - this.MAX_OUTPUT_TOKENS) * this.CHARS_PER_TOKEN;
    let remainingChars = maxInputChars - ASSISTANT_SYSTEM_PROMPT.length - this.CHAT_TEMPLATE_OVERHEAD_CHARS;

    if (remainingChars <= this.CHAT_TEMPLATE_OVERHEAD_CHARS) {
      const lastUserMessage = messages.findLast((message) => message.role === 'user');
      return lastUserMessage ? [this.truncateMessage(lastUserMessage, remainingChars)] : [];
    }

    const kept: LLMMessage[] = [];

    for (let i = messages.length - 1; i >= 0; i--) {
      const message = messages[i];
      const size = this.getMessageCharCount(message);

      if (size <= remainingChars) {
        kept.push(message);
        remainingChars -= size;
        continue;
      }

      if (kept.length === 0) {
        kept.push(this.truncateMessage(message, remainingChars));
      }

      break;
    }

    kept.reverse();

    if (kept.length > 1 && kept[0]?.role === 'assistant') {
      kept.shift();
    }

    return kept;
  }
}
