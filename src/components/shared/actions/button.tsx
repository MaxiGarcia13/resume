import type { ButtonHTMLAttributes } from 'react';
import type { BaseProps } from './types';
import { ActionText } from './action-text';
import { getActionStyles } from './utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, BaseProps { }

export function Button({ children, icon, iconPosition = 'left', type, className, variant, ...props }: ButtonProps) {
  const styles = getActionStyles({ variant, className, children, icon });

  return (
    <button
      type={type}
      className={styles}
      {...props}
    >
      <ActionText variant={variant} icon={icon} iconPosition={iconPosition}>{children}</ActionText>
    </button>
  );
}
