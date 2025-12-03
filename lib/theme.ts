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

  // Glass/Frosted effects
  glass: {
    light: 'bg-white/80 backdrop-blur-md border border-white/20',
    medium: 'bg-white/60 backdrop-blur-lg border border-white/30',
    card: 'bg-white/95 backdrop-blur-sm border border-gray-100/50',
    overlay: 'bg-gray-900/10 backdrop-blur-sm',
  },

  // Transitions
  transition: {
    default: 'transition-colors duration-200',
    all: 'transition-all duration-300',
    transform: 'transition-transform duration-300',
    fast: 'transition-all duration-150',
    slow: 'transition-all duration-500',
  },

  // Animation Configurations
  animation: {
    // Spring configurations for Motion
    spring: {
      default: { type: 'spring', stiffness: 300, damping: 30 },
      bouncy: { type: 'spring', stiffness: 400, damping: 10 },
      gentle: { type: 'spring', stiffness: 100, damping: 20 },
      slow: { type: 'spring', stiffness: 50, damping: 15 },
    },
    
    // Timing functions
    ease: {
      default: [0.4, 0, 0.2, 1],
      out: [0, 0, 0.2, 1],
      in: [0.4, 0, 1, 1],
      inOut: [0.4, 0, 0.6, 1],
    },

    // Scroll reveal settings
    scroll: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },

    // Hover lift effect
    hover: {
      scale: 1.05,
      y: -10,
      transition: { type: 'spring', stiffness: 400, damping: 10 },
    },

    // Card tilt settings
    tilt: {
      max: 15,
      perspective: 1000,
      scale: 1.05,
    },
  },

  // Gradient Configurations
  gradients: {
    animated: {
      primary: 'linear-gradient(45deg, #AB1604, #FF4500, #AB1604)',
      hero: 'linear-gradient(135deg, rgba(171, 22, 4, 0.05) 0%, rgba(255, 69, 0, 0.05) 50%, rgba(171, 22, 4, 0.05) 100%)',
      overlay: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.05) 100%)',
    },
    static: {
      primary: 'bg-gradient-to-r from-[#AB1604] to-orange-600',
      radial: 'bg-gradient-to-br from-[#AB1604]/10 via-orange-500/5 to-transparent',
    },
  },
} as const;

// Utility function to get theme values
export const getTheme = () => theme;

// Animation variants for Motion
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -60 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 60 },
};

export const slideInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -60 },
};

