import LoadingSpinner from '../LoadingSpinner';

interface ButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined;
  label: string;
  isLoading?: boolean;
  onButtonClick?: () => void;
  isLinkCard?: boolean;
}

export default function Button({
  type,
  label,
  isLoading,
  onButtonClick,
  isLinkCard,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${isLinkCard ? 'size-full min-h-10' : 'h-16 w-full'} border border-accentColor5 bg-accentColor05 text-accentColor hover:bg-accentColor25`}
      onClick={onButtonClick}
    >
      {isLoading ? <LoadingSpinner className="medium-ring" /> : <p>{label}</p>}
    </button>
  );
}
