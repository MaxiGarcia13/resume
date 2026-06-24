import type { Message } from '@/stores/ai/messages.store';
import { cn } from '@maxigarcia/js-utils';
import { useEffect, useState } from 'react';
import { useAi } from '@/hooks/useAi';
import { $messages } from '@/stores/ai/messages.store';
import { Bubble } from './bubble';

export function Messages(props: { className?: string }) {
  const [messagesState, setMessagesState] = useState<Message[]>([]);
  const { loadAiResponse, replying } = useAi();

  useEffect(() => {
    $messages.subscribe((messages) => {
      const _messages = [...messages];
      setMessagesState(_messages);

      const lastMessage = _messages.at(-1);
      if (lastMessage?.role === 'user') {
        loadAiResponse(_messages);
      }
    });
  }, []);

  return (
    <div className={cn('flex flex-col gap-2 overflow-y-auto', props.className)}>
      {messagesState.map((message, index) => (
        <Bubble key={index} {...message} />
      ))}

      {replying && <Bubble {...replying} />}
    </div>
  );
}
