import { theme } from '@/lib/theme';

interface TabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export default function Tab({ label, active, onClick }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base whitespace-nowrap ${theme.radius.full} ${theme.fontWeight.semibold} ${theme.transition.all} ${
        active
          ? `bg-navy text-white ${theme.shadow.lg}`
          : `bg-transparent border-2 border-dashed border-navy text-navy hover:bg-navy-light`
      }`}
    >
      {label}
    </button>
  );
}
