interface ErrorMessageProps {
  text: string;
}

export default function ErrorMessage({ text }: ErrorMessageProps) {
  return <p className="-mb-2 -mt-4 text-sm text-errorColor">{text}</p>;
}
