interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export default function Switch({ checked, onChange, label }: SwitchProps) {
  return (
    <div className="switch-container">
      <label className="switch">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="slider round"></span>
      </label>
      <span>{label}</span>
    </div>
  );
}
