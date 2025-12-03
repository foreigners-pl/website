# Project Structure

This project follows a clean, component-based architecture with a centralized theme system and organized folder structure.

## 📱 Responsive Design

The website is **fully responsive** and adapts automatically based on screen width:

- **Mobile First**: Base styles target phones (< 768px)
- **Tablet**: `md:` prefix (≥ 768px)
- **Desktop**: `lg:` prefix (≥ 1024px)
- **Large Desktop**: `xl:` prefix (≥ 1280px)

**How it works:**
- Uses CSS media queries (via Tailwind breakpoints)
- Detects **viewport width**, not device type
- Automatically adjusts layout, typography, spacing
- Touch-friendly on mobile, hover effects on desktop

## 🎨 Theme Configuration

All styles are centralized in `lib/theme.ts`:

```typescript
import { theme } from '@/lib/theme';
```

**Available theme properties:**
- `theme.colors` - Primary, secondary, backgrounds, borders
- `theme.text` - Text colors (primary, secondary, muted, accent)
- `theme.fonts` - Font families (primary, secondary, mono)
- `theme.fontSize` - Text sizes (xs to 6xl)
- `theme.fontWeight` - Font weights (normal, medium, semibold, bold)
- `theme.spacing` - Section padding, container widths
- `theme.radius` - Border radius values
- `theme.shadow` - Shadow styles
- `theme.transition` - Transition effects

**Key Colors:**
- Primary: `#AB1604` (brand red)
- Primary Hover: `#8B1203`
- Primary Light: `rgba(171, 22, 4, 0.1)`

## 📁 Folder Structure

```
foreigners-website/
├── app/
│   ├── page.tsx                    # Main homepage (pure wrapper)
│   └── layout.tsx                  # Root layout
├── sections/
│   └── home/                       # Homepage sections
│       ├── HeroSection.tsx         # Hero with CTA
│       ├── ServicesSection.tsx     # Services grid
│       ├── MidCtaSection.tsx       # For Companies CTA
│       ├── OfficesSection.tsx      # Office locations with tabs
│       └── ConsultationSection.tsx # Consultation form
├── components/
│   ├── layout/                     # Layout components
│   │   ├── Navbar.tsx             # Site navigation (responsive)
│   │   ├── Footer.tsx             # Site footer
│   │   ├── Container.tsx          # Max-width container
│   │   └── Section.tsx            # Section wrapper
│   └── ui/                        # Reusable UI elements
│       ├── buttons/               # Button components
│       │   ├── Button.tsx
│       │   └── index.ts
│       ├── inputs/                # Form inputs
│       │   ├── Input.tsx
│       │   ├── Select.tsx
│       │   ├── Checkbox.tsx
│       │   └── index.ts
│       ├── cards/                 # Card components
│       │   ├── Card.tsx
│       │   ├── ServiceCard.tsx
│       │   └── index.ts
│       ├── icons/                 # Icon components
│       │   ├── IconWrapper.tsx
│       │   ├── SocialIcon.tsx
│       │   └── index.ts
│       ├── Tab.tsx
│       └── SectionHeading.tsx
├── hooks/                          # Custom React hooks
│   ├── useMediaQuery.ts           # Detect screen size
│   ├── useMobileMenu.ts           # Mobile menu state
│   ├── useScrollPosition.ts       # Track scroll position
│   └── index.ts                   # Barrel exports
└── lib/
    └── theme.ts                   # Centralized theme config
```

## 🎣 Custom Hooks

### `useMediaQuery(query)`
Detect screen size breakpoints:
```tsx
const isMobile = useMediaQuery('(max-width: 767px)');
```

**Predefined hooks:**
- `useIsMobile()` - Max width 767px
- `useIsTablet()` - 768px to 1023px
- `useIsDesktop()` - Min width 1024px

### `useMobileMenu()`
Manage mobile menu state:
```tsx
const { isOpen, open, close, toggle } = useMobileMenu();
// Automatically closes on resize to desktop
// Prevents body scroll when open
```

### `useScrollPosition()`
Track scroll position:
```tsx
const { scrollY, scrollDirection, isScrolled } = useScrollPosition();
// Perfect for sticky headers, scroll animations
```

## 🧩 Component Architecture

### Sections (Pure Wrappers)
Sections contain **zero inline styles** and only compose UI components:

```tsx
export default function HeroSection() {
  return (
    <Section background="white">
      <Container>
        <Button variant="primary">Click Me</Button>
      </Container>
    </Section>
  );
}
```

### UI Components (Reusable)
All UI components pull styles from `theme.ts`:

```tsx
import { theme } from '@/lib/theme';

export default function Button({ variant }) {
  const classes = `bg-[${theme.colors.primary}] ${theme.radius.full}`;
  // ...
}
```

### Pages (Pure Wrappers)
Pages only import and render sections:

```tsx
export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Footer />
    </>
  );
}
```

## 📱 Mobile-Specific Features

### Enhanced Mobile Navigation
- **Full-screen slide-out menu** on mobile
- **Backdrop overlay** with click-to-close
- **Smooth animations** and transitions
- **Scroll lock** when menu is open
- **Auto-close** when resizing to desktop

### Responsive Patterns
```tsx
// Stack on mobile, grid on desktop
className="grid grid-cols-1 lg:grid-cols-2"

// Hide on mobile, show on desktop
className="hidden md:flex"

// Different sizes per breakpoint
className="text-2xl md:text-4xl lg:text-6xl"

// Mobile-first padding
className="px-4 md:px-6 lg:px-8"
```

## 🎯 Design Principles

1. **Single Source of Truth**: All styles in `lib/theme.ts`
2. **Zero Inline Styles**: No hardcoded colors/sizes in sections
3. **Component Composition**: Sections compose UI components
4. **Reusability**: UI components work across all pages
5. **Type Safety**: TypeScript for all components
6. **Mobile First**: Design for small screens, enhance for large
7. **Progressive Enhancement**: Works on all devices

## 🚀 Adding New Features

### Add a New Page Section:
1. Create section in `sections/[page]/NewSection.tsx`
2. Use existing UI components from `components/ui/`
3. Pull all styles from `theme.ts`
4. Import in page file

### Add a New UI Component:
1. Create in appropriate `components/ui/[category]/`
2. Import and use theme: `import { theme } from '@/lib/theme'`
3. Add to category's `index.ts` for barrel export
4. Accept props for customization

### Add a Custom Hook:
1. Create in `hooks/useCustomHook.ts`
2. Export from `hooks/index.ts`
3. Use 'use client' if it uses browser APIs

### Modify Theme:
1. Edit `lib/theme.ts`
2. Changes cascade throughout entire app
3. No need to touch individual components

## 📝 Import Patterns

**Cleaner imports with barrel exports:**

```tsx
// ✅ Good - Using barrel exports
import { Button } from '@/components/ui/buttons';
import { Input, Select } from '@/components/ui/inputs';
import { useIsMobile, useMobileMenu } from '@/hooks';

// ❌ Avoid - Direct file imports
import Button from '@/components/ui/buttons/Button';
```

## 🔧 Development Workflow

1. **Design Changes**: Update `lib/theme.ts`
2. **New Components**: Add to appropriate `components/ui/[category]/`
3. **New Hooks**: Add to `hooks/`
4. **New Sections**: Add to `sections/[page]/`
5. **Page Updates**: Import sections in `app/page.tsx`

## 📱 Testing Responsiveness

**In Browser DevTools:**
1. Press `F12` to open DevTools
2. Click device icon (Ctrl+Shift+M)
3. Test different screen sizes:
   - iPhone SE (375px) - Mobile
   - iPad (768px) - Tablet
   - Desktop (1920px) - Large screen

**The site automatically adapts!**

All changes automatically benefit from the centralized theme system and responsive design patterns!
