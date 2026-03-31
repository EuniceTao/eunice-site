/**
 * Design System Spacing
 * Base unit: 4px
 */

export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
  40: '160px',
  
  // Layout specific
  container: {
    padding: '32px', // From Figma layout_XSBPMA
    gap: '32px',
  },
  
  borderRadius: {
    sm: '2px',
    md: '6px', // Standard radius seen in Figma (Button, etc.)
    lg: '8px',
    full: '9999px',
  }
};
