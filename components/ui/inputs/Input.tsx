import { theme } from '@/lib/theme';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function Input({
  id,
  label,
  type = 'text',
  placeholder,
  required = false,
  value,
  onChange,
  className = '',
}: InputProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className={`block ${theme.fontSize.sm} ${theme.fontWeight.semibold} text-gray-700 mb-2`}>
        {label}{required && '*'}
      </label>
      <input
        type={type}
        id={id}
        required={required}
        className={`w-full px-4 py-3 ${theme.radius.md} border border-gray-300 focus:border-[${theme.colors.primary}] focus:ring-2 focus:ring-[${theme.colors.primaryLight}] outline-none ${theme.transition.default}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}