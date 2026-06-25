import { cn } from '@maxigarcia/js-utils';
import { useEffect, useRef } from 'react';
import { useAi } from '@/hooks/useAi';
import { useMessages } from '@/stores/ai';
import { Bubble } from './bubble';
import { DownloadModel } from './download-model';

export function Messages(props: { className?: string }) {
  const messagesRef = useRef<HTMLDivElement>(null);

  const messages = useMessages();
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

  return (
    <div
      ref={messagesRef}
      className={cn('flex flex-col gap-2 overflow-y-auto scrollbar-none', props.className)}
    >
      {messages.map((message, index) => (
        <Bubble key={index} {...message} />
      ))}

      {replying && <Bubble {...replying} />}

      <DownloadModel />
    </div>
  );
}
