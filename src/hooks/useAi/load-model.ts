import {
  $messages,
  getLLM,
  setAwaitingLocalDownload,
  setDownloadProgress,
  setError,
  setModelCached,
  setModelDownloading,
  toLLMError,
} from '@/modules/ai';
import { loadAiResponse } from './load-ai-response';

export async function loadModel() {
  const llm = getLLM();

  setModelDownloading(true);
  setDownloadProgress({ text: '', value: 0 });
  setError(null);

  try {
    await llm.loadModel((progress) => {
      setDownloadProgress({ text: progress.text, value: progress.value });
    });
    setModelCached(true);
    setAwaitingLocalDownload(false);

    const messages = $messages.get();

    if (messages.at(-1)?.role === 'user') {
      await loadAiResponse(messages);
    }
  } catch (error) {
    console.error(error);
    setError(toLLMError(error));
  } finally {
    setModelDownloading(false);
  }
}
