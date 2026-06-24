import { useStore } from '@nanostores/react';
import { $downloadProgress, $messages, $modelCached, $modelDownloading, $replying } from './messages.store';

export function useMessages() {
  return useStore($messages);
}

export function useReplying() {
  return useStore($replying);
}

export function useModelCached() {
  return useStore($modelCached);
}

export function useModelDownloading() {
  return useStore($modelDownloading);
}

export function useDownloadProgress() {
  return useStore($downloadProgress);
}
