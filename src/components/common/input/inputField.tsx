import React from "react";
interface ITarget {
  name: string;
  value: string;
}

interface InputFieldProps {
  label?: string;
  type?: string;
  name: string;
  value: string;
  onChange: (target: ITarget) => void;
  error: string;
  placeholder?: string;
}

function InputField({
  label,
  type,
  name,
  value,
  onChange,
  error,
  placeholder,
}: InputFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ name, value: e.target.value });
  };
  return (
    <div>
      <label
        htmlFor="input"
        className="block text-sm font-medium leading-6 text-gray-900 pl-2"
      >
        {label}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center "></div>
        <input
          type={type || "text"}
          name={name}
          id={name}
          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={placeholder || ""}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default InputField;
