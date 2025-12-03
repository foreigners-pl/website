import { theme } from '@/lib/theme';

interface SocialIconProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export default function SocialIcon({ href, label, icon }: SocialIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-10 h-10 ${theme.radius.full} bg-gray-200 hover:bg-[${theme.colors.primary}] text-gray-600 hover:text-white flex items-center justify-center ${theme.transition.default}`}
      aria-label={label}
    >
      {icon}
    </a>
  );
}