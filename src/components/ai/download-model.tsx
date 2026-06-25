import { getActionStyles } from '@/components/shared/actions/utils';
import { DownloadIcon } from '@/components/shared/icons/download';
import { useAi } from '@/hooks/useAi';
import { useDownloadProgress, useModelCached, useModelDownloading } from '@/stores/ai';

export function DownloadModel() {
  const modelCached = useModelCached();
  const modelDownloading = useModelDownloading();
  const downloadProgress = useDownloadProgress();
  const { loadModel } = useAi();

  if (modelCached !== false) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 items-center text-center px-4 py-3 self-center max-w-xs">
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        The assistant runs locally in your browser. Download the model once to start chatting — your messages never leave this device.
      </p>

      {!modelDownloading && (
        <button
          type="button"
          className={getActionStyles({ variant: 'ghost', hasChildren: true, className: 'flex items-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300! dark:hover:bg-gray-600!' })}
          onClick={loadModel}
          aria-label="Download model"
        >
          <DownloadIcon />
          Download model
        </button>
      )}

      {modelDownloading && (
        <div className="flex flex-col gap-2 w-full">
          <div className="h-2 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full bg-orange-400 transition-[width] duration-300"
              style={{ width: `${downloadProgress.value * 100}%` }}
            />
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            {downloadProgress.text || 'Downloading model...'}
          </p>
        </div>
      )}
    </div>
  );
}
