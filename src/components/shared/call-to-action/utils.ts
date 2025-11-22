import type { BaseProps } from './types';
import type { Variant } from '@/types';
import { cn } from '@/utils';

export function getActionStyles({ variant, children, icon, className }: BaseProps & { children?: React.ReactNode, className?: string }) {
  const variantStyles: Record<Variant, string> = {
    ghost: 'bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800',
    primary: 'bg-orange-400 hover:bg-orange-300',
  };

  const styles = cn(
    'py-2 rounded cursor-pointer',
    variantStyles[variant ?? 'ghost'],
    typeof children !== 'undefined' && 'px-4',
    !children && typeof icon !== 'undefined' && 'flex justify-center items-center px-2',
    className,
  );

  return styles;
}
