interface FormFieldProps {
  id: string;
  label: string;
  addedMention?: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValid?: boolean;
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
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      {addedMention && <p className="text-xs opacity-50">{addedMention}</p>}
      <input
        className={`h-16 border ${isValid === false ? 'border-errorColor' : ''} bg-darkColorRelief pl-4 outline-none focus:border-accentColor`}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
