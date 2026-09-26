import type { ComponentProps } from 'react';
import {
  Link as CoreLink,
} from '@react-pdf/renderer';
import { Text } from './text';

interface LinkProps
  extends ComponentProps<typeof CoreLink>, Pick<ComponentProps<typeof Text>, 'size' | 'color' | 'weight'> {
  children: React.ReactNode;
}

export function Link({ children, color, size, weight, ...props }: LinkProps) {
  return (
    <CoreLink {...props} style={{ textDecoration: 'none' }}>
      <Text
        size={size}
        color={color}
        weight={weight}
      >
        {children}
      </Text>
    </CoreLink>
  );
}
