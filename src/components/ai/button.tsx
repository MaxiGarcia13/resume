import { cn } from '@maxigarcia/js-utils';
import { useState } from 'react';
import { getActionStyles } from '../shared/actions/utils';
import { SparklesIcon } from '../shared/icons/sparkles';
import { getTextClass } from '../shared/text/text.shared';
import { Aside } from './aside';

export function AiButton(props: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

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
        <Aside
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
