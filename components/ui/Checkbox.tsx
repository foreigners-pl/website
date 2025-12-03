import { theme } from '@/lib/theme';

interface CheckboxProps {
  id: string;
  label: React.ReactNode;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export default function Checkbox({ id, label, checked, onChange, required = false }: CheckboxProps) {
  return (
    <div className="flex items-start gap-3">
      <input
        type="checkbox"
        id={id}
        required={required}
        className={`mt-1 w-4 h-4 rounded border-gray-300 text-[${theme.colors.primary}] focus:ring-[${theme.colors.primary}]`}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className={`${theme.fontSize.sm} text-gray-600`}>
        {label}
      </label>
    </div>
  );
}