import LoadingSpinner from '../LoadingSpinner';

interface ButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined;
  label: string;
  isLoading?: boolean;
}

export default function Button({ type, label, isLoading }: ButtonProps) {
  return (
    <button
      type={type}
      className="h-16 w-full border border-accentColor5 bg-accentColor05 text-accentColor hover:bg-accentColor25"
    >
      {isLoading ? <LoadingSpinner className="medium-ring" /> : <p>{label}</p>}
    </button>
  );
}
