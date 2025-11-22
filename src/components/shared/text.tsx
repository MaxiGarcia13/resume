import type { Variant } from '@/types';
import { createElement } from 'react';
import { cn } from '@/utils';

type TextTag = 'p' | 'span' | 'div' | 'code' | 'pre';
type TextVariant = Variant | 'highlight';

interface TextProps {
  children: React.ReactNode
  tag?: TextTag
  className?: string
  variant?: TextVariant
}

export function Text(props: TextProps) {
  const tag = props.tag || 'p';
  const variants: Record<TextVariant, string> = {
    ghost: 'text-neutral-400',
    primary: 'text-neutral-900',
    highlight: 'text-orange-500',
  };

  return createElement(tag, { className: cn(variants[props.variant ?? 'ghost'], props.className) }, props.children);
}
