/**
 * @file RoomModeToggle.jsx
 * @description 小屋探索与清晰目录之间的双模式切换控件。
 */

import React from 'react';
import { cn } from '../utils/cn';

const modes = [
  { value: 'room', label: '进屋逛逛' },
  { value: 'index', label: '打开目录' },
];

export function RoomModeToggle({ value, onChange, className }) {
  return (
    <div className={cn('room-mode-toggle', className)} role="group" aria-label="首页浏览模式">
      {modes.map((mode) => {
        const isActive = value === mode.value;
        return (
          <button
            key={mode.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(mode.value)}
            className={isActive ? 'is-active' : ''}
          >
            {mode.label}
          </button>
        );
      })}
    </div>
  );
}
