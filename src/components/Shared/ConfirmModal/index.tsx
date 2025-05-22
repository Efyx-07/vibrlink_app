import { Icon } from '@iconify/react';

interface ConfirmModalProps {
  topline: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  icon: string;
}

export default function ConfirmModal({
  topline,
  message,
  onConfirm,
  onCancel,
  icon,
}: ConfirmModalProps) {
  return (
    <div className="fixed right-0 top-0 z-50 flex h-dvh w-dvw items-center justify-center bg-darkColor75">
      <div className="relative grid w-80 grid-rows-[.5fr_2fr] border-4 border-accentColor bg-whiteColor pb-4 text-darkColor">
        <div className="absolute -top-10 left-1/2 flex size-20 -translate-x-1/2 items-center justify-center rounded-full border-4 border-accentColor bg-darkColor">
          <Icon icon={icon} className="text-5xl text-whiteColor" />
        </div>
        <div className="row-start-2 flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2 px-4 text-center">
            <p className="text-xl font-semibold">{topline}</p>
            <p>{message}</p>
          </div>
          <div className="flex gap-2">
            <button
              className="h-10 w-32 border border-darkColor"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="h-10 w-32 border border-darkColor bg-darkColor text-whiteColor"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant local pour un bouton de la modale de confirmation
// ===========================================================================================
interface ConfirmButtonProps {
  label: string;
  onClick: () => void;
  isLoading?: boolean;
  isPrimary?: boolean;
}

function ConfirmButton({
  label,
  onClick,
  isLoading = false,
}: ConfirmButtonProps) {
  return (
    <button
      className={`h-10 w-32 border border-darkColor bg-darkColor text-whiteColor`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : label}
    </button>
  );
}
