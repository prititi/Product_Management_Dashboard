// components/FormInput.tsx
import { FC } from "react";
import { FieldValues, UseFormRegister, FieldError } from "react-hook-form";

interface FormInputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  required: boolean;
  errors?: FieldError;
  step?: string | number;
}

const FormInput: FC<FormInputProps> = ({ label, name, type, placeholder, register, required, errors, step }) => {
  return (
    <div className="relative">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...register(name, { required })}
        id={name}
        type={type}
        placeholder={placeholder}
        className={`w-full mt-2 p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 ${
          errors ? "border-red-500" : "border-gray-300"
        }`}
        step={step}
      />
      {errors && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
    </div>
  );
};

export default FormInput;
