import React from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import { useFormContext } from "react-hook-form";
import { ErrorMessage, Wrapper, ClassNameForInput } from "./utils";
import { InputProps } from "@/types";

export const InputPhone = ({
  name,
  label,
  className,
  errorsName = name,
  wIsRaw = false,
  disabled = false,
}: InputProps) => {
  const {
    formState: { errors },
    setValue,
    watch,
    register,
    trigger,
  } = useFormContext();

  const errorMessage = errorsName
    ? errors[errorsName]?.message as string
    : errors[name]?.message as string;

  // Surveiller la valeur du champ
  const value = watch(name) || '';

  const handlePhoneChange = (phone: string) => {
    setValue(name, phone, { 
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true 
    });
    
    // Déclencher la validation après un court délai pour permettre le formatage
    setTimeout(() => {
      trigger(name);
    }, 100);
  };

  return (
    <Wrapper wIsRaw={wIsRaw} className={className}>
      {label && (
        <label
          htmlFor={`phone-${name}`}
          className="text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <PhoneInput
        {...register(name)}
        disabled={disabled}
        name={name}
        preferredCountries={[
          "fr",
          "en",
          "be",
          "it",
          "de",
          "es",
          "pt",
          "nl",
          "pl",
          "ro",
          "sk",
          "tr",
        ]}
        forceDialCode={true}
        defaultCountry="fr"
        onChange={handlePhoneChange}
        value={value}
        className={ClassNameForInput(errorMessage)}
        inputProps={{
          'aria-describedby': errorMessage ? `${name}-error` : undefined,
          'aria-invalid': !!errorMessage,
        }}
      />
      <ErrorMessage errorMessage={errorMessage} />
    </Wrapper>
  );
};