import LoadingSpinner from '../LoadingSpinner';

interface ButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined;
  label: string;
  isLoading?: boolean;
  onButtonClick?: () => void;
  isSmall?: boolean;
  isDangerous?: boolean;
  isMaxWidthLmited?: boolean;
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
  isDangerous,
  isMaxWidthLmited,
}: ButtonProps) {
  // Classe pour les couleurs régulières
  const regularColors: string =
    'border-accentColor5 bg-accentColor05 text-accentColor hover:bg-accentColor25';
  // Classe pour les couleurs dangereuses
  const dangerousColors: string =
    'border-errorColor5 bg-errorColor05 text-errorColor hover:bg-errorColor25';

  return (
    <button
      type={type}
      className={`${isSmall ? 'size-full min-h-10 md:w-60' : 'h-16 w-full'} cursor-pointer border ${isDangerous ? dangerousColors : regularColors} ${isMaxWidthLmited ? 'max-w-80' : ''}`}
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
