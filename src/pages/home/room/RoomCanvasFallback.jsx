/**
 * @file RoomCanvasFallback.jsx
 * @description WebGL 不可用时的静态房间入口降级。
 */

import React from 'react';

export function RoomCanvasFallback({ items, onOpen }) {
  return (
    <div className="room-canvas-fallback">
      <div className="room-canvas-fallback__glow" aria-hidden="true" />
      <p>你的浏览器暂时无法显示 3D 小屋，仍然可以从这里进入每个房间。</p>
      <div className="room-canvas-fallback__links">
        {items.map((item) => (
          <button key={item.id} type="button" onClick={() => onOpen(item)}>
            <span>{item.index}</span>{item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
