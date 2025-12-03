import { theme } from '@/lib/theme';

interface SelectProps {
  id: string;
  label: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}

export default function Select({
  id,
  label,
  required = false,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  className = '',
}: SelectProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className={`block ${theme.fontSize.sm} ${theme.fontWeight.semibold} text-gray-700 mb-2`}>
        {label}{required && '*'}
      </label>
      <select
        id={id}
        required={required}
        className={`w-full px-4 py-3 ${theme.radius.md} border border-gray-300 focus:border-[${theme.colors.primary}] focus:ring-2 focus:ring-[${theme.colors.primaryLight}] outline-none ${theme.transition.default} bg-white`}
        value={value}
        onChange={onChange}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}