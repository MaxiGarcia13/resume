import type { LLMError, LLMMessage } from '@/modules/ai/types';
import { atom } from 'nanostores';

export const $messages = atom<Array<LLMMessage>>([]);

export const $modelCached = atom<boolean | null>(null);
export const $modelDownloading = atom(false);
export const $downloadProgress = atom({ text: '', value: 0 });
export const $awaitingLocalDownload = atom(false);
export const $error = atom<LLMError | null>(null);

export const $replying = atom<LLMMessage | null>(null);

export function pushMessage(message: LLMMessage): void {
  $messages.set([...$messages.get(), message]);
}

export function setReplying(message: LLMMessage | null): void {
  $replying.set(message);
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

export function setAwaitingLocalDownload(awaiting: boolean): void {
  $awaitingLocalDownload.set(awaiting);
}

export function setError(error: LLMError | null): void {
  $error.set(error);
}
