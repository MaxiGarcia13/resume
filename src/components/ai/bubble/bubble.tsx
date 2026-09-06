import type { LLMMessage } from '@/modules/ai';
import { cn } from '@maxigarcia/js-utils';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from './link';
import { Table, TableCell, TableHead, TableHeader } from './table';

export function Bubble({ content, role }: LLMMessage) {
  const text = typeof content === 'string'
    ? content
    : content?.map((part) => part.type === 'text' ? part.text : part.type).join('');

  return (
    <div
      className={cn(
        'p-2 rounded-lg text-sm whitespace-pre-wrap max-w-full mr-auto wrap-break-word',
        role === 'user' && 'bg-gray-200 dark:bg-gray-600',
      )}
      aria-label={role === 'user' ? 'User message' : 'AI assistant message'}
    >
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: (props) => <Link {...props} />,
          table: (props) => <Table {...props} />,
          thead: (props) => <TableHead {...props} />,
          th: (props) => <TableHeader {...props} />,
          td: (props) => <TableCell {...props} />,
        }}
      >
        {text}
      </Markdown>
    </div>
  );
}
