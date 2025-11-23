import type { BaseProps } from './types';
import { Text } from '@/components/shared/text';

export function ActionText({ icon, iconPosition = 'left', variant, children }: BaseProps & { children: React.ReactNode }) {
  return (
    <Text tag="span" variant={variant} className="flex gap-2 justify-center items-center leading-normal">
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition === 'right' && icon}
    </Text>
  );
}
