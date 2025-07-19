import React from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage, Wrapper, ClassNameForInput } from "./utils";
import { TimeInputProps } from "@/types";

/**
 * TimeInput Component
 * @param wIsRaw: boolean (default: false)
 * @param name: string
 * @param placeholder: string
 * @param label: string
 * @param className: string
 * @param errorsName: string
 * @param disabled: boolean (default: false)
 * @param min: string
 * @param max: string
 * @param step: string
 */
export const TimeInput = ({
  wIsRaw = false,
  name,
  placeholder,
  label,
  className,
  errorsName,
  disabled = false,
  min,
  max,
  step,
}: TimeInputProps) => {
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
        type="time"
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        className={ClassNameForInput(errorMessage)}
      />
      <ErrorMessage errorMessage={errorMessage} />
    </Wrapper>
  );
}; 