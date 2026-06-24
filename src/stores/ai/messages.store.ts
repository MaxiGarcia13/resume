import type { ChatCompletionMessageParam } from '@mlc-ai/web-llm';
import { atom } from 'nanostores';

export type Message = ChatCompletionMessageParam;

export const $messages = atom<Array<Message>>([]);
export const $replying = atom<Message | null>(null);
export const $modelCached = atom<boolean | null>(null);
export const $modelDownloading = atom(false);
export const $downloadProgress = atom({ text: '', value: 0 });

export function pushMessage(message: Message): void {
  $messages.set([...$messages.get(), message]);
}

export function setReplying(message: Message | null): void {
  $replying.set(message);
}
