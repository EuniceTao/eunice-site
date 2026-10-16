/** 地面慢走状态：只走家具外的已检查路线，活动时间驱动，距离驱动脚步。 */
import { NODES, EDGES, isJump, isFloorClear } from './catNavigation.js';

const route = ['front', 'middle', 'right', 'door', 'center', 'window', 'deskFront'];
const ease = t => t * t * (3 - 2 * t);
const angleDelta = (a, b) => Math.atan2(Math.sin(b - a), Math.cos(b - a));
export const STRIDE = 0.12; // 米；一个完整步态周期的前进距离。
export function createWander() {
  return { position: [...NODES.front], angle: 0.7, node: 0, direction: 1,
    stage: 'rest', elapsed: 0, stand: 0, gait: 0, distance: 0, wait: 4 };
}
export function advanceWander(state, delta) {
  if (delta <= 0) return state;
  const dt = Math.min(delta, 0.05);
  state.elapsed += dt;
  if (state.stage === 'rest') {
    if (state.elapsed < state.wait) return state;
    if (state.node === route.length - 1) state.direction = -1;
    if (state.node === 0) state.direction = 1;
    state.next = state.node + state.direction;
    state.from = [...state.position];
    state.to = NODES[route[state.next]];
    // 白名单只允许地面邻接边，任何旧家具跳跃都不能进入本状态机。
    const a = route[state.node], b = route[state.next];
    if (isJump(a, b) || !EDGES.some(edge => edge.includes(a) && edge.includes(b))) return state;
    state.startAngle = state.angle;
    state.targetAngle = Math.atan2(state.to[0] - state.from[0], state.to[2] - state.from[2]);
    state.length = Math.hypot(state.to[0] - state.from[0], state.to[2] - state.from[2]);
    state.travel = 0;
    state.stage = 'rise'; state.elapsed = 0;
  } else if (state.stage === 'rise') {
    const t = Math.min(1, state.elapsed / 1.4);
    state.stand = ease(t);
    if (t === 1) { state.stage = 'turn'; state.elapsed = 0; }
  } else if (state.stage === 'turn') {
    const t = Math.min(1, state.elapsed / 2);
    state.angle = state.startAngle + angleDelta(state.startAngle, state.targetAngle) * ease(t);
    state.gait = Math.sin(Math.PI * t) * 0.45;
    state.distance += dt * 0.045;
    if (t === 1) { state.stage = 'walk'; state.elapsed = 0; }
  } else if (state.stage === 'walk') {
    // 首尾减速，腿部摆幅同步收敛；地面根节点不加入弹跳曲线。
    const speed = Math.min(0.13, 0.035 + state.elapsed * 0.10, 0.035 + (state.length - state.travel) * 0.3);
    const step = Math.min(speed * dt, state.length - state.travel);
    const travel = state.travel + step;
    const t = travel / state.length;
    const x = state.from[0] + (state.to[0] - state.from[0]) * t;
    const z = state.from[2] + (state.to[2] - state.from[2]) * t;
    if (!isFloorClear([x, 0, z])) return state;
    state.travel = travel; state.distance += step;
    // 地毯边缘只有 2.3 cm 高差，在一掌距离内过渡，避免瞬间下坠。
    const edge = Math.min(x + 3.47, 1.03 - x, z + 1.08, 2.26 - z);
    const floor = 0.023 + 0.023 * ease(Math.max(0, Math.min(1, (edge + 0.08) / 0.16)));
    state.position = [x, floor, z]; state.gait = 1;
    if (t >= 1) { state.node = state.next; state.stage = 'sit'; state.elapsed = 0; }
  } else if (state.stage === 'sit') {
    const t = Math.min(1, state.elapsed / 1.5);
    state.stand = 1 - ease(t); state.gait = 1 - ease(Math.min(1, t * 3));
    if (t === 1) {
      state.stage = 'rest'; state.elapsed = 0;
      state.wait = 7 + (state.node % 3) * 3;
    }
  }
  return state;
}
