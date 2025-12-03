# Project Structure

This project follows a clean, component-based architecture with a centralized theme system.

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
│   │   ├── Navbar.tsx             # Site navigation
│   │   ├── Footer.tsx             # Site footer
│   │   ├── Container.tsx          # Max-width container
│   │   └── Section.tsx            # Section wrapper
│   └── ui/                        # Reusable UI elements
│       ├── Button.tsx             # Button variants
│       ├── Card.tsx               # Card container
│       ├── Input.tsx              # Form input
│       ├── Select.tsx             # Form select
│       ├── Checkbox.tsx           # Form checkbox
│       ├── Tab.tsx                # Tab button
│       ├── IconWrapper.tsx        # Icon container
│       ├── SocialIcon.tsx         # Social media icon
│       ├── ServiceCard.tsx        # Service display card
│       └── SectionHeading.tsx     # Section title/subtitle
└── lib/
    └── theme.ts                   # Centralized theme config
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

## 🎯 Design Principles

1. **Single Source of Truth**: All styles in `lib/theme.ts`
2. **Zero Inline Styles**: No hardcoded colors/sizes in sections
3. **Component Composition**: Sections compose UI components
4. **Reusability**: UI components work across all pages
5. **Type Safety**: TypeScript for all components

## 🚀 Adding New Features

### Add a New Page Section:
1. Create section in `sections/[page]/NewSection.tsx`
2. Use existing UI components from `components/ui/`
3. Pull all styles from `theme.ts`
4. Import in page file

### Add a New UI Component:
1. Create in `components/ui/ComponentName.tsx`
2. Import and use theme: `import { theme } from '@/lib/theme'`
3. Accept props for customization
4. Export for use in sections

### Modify Theme:
1. Edit `lib/theme.ts`
2. Changes cascade throughout entire app
3. No need to touch individual components

## 📝 Example: Creating a New Component

```tsx
// components/ui/Badge.tsx
import { theme } from '@/lib/theme';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export default function Badge({ children, variant = 'primary' }: BadgeProps) {
  const variantClasses = {
    primary: `bg-[${theme.colors.primary}] text-white`,
    secondary: `bg-gray-200 text-gray-800`,
  };

  return (
    <span className={`${variantClasses[variant]} px-3 py-1 ${theme.radius.full} ${theme.fontSize.sm}`}>
      {children}
    </span>
  );
}
```

## 🔧 Development Workflow

1. **Design Changes**: Update `lib/theme.ts`
2. **New Components**: Add to `components/ui/`
3. **New Sections**: Add to `sections/[page]/`
4. **Page Updates**: Import sections in `app/page.tsx`

All changes automatically benefit from the centralized theme system!
