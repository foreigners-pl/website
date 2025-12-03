import { theme } from '@/lib/theme';

interface IconWrapperProps {
  children: React.ReactNode;
  variant?: 'outline' | 'filled' | 'circle';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function IconWrapper({
  children,
  variant = 'outline',
  size = 'md',
  className = '',
}: IconWrapperProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-16 h-16',
  };

  const variantClasses = {
    outline: `border-2 border-brand-primary text-brand-primary ${theme.radius.md}`,
    filled: `bg-brand-primary text-white ${theme.radius.md}`,
    circle: `bg-brand-primary text-white ${theme.radius.full}`,
  };

  return (
    <div className={`${sizeClasses[size]} ${variantClasses[variant]} flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
}