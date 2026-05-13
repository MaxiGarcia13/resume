import type { Variant } from '@/types';
import { cn } from '@/utils';

export type TextTag = 'p' | 'span' | 'div' | 'code' | 'pre';
export type TextVariant = Variant | 'highlight';

export const textVariants: Record<TextVariant, string> = {
  ghost: 'text-neutral-400',
  primary: 'text-neutral-900',
  highlight: 'text-orange-500',
};

export function getTextClass(variant: TextVariant = 'ghost', className?: string) {
  return cn(textVariants[variant], className);
}
