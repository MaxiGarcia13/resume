import { getLLM, setAwaitingLocalDownload, setModelCached } from '@/modules/ai';
import { loadModel } from './load-model';

let cacheChecked = false;

export function checkModelCache() {
  if (cacheChecked) {
    return;
  }

  cacheChecked = true;

  const llm = getLLM();

  if (llm.type !== 'local') {
    setModelCached(true);
    return;
  }

  llm.isModelCached()
    .then((cached) => {
      setModelCached(cached);

      if (cached) {
        loadModel();
      } else {
        setAwaitingLocalDownload(true);
      }
    });
}
