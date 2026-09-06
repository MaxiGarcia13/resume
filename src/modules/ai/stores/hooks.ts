import { useStore } from '@nanostores/react';
import {
  $downloadProgress,
  $error,
  $messages,
  $modelCached,
  $modelDownloading,
  $replying,
} from './store';

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

export function useError() {
  return useStore($error);
}
