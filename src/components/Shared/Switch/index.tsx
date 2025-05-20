import './Switch.css';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export default function Switch({ checked, onChange, label }: SwitchProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="relative block h-4 w-10">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="slider round" />
      </label>
      <span className="text-sm">{label}</span>
    </div>
  );
}
