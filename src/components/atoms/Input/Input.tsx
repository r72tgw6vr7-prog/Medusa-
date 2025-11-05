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
    border border-solid 
    rounded-lg 
    ${error ? 'border-red-500' : 'border-[#C0BFBF33] focus-within:border-[var(--brand-gold)]'}
  `;

  const inputStyles = `
    w-full
    bg-transparent
    text-white
    text-base
    px-4 py-3
    outline-none
    placeholder:text-[#C0BFBF80]
    ${icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : ''}
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
      {label && <label className='text-white text-sm mb-0'>{label}</label>}

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
