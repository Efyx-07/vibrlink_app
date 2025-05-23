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
  return (
    <button
      type={type}
      className={`cursor-pointer border border-accentColor5 bg-accentColor05 text-accentColor hover:bg-accentColor25 ${isLinkCard ? 'size-full min-h-10' : 'h-16 w-full'} ${disabled ? 'cursor-not-allowed border-accentColor05 bg-accentColor05 text-whiteLight50 hover:bg-accentColor05' : ''} `}
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
