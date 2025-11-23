import type { ImgHTMLAttributes, SyntheticEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils';
import { Skeleton } from './skeleton';

interface ImgProps extends ImgHTMLAttributes<HTMLImageElement> { }

export function Img({ src, alt, className, ...props }: ImgProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const onLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    setImageLoaded(true);
    setImageError(false);
    props.onLoad?.(event);
  };

  const onError = (error: SyntheticEvent<HTMLImageElement>) => {
    props.onError?.(error);

    setImageError(true);
    setImageLoaded(false);
  };

  const resetImageState = () => {
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setImageError(false);
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setImageLoaded(false);
  };

  useEffect(() => {
    if (ref.current?.complete && src !== ref.current.src) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      resetImageState();
    }
  }, [src]);

  if (imageError) {
    return <span className="w-full h-full flex justify-center items-center">🚨 No image</span>;
  }

  return (
    <figure className={cn('relative overflow-hidden shrink-0', className)}>
      {!imageLoaded && <Skeleton />}
      <img ref={ref} src={src} alt={alt} loading={props.loading ?? 'lazy'} className="object-contain w-full h-full shrink-0" onLoad={onLoad} onError={onError} {...props} />
    </figure>
  );
}
