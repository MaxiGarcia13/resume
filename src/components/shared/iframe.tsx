import type { IframeHTMLAttributes } from 'react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils';
import { Link } from './actions';
import { Skeleton } from './skeleton';

interface IframeProps extends IframeHTMLAttributes<HTMLIFrameElement> {
}

export function Iframe({ src, title, className, ...props }: IframeProps) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  const handleLoad = () => {
    setIframeLoaded(true);
    setIframeError(false);
  };

  const handleError = () => {
    setIframeLoaded(false);
    setIframeError(true);
  };

  const resetIframeState = () => {
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setIframeLoaded(false);
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setIframeError(false);
  };

  useEffect(() => {
    if (ref.current?.src !== src) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      resetIframeState();
    }
  }, [src]);

  if (iframeError) {
    return <span className="w-full h-full flex justify-center items-center">🚨 No iframe</span>;
  }

  return (
    <Link href={src} target="_blank" noWrap>
      <div className="relative overflow-hidden">
        {!iframeLoaded && <Skeleton />}
        <span className="absolute w-full h-full select-none"></span>
        <iframe
          ref={ref}
          src={src}
          title={title}
          className={cn('overflow-hidden rounded', className)}
          loading="lazy"
          sandbox={props.sandbox ?? 'allow-same-origin'}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      </div>
    </Link>
  );
}
