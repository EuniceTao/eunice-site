/**
 * Design System Typography
 * Based on @shadcn/ui - Design System (Community)
 * 
 * Font Family: Inter
 */

export const typography = {
  fontFamily: {
    sans: '"Inter", sans-serif',
    mono: '"Menlo", monospace',
  },
  
  // Font Weights
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  
  // Text Styles from Figma
  styles: {
    h1: {
      fontSize: '48px',
      lineHeight: '1',
      fontWeight: 800,
      letterSpacing: '-0.012em',
    },
    h2: {
      fontSize: '30px',
      lineHeight: '1.2',
      fontWeight: 600,
      letterSpacing: '-0.0075em',
    },
    h3: {
      fontSize: '24px',
      lineHeight: '1.33',
      fontWeight: 600,
      letterSpacing: '-0.006em',
    },
    h4: {
      fontSize: '20px',
      lineHeight: '1.4',
      fontWeight: 600,
      letterSpacing: '-0.005em',
    },
    p: {
      fontSize: '16px',
      lineHeight: '1.75',
      fontWeight: 400,
    },
    blockquote: {
      fontSize: '16px',
      lineHeight: '1.5',
      fontWeight: 400,
      fontStyle: 'italic',
    },
    list: {
      fontSize: '16px',
      lineHeight: '1.5',
      fontWeight: 400,
    },
    lead: {
      fontSize: '20px',
      lineHeight: '1.4',
      fontWeight: 400,
    },
    large: {
      fontSize: '18px',
      lineHeight: '1.55',
      fontWeight: 600,
    },
    small: {
      fontSize: '14px',
      lineHeight: '1',
      fontWeight: 500,
    },
    subtle: {
      fontSize: '14px',
      lineHeight: '1.42',
      fontWeight: 400,
      color: 'muted', // Semantic reference
    },
    inlineCode: {
      fontFamily: '"Menlo", monospace',
      fontSize: '14px',
      lineHeight: '1.42',
      fontWeight: 700,
    }
  }
};
