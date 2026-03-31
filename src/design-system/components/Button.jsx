/**
 * Button Component
 * 
 * Supports variants: default, secondary, destructive, outline, ghost, link
 * Supports sizes: default, sm, lg, icon
 */
import React from 'react';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { typography } from '../tokens/typography';

export const Button = ({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className = '',
  ...props 
}) => {
  // Base styles
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: spacing.borderRadius.md,
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '1.2',
    transition: 'colors 0.2s',
    cursor: 'pointer',
    border: '1px solid transparent',
    outline: 'none',
    fontFamily: typography.fontFamily.sans,
  };

  // Variant styles
  const variants = {
    default: {
      backgroundColor: colors.primary.DEFAULT,
      color: colors.primary.foreground,
      '&:hover': { opacity: 0.9 },
    },
    secondary: {
      backgroundColor: colors.secondary.DEFAULT,
      color: colors.secondary.foreground,
      '&:hover': { opacity: 0.8 },
    },
    destructive: {
      backgroundColor: colors.destructive.DEFAULT,
      color: colors.destructive.foreground,
      '&:hover': { opacity: 0.9 },
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: colors.input,
      color: colors.foreground,
      '&:hover': { backgroundColor: colors.accent.DEFAULT, color: colors.accent.foreground },
    },
    ghost: {
      backgroundColor: 'transparent',
      color: colors.foreground,
      '&:hover': { backgroundColor: colors.accent.DEFAULT, color: colors.accent.foreground },
    },
    link: {
      backgroundColor: 'transparent',
      color: colors.primary.DEFAULT,
      textDecoration: 'underline',
      textUnderlineOffset: '4px',
    },
  };

  // Size styles
  const sizes = {
    default: { height: '40px', padding: '0 16px' },
    sm: { height: '36px', padding: '0 12px', fontSize: '12px' },
    lg: { height: '44px', padding: '0 32px' },
    icon: { height: '40px', width: '40px', padding: '0' },
  };

  // Combine styles (simple inline style approach for this demo, usually would use clsx/tailwind)
  // Since we are building a design system from scratch without assuming tailwind config exists for these tokens yet,
  // I will use inline styles for the "system" feel, but in a real app, I'd map these to Tailwind classes.
  // However, given the prompt implies "writing" the system, I'll use a style object approach or Tailwind classes if available.
  // The project has Tailwind installed. I should use Tailwind classes but mapped to my tokens.
  // BUT, I haven't configured Tailwind to use my tokens.
  // To be safe and self-contained, I will use Tailwind utility classes that match the tokens closely, 
  // or just standard Tailwind classes that represent the design system.
  
  // Actually, the prompt asks to "write the design system". 
  // I'll use Tailwind classes because the project has Tailwind.
  
  const variantClasses = {
    default: "bg-slate-900 text-slate-50 hover:bg-slate-900/90",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/80",
    destructive: "bg-red-500 text-slate-50 hover:bg-red-500/90",
    outline: "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900",
    ghost: "hover:bg-slate-100 hover:text-slate-900",
    link: "text-slate-900 underline-offset-4 hover:underline",
  };

  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
