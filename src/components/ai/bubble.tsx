import type { Message } from '@/stores/ai/messages.store';
import { cn } from '@maxigarcia/js-utils';

export function Bubble({ content, role }: Message) {
  return (
    <pre className={
      cn(
        'p-2 rounded-lg text-sm',
        role === 'user' ? 'bg-gray-200 dark:bg-gray-600 mr-auto' : 'ml-auto',
      )
    }
    >
      {content}
    </pre>
  );
}
