import { cn } from '@maxigarcia/js-utils';
import { lazy, Suspense } from 'react';

const Input = lazy(() =>
  import('./input').then((module) => ({ default: module.Input })),
);

function InputFallback(props: { className?: string }) {
  return (
    <div
      className={cn('flex items-center justify-between w-full gap-2', props.className)}
      aria-busy="true"
      aria-label="Loading input"
    >
      <div className="h-16 flex-1 rounded-sm animate-pulse bg-gray-200 dark:bg-gray-700" />
      <div className="h-10 w-10 shrink-0 rounded-sm animate-pulse bg-gray-200 dark:bg-gray-700" />
    </div>
  );
}

export function LazyInput(props: { className?: string }) {
  return (
    <Suspense fallback={<InputFallback className={props.className} />}>
      <Input {...props} />
    </Suspense>
  );
}
