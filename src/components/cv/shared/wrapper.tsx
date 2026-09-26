import type { ComponentProps } from 'react';
import { View } from '@react-pdf/renderer';
import { spaces } from '../constants/spaces';

interface WrapperProps extends ComponentProps<typeof View> {
  gap?: keyof typeof spaces;
  flexDirection?: 'row' | 'column';
}

export function Wrapper({ flexDirection, gap, ...props }: WrapperProps) {
  return (
    <View
      {...props}
      style={{
        flexDirection,
        gap: gap ? spaces[gap] : undefined,
        ...props.style,
      }}
    />
  );
}
