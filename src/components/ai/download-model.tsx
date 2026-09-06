import { getActionStyles } from '@/components/shared/actions/utils';
import { DownloadIcon } from '@/components/shared/icons/download';
import { useAi } from '@/hooks/useAi';
import { useAwaitingLocalDownload, useDownloadProgress, useError, useModelDownloading } from '@/modules/ai';

export function DownloadModel() {
  const awaitingLocalDownload = useAwaitingLocalDownload();
  const modelDownloading = useModelDownloading();
  const downloadProgress = useDownloadProgress();
  const error = useError();
  const { loadModel } = useAi();

  if (!awaitingLocalDownload) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 items-center text-center px-4 py-3 self-center max-w-xs">
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        The cloud assistant is unavailable.
        {' '}
        <span className="hidden md:inline">
          Download the local model to keep chatting — your messages stay on this device.
        </span>
        <span className="inline md:hidden">
          Try again in a few minutes.
        </span>
      </p>

      {error && (
        <p className="text-xs text-neutral-500 dark:text-neutral-500">
          {error.message}
        </p>
      )}

      {!modelDownloading && (
        <button
          type="button"
          className={
            getActionStyles({
              variant: 'ghost',
              hasChildren: true,
              className: 'items-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300! dark:hover:bg-gray-600! hidden md:flex',
            })
          }
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
