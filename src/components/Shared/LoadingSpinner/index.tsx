import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  className: string;
}

export default function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div className="loading-spinner">
      <div className={`lds-ring ${className}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
