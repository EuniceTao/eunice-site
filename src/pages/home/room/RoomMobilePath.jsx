/**
 * @file RoomMobilePath.jsx
 * @description 移动端和减少动态效果模式共用的静态小屋入口，保留物件内容与打开详情行为。
 */

import React from 'react';

export function RoomMobilePath({ items, onOpen }) {
  return (
    <div className="room-mobile-path">
      {items.map((item) => (
        <button key={item.id} type="button" onClick={() => onOpen(item)} className="room-mobile-card">
          {item.image ? <img src={item.image} alt="" /> : <span className="room-mobile-card__texture" aria-hidden="true" />}
          <span className="room-mobile-card__shade" aria-hidden="true" />
          <span className="room-mobile-card__content">
            <small>{item.index} · {item.objectLabel}</small>
            <strong>{item.label}</strong>
            <span>{item.description}</span>
          </span>
          <span className="room-mobile-card__arrow" aria-hidden="true">↗</span>
        </button>
      ))}
    </div>
  );
}
