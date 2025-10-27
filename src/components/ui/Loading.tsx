import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LoadingProps {
  className?: string;
  text?: string;
}

export function Loading({ className, text = 'Loading...' }: LoadingProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center space-y-4', className || '')}>
      <Loader2 className='h-8 w-8 animate-spin text-primary' />
      {text && <p className='text-sm text-muted-foreground'>{text}</p>}
    </div>
  );
}
