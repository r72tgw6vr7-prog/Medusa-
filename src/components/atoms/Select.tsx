import React from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  id?: string;
  placeholder?: string;
}

export function Select({ label, id, placeholder, className = '', children, ...rest }: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-white/90 text-sm mb-8">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`w-full min-h-10 px-8 py-0 bg-[rgba(34,34,34,0.8)] border border-[rgba(192,192,192,0.3)] rounded-md text-white text-base placeholder:text-white/40 focus:outline-none focus:border-(--brand-gold) focus:shadow-[0_0_10px_rgba(125,49,93,0.2)] hover:border-(--brand-gold)/50 transition duration-200 ease-out ${className}`}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled selected>
            {placeholder}
          </option>
        )}
        {children}
      </select>
    </div>
  );
}

export default Select;
