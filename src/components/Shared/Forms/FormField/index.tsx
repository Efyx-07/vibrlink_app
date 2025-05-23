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
  required?: boolean;
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
  required,
}: FormFieldProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      {addedMention && <p className="text-xs opacity-50">{addedMention}</p>}
      <div className="flex h-16 w-full">
        <input
          className={`size-full border ${isValid === false && value !== '' ? 'border-errorColor' : 'border-whiteLight'} bg-darkColorRelief pl-4 outline-none focus:border-accentColor ${isPasswordField ? 'border-r-transparent' : ''}`}
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
        />
        {isPasswordField && (
          <>
            <div className="h-full border-b border-t border-b-whiteLight border-t-whiteLight bg-darkColorRelief py-3">
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
