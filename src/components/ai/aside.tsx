import { createPortal } from 'react-dom';
import { LazyInput } from './lazy-input';
import { LazyMessages } from './lazy-messages';

export function Aside() {
  return createPortal(
    <aside
      className="right-4 top-16 min-w-64 max-w-sm w-full overflow-hidden fixed h-[calc(100%-64px-10px)] border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="h-full flex flex-col gap-4">
        <LazyMessages className="flex-1 p-4" />

        <LazyInput className="p-4" />
      </div>
    </aside>,
    document.body,
  );
}
