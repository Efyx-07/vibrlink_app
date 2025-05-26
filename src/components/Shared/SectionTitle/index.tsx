import HorizontalSeparator from '../Separator/HorizontalSeparator';

interface SectionTitleProps {
  title: string;
  textColor?: string;
}

export default function SectionTitle({ title, textColor }: SectionTitleProps) {
  return (
    <div className="flex w-full items-baseline gap-4">
      <h2 className={`whitespace-nowrap text-lg ${textColor ? textColor : ''}`}>
        {title}
      </h2>
      <HorizontalSeparator />
    </div>
  );
}
