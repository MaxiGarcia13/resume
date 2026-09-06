import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@maxigarcia/js-utils';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '../shared/icons/close';
import { LazyInput } from './lazy-input';
import { LazyMessages } from './lazy-messages';

type AsideProps = ComponentPropsWithoutRef<'aside'> & {
  onClose: () => void;
};

export function Aside({ onClose, ...props }: AsideProps) {
  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handler = (event: PointerEvent | TouchEvent) => {
      const target = event.target as Node;

      if (
        asideRef.current?.contains(target)
        || document.getElementById('switch-theme')?.contains(target)
        || document.getElementById('ai-button')?.contains(target)
      ) {
        return;
      }

      onClose();
    };

    document.addEventListener('pointerdown', handler);
    document.addEventListener('touchend', handler);

    return () => {
      document.removeEventListener('pointerdown', handler);
      document.removeEventListener('touchend', handler);
    };
  }, [onClose]);

  return createPortal(
    <aside
      {...props}
      ref={asideRef}
      className={
        cn(
          'overflow-hidden fixed flex flex-col',
          'right-0 top-0 sm:right-6 sm:top-16',
          'min-w-64 sm:max-w-96 w-full h-full sm:h-[calc(100%-64px-10px)]',
          'border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800',
          props.className,
        )
      }
      aria-label="AI assistant chat"
    >
      <header className="flex flex-col overflow-hidden items-end p-4">
        <button onClick={onClose}>
          <CloseIcon />
        </button>
      </header>

      <LazyMessages className="flex-1 p-4" />

      <LazyInput className="p-4" />
    </aside>,
    document.body,
  );
}
