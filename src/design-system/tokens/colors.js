/**
 * Design System Colors
 * Based on @shadcn/ui - Design System (Community)
 * 
 * Includes the primitive Slate palette and semantic color mappings.
 */

export const palette = {
  slate: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
    950: '#020617', // Added for deeper contrast if needed, though Figma stopped at 900
  },
  white: '#FFFFFF',
  black: '#000000',
  // Standard error red since it wasn't explicitly in the fetched node
  red: {
    500: '#EF4444',
    600: '#DC2626',
  }
};

export const colors = {
  background: palette.white,
  foreground: palette.slate[950],
  
  primary: {
    DEFAULT: palette.slate[900],
    foreground: palette.slate[50],
  },
  
  secondary: {
    DEFAULT: palette.slate[100],
    foreground: palette.slate[900],
  },
  
  muted: {
    DEFAULT: palette.slate[100],
    foreground: palette.slate[500],
  },
  
  accent: {
    DEFAULT: palette.slate[100],
    foreground: palette.slate[900],
  },
  
  destructive: {
    DEFAULT: palette.red[500],
    foreground: palette.slate[50],
  },
  
  border: palette.slate[200],
  input: palette.slate[200],
  ring: palette.slate[900],
};
