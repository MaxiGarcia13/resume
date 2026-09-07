import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@maxigarcia/js-utils';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { isMobile, lockBodyScroll, unlockBodyScroll } from '@/utils/device';
import { CloseIcon } from '../shared/icons/close';
import { LazyInput } from './lazy-input';
import { LazyMessages } from './lazy-messages';

type AsideProps = ComponentPropsWithoutRef<'aside'> & {
  onClose: () => void;
};

export function Aside({ onClose, ...props }: AsideProps) {
  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isMobile()) {
      return;
    }

    lockBodyScroll();

    const syncToVisualViewport = () => {
      const aside = asideRef.current;
      const viewport = window.visualViewport;

      if (!aside || !viewport) {
        return;
      }

      aside.style.top = `${viewport.offsetTop}px`;
      aside.style.left = `${viewport.offsetLeft}px`;
      aside.style.width = `${viewport.width}px`;
      aside.style.height = `${viewport.height}px`;
    };

    syncToVisualViewport();
    window.visualViewport?.addEventListener('resize', syncToVisualViewport);
    window.visualViewport?.addEventListener('scroll', syncToVisualViewport);

    return () => {
      window.visualViewport?.removeEventListener('resize', syncToVisualViewport);
      window.visualViewport?.removeEventListener('scroll', syncToVisualViewport);
      unlockBodyScroll();
    };
  }, []);

  useEffect(() => {
    if (isMobile()) {
      return;
    }

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

    return () => {
      document.removeEventListener('pointerdown', handler);
    };
  }, [onClose]);

  return createPortal(
    <aside
      {...props}
      ref={asideRef}
      className={
        cn(
          'overflow-hidden fixed flex flex-col z-20',
          'right-0 top-0 sm:right-6 sm:top-16',
          'min-w-64 sm:max-w-96 w-screen h-dvh sm:h-[calc(100%-64px-24px)]',
          'border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800',
          props.className,
        )
      }
      aria-label="AI assistant chat"
      onClick={(event) => event.stopPropagation()}
    >
      <header className="flex flex-col overflow-hidden items-end p-4">
        <button
          onClick={(event) => {
            onClose();
            event.stopPropagation();
          }}
          className="cursor-pointer"
        >
          <CloseIcon />
        </button>
      </header>

      <LazyMessages className="flex-1 p-4" />

      <LazyInput className="p-4" />
    </aside>,
    document.body,
  );
}
