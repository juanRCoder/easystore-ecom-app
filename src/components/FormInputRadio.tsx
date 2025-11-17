import React from 'react'

type FormInputRadioProps = {
  name: string;
  value: string;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const FormInputRadio = React.forwardRef<HTMLInputElement, FormInputRadioProps>(
  ({ name, value, label, ...rest }, ref) => {
    return (
      <label className="flex items-center gap-2 cursor-pointer outline outline-gray-200 p-3 rounded-lg
          has-[input:checked]:outline-[#EC6D13] has-[input:checked]:outline-2">
        <input type="radio" name={name} value={value} ref={ref} className="hidden peer" {...rest} />
        <span className="w-4 h-4 outline-1 outline-gray-300 rounded-full grid place-items-center
            peer-checked:bg-[#EC6D13] peer-checked:[&>span]:bg-white peer-checked:outline-none
          ">
          <span className="w-2 h-2 rounded-full" />
        </span>
        <span className="text-sm text-gray-700">{label}</span>
      </label>
    )
  }
)
FormInputRadio.displayName = "FormInputRadio";