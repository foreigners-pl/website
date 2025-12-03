import { theme } from '@/lib/theme';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  onClick,
  type = 'button',
}: ButtonProps) {
  const baseClasses = `inline-flex items-center justify-center gap-2 ${theme.fontWeight.semibold} ${theme.transition.default}`;
  
  const variantClasses = {
    primary: `bg-[${theme.colors.primary}] text-white hover:bg-[${theme.colors.primaryHover}] ${theme.shadow.lg}`,
    secondary: `bg-white text-[${theme.colors.primary}] border-2 border-gray-300 hover:border-[${theme.colors.primary}]`,
    outline: `bg-transparent border-2 border-dashed border-[${theme.colors.primary}] text-[${theme.colors.primary}] hover:bg-[${theme.colors.primaryLight}]`,
  };

  const sizeClasses = {
    sm: `px-4 py-2 ${theme.fontSize.sm} ${theme.radius.full}`,
    md: `px-6 py-3 ${theme.fontSize.base} ${theme.radius.full}`,
    lg: `px-8 py-4 ${theme.fontSize.lg} ${theme.radius.full}`,
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}