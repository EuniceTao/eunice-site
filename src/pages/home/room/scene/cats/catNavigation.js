/** 猫咪专用活动图。单位米；家具占地取保守外包框，跳跃只连接经检查的落点。 */
export const CAT_RADIUS = 0.34;
export const NODES = {
  front: [-1.65, 0.046, 1.88],
  middle: [-0.45, 0.046, 2.15],
  right: [1.6, 0.023, 2.15],
  door: [2.5, 0.023, 0.2],
  center: [0.55, 0.023, -0.5],
  window: [0.25, 0.023, -1.65],
  deskFront: [-0.8, 0.023, -1.55],
  sofa: [-2.92, 0.56, 0.65],
  chair: [0.5, 0.49, 1.03],
  desk: [-1.07, 0.807, -2.51],
};
export const REST_NODES = ['sofa', 'chair', 'desk'];
export const EDGES = [
  ['front', 'middle'], ['middle', 'right'], ['right', 'door'],
  ['door', 'center'], ['center', 'window'], ['window', 'deskFront'],
  ['front', 'sofa'], ['right', 'chair'], ['deskFront', 'desk'],
];
// x/z extents include the complete static furniture, not only its legs.
export const OBSTACLES = [
  [-3.64, -2.48, -1.1, 1.7], // sofa
  [-2, -0.4, -0.06, 0.94], // coffee table
  [-0.12, 1.12, 0.4, 1.65], // lounge chair
  [-2.74, -0.66, -3.14, -2.26], // desk
  [-2, -1.34, -2.12, -1.46], // desk chair
  [-3.21, -2.39, 1.51, 2.19], // portrait table
  [-2.82, -2.32, 2.28, 2.78], // floor lamp base
  [-1.07, 0.87, 2.8, 3.26], // entry bench
  [3.35, 4, 1.15, 2.7], // console and luggage
  [1.18, 3.32, -3.5, -3.1], // shelves
  [-3.4, -2.65, -1.9, -1.2], // flower table
  [-4, -3.1, -2.65, -1.7], // plant
];
export const distance = (a, b) => Math.hypot(a[0] - b[0], a[2] - b[2]);
export const smooth = (t) => t * t * (3 - 2 * t);
export function isFloorClear(point) {
  const [x, , z] = point;
  if (Math.abs(x) + CAT_RADIUS > 4.08 || Math.abs(z) + CAT_RADIUS > 3.46) return false;
  return !OBSTACLES.some(([left, right, back, front]) =>
    Math.hypot(x - Math.max(left, Math.min(x, right)), z - Math.max(back, Math.min(z, front))) < CAT_RADIUS);
}
export function isJump(from, to) {
  return REST_NODES.includes(from) || REST_NODES.includes(to);
}
export function sampleMove(from, to, progress) {
  const a = NODES[from], b = NODES[to];
  const jumping = isJump(from, to);
  // 起跳后收腿、抬高身体，再越过家具边缘；下降时已经在座面上方。
  const t = jumping ? smooth(Math.max(0, Math.min(1, (progress - 0.18) / 0.64))) : smooth(progress);
  const y = a[1] + (b[1] - a[1]) * t;
  const x = a[0] + (b[0] - a[0]) * t, z = a[2] + (b[2] - a[2]) * t;
  const floor = x >= -3.47 && x <= 1.03 && z >= -1.08 && z <= 2.26 ? 0.046 : 0.023;
  return [x, jumping ? y + Math.sin(Math.PI * progress) ** 0.55 * 1.35 : floor, z];
}
export function neighbors(id) {
  return EDGES.filter((edge) => edge.includes(id)).map(([a, b]) => a === id ? b : a);
}
/** 预约整段路与终点，交叉路线也互斥；避免迎面相遇后的互相等待。 */
export function canTravel(cat, target, others) {
  const samples = Array.from({ length: 33 }, (_, i) => sampleMove(cat.node, target, i / 32));
  return others.every((other) => {
    const occupied = other.target
      ? Array.from({ length: 33 }, (_, i) => sampleMove(other.node, other.target, i / 32))
      : [NODES[other.node]];
    return samples.every((p) => occupied.every((q) => Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]) > CAT_RADIUS * 2 + 0.08));
  });
}
