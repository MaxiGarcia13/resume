import type { Message } from '@/stores/ai/messages.store';
import { cn } from '@maxigarcia/js-utils';

export function Bubble({ content, role }: Message) {
  return (
    <pre className={
      cn(
        'p-2 rounded-lg text-sm whitespace-pre-wrap max-w-full mr-auto',
        role === 'user' && 'bg-gray-200 dark:bg-gray-600',
      )
    }
    >
      {typeof content === 'string'
        ? content
        : content.map((part) => part.type === 'text' ? part.text : part.type).join('')}
    </pre>
  );
}
