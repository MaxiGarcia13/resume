import { cn } from '@maxigarcia/js-utils';
import { useEffect } from 'react';
import { useAi } from '@/hooks/useAi';
import { useMessages } from '@/stores/ai/messages.react';
import { Bubble } from './bubble';
import { DownloadModel } from './download-model';

export function Messages(props: { className?: string }) {
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

  return (
    <div className={cn('flex flex-col gap-2 overflow-y-auto', props.className)}>
      {messages.map((message, index) => (
        <Bubble key={index} {...message} />
      ))}

      {replying && <Bubble {...replying} />}

      <DownloadModel />
    </div>
  );
}
