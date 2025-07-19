import React from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage, Wrapper, ClassNameForInput } from "./utils";
import { TextareaProps } from "@/types";

/**
 * Textarea Component
 * @param wIsRaw: boolean (default: false)
 * @param name: string
 * @param placeholder: string
 * @param label: string
 * @param className: string
 * @param errorsName: string
 * @param disabled: boolean (default: false)
 * @param rows: number (default: 4)
 * @param cols: number
 * @param maxLength: number
 * @param minLength: number
 * @param autoComplete: string
 */
export const Textarea = ({
  wIsRaw = false,
  name,
  placeholder,
  label,
  className,
  errorsName,
  disabled = false,
  rows = 4,
  cols,
  maxLength,
  minLength,
  autoComplete,
}: TextareaProps) => {
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
      <textarea
        {...register(name)}
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        cols={cols}
        maxLength={maxLength}
        minLength={minLength}
        autoComplete={autoComplete}
        className={ClassNameForInput(errorMessage)}
      />
      <ErrorMessage errorMessage={errorMessage} />
    </Wrapper>
  );
}; 