// Theme Configuration - Single source of truth for all styles

export const theme = {
  // Colors
  colors: {
    primary: '#AB1604',
    primaryHover: '#8B1203',
    primaryLight: 'rgba(171, 22, 4, 0.1)',
    secondary: '#FFFFFF',
    background: '#FFFFFF',
    backgroundAlt: '#F9FAFB',
    backgroundGray: '#F3F4F6',
    border: '#E5E7EB',
    borderDashed: '#AB1604',
  },

  // Text Colors
  text: {
    primary: '#111827',
    secondary: '#374151',
    muted: '#6B7280',
    light: '#9CA3AF',
    white: '#FFFFFF',
    accent: '#AB1604',
  },

  // Typography
  fonts: {
    primary: 'var(--font-geist-sans)',
    secondary: 'var(--font-geist-mono)',
    mono: 'var(--font-geist-mono)',
  },

  fontSize: {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
  },

  fontWeight: {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  },

  // Spacing
  spacing: {
    section: 'py-16 md:py-24',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    containerSmall: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8',
  },

  // Border Radius
  radius: {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    xl: 'rounded-3xl',
    full: 'rounded-full',
  },

  // Shadows
  shadow: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
  },

  // Transitions
  transition: {
    default: 'transition-colors duration-200',
    all: 'transition-all duration-300',
    transform: 'transition-transform duration-300',
  },
} as const;

// Utility function to get theme values
export const getTheme = () => theme;
