interface FormFieldProps {
  id: string;
  label: string;
  addedMention?: string;
  name: string;
  type: string;
}

export default function FormField({
  id,
  label,
  addedMention,
  name,
  type,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      {addedMention && <p className="text-xs opacity-50">{addedMention}</p>}
      <input
        className="h-16 border border-whiteLight bg-darkColorRelief pl-4 outline-none focus:border-accentColor"
        id={id}
        name={name}
        type={type}
      />
    </div>
  );
}
