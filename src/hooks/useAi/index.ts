import { useEffect } from 'react';
import { useModelCached, useModelDownloading, useReplying } from '@/modules/ai';
import { checkModelCache } from './check-model-cache';
import { loadAiResponse } from './load-ai-response';
import { loadModel } from './load-model';
import { retryLastResponse } from './retry-last-response';

export function useAi() {
  const replying = useReplying();
  const modelCached = useModelCached();
  const modelDownloading = useModelDownloading();

  useEffect(() => {
    checkModelCache();
  }, []);

  return {
    replying,
    modelCached,
    modelDownloading,
    loadAiResponse,
    loadModel,
    retryLastResponse,
  };
}
