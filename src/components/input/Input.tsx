import React from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage, Wrapper, ClassNameForInput } from "./utils";
import { InputProps } from "@/types";

export const Input = ({
  wIsRaw = false,
  name,
  placeholder,
  label,
  className,
  errorsName,
  disabled = false,
  type = "text",
  autoComplete,
  maxLength,
  minLength,
  pattern,
}: InputProps) => {
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
        type={type}
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        className={ClassNameForInput(errorMessage)}
      />
      <ErrorMessage errorMessage={errorMessage} />
    </Wrapper>
  );
}; 