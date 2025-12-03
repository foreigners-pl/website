import { theme } from '@/lib/theme';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

export default function Card({ children, className = '', padding = 'md' }: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6 md:p-8',
    lg: 'p-8 md:p-10',
  };

  return (
    <div className={`bg-white ${theme.radius.lg} border border-gray-200 ${theme.shadow.md} hover:${theme.shadow.xl} ${theme.transition.all} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
}