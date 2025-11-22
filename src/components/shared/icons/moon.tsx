import type { IconProps } from './type';
import { DEFAULT_ICON_SIZE } from './constans';

export function MoonIcon({ width = DEFAULT_ICON_SIZE, height = DEFAULT_ICON_SIZE, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width} height={height} {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
