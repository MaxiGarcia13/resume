import type { HtmlHTMLAttributes } from 'react';
import { createElement } from 'react';
import { cn } from '@/utils';

interface HeadingProps extends HtmlHTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
  tag?: HeadingTag
  className?: string
}

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export function Heading({ children, tag = 'h1', className, ...props }: HeadingProps) {
  const variants: Partial<Record<HeadingTag, string>> = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-bold',
    h3: 'text-2xl font-bold',
    h4: 'text-xl font-bold',
    h5: 'text-lg font-bold',
    h6: 'text-base font-bold',
  };

  return createElement(tag, { className: cn(variants[tag], className), ...props }, children);
}
