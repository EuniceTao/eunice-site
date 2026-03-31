/**
 * @file cn.js
 * @description Tailwind className 合并工具，避免样式冲突并保持可读性。
 */

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * @mark cn
 * @description 合并 className（支持条件类名 + Tailwind 冲突合并）。
 * @param {...any} inputs - className 输入。 // 输入
 * @returns {string} 合并后的 className。 // 输出
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

