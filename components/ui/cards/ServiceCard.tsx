import { theme } from '@/lib/theme';
import Card from './Card';
import { IconWrapper } from '../icons';
import { Tilt3D } from '../animated';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  link: string;
}

export default function ServiceCard({ icon, title, subtitle, description, link }: ServiceCardProps) {
  return (
    <Tilt3D>
      <Card>
        <IconWrapper variant="outline" size="md" className="mb-6">
          {icon}
        </IconWrapper>

        <h3 className={`${theme.fontSize['2xl']} ${theme.fontWeight.bold} text-gray-900 mb-2`}>
          {title}
        </h3>

        <p className={`${theme.fontWeight.medium} mb-4`} style={{ color: theme.colors.primary }}>
          {subtitle}
        </p>

        <p className="text-gray-600 mb-6 leading-relaxed">
          {description}
        </p>

        <a
          href={link}
          className={`inline-flex items-center gap-2 ${theme.fontWeight.semibold} hover:gap-3 ${theme.transition.all}`}
          style={{ color: theme.colors.primary }}
        >
          View Services
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </Card>
    </Tilt3D>
  );
}