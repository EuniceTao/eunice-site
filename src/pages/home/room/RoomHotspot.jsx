/**
 * @file RoomHotspot.jsx
 * @description 2.5D 房间中的单个可交互物件。
 */

import React from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';

export function RoomHotspot({ item, pointer, onOpen }) {
  const reduceMotion = useReducedMotion();
  const { position } = item;
  const shiftX = reduceMotion ? 0 : pointer.x * position.depth;
  const shiftY = reduceMotion ? 0 : pointer.y * position.depth;

  return (
    <div
      className="room-hotspot-frame"
      style={{
        left: position.left,
        top: position.top,
        width: position.width,
        height: position.height,
        '--room-rotate': position.rotate,
        '--room-shift-x': `${shiftX}px`,
        '--room-shift-y': `${shiftY}px`,
        '--room-z': position.z,
      }}
    >
      <Motion.button
        type="button"
        className={`room-hotspot room-hotspot--${item.kind}`}
        onClick={() => onOpen(item)}
        aria-label={`打开${item.objectLabel}：${item.title}`}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      >
        <span className="room-hotspot__visual" aria-hidden="true">
          {item.image ? <img className="room-hotspot__image" src={item.image} alt="" /> : null}
        </span>
        <span className="room-hotspot__label">
          <span className="room-hotspot__index">{item.index}</span>
          {item.label}
        </span>
      </Motion.button>
    </div>
  );
}
