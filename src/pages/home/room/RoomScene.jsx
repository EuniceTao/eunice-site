/** 桌面房间入口：在现有内容与 3D 镜头间编排选择、返回及键盘操作。 */
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { RoomSceneControls } from '../../../design-system/room/RoomSceneControls';
import { RoomFocusCard } from '../../../design-system/room/RoomFocusCard';
import '../../../design-system/room/room-explore.css';
import { RoomCanvasFallback } from './RoomCanvasFallback';
import { RoomWorld } from './scene/RoomWorld';
import { RoomCamera } from './scene/RoomCamera';
import { OVERVIEW } from './scene/roomNavigation';
import { ROOM_PALETTE } from '../../../design-system/room/roomPalette';

export function RoomScene({ items, onOpen, onEnterSpace }) {
  const [selectedId, setSelectedId] = React.useState(null);
  const cameraRef = React.useRef(null);
  const htmlPortal = React.useRef(null);
  const entryTimerRef = React.useRef(null);
  React.useEffect(() => () => window.clearTimeout(entryTimerRef.current), []);
  const shellRef = React.useRef(null);
  const returnFocusRef = React.useRef(null);
  const selectedItem = items.find((item) => item.id === selectedId);

  function select(id) {
    window.clearTimeout(entryTimerRef.current);
    if (!cameraRef.current?.focus(id)) return;
    if (!selectedId) returnFocusRef.current = document.activeElement;
    setSelectedId(id);
    const item = items.find((candidate) => candidate.id === id);
    if (item?.space && onEnterSpace) {
      entryTimerRef.current = window.setTimeout(() => {
        onEnterSpace(id, () => {
          cameraRef.current?.restore(false);
          setSelectedId(null);
          restoreFocus();
        });
      }, 650);
    }
  }
  function openCat(id) {
    // 点猫会取消尚未结束的物件入场，避免延迟回调把相册替换掉。
    window.clearTimeout(entryTimerRef.current);
    if (selectedItem?.space) {
      cameraRef.current?.restore(false);
      setSelectedId(null);
    }
    onEnterSpace(id);
  }
  function restoreFocus() {
    const element = returnFocusRef.current;
    const visible = element?.isConnected && element.getClientRects().length > 0;
    (visible ? element : shellRef.current)?.focus({ preventScroll: true });
    returnFocusRef.current = null;
  }
  function close() {
    window.clearTimeout(entryTimerRef.current);
    cameraRef.current?.restore();
    setSelectedId(null);
    restoreFocus();
  }
  function reset() {
    window.clearTimeout(entryTimerRef.current);
    cameraRef.current?.reset();
    setSelectedId(null);
    restoreFocus();
  }
  function handleKeys(event) {
    if (event.key === 'Escape' && selectedId) {
      event.preventDefault();
      close();
      return;
    }
    // 仅场景本身持有焦点时使用方向键，不劫持目录、链接和页面滚动。
    if (event.target !== event.currentTarget || event.metaKey || event.ctrlKey || event.altKey) return;
    const rotations = { ArrowLeft: [-0.2, 0], ArrowRight: [0.2, 0], ArrowUp: [0, -0.12], ArrowDown: [0, 0.12] };
    if (rotations[event.key]) {
      event.preventDefault();
      cameraRef.current?.rotate(...rotations[event.key]);
    } else if (['+', '=', '-'].includes(event.key)) {
      event.preventDefault();
      cameraRef.current?.zoom(event.key === '-' ? -0.45 : 0.45);
    }
  }

  return (
    <div className="room-scene-desktop">
      <div
        ref={shellRef} className="room-canvas-shell" tabIndex={0} role="region"
        aria-label="可探索的 3D 小屋，方向键环顾，加减键缩放"
        aria-describedby="room-navigation-help" onKeyDown={handleKeys}
        onPointerDown={(event) => {
          if (event.target.tagName === 'CANVAS') shellRef.current?.focus({ preventScroll: true });
        }}
      >
        <div ref={htmlPortal} className="room-html-layer" />
        <Canvas
          shadows frameloop="demand" dpr={[1, 1.5]}
          camera={{ position: OVERVIEW.position, fov: 56, near: 0.05, far: 80 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          fallback={<RoomCanvasFallback items={items} onOpen={onOpen} />}
        >
          <color attach="background" args={[ROOM_PALETTE.sky]} />
          <fog attach="fog" args={[ROOM_PALETTE.sky, 15, 40]} />
          <React.Suspense fallback={null}>
            <RoomWorld onOpenCat={openCat} htmlPortal={htmlPortal} items={items} selectedId={selectedId} onSelect={select} />
            <RoomCamera ref={cameraRef} />
          </React.Suspense>
        </Canvas>
        {selectedItem && !selectedItem.space && <RoomFocusCard item={selectedItem} onClose={close} />}
        <RoomSceneControls items={items} selectedId={selectedId} onSelect={select} onZoom={(amount) => cameraRef.current?.zoom(amount)} onReset={reset} />
      </div>
      <div className="room-cat-tools"><span>小屋的两位室友</span><button type="button" onClick={() => openCat('cat-blue')}>英短蓝白 · 相册</button><button type="button" onClick={() => openCat('cat-tabby')}>浅棕虎斑 · 相册</button></div>
    </div>
  );
}
