import Link from 'next/link';

interface FormContainerProps {
  children: React.ReactNode;
  addedLinkLabel?: string;
  addedLinkPath?: string;
}

// Container pour les formulaires et pouvant accueillir un lien supplémentaire
// ===========================================================================================
export default function FormContainer({
  children,
  addedLinkLabel,
  addedLinkPath,
}: FormContainerProps) {
  return (
    <div className="flex w-full justify-center">
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
    </div>
  );
}
