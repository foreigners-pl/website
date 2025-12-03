import { theme } from '@/lib/theme';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'gradient' | 'primary';
}

export default function Section({ children, className = '', background = 'white' }: SectionProps) {
  const bgClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    gradient: 'bg-gradient-to-b from-gray-50 to-white',
    primary: `bg-[${theme.colors.primary}]`,
  };

  return (
    <section className={`${bgClasses[background]} ${theme.spacing.section} ${className}`}>
      {children}
    </section>
  );
}