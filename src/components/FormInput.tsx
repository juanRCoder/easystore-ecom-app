import React from "react";

type FormInputProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, label, type = "text", placeholder, error, ...rest }, ref) => {
    return (
      <div className='gap-1 rounded-xl flex flex-col'>
        {label && (<label htmlFor={id} className="text-gray-500 text-sm">{label}</label>)}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          ref={ref}
          className='w-full outline-none border-none bg-gray-100 p-2 rounded-lg'
          {...rest} // pasa value, onChange, onBlur, etc.
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    )
  }
);
FormInput.displayName = "FormInput";