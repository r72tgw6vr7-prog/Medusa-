import React from 'react';

export interface MedusaInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  leftIcon?: React.ReactNode;
}

export function MedusaInput({ id, label, leftIcon, className = '', ...rest }: MedusaInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="flex items-center gap-0 text-[15px] font-medium text-white/90 mb-0.5">
          {leftIcon}
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none">
            {leftIcon}
          </span>
        )}
        <input
          id={id}
          className={`w-full min-h-10 ${leftIcon ? 'pl-8' : 'pl-3'} pr-3 py-0 bg-[rgba(34,34,34,0.8)] border border-[rgba(192,192,192,0.3)] rounded-md text-white text-base placeholder:text-white/40 focus:outline-none focus:border-(--brand-gold) focus:shadow-[0_0_10px_rgba(125,49,93,0.2)] hover:border-(--brand-gold)/50 transition duration-200 ease-out ${className}`}
          {...rest}
        />
      </div>
    </div>
  );
}

export default MedusaInput;
