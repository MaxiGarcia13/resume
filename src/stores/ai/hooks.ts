import { useStore } from '@nanostores/react';
import { $downloadProgress, $messages, $modelCached, $modelDownloading, $replying, $thinking } from './store';

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

export function useThinking() {
  return useStore($thinking);
}
