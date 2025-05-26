import LoadingSpinner from '../LoadingSpinner';

interface ButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined;
  label: string;
  isLoading?: boolean;
  onButtonClick?: () => void;
  isSmall?: boolean;
  addMention?: string;
  disabled?: boolean;
}

export default function Button({
  type,
  label,
  isLoading,
  onButtonClick,
  isSmall,
  addMention,
  disabled,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${isSmall ? 'size-full min-h-10' : 'h-16 w-full'} cursor-pointer border border-accentColor5 bg-accentColor05 text-accentColor hover:bg-accentColor25`}
      onClick={onButtonClick}
      disabled={disabled}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <p>{addMention}</p>
          <LoadingSpinner className="medium-ring" />
        </div>
      ) : (
        <p>{label}</p>
      )}
    </button>
  );
}
