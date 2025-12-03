import { theme } from '@/lib/theme';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  glass?: boolean;
}

export default function Card({ children, className = '', padding = 'md', glass = true }: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6 md:p-8',
    lg: 'p-8 md:p-10',
  };

  const baseClasses = glass 
    ? `${theme.glass.card} ${theme.shadow.xl}` 
    : `bg-white border border-gray-200 ${theme.shadow.md}`;

  return (
    <div className={`${baseClasses} ${theme.radius.xl} hover:${theme.shadow['2xl']} ${theme.transition.all} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
}
