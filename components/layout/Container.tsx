import { theme } from '@/lib/theme';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'small';
}

export default function Container({ children, className = '', size = 'default' }: ContainerProps) {
  const containerClass = size === 'small' ? theme.spacing.containerSmall : theme.spacing.container;
  
  return (
    <div className={`${containerClass} ${className}`}>
      {children}
    </div>
  );
}