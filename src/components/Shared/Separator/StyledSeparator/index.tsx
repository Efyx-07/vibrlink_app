import { Icon } from '@iconify/react';
import './StyledSeparator.css';

interface StyledSeparatorProps {
  icon: string;
}

export default function StyledSeparator({ icon }: StyledSeparatorProps) {
  return (
    <div className="separator">
      <div className="slider-line" />
      <div className="separator-icon">
        <Icon icon={icon} className="icon" />
      </div>
    </div>
  );
}
