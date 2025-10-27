import * as React from 'react';

export function Dialog({ open, children, onOpenChange }: any) {
  if (!open) return null;
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-8 max-w-md w-full'>{children}</div>
    </div>
  );
}

export const DialogContent = ({ children, className }: any) => (
  <div className={className}>{children}</div>
);

export const DialogHeader = ({ children }: any) => <div className='mb-8'>{children}</div>;

export const DialogTitle = ({ children }: any) => <h2 className='text-lg font-bold'>{children}</h2>;
