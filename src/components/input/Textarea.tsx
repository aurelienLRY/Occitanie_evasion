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
 * Textarea Component
 * @param name: string
 * @param label: string
 * @param className: string
 * @param placeholder: string
 * @param errorsName: string
 */
export const Textarea = ({
  name,
  label,
  className,
  placeholder,
  errorsName = name,
  rows = 4,
  cols = 30,
  wIsRaw = false,
}: {
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  errorsName?: string;
  rows?: number;
  cols?: number;
  wIsRaw?: boolean;
}) => {
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
      <div className="flex flex-col gap-0 w-full">
        <textarea
          id={name}
          placeholder={placeholder}
          {...register(name)}
          className={ClassNameForInput(errorMessage)}
          aria-invalid={errorMessage ? "true" : "false"}
          rows={rows}
          cols={cols}
        />
        <ErrorMessage errorMessage={errorMessage} />
      </div>
    </Wrapper>
  );
}; 