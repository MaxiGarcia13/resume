import {
  setAwaitingLocalDownload,
  setDownloadProgress,
  setError,
  setModelCached,
  setReplying,
  switchToNext,
  toLLMError,
} from '@/modules/ai';

export async function fallbackToNext(error: unknown): Promise<boolean> {
  const next = switchToNext();

  if (!next) {
    setError(toLLMError(error));
    return false;
  }

  if (next.type !== 'local') {
    return true;
  }

  const cached = await next.isModelCached();

  if (!cached) {
    setAwaitingLocalDownload(true);
    setModelCached(false);
    return false;
  }

  try {
    setReplying({
      role: 'assistant',
      content: '...',
    });
    await next.loadModel((progress) => {
      setDownloadProgress({ text: progress.text, value: progress.value });
    });
    return true;
  } catch (loadError) {
    console.error(loadError);
    setReplying(null);
    setError(toLLMError(loadError));
    return false;
  }
}
