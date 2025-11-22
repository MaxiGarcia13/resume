import type { ImgHTMLAttributes } from 'react';
import { use } from 'react';
import { ThemeContext } from '@/context';
import { cn } from '@/utils';
import { Img } from '../shared';

interface ProfileImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  imageClassName?: string
}

export function ProfileImage({ src, alt, className, imageClassName, ...props }: ProfileImageProps) {
  const { theme } = use(ThemeContext);
  return (
    <div className={cn('rounded-full h-[200px] w-[200px] shrink-0 overflow-hidden border-2 border-solid border-current relative', className)}>
      <Img src={src} alt={alt} className={cn('h-full w-full', imageClassName)} {...props} />
      {theme === 'light' && <span className="absolute w-[100px] h-[40px] top-[33px] left-[45px]"><Img src="/assets/images/sun-glasses.webp" alt={alt} /></span>}
    </div>
  );
}
