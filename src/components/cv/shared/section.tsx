import type { ComponentProps } from 'react';
import { Divider } from './divider';
import { Text } from './text';
import { Wrapper } from './wrapper';

interface SectionProps extends ComponentProps<typeof Wrapper> {
  children: React.ReactNode;
  title: string;
}

export function Section({ children, title, ...props }: SectionProps) {
  return (
    <Wrapper {...props}>
      <Wrapper
        flexDirection="row"
        gap="sm"
        style={{
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Text size="lg" color="primary" weight="bold">{title}</Text>
        <Divider color="primary" />
      </Wrapper>

      {children}
    </Wrapper>
  );
}
