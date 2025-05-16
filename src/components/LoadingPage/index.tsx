import LoadingSpinner from '../Shared/LoadingSpinner';

interface LoadingPageProps {
  mention?: string;
}

export default function LoadingPage({ mention }: LoadingPageProps) {
  return (
    <div className="absolute left-0 top-0 z-50 flex h-dvh w-screen flex-col items-center justify-center gap-4 bg-darkColor text-whiteColor">
      {mention ? <p>{mention}</p> : <LoadingSpinner className="large-ring" />}
    </div>
  );
}
