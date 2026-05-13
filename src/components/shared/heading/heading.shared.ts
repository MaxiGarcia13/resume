import { cn } from '@maxigarcia/js-utils';

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export const headingVariants: Record<HeadingTag, string> = {
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-bold',
  h3: 'text-2xl font-bold',
  h4: 'text-xl font-bold',
  h5: 'text-lg font-bold',
  h6: 'text-base font-bold',
};

export function getHeadingClass(tag: HeadingTag, className?: string) {
  return cn(headingVariants[tag], className);
}
