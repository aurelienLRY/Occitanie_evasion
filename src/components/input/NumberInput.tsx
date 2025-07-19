import React from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage, Wrapper, ClassNameForInput } from "./utils";
import { NumberInputProps } from "@/types";

export const NumberInput = ({
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
}: NumberInputProps) => {
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
        {...register(name, { valueAsNumber: true })}
        type="number"
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