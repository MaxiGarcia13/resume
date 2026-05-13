import type { Variant } from '@/types';
import { cn } from '@maxigarcia/js-utils';

interface GetActionStylesParams {
  variant?: Variant;
  hasChildren?: boolean;
  hasIcon?: boolean;
  className?: string;
}

export function getActionStyles({
  variant,
  hasChildren,
  hasIcon,
  className,
}: GetActionStylesParams) {
  const variantStyles: Record<Variant, string> = {
    ghost: 'bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800',
    primary: 'bg-orange-400 hover:bg-orange-300',
  };

  return cn(
    'py-2 rounded cursor-pointer',
    variantStyles[variant ?? 'ghost'],
    hasChildren && 'px-4',
    !hasChildren && hasIcon && 'flex justify-center items-center px-2',
    className,
  );
}
