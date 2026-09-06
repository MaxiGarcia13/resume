import { cn } from '@maxigarcia/js-utils';
import { lazy, Suspense, useState } from 'react';
import { getActionStyles } from '../shared/actions/utils';
import { SparklesIcon } from '../shared/icons/sparkles';
import { getTextClass } from '../shared/text/text.shared';

const LazyAside = lazy(() => import('./aside').then((module) => ({ default: module.Aside })));

export function AiButton(props: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setIsOpen(!isOpen);
    event.stopPropagation();
  };

  const hasGpuSupport = 'gpu' in window.navigator;

  if (!hasGpuSupport) {
    return null;
  }

  return (
    <>
      <button
        id="ai-button"
        type="button"
        className={cn(
          getTextClass('ghost'),
          getActionStyles({ ...props, variant: 'ghost', hasIcon: true }),
        )}
        onClick={toggle}
        aria-label="Toggle AI assistant"
      >
        <SparklesIcon />
      </button>

      {isOpen && (
        <Suspense fallback={null}>
          <LazyAside
            onClose={() => setIsOpen(false)}
          />
        </Suspense>
      )}
    </>
  );
}
