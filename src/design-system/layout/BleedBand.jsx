/**
 * @file BleedBand.jsx
 * @description 在限宽容器内横向铺满视口的色带：用于全宽背景分区，内层仍对齐 max-w-5xl。
 */

import React from 'react';
import { cn } from '../utils/cn';

export function BleedBand({ as: Comp = 'section', className, children }) {
  return (
    <Comp
      className={cn(
        'relative ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] w-screen max-w-[100vw]',
        className,
      )}
    >
      <div className="mx-auto w-full max-w-5xl px-6">{children}</div>
    </Comp>
  );
}
