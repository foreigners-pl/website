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
  align = 'left',
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
        <p className={`text-eyebrow ${theme.fontWeight.semibold} text-primary mb-2`}>
          {subtitle}
        </p>
      )}
      {title && (
        <h2 className={`font-display text-section-title font-semibold text-gray-900 mb-4`}>
          {title}
        </h2>
      )}
      {description && (
        <p className={`text-body-large text-gray-600 max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );
}
