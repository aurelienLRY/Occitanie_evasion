/* LIBRAIRIES */
import React from "react";
import { useFormContext } from "react-hook-form";
import { getNestedValue } from "@/lib/utils/customLoadash.utils";

/**
 * ErrorMessage Component for Inputs
 * @param errorMessage: string
 */
const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  if (!errorMessage) return null;
  return (
    <span role="alert" className="text-red-500 text-sm mt-1">
      {errorMessage}
    </span>
  );
};

/**
 * Wrapper Component for Inputs
 * @param children: React.ReactNode
 * @param className: string
 * @param wIsRaw: boolean (default: false)
 */
const Wrapper = ({
  children,
  className,
  wIsRaw = false,
}: {
  children: React.ReactNode;
  className?: string;
  wIsRaw?: boolean;
}) => {
  return (
    <div
      className={`flex ${
        wIsRaw
          ? "flex-col md:flex-row md:items-center md:text-right items-start gap-0 md:gap-2"
          : "flex-col items-start gap-0"
      } flex-1 ${className || ""}`}
    >
      {children}
    </div>
  );
};

type TInputBase = {
  wIsRaw?: boolean;
  name: string;
  placeholder?: string;
  label?: string;
  className?: string;
  errorsName?: string;
  disabled?: boolean;
};

type InputProps = TInputBase & {
  type: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string | number;
  min?: string | number;
  max?: string | number;
};

/**
 * ClassNameForInput Function
 * @param errorMessage: string
 * @returns string
 */
const ClassNameForInput = (errorMessage: string) => {
  return `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
    errorMessage
      ? "border-red-500 shadow-md shadow-red-500"
      : "border-gray-300 focus:border-blue-500"
  }`;
};

/**
 * Input Component
 * @param name: string
 * @param type: string
 * @param placeholder: string
 * @param label: string
 * @param className: string
 * @param onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
 * @param errorsName: string
 */
export const Input = ({
  name,
  type,
  disabled = false,
  placeholder,
  label,
  className,
  onChange,
  defaultValue,
  errorsName = name,
  wIsRaw = false,
  min,
  max,
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = getNestedValue(errors, errorsName);
  const errorMessage = error && typeof error === 'object' && 'message' in error 
    ? error.message as string 
    : '';

  return (
    <Wrapper wIsRaw={wIsRaw} className={className}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}
      <div className="flex flex-col flex-1 gap-0 w-full">
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name)}
          onChange={onChange}
          className={`${ClassNameForInput(errorMessage)} ${
            disabled ? "opacity-70 bg-gray-100" : ""
          } ${type === "number" ? "max-w-40" : ""}`}
          aria-invalid={errorMessage ? "true" : "false"}
          disabled={disabled}
          defaultValue={defaultValue}
          min={min}
          max={max}
        />
        <ErrorMessage errorMessage={errorMessage} />
      </div>
    </Wrapper>
  );
}; 