import { createElement } from 'react';

interface HeadingProps {
  children: React.ReactNode
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
}

export function Heading({ children, tag = 'h1', className }: HeadingProps) {
  return createElement(tag, { className }, children);
}
