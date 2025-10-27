interface ContainerProps {
  children: React.ReactNode;
  size?: 'default' | 'narrow' | 'wide';
  className?: string;
}

export function Container({ children, size = 'default', className = '' }: ContainerProps) {
  const sizeClasses = {
    narrow: 'max-w-4xl',
    default: 'max-w-[1433px]',
    wide: 'max-w-[1400px]',
  };

  return (
    <div className={`${sizeClasses[size]} mx-auto px-6 md:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}
