import type { LLMMessage, LLMServiceType, LocalLLMResponse } from '../types';
import { linkCvAnchors } from '@/utils/link-cv-anchors';

export class BaseLLM {
  readonly type: LLMServiceType;
  public readonly isLocalModel: boolean = false;

  constructor(type: LLMServiceType) {
    this.type = type;
  }

  async loadModel(_callback: (progress: { text: string; value: number }) => void) {
    throw new Error('Not implemented');
  }

  async onMessage(_messages: LLMMessage[]): Promise<LocalLLMResponse> {
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

  trimMessagesToContext(_messages: LLMMessage[]): LLMMessage[] {
    throw new Error('Not implemented');
  }
}
