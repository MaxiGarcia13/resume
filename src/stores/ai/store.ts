import type { ChatCompletionMessageParam } from '@mlc-ai/web-llm';
import { atom } from 'nanostores';

export type Message = ChatCompletionMessageParam;

export const $messages = atom<Array<Message>>([]);

export const $modelCached = atom<boolean | null>(null);
export const $modelDownloading = atom(false);
export const $downloadProgress = atom({ text: '', value: 0 });

export const $thinking = atom(false);
export const $replying = atom<Message | null>(null);

export function pushMessage(message: Message): void {
  $messages.set([...$messages.get(), message]);
}

export function setReplying(message: Message | null): void {
  $replying.set(message);
}

export function setThinking(thinking: boolean): void {
  $thinking.set(thinking);
}

export function setDownloadProgress(progress: { text: string; value: number }): void {
  $downloadProgress.set(progress);
}

export function setModelCached(cached: boolean): void {
  $modelCached.set(cached);
}

export function setModelDownloading(downloading: boolean): void {
  $modelDownloading.set(downloading);
}
