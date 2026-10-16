/** 全屏空间容器：原生模态焦点边界、Esc 返回与页面滚动恢复。 */
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { createPortal } from 'react-dom';
import './spaces.css';

export function SpaceDialog({ title, kind, onClose, children }) {
  const dialogRef = React.useRef(null);
  const backRef = React.useRef(null);
  React.useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = document.activeElement;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    backRef.current.focus({ preventScroll: true });
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, []);
  return createPortal(
    <dialog ref={dialogRef} className={`house-space house-space--${kind}`} aria-label={title}
      onCancel={(event) => { event.preventDefault(); onClose(); }}>
      <div className="space-toolbar">
        <button ref={backRef} type="button" onClick={onClose}><ArrowLeft size={17} />返回小屋</button>
        <span>EUNICE’S HOUSE / {title}</span>
        <span className="space-escape">ESC</span>
      </div>
      {children}
    </dialog>, document.body
  );
}
