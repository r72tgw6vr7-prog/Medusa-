import React from 'react';

interface FormInputProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'date' | 'time' | 'password';
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  fieldContainerClass?: string;
  labelClass?: string;
  inputClass?: string;
  min?: string;
  step?: string;
  scheme?: 'dark' | 'light';
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder,
  className = '',
  fieldContainerClass = 'space-y-2',
  labelClass = 'block text-sm font-medium text-white mb-2',
  inputClass = 'w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-gold/70 focus:border-brand-gold/70 transition-colors',
  min,
  step,
  scheme,
}) => {
  const finalInputClass = scheme === 'dark' 
    ? `${inputClass} scheme-dark` 
    : inputClass;

  return (
    <div className={`${fieldContainerClass} ${className}`}>
      <label className={labelClass} htmlFor={id}>
        {label}
        {required && '*'}
      </label>
      <input
        type={type}
        id={id}
        className={finalInputClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        step={step}
      />
      {error && <p className='text-red-500 text-sm mt-0'>{error}</p>}
    </div>
  );
};

export default FormInput;