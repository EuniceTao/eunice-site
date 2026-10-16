/**
 * @file RoomPanel.jsx
 * @description 房间物件的可访问详情抽屉，提供摘要与完整页面入口。
 */

import React from 'react';
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const focusableSelector =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function RoomPanel({ item, onClose }) {
  const panelRef = React.useRef(null);
  const closeRef = React.useRef(null);
  const reduceMotion = useReducedMotion();
  const isOpen = Boolean(item);

  React.useEffect(() => {
    if (!isOpen) return undefined;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab') return;

      const focusable = [...(panelRef.current?.querySelectorAll(focusableSelector) || [])];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-[70]">
          <Motion.button
            type="button"
            aria-label="关闭详情"
            className="absolute inset-0 h-full w-full bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <Motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="room-panel-title"
            initial={reduceMotion ? { opacity: 0 } : { x: '100%' }}
            animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: '100%' }}
            transition={{ duration: reduceMotion ? 0.15 : 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[520px] flex-col bg-[#f1ece2] text-[#171512]"
          >
            <div className="flex items-center justify-between border-b border-black/15 px-6 py-5 md:px-9">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-black/50">
                {item.eyebrow}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="grid size-11 place-items-center border border-black/20 transition-colors hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                aria-label="关闭详情"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex flex-1 flex-col justify-between overflow-y-auto px-6 py-10 md:px-9 md:py-14">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/45">
                  {item.objectLabel}
                </p>
                <h2
                  id="room-panel-title"
                  className="mt-5 max-w-[10ch] font-display font-light leading-[0.95] tracking-[-0.035em]"
                  style={{ fontSize: 'clamp(52px, 10vw, 82px)' }}
                >
                  {item.title}
                </h2>
                <p className="mt-8 max-w-md text-[16px] font-light leading-[1.75] text-black/65">
                  {item.description}
                </p>
                {item.detail ? (
                  <p className="mt-5 border-l border-black/30 pl-4 text-[14px] leading-[1.75] text-black/55">
                    {item.detail}
                  </p>
                ) : null}
              </div>

              <Link
                to={item.to}
                onClick={onClose}
                className="mt-12 flex min-h-14 items-center justify-between border-t border-b border-black/25 py-4 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:bg-black hover:px-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                {item.cta}
                <ArrowUpRight size={17} strokeWidth={1.5} />
              </Link>
            </div>
          </Motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
