// InputField.tsx
import React from "react";

interface InputFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  canEdit?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type = "text",
  placeholder = "",
  required = false,
  value,
  canEdit = true,
}) => {
  return (
    <div className="flex flex-col mb-4 w-full">
      <label
        htmlFor={name}
        className="mb-2 text-gray-700 font-semibold text-right text-sm sm:text-base"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={value}
        required={required}
        disabled={!canEdit}
        className={`p-2.5 sm:p-3 border-2 border-gray-200 text-right rounded-xl focus:outline-none w-full focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 text-sm sm:text-base ${!canEdit ? "bg-gray-100 cursor-not-allowed" : "hover:border-gray-300"}`}
      />
    </div>
  );
};

export default InputField;
