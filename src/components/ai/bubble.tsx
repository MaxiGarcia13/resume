import type { Message } from '@/stores/ai';
import { cn } from '@maxigarcia/js-utils';
import Markdown from 'react-markdown';

export function Bubble({ content, role }: Message) {
  return (
    <div
      className={cn(
        'p-2 rounded-lg text-sm whitespace-pre-wrap max-w-full mr-auto wrap-break-word',
        role === 'user' && 'bg-gray-200 dark:bg-gray-600',
      )}
    >
      <Markdown>
        {typeof content === 'string'
          ? content
          : content.map((part) => part.type === 'text' ? part.text : part.type).join('')}
      </Markdown>
    </div>
  );
}
