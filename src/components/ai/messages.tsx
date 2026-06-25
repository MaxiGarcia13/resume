import { cn } from '@maxigarcia/js-utils';
import { useEffect, useRef } from 'react';
import { getProfile } from '@/data/profile';
import { useAi } from '@/hooks/useAi';
import { useMessages, useModelCached } from '@/stores/ai';
import { Bubble } from './bubble';
import { DownloadModel } from './download-model';

const profile = getProfile();

export function Messages(props: { className?: string }) {
  const messagesRef = useRef<HTMLDivElement>(null);

  const messages = useMessages();
  const modelCached = useModelCached();
  const { loadAiResponse, replying } = useAi();

  useEffect(() => {
    if (!messages.length) {
      return;
    }

    const lastMessage = messages.at(-1);
    if (lastMessage?.role === 'user') {
      loadAiResponse(messages);
    }
  }, [messages]);

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current?.scrollHeight,
      behavior: 'smooth',
    });
  }, [replying, messages]);

  const showEmptyMessage = messages.length === 0 && !replying && modelCached === true;

  return (
    <div
      ref={messagesRef}
      className={cn(
        'flex flex-col gap-2 overflow-y-auto scrollbar-none',
        showEmptyMessage && 'justify-center',
        props.className,
      )}
    >
      {showEmptyMessage && (
        <div className="flex flex-col gap-2 items-center text-center px-4 py-6 self-center max-w-xs">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {`Ask about ${profile.nickName}'s career, work experience, projects, and tech stack. The assistant answers from this CV and runs locally in your browser.`}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-500">
            Replies in English or Spanish, depending on your question.
          </p>
        </div>
      )}

      {messages.map((message, index) => (
        <Bubble key={index} {...message} />
      ))}

      {replying && <Bubble {...replying} />}

      <DownloadModel />
    </div>
  );
}
