import type { ComponentPropsWithoutRef } from 'react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { LazyInput } from './lazy-input';
import { LazyMessages } from './lazy-messages';

type AsideProps = ComponentPropsWithoutRef<'aside'> & {
  onClose: () => void;
};

export function Aside({ onClose, ...props }: AsideProps) {
  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (
        asideRef.current?.contains(target)
        || document.getElementById('switch-theme').contains(target)
        || document.getElementById('ai-button').contains(target)
      ) {
        return;
      }

      onClose();
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [onClose]);

  return createPortal(
    <aside
      ref={asideRef}
      className="right-4 top-16 min-w-64 max-w-sm w-full overflow-hidden fixed h-[calc(100%-64px-10px)] border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
      {...props}
    >
      <div className="h-full flex flex-col gap-4">
        <LazyMessages className="flex-1 p-4" />

        <LazyInput className="p-4" />
      </div>
    </aside>,
    document.body,
  );
}
