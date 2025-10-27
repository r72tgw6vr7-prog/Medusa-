type ResponsiveValue<T> =
  | T
  | {
      mobile?: T;
      tablet?: T;
      desktop?: T;
    };

type SectionProps = {
  children: React.ReactNode;
  spacing?: ResponsiveValue<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>;
  background?: 'default' | 'gold' | 'dark' | 'light' | 'transparent';
  className?: string;
  contained?: boolean;
  as?: keyof JSX.IntrinsicElements;
  id?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
};

type SpacingKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const getSpacingClass = (spacing: ResponsiveValue<SpacingKey>) => {
  const spacingValues: Record<SpacingKey, string> = {
    xs: '4', // 16px
    sm: '6', // 24px
    md: '8', // 32px
    lg: '12', // 48px
    xl: '16', // 64px
    '2xl': '24', // 96px
  };

  if (typeof spacing === 'string') {
    return `py-${spacingValues[spacing as SpacingKey]}`;
  }

  return [
    spacing.mobile && `py-${spacingValues[spacing.mobile]}`,
    spacing.tablet && `sm:py-${spacingValues[spacing.tablet]}`,
    spacing.desktop && `lg:py-${spacingValues[spacing.desktop]}`,
  ]
    .filter(Boolean)
    .join(' ');
};

type BackgroundType = 'default' | 'gold' | 'dark' | 'light' | 'transparent';

const getBackgroundClass = (background: BackgroundType) => {
  const backgroundClasses: Record<BackgroundType, string> = {
    default: 'bg-brand-background',
    gold: 'bg-brand-gold',
    dark: 'bg-black',
    light: 'bg-white',
    transparent: 'bg-transparent',
  };

  return backgroundClasses[background];
};

export function Section({
  children,
  spacing = 'lg',
  background = 'default',
  className = '',
  contained = true,
  as: Component = 'section',
  id,
  ariaLabel,
  ariaLabelledBy,
}: SectionProps) {
  const content = (
    <div className='relative w-full h-full'>
      {contained ? (
        <div className='container mx-auto px-8 sm:px-8 lg:px-8'>{children}</div>
      ) : (
        children
      )}
    </div>
  );

  return (
    <Component
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={`
        relative
        w-full
        ${getSpacingClass(spacing)}
        ${getBackgroundClass(background)}
        ${className}
      `}
    >
      {content}
    </Component>
  );
}
