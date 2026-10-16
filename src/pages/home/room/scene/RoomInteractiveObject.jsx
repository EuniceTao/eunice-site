/** 物件的鼠标/键盘入口；只接受点击，不把环顾拖动当成内容选择。 */
import React from 'react';
import { Html, useCursor } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { isObjectActivation } from './roomNavigation';

export function RoomInteractiveObject({ item, children, onSelect, labelPosition, selected, htmlPortal }) {
  const [hovered, setHovered] = React.useState(false);
  const labelGesture = React.useRef(null);
  const canvas = useThree((state) => state.gl.domElement);
  useCursor(hovered, 'pointer', '', canvas);
  function select(event) {
    event.stopPropagation();
    if (isObjectActivation(event)) onSelect(item.id);
  }
  function selectLabel(event) {
    event.stopPropagation();
    // DOM 标签的 click 没有 R3F delta；键盘 click 保持可用，指针拖动单独过滤。
    const delta = event.detail === 0 ? 0 : labelGesture.current?.movement ?? 0;
    if (isObjectActivation({ button: event.button, delta })) onSelect(item.id);
    labelGesture.current = null;
  }
  return (
    <group
      onClick={select}
      onPointerOver={(event) => { event.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
    >
      {children}
      <Html portal={htmlPortal} center position={labelPosition} zIndexRange={[12, 0]} occlude>
        <button
          type="button"
          className={`room-object-label${hovered ? ' is-hovered' : ''}${selected ? ' is-selected' : ''}`}
          onClick={selectLabel}
          onPointerDown={(event) => { labelGesture.current = { x: event.clientX, y: event.clientY, movement: 0 }; }}
          onPointerMove={(event) => {
            const gesture = labelGesture.current;
            if (gesture) gesture.movement = Math.max(gesture.movement, Math.hypot(event.clientX - gesture.x, event.clientY - gesture.y));
          }}
          onPointerCancel={() => { labelGesture.current = null; }}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          aria-label={`${item.space ? '进入' : '聚焦'}${item.label}`}
          aria-pressed={selected}
        >
          <i aria-hidden="true" />
          <span>{item.label}</span>
        </button>
      </Html>
    </group>
  );
}
