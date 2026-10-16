/** 房间镜头姿态与返回编排；所有位置以米为单位，快照取当前视角而非动画终点。 */
import { Box3, Vector3 } from 'three';

export const CAMERA_BOUNDS = { min: [-3.93, 0.5, -3.32], max: [3.93, 2.8, 3.32] };
export const OVERVIEW = { position: [2.85, 1.7, 3.04], target: [-0.88, 1.02, -0.42] };
export const FOCUS_VIEWS = {
  now: { position: [-1.2, 1.8, -0.6], target: [-3.02, 1.38, -3.22] },
  work: { position: [-0.55, 1.6, -0.55], target: [-1.7, 1.03, -2.62] },
  notes: { position: [0.55, 1.65, 1.7], target: [-1.12, 0.51, 0.44] },
  about: { position: [-1.55, 1.4, 2.8], target: [-2.8, 1.02, 1.85] },
  experiments: { position: [-1.55, 1.96, 0.1], target: [-3.93, 1.96, 0.1] },
  experience: { position: [1.35, 1.13, 2.83], target: [3.59, 0.5, 2.0] },
  contact: { position: [1.45, 1.7, 2.53], target: [3.53, 1.09, 1.61] },
};

export function isObjectActivation(event) {
  if (event?.button !== undefined && event.button !== 0) return false;
  if (event?.delta === undefined) return true;
  return Number.isFinite(event.delta) && event.delta <= 6;
}

const roomBoundary = new Box3(new Vector3(...CAMERA_BOUNDS.min), new Vector3(...CAMERA_BOUNDS.max));

/** 控件的软边界在多轴墙角可能越界；渲染前只修正最终位置，不改变用户的导航终点。 */
export function constrainRoomCamera(controls) {
  const camera = controls.camera;
  if (roomBoundary.containsPoint(camera.position)) return;
  roomBoundary.clampPoint(camera.position, camera.position);
  camera.lookAt(controls.getTarget(new Vector3(), false));
}

export function createRoomNavigation(controls) {
  let returnView = null;
  function moveTo(view, transition = true) {
    controls.setLookAt(...view.position, ...view.target, transition);
    // 累积多圈环顾后仍走最短转角，不在聚焦时倒转整圈。
    controls.normalizeRotations();
  }
  return {
    focus(id) {
      const view = FOCUS_VIEWS[id];
      if (!view) return false;
      if (!returnView) {
        returnView = {
          position: controls.camera.position.toArray(),
          target: controls.getTarget(new Vector3(), false).toArray(),
        };
      }
      moveTo(view);
      return true;
    },
    restore(transition = true) {
      if (!returnView) return;
      moveTo(returnView, transition);
      returnView = null;
    },
    reset() {
      returnView = null;
      moveTo(OVERVIEW);
    },
  };
}
