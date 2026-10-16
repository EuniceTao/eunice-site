/** 独立尾巴弧线：尾根接骨盆，中段绕开后腿；坐站使用同拓扑过渡。 */
import { CatmullRomCurve3, Vector3, TubeGeometry, SphereGeometry } from 'three';

const seated = [[0.05, 0.29, -0.37], [0.14, 0.31, -0.52], [0.24, 0.40, -0.62], [0.31, 0.57, -0.65], [0.30, 0.66, -0.56]];
const standing = [[0.04, 0.53, -0.49], [0.10, 0.65, -0.65], [0.17, 0.85, -0.66], [0.24, 1.00, -0.61], [0.28, 1.03, -0.51]];
export const tailCurve = (stand) => new CatmullRomCurve3((stand ? standing : seated).map(p => new Vector3(...p)));

function tailGeometry(stand, tip) {
  const curve = tailCurve(stand);
  if (tip) return new SphereGeometry(0.019, 24, 16).translate(...(stand ? standing : seated).at(-1));
  const geometry = new TubeGeometry(curve, 56, 0.047, 16, false);
  const position = geometry.attributes.position;
  for (let i = 0; i < position.count; i++) {
    const t = Math.floor(i / 17) / 56;
    const center = curve.getPointAt(t);
    const point = new Vector3().fromBufferAttribute(position, i);
    point.sub(center).multiplyScalar(1 - 0.60 * t).add(center);
    position.setXYZ(i, point.x, point.y, point.z);
  }
  geometry.computeVertexNormals();
  return geometry;
}
export function createCatTail(tip) {
  const geometry = tailGeometry(false, tip);
  const pose = tailGeometry(true, tip);
  geometry.setAttribute('catStandingPosition', pose.attributes.position.clone());
  geometry.setAttribute('catStandingNormal', pose.attributes.normal.clone());
  pose.dispose();
  return geometry;
}
