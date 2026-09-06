import type { ComponentPropsWithoutRef } from 'react';

export function Link({
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
