type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'wide' | 'narrow';
  as?: keyof JSX.IntrinsicElements;
  fluid?: boolean;
};

export function Container({
  children,
  className = '',
  size = 'default',
  as: Component = 'div',
  fluid = false,
}: ContainerProps) {
  const sizeClasses = {
    default: 'max-w-[1433px]',
    wide: 'max-w-[1920px]',
    narrow: 'max-w-[1024px]',
  };

  return (
    <Component
      className={`
        relative
        w-full
        mx-auto
        ${fluid ? 'px-0' : 'px-4 sm:px-6 lg:px-8'}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {children}
    </Component>
  );
}
