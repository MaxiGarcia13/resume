import type { ComponentProps } from 'react';
import { Text as CoreText } from '@react-pdf/renderer';
import { colors, font } from '../constants';

type TextProps = ComponentProps<typeof CoreText> & {
  children: React.ReactNode;
  color?: keyof typeof colors;
  size: keyof typeof font.size;
  weight?: keyof typeof font.family;
};

export function Text({ color, size, weight = 'normal', ...props }: TextProps) {
  return (
    <CoreText
      {...props}
      style={{
        fontFamily: font.family[weight ?? 'normal'],
        fontSize: font.size[size ?? 'md'],
        color: colors[color ?? 'primary'],
        ...props.style,
      }}
    />
  );
}
