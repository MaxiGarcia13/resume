import type { KeyboardEvent } from 'react';
import { cn } from '@maxigarcia/js-utils';
import { useEffect, useRef, useState } from 'react';
import { getActionStyles } from '@/components/shared/actions/utils';
import { SendIcon } from '@/components/shared/icons/send';
import { useAi } from '@/hooks/useAi';
import { pushMessage } from '@/stores/ai/messages.store';

export function Input(props: { className?: string }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [value, setValue] = useState('');
  const disabled = value.trim() === '';
  const { replying } = useAi();

  const submit = () => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return;
    }

    pushMessage({
      content: trimmedValue,
      role: 'user',
    });

    setValue('');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  };

  useEffect(() => {
    if (replying === null) {
      textareaRef.current?.focus();
    }
  }, [replying]);

  return (
    <div className={cn('flex items-center justify-between w-full', props.className)}>
      <textarea
        ref={textareaRef}
        className="border border-gray-200 bg-white p-3 field-sizing-content text-sm max-h-30 text-neutral-800 resize-none rounded-sm w-full dark:border-gray-700 dark:bg-gray-900 dark:text-neutral-100"
        placeholder="Ask a question..."
        rows={2}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        disabled={replying != null}
      />
      <button
        type="button"
        className={getActionStyles({ hasIcon: true, className: 'h-full' })}
        disabled={disabled}
        onClick={submit}
      >
        <SendIcon />
      </button>
    </div>
  );
}
