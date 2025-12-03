import { theme } from '@/lib/theme';

interface SectionHeadingProps {
  title?: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  description,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={`${alignClasses[align]} mb-12 md:mb-16 ${className}`}>
      {subtitle && (
        <p className={`${theme.fontSize.sm} ${theme.fontWeight.semibold} text-[${theme.colors.primary}] mb-2 uppercase tracking-wide`}>
          {subtitle}
        </p>
      )}
      {title && (
        <h2 className={`${theme.fontSize['3xl']} md:${theme.fontSize['4xl']} ${theme.fontWeight.bold} text-gray-900 mb-4`}>
          {title}
        </h2>
      )}
      {description && (
        <p className={`${theme.fontSize.lg} md:${theme.fontSize.xl} text-gray-600 max-w-3xl ${align === 'center' ? 'mx-auto' : ''} leading-relaxed`}>
          {description}
        </p>
      )}
    </div>
  );
}