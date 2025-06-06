import { useState } from 'react';
import { Icon } from '@iconify/react';
import VerticalSeparator from '../../Separator/VerticalSeparator';

interface FormFieldProps {
  id: string;
  label: string;
  addedMention?: string;
  name: string;
  type: 'text' | 'email' | 'password' | 'url';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValid?: boolean;
  isPasswordField?: boolean;
  isPasswordVisible?: boolean;
  onEyeClick?: () => void;
}

export default function FormField({
  id,
  label,
  addedMention,
  name,
  type,
  value,
  onChange,
  isValid,
  isPasswordField,
  isPasswordVisible,
  onEyeClick,
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  const hasError = isValid === false && value !== '';
  const showRightBorder = isFocused || hasError;

  const inputClassName = `
    size-full
    border
    ${hasError ? 'border-errorColor' : 'border-whiteLight'}
    bg-darkColorRelief
    pl-4
    outline-none
    focus:border-accentColor
    ${isPasswordField && !showRightBorder ? 'border-r-transparent' : ''}
  `;

  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      {addedMention && <p className="text-xs opacity-50">{addedMention}</p>}

      <div className="flex h-16 w-full">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required
          className={inputClassName}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {isPasswordField && (
          <>
            <div className="h-full border-y border-y-whiteLight bg-darkColorRelief py-3">
              <VerticalSeparator />
            </div>

            <div className="flex size-full max-w-20 items-center justify-center border border-l-0 border-whiteLight bg-darkColorRelief">
              <Icon
                icon={isPasswordVisible ? 'mdi:eye-off' : 'mdi:eye'}
                className="cursor-pointer text-xl hover:text-accentColor"
                onClick={onEyeClick}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
