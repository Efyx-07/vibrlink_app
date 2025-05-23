import LoadingSpinner from '../LoadingSpinner';

interface ButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined;
  label: string;
  isLoading?: boolean;
  onButtonClick?: () => void;
  isLinkCard?: boolean;
  addMention?: string;
  disabled?: boolean;
}

export default function Button({
  type,
  label,
  isLoading,
  onButtonClick,
  isLinkCard,
  addMention,
  disabled,
}: ButtonProps) {
  const baseClasses = isLinkCard ? 'size-full min-h-10' : 'h-16 w-full';
  const enabledClasses =
    'cursor-pointer border border-accentColor5 bg-accentColor05 text-accentColor hover:bg-accentColor25';
  const disabledClasses =
    'cursor-not-allowed border-accentColor05 bg-accentColor05 text-whiteLight50';

  return (
    <button
      type={type}
      className={`${disabled ? disabledClasses : enabledClasses} ${baseClasses}`}
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
