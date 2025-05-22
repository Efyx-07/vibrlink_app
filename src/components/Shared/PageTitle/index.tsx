import HorizontalSeparator from '../Separator/HorizontalSeparator';

interface PageTitleProps {
  primaryPart: string;
  secondaryPart: string;
}

export default function PageTitle({
  primaryPart,
  secondaryPart,
}: PageTitleProps) {
  return (
    <div className="mb-8 flex w-full items-baseline gap-4 md:mb-4">
      <h1 className="whitespace-nowrap text-2xl">
        <span className="text-accentColor">{primaryPart} </span>
        {secondaryPart}
      </h1>
      <HorizontalSeparator />
    </div>
  );
}
