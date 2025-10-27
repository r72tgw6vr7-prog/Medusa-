import React, { TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
  fullWidth?: boolean;
  className?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  helper,
  fullWidth = true,
  className = '',
  ...props
}) => {
  const containerStyles = `
    flex flex-col 
    ${fullWidth ? 'w-full' : 'w-auto'}
    ${className}
  `;

  const textareaContainerStyles = `
    bg-[#222222] 
    border border-solid 
    rounded-lg 
    ${error ? 'border-red-500' : 'border-[#C0BFBF33] focus-within:border-[#D4AF37]'}
  `;

  const textareaStyles = `
    w-full
    bg-transparent
    text-white
    text-base
    px-4 py-3
    outline-none
    resize-none
    min-h-[120px]
    placeholder:text-[#C0BFBF80]
  `;

  return (
    <div className={containerStyles}>
      {label && <label className='text-white text-sm mb-0'>{label}</label>}

      <div className={textareaContainerStyles}>
        <textarea className={textareaStyles} {...props} />
      </div>

      {error && <span className='text-red-500 text-sm mt-0'>{error}</span>}

      {helper && !error && <span className='text-[#C0BFBF80] text-sm mt-0'>{helper}</span>}
    </div>
  );
};

export default TextArea;
