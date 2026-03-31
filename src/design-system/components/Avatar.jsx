/**
 * Avatar Component
 * 
 * Displays a user profile picture or initials.
 */
import React from 'react';

export const Avatar = React.forwardRef(({ className = '', ...props }, ref) => (
  <div
    ref={ref}
    className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
    {...props}
  />
));
Avatar.displayName = "Avatar";

export const AvatarImage = React.forwardRef(({ className = '', src, alt = "", ...props }, ref) => (
  <img
    ref={ref}
    src={src}
    alt={alt}
    className={`aspect-square h-full w-full ${className}`}
    {...props}
  />
));
AvatarImage.displayName = "AvatarImage";

export const AvatarFallback = React.forwardRef(({ className = '', children, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex h-full w-full items-center justify-center rounded-full bg-slate-100 text-slate-900 font-medium text-sm ${className}`}
    {...props}
  >
    {children}
  </div>
));
AvatarFallback.displayName = "AvatarFallback";
