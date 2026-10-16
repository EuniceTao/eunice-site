/** 照片目录：固定类目名称与摘要，同步支持独立空间入口和原页面链接。 */
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../../design-system/room/spaces/directory.css';

export function HomeIndexView({ items, onOpenSpace }) {
  return <div className="photo-directory" aria-label="网站内容索引">{items.map((item) => {
    const content = <><img src={item.image} alt="" loading="lazy" /><small>{item.index} / {item.eyebrow}</small><strong>{item.label}</strong><p>{item.description}</p><ArrowUpRight size={22} aria-hidden="true" /></>;
    return item.space ? <button type="button" key={item.id} className="photo-directory__item" onClick={() => onOpenSpace(item.id)}>{content}</button>
      : <Link key={item.id} to={item.to} className="photo-directory__item">{content}</Link>;
  })}</div>;
}
