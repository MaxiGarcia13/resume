import type { KeyboardEvent } from 'react';
import { cn } from '@maxigarcia/js-utils';
import { useEffect, useRef, useState } from 'react';
import { getActionStyles } from '@/components/shared/actions/utils';
import { SendIcon } from '@/components/shared/icons/send';
import { useAi } from '@/hooks/useAi';
import { pushMessage, setError } from '@/modules/ai';
import { LoadingIcon } from '../shared/icons/loading';

export function Input(props: { className?: string }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [value, setValue] = useState('');
  const disabled = value.trim() === '';
  const { replying, modelDownloading, modelCached } = useAi();
  const inputLocked = modelCached === false || replying != null || modelDownloading;

  const submit = () => {
    const trimmedValue = value.trim();

    if (!trimmedValue || inputLocked) {
      return;
    }

    setError(null);
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
    if (replying !== null || modelDownloading) {
      return;
    }

    textareaRef.current?.focus({ preventScroll: true });
  }, [replying, modelDownloading]);

  return (
    <div
      className={cn(
        'flex items-center justify-between w-full p-3 rounded-sm',
        'border border-gray-200 bg-white text-neutral-800',
        'dark:border-gray-700 dark:bg-gray-900 dark:text-neutral-100',
        'focus-within:border-orange-400',
        props.className,
      )}
      onClick={() => textareaRef.current?.focus({ preventScroll: true })}
    >
      <textarea
        ref={textareaRef}
        className="field-sizing-content text-sm max-h-30 resize-none flex-1 h-full outline-none"
        placeholder={
          replying !== null
            ? '...'
            : modelDownloading
              ? 'Downloading model...'
              : 'Ask anything'
        }
        rows={2}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        disabled={inputLocked}
        aria-label="AI assistant input"
      />
      <button
        type="button"
        className={getActionStyles({ hasIcon: true, className: 'h-full' })}
        disabled={disabled || inputLocked}
        onClick={submit}
        aria-label="Send message"
      >
        {replying !== null || modelDownloading ? <LoadingIcon className="animate-spin" /> : <SendIcon />}
      </button>
    </div>
  );
}
