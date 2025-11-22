import { use } from 'react';
import { ThemeContext } from '@/context';
import { Button, MoonIcon, SunIcon } from './shared';

export function SwitchTheme({ className }: { className?: string }) {
  const { theme, toggleTheme } = use(ThemeContext);

  return (
    <Button type="button" onClick={toggleTheme} className={className} icon={theme === 'dark' ? <MoonIcon /> : <SunIcon />} />
  );
}
