import React from "react";

/**
 * ErrorMessage Component for Inputs
 * @param errorMessage: string
 */
export const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
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
export const Wrapper = ({
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

export type TInputBase = {
  wIsRaw?: boolean;
  name: string;
  placeholder?: string;
  label?: string;
  className?: string;
  errorsName?: string;
  disabled?: boolean;
};

/**
 * ClassNameForInput Function
 * @param errorMessage: string
 * @returns string
 */
export const ClassNameForInput = (errorMessage: string) => {
  return `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
    errorMessage
      ? "border-red-500 shadow-md shadow-red-500"
      : "border-gray-300 focus:border-blue-500"
  }`;
}; 