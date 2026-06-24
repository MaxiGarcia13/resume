import type { Message } from '@/stores/ai/messages.store';
import { cn } from '@maxigarcia/js-utils';
import { useEffect, useState } from 'react';
import { $messages } from '@/stores/ai/messages.store';
import { Bubble } from './bubble';

export function Messages(props: { className?: string }) {
  const [messagesState, setMessagesState] = useState<Message[]>([]);

  useEffect(() => {
    $messages.subscribe((messages) => {
      setMessagesState([...messages]);
    });
  }, []);

  return (
    <div className={cn('flex flex-col gap-2 overflow-y-auto', props.className)}>
      {messagesState.map((message) => (
        <Bubble key={message.id} {...message} />
      ))}
    </div>
  );
}
