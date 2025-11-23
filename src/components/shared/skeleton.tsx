import { cn } from '@/utils';

export function Skeleton({ className }: { className?: string }) {
  return (
    <span className={cn('w-full h-full absolute animate-pulse bg-current', className)} />
  );
}
