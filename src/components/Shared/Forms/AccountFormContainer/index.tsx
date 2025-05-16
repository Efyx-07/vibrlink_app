import Link from 'next/link';

interface AccountFormContainerProps {
  children: React.ReactNode;
  addedLinkLabel?: string;
  addedLinkPath?: string;
}

// Container pour les formulaires relatifs au compte utilisateur pouvant accueillir un lien supplémentaire
// ===========================================================================================
export default function AccountFormContainer({
  children,
  addedLinkLabel,
  addedLinkPath,
}: AccountFormContainerProps) {
  return (
    <div className="flex w-full max-w-[30rem] flex-col gap-8">
      {children}
      {addedLinkLabel && addedLinkPath && (
        <Link
          href={addedLinkPath}
          className="text-center text-sm font-light opacity-50 hover:text-accentColor hover:opacity-100"
        >
          {addedLinkLabel}
        </Link>
      )}
    </div>
  );
}
