"use client";

import { useState, ChangeEvent } from "react";

interface FloatingLabelInputProps {
  label: string;
  type?: string;
  value?: string;
  defaultValue?:string;
  onChange?: (value: string) => void;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  name?: string;
}

export default function FloatingLabelInput({
  label,
  type = "text",
  value: controlledValue,
  onChange,
  required,
  className,
  labelClassName,
  name,
  defaultValue = ""
}: FloatingLabelInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const hasValue = value.length > 0;
  const isLabelFloating = isFocused || hasValue;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  return (
    <div className="relative">
      <input
        name={name}
        required={required}
        type={type}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full px-3 pt-6 pb-2 border border-[#9bb18f] text-sm rounded-lg outline-none transition-all duration-200 focus:border-[#7b926e] ${className}`}
      />
      <label
        className={`absolute left-3 text-gray-400 pointer-events-none transition-all duration-200 ${
          isLabelFloating ? "top-1.5 text-sm" : "top-1/2 -translate-y-1/2"
        } ${labelClassName}`}
      >
        {label}
      </label>
    </div>
  );
}
