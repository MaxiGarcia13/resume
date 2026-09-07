import { cn } from '@maxigarcia/js-utils';
import { useState } from 'react';
import { isMobile } from '@/utils/device';
import { getActionStyles } from '../shared/actions/utils';
import { SparklesIcon } from '../shared/icons/sparkles';
import { getTextClass } from '../shared/text/text.shared';
import { Aside } from './aside';

export function AiButton(props: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const open = !isOpen;
    setIsOpen(open);

    if (isMobile()) {
      document.body.style.overflowY = open ? 'hidden' : 'auto';
    }

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
        <Aside onClose={() => setIsOpen(false)} className="rounded-sm" />
      )}
    </>
  );
}
