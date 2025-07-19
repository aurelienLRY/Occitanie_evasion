// Types de base pour tous les inputs
export type TInputBase = {
  wIsRaw?: boolean;
  name: string;
  placeholder?: string;
  label?: string;
  className?: string;
  errorsName?: string;
  disabled?: boolean;
};

// Types spécifiques pour chaque type d'input
export type InputProps = TInputBase & {
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number';
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
};

export type SelectInputProps = TInputBase & {
  options: Array<{ value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  multiple?: boolean;
  size?: number;
};

export type TextareaProps = TInputBase & {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  rows?: number;
  cols?: number;
  maxLength?: number;
  minLength?: number;
  autoComplete?: string;
};

export type DateInputProps = TInputBase & {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  min?: string;
  max?: string;
  format?: string;
};

export type TimeInputProps = TInputBase & {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  min?: string;
  max?: string;
  step?: number;
};

export type NumberInputProps = TInputBase & {
  value?: number;
  onChange?: (value: number) => void;
  onBlur?: () => void;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
}; 