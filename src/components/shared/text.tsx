import { createElement } from 'react';
import { cn } from '../../utils';

type TextTag = 'p' | 'span' | 'div' | 'code' | 'pre';
interface TextProps {
  children: React.ReactNode
  tag?: TextTag
  className?: string
}

export function Text(props: TextProps) {
  const tag = props.tag || 'p';
  const classNames: Partial<Record<TextTag, string>> = {};
  const className = cn(classNames[tag] && 'text-neutral-300', props.className);

  return createElement(tag, { className }, props.children);
}
