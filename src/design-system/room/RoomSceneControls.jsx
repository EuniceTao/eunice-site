/** 场景操作的键盘可达入口；只发送导航意图，不依赖 3D 或页面业务。 */
import React from 'react';
import { List, Minus, Plus, RotateCcw } from 'lucide-react';

export function RoomSceneControls({ items, selectedId, onSelect, onZoom, onReset }) {
  const listRef = React.useRef(null);
  function select(id) {
    if (listRef.current) listRef.current.open = false;
    onSelect(id);
  }
  return (
    <div className="room-explore-controls">
      <p id="room-navigation-help" className="room-explore-help">拖动环顾 · 滚轮缩放 · 点物件探索</p>
      <div className="room-explore-tools" aria-label="房间视角操作">
        <details ref={listRef} className="room-object-directory">
          <summary><List size={17} aria-hidden="true" /><span>屋里的物件</span></summary>
          <div className="room-object-directory__list" aria-label="选择物件">
            {items.map((item) => (
              <button type="button" key={item.id} onClick={() => select(item.id)} aria-pressed={selectedId === item.id}>
                <span>{item.index}</span>{item.label}
              </button>
            ))}
          </div>
        </details>
        <span className="room-explore-tools__divider" aria-hidden="true" />
        <button type="button" aria-label="拉近视角" title="拉近视角（+）" onClick={() => onZoom(0.45)}><Plus size={18} /></button>
        <button type="button" aria-label="拉远视角" title="拉远视角（−）" onClick={() => onZoom(-0.45)}><Minus size={18} /></button>
        <button type="button" aria-label="恢复房间全景" title="恢复房间全景" onClick={onReset}><RotateCcw size={17} /></button>
      </div>
    </div>
  );
}
