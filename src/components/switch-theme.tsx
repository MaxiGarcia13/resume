import { useTheme } from '@/stores/theme/theme.react';
import { Button, MoonIcon, SunIcon } from './shared';

export function SwitchTheme({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      type="button"
      onClick={() => {
        toggleTheme();
      }}
      className={className}
      icon={theme === 'dark' ? <MoonIcon /> : <SunIcon />}
    />
  );
}
