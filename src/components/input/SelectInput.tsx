import React from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage, Wrapper, ClassNameForInput } from "./utils";
import { SelectInputProps } from "@/types";

export const SelectInput = ({
  wIsRaw = false,
  name,
  options,
  placeholder = "Sélectionnez une option",
  label,
  className,
  errorsName,
  disabled = false,
  multiple,
  size,
}: SelectInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errorsName
    ? errors[errorsName]?.message as string
    : errors[name]?.message as string;

  return (
    <Wrapper wIsRaw={wIsRaw} className={className}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        {...register(name)}
        id={name}
        multiple={multiple}
        size={size}
        disabled={disabled}
        className={ClassNameForInput(errorMessage)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ErrorMessage errorMessage={errorMessage} />
    </Wrapper>
  );
}; 