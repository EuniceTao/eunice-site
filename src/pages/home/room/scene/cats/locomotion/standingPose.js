/** 从已确认坐姿生成同拓扑站姿；脚掌保持接地，腹部与骨盆从脚掌之间抬起。 */
import { Float32BufferAttribute } from 'three';
const smooth = (a, b, x) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
export function standingPoint(x, y, z, tail = false) {
  if (tail) return [x * 0.85, y + 0.28 + 0.35 * smooth(-0.3, 0.22, z), z - 0.17];
  const head = smooth(0.46, 0.68, y);
  const rear = 1 - smooth(0.02, 0.23, z);
  // 只锚定两侧真正的脚掌。腹部中央不能随脚掌固定，否则仍是拖臀坐姿。
  const rearPaw = Math.exp(-(((Math.abs(x) - 0.22) / 0.095) ** 4) - ((z + 0.13) / 0.15) ** 4);
  const frontPaw = Math.exp(-(((Math.abs(x) - 0.122) / 0.095) ** 4) - ((z - 0.26) / 0.14) ** 4);
  const planted = Math.max(rearPaw, frontPaw) * (1 - smooth(0.085, 0.22, y));
  const lift = (0.30 * rear + 0.07 * (1 - rear)) * (1 - head) * (1 - planted);
  return [x, y + lift - 0.18 * head, z + 0.22 * head - 0.17 * rear * (1 - head)];
}
export function addStandingPose(geometry, tail) {
  const source = geometry.attributes.position;
  const positions = new Float32Array(source.count * 3);
  for (let i = 0; i < source.count; i++) {
    positions.set(standingPoint(source.getX(i), source.getY(i), source.getZ(i), tail), i * 3);
  }
  // 同拓扑形变同时重算站姿法线，避免抬起的腹部仍沿用坐姿明暗。
  const standing = geometry.clone();
  standing.setAttribute('position', new Float32BufferAttribute(positions, 3));
  standing.computeVertexNormals();
  geometry.setAttribute('catStandingPosition', standing.attributes.position.clone());
  geometry.setAttribute('catStandingNormal', standing.attributes.normal.clone());
  standing.dispose();
}
