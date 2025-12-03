import { theme } from '@/lib/theme';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function Section({ children, className = '' }: SectionProps) {
  return (
    <section className={`${theme.spacing.section} ${className}`}>
      {children}
    </section>
  );
}
