/** 聚焦物件后的非模态内容摘要；保留房间操作与既有页面链接。 */
import React from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function RoomFocusCard({ item, onClose }) {
  const titleRef = React.useRef(null);
  React.useEffect(() => { titleRef.current?.focus({ preventScroll: true }); }, [item.id]);
  return (
    <section className="room-focus-card" aria-labelledby="room-focus-title">
      <button type="button" className="room-focus-card__back" onClick={onClose}>
        <ArrowLeft size={15} aria-hidden="true" />返回刚才的视角<span>Esc</span>
      </button>
      <p className="room-focus-card__eyebrow">{item.label}</p>
      <h2 id="room-focus-title" ref={titleRef} tabIndex={-1}>{item.title}</h2>
      <p className="room-focus-card__description">{item.description}</p>
      <Link className="room-focus-card__link" to={item.to}>{item.cta}<ArrowUpRight size={16} aria-hidden="true" /></Link>
    </section>
  );
}
