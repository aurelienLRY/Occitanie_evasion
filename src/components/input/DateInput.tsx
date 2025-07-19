import React from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage, Wrapper, ClassNameForInput } from "./utils";
import { DateInputProps } from "@/types";

/**
 * DateInput Component
 * @param wIsRaw: boolean (default: false)
 * @param name: string
 * @param placeholder: string
 * @param label: string
 * @param className: string
 * @param errorsName: string
 * @param disabled: boolean (default: false)
 * @param min: string (date minimum)
 * @param max: string (date maximum)
 */
export const DateInput = ({
  wIsRaw = false,
  name,
  placeholder,
  label,
  className,
  errorsName,
  disabled = false,
  min,
  max,
}: DateInputProps) => {
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
      <input
        {...register(name)}
        type="date"
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        className={ClassNameForInput(errorMessage)}
      />
      <ErrorMessage errorMessage={errorMessage} />
    </Wrapper>
  );
}; 