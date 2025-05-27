interface FormPagesWordingProps {
  mainTextPrimary: string;
  mainTextSecondary: string;
  subText: string;
}

export default function FormPagesWording({
  mainTextPrimary,
  mainTextSecondary,
  subText,
}: FormPagesWordingProps) {
  return (
    <div className="flex h-full flex-col gap-4 text-center lg:w-full lg:max-w-[40rem] lg:gap-8 lg:text-start">
      <h1 className="text-4xl font-bold leading-[1] lg:text-[3.5rem]">
        <span className="text-accentColor">{mainTextPrimary}</span>{' '}
        {mainTextSecondary}
      </h1>
      <p className="font-light lg:text-xl">{subText}</p>
    </div>
  );
}
