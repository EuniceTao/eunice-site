/** 有边界的房间镜头：拖拽环顾、缩放、选物聚焦及恢复原视角。 */
import React from 'react';
import { CameraControls, CameraControlsImpl } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Box3, Vector3 } from 'three';
import { CAMERA_BOUNDS, constrainRoomCamera, createRoomNavigation, OVERVIEW } from './roomNavigation';

export const RoomCamera = React.forwardRef(function RoomCamera(_, ref) {
  const controlsRef = React.useRef(null);
  const navigationRef = React.useRef(null);

  const bindControls = React.useCallback((controls) => {
    controlsRef.current = controls;
    navigationRef.current = controls ? createRoomNavigation(controls) : null;
    if (!controls) return;
    controls.setBoundary(new Box3(new Vector3(...CAMERA_BOUNDS.min), new Vector3(...CAMERA_BOUNDS.max)));
    controls.setLookAt(...OVERVIEW.position, ...OVERVIEW.target, false);
  }, []);

  // CameraControls 在 -1 更新；墙面约束先于 Html 标签与画面投影生效。
  useFrame(() => {
    if (controlsRef.current) constrainRoomCamera(controlsRef.current);
  }, -0.5);

  React.useImperativeHandle(ref, () => ({
    focus: (id) => navigationRef.current?.focus(id) ?? false,
    restore: (transition = true) => navigationRef.current?.restore(transition),
    reset: () => navigationRef.current?.reset(),
    rotate: (horizontal, vertical = 0) => controlsRef.current?.rotate(horizontal, vertical, true),
    zoom: (amount) => controlsRef.current?.dolly(amount, true),
  }), []);

  const action = CameraControlsImpl.ACTION;
  return (
    <CameraControls
      ref={bindControls}
      makeDefault
      smoothTime={0.65}
      draggingSmoothTime={0.16}
      minDistance={1.05}
      maxDistance={5.65}
      minPolarAngle={0.7}
      maxPolarAngle={1.76}
      azimuthRotateSpeed={0.55}
      polarRotateSpeed={0.42}
      dollySpeed={0.5}
      boundaryEnclosesCamera
      boundaryFriction={0.2}
      mouseButtons={{ left: action.ROTATE, middle: action.NONE, right: action.NONE, wheel: action.DOLLY }}
      touches={{ one: action.TOUCH_ROTATE, two: action.TOUCH_DOLLY_ROTATE, three: action.NONE }}
    />
  );
});
