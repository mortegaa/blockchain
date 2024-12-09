import React from 'react';

interface TextInputProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function TextInput({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
}: TextInputProps) {
  return (
    <div className="flex flex-col space-y-2">
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-700 "
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 text-gray-800  placeholder-gray-400  bg-gray-100  border border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
        />
    </div>
  );
}
