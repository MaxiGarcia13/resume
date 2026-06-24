import { cn } from '@maxigarcia/js-utils';
import { lazy, Suspense } from 'react';

const Messages = lazy(() =>
  import('./messages').then((module) => ({ default: module.Messages })),
);

function MessagesFallback(props: { className?: string }) {
  return (
    <div
      className={cn('flex flex-col gap-2 overflow-y-auto', props.className)}
      aria-busy="true"
      aria-label="Loading messages"
    >
      <div className="h-16 rounded-sm animate-pulse bg-gray-200 dark:bg-gray-700" />
      <div className="h-10 w-3/4 self-end rounded-sm animate-pulse bg-gray-200 dark:bg-gray-700" />
    </div>
  );
}

export function LazyMessages(props: { className?: string }) {
  return (
    <Suspense fallback={<MessagesFallback className={props.className} />}>
      <Messages {...props} />
    </Suspense>
  );
}
