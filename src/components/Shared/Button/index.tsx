interface ButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined;
  label: string;
}

export default function Button({ type, label }: ButtonProps) {
  return (
    <button
      type={type}
      className="h-16 w-full border border-accentColor5 bg-accentColor05 text-accentColor hover:bg-accentColor25"
    >
      <p>{label}</p>
    </button>
  );
}
