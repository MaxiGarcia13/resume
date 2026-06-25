import type { ComponentPropsWithoutRef } from 'react';
import type { Message } from '@/stores/ai';
import { cn } from '@maxigarcia/js-utils';
import Markdown from 'react-markdown';

function MarkdownLink({
  href,
  children,
  ...props
}: ComponentPropsWithoutRef<'a'>) {
  const isSectionLink = href?.startsWith('#');

  return (
    <a
      {...props}
      {...(!isSectionLink && {
        target: '_blank',
        rel: 'noopener noreferrer',
      })}
      href={href}
      className="underline text-blue-600 dark:text-blue-400 hover:opacity-80"
    >
      {children}
    </a>
  );
}

export function Bubble({ content, role }: Message) {
  const text = typeof content === 'string'
    ? content
    : content.map((part) => part.type === 'text' ? part.text : part.type).join('');

  return (
    <div
      className={cn(
        'p-2 rounded-lg text-sm whitespace-pre-wrap max-w-full mr-auto wrap-break-word',
        role === 'user' && 'bg-gray-200 dark:bg-gray-600',
      )}
      aria-label={role === 'user' ? 'User message' : 'AI assistant message'}
    >
      <Markdown
        components={{
          a: (props) => <MarkdownLink {...props} />,
        }}
      >
        {text}
      </Markdown>
    </div>
  );
}
