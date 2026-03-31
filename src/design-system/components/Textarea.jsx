/**
 * @file Textarea.jsx
 * @description Textarea 组件：多行输入，风格与 Input 保持一致。
 */

import React from 'react';

export const Textarea = React.forwardRef(({ className = '', rows = 5, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={`
        flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2
        disabled:cursor-not-allowed disabled:opacity-50
        ${className}
      `}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

