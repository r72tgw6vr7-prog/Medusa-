import React, { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  helper,
  icon,
  iconPosition = 'right',
  fullWidth = true,
  className = '',
  ...props
}) => {
  const containerStyles = `
    flex flex-col 
    ${fullWidth ? 'w-full' : 'w-auto'}
    ${className}
  `;

  const inputContainerStyles = `
    relative flex items-center 
    bg-[var(--deep-black)] 
    border-2
    rounded-lg 
    overflow-hidden
    ${error ? 'border-red-500' : 'border-[var(--brand-gold)] focus-within:border-[var(--brand-gold)]'}
  `;

  const inputStyles = `
    w-full
    bg-transparent
    text-white
    text-sm md:text-base
    px-3 py-3 md:px-4 md:py-4
    outline-none
    placeholder:text-[#C0BFBF80]
    ${icon ? (iconPosition === 'left' ? 'pl-10 md:pl-12' : 'pr-10 md:pr-12') : ''}
  `;

  const iconStyles = `
    absolute
    ${iconPosition === 'left' ? 'left-3' : 'right-3'}
    top-1/2
    transform
    -translate-y-1/2
    text-[#C0BFBF80]
  `;

  return (
    <div className={containerStyles}>
      {label && (
        <label className='text-[var(--brand-gold)] font-semibold text-sm md:text-base mb-8 block'>
          {label}
        </label>
      )}

      <div className={inputContainerStyles}>
        {icon && iconPosition === 'left' && <div className={iconStyles}>{icon}</div>}

        <input className={inputStyles} {...props} />

        {icon && iconPosition === 'right' && <div className={iconStyles}>{icon}</div>}
      </div>

      {error && <span className='text-red-500 text-sm mt-0'>{error}</span>}

      {helper && !error && <span className='text-[#C0BFBF80] text-sm mt-0'>{helper}</span>}
    </div>
  );
};

export default InputField;
