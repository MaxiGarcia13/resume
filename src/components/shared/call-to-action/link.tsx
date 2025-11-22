import type { AnchorHTMLAttributes } from 'react';
import type { BaseProps } from './types';
import { ActionText } from './action-text';
import { getActionStyles } from './utils';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>, BaseProps {
  noWrap?: boolean
}

export function Link({ icon, iconPosition, noWrap, ...props }: LinkProps) {
  const styles = !noWrap ? getActionStyles({ icon, iconPosition, ...props }) : undefined;
  const rel = props.target === '_blank' ? 'noopener noreferrer' : undefined;

  return (
    <a className={styles} rel={rel} {...props}>
      {
        noWrap
          ? props.children
          : <ActionText icon={icon} iconPosition={iconPosition} {...props}>{props.children}</ActionText>
      }
    </a>
  );
}
