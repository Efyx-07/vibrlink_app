import { ReactNode } from 'react';
import { WithPageLoader } from '../WithPageLoader';

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <WithPageLoader>
      <div className="page">
        <div className="content">{children}</div>
      </div>
    </WithPageLoader>
  );
}
