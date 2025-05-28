import Link from 'next/link';

interface FormContainerProps {
  children: React.ReactNode;
  addedLinkLabel?: string;
  addedLinkPath?: string;
  isJustifyCenter?: boolean;
}

// Container pour les formulaires et pouvant accueillir un lien supplémentaire
// ===========================================================================================
export default function FormContainer({
  children,
  addedLinkLabel,
  addedLinkPath,
  isJustifyCenter,
}: FormContainerProps) {
  return (
    <div className="flex size-full justify-center">
      <div
        className={`${isJustifyCenter ? 'justify-center' : ''} scrollbar-custom flex size-full max-w-[32rem] flex-col gap-8 overflow-auto lg:py-16 lg:pr-4`}
      >
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
