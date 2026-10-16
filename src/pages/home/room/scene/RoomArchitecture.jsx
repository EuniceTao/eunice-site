/** 法式细线墙面、拼花木地板与织物窗帘；保留四面围合和原房间尺寸。 */
import React from 'react';
import { Color, DoubleSide, Object3D, PlaneGeometry } from 'three';
import { ROOM_PALETTE as C } from '../../../../design-system/room/roomPalette';
import { Timber } from './furniture/RoomDecor';

function Curtain({ materials, position }) {
  const geometry = React.useMemo(() => {
    const shape = new PlaneGeometry(0.78, 2.88, 96, 40);
    const vertices = shape.attributes.position;
    for (let i = 0; i < vertices.count; i += 1) {
      const x = vertices.getX(i);
      const y = vertices.getY(i);
      // 上缘收褶，向下逐渐展开；长褶与细褶叠加，避免等距硬波纹。
      const drop = (1.44 - y) / 2.88;
      const phase = x * 34 + Math.sin(x * 9) * 0.7;
      const fold = Math.sin(phase) + Math.sin(phase * 2.07 + 0.6) * 0.18;
      vertices.setX(i, x * (1 + drop * 0.17));
      vertices.setZ(i, fold * (0.06 + drop * 0.045) + Math.sin(drop * Math.PI) * 0.025);
      vertices.setY(i, y + Math.cos(phase) * 0.012 * drop ** 5);

    }
    shape.computeVertexNormals();
    return shape;
  }, []);
  React.useEffect(() => () => geometry.dispose(), [geometry]);
  return <group position={position}>
    <mesh geometry={geometry} material={materials.curtain} castShadow receiveShadow />
    {Array.from({ length: 7 }, (_, index) => <mesh key={index} position={[-0.35 + index * 0.116, 1.51, 0]} material={materials.chrome}><torusGeometry args={[0.038, 0.006, 8, 16]} /></mesh>)}
  </group>;
}

function WindowWall({ materials }) {
  return (
    <group>
      <mesh position={[0, 0.48, -3.6]} material={materials.plaster} castShadow receiveShadow><boxGeometry args={[8.4, 0.96, 0.14]} /></mesh>
      <mesh position={[0, 3.095, -3.6]} material={materials.plaster} castShadow receiveShadow><boxGeometry args={[8.4, 0.45, 0.14]} /></mesh>
      <mesh position={[-3.96, 1.92, -3.6]} material={materials.plaster} castShadow receiveShadow><boxGeometry args={[0.48, 1.92, 0.14]} /></mesh>
      <mesh position={[2.29, 1.92, -3.6]} material={materials.plaster} castShadow receiveShadow><boxGeometry args={[3.82, 1.92, 0.14]} /></mesh>
      <mesh position={[-1.67, 0.99, -3.47]} material={materials.trim} castShadow receiveShadow><boxGeometry args={[4.2, 0.055, 0.34]} /></mesh>
      {[-3.69, -2.33, -0.97, 0.39].map((x) => <mesh key={x} position={[x, 1.935, -3.52]} material={materials.trim} castShadow receiveShadow><boxGeometry args={[0.055, 1.87, 0.095]} /></mesh>)}
      {[1.04, 2.83].map((y) => <mesh key={y} position={[-1.65, y, -3.52]} material={materials.trim} castShadow><boxGeometry args={[4.14, 0.055, 0.095]} /></mesh>)}
      <mesh position={[-1.65, 2.41, -3.52]} material={materials.trim} castShadow><boxGeometry args={[4.14, 0.035, 0.075]} /></mesh>
      <mesh position={[-1.65, 1.94, -3.555]}><planeGeometry args={[4.07, 1.76]} /><meshStandardMaterial color={C.glass} transparent opacity={0.06} roughness={0.15} metalness={0.1} side={DoubleSide} depthWrite={false} /></mesh>
      <mesh position={[-1.65, 3.055, -3.23]} rotation={[0, 0, Math.PI / 2]} material={materials.chrome}><cylinderGeometry args={[0.014, 0.014, 4.85, 16]} /></mesh>
      <Curtain position={[-3.64, 1.492, -3.24]} materials={materials} />
      <Curtain position={[0.37, 1.492, -3.24]} materials={materials} />
    </group>
  );
}

function OutsideView() {
  return (
    <group>
      <mesh position={[0, -0.22, -10]}><boxGeometry args={[50, 0.1, 24]} /><meshStandardMaterial color={C.leaf} /></mesh>
      {[-2, -1, 0, 1, 2].map((i) => <group key={i} position={[i * 3.6, 0, -12 - (i % 2) * 2]}>
        <mesh position={[0, 1.45, 0]}><boxGeometry args={[3, 2.9, 2.5]} /><meshStandardMaterial color={i % 2 ? C.exterior : C.plaster} roughness={1} /></mesh>
        <mesh position={[0, 2.95, 0]}><boxGeometry args={[3.12, 0.12, 2.64]} /><meshStandardMaterial color={C.roof} /></mesh>
        {[-0.85, 0, 0.85].flatMap((x) => [0.85, 2].map((y) => <mesh key={`${x}:${y}`} position={[x, y, 1.26]}><planeGeometry args={[0.46, 0.68]} /><meshStandardMaterial color={C.roof} roughness={0.5} /></mesh>))}
      </group>)}
      {[-3.8, -0.5, 2.9].map((x, i) => <group key={x} position={[x, 0, -7.8]}>
        <mesh position={[0, 1.2, 0]}><cylinderGeometry args={[0.03, 0.06, 2.4, 10]} /><meshStandardMaterial color={C.walnut} /></mesh>
        {[0, 1, 2, 3].map((j) => <mesh key={j} position={[Math.sin(j * 2) * 0.45, 2.2 + j * 0.23, Math.cos(j * 2) * 0.35]} scale={[0.75, 0.64, 0.65]}><icosahedronGeometry args={[0.85, 2]} /><meshStandardMaterial color={i % 2 ? C.leaf : C.bounce} roughness={1} /></mesh>)}
      </group>)}
    </group>
  );
}

/** 840 条木片共用一个实例网格，拼花不按每块木片增加一次绘制。 */
function ParquetFloor({ materials }) {
  const ref = React.useRef(null);
  React.useLayoutEffect(() => {
    const transform = new Object3D(), color = new Color();
    let index = 0;
    for (let row = 0; row < 14; row += 1) {
      for (let column = 0; column < 12; column += 1) {
        const turned = (row + column) % 2 === 1;
        for (let strip = 0; strip < 5; strip += 1) {
          const offset = -0.24 + strip * 0.12;
          transform.position.set(-3.9 + row * 0.6 + (turned ? offset : 0), 0.013, -3.3 + column * 0.6 + (turned ? 0 : offset));
          transform.rotation.y = turned ? Math.PI / 2 : 0;
          transform.updateMatrix();
          ref.current.setMatrixAt(index, transform.matrix);
          const tone = 0.94 + ((row * 17 + column * 11 + strip * 7) % 13) * 0.005;
          ref.current.setColorAt(index, color.setRGB(tone, tone, tone));
          index += 1;
        }
      }
    }
    ref.current.instanceMatrix.needsUpdate = true;
    ref.current.instanceColor.needsUpdate = true;
    ref.current.computeBoundingSphere();
  }, []);
  return <instancedMesh ref={ref} args={[undefined, materials.floor, 840]} receiveShadow><boxGeometry args={[0.596, 0.018, 0.116]} /></instancedMesh>;
}

function PanelMoulding({ materials, position, rotation, width = 1.8, height = 1.88 }) {
  return <group position={position} rotation={rotation}>
    {[-1, 1].map((side) => <group key={side}>
      <mesh position={[side * width / 2, 0, 0]} material={materials.trim} receiveShadow><boxGeometry args={[0.019, height, 0.014]} /></mesh>
      <mesh position={[0, side * height / 2, 0]} material={materials.trim} receiveShadow><boxGeometry args={[width + 0.019, 0.019, 0.014]} /></mesh>
    </group>)}
  </group>;
}

export function RoomArchitecture({ materials }) {
  return (
    <group>
      <mesh position={[0, -0.055, 0]} material={materials.walnut} receiveShadow><boxGeometry args={[8.4, 0.12, 7.2]} /></mesh>
      <ParquetFloor materials={materials} />
      {[-1, 1].map((side) => <group key={side}>
        <mesh position={[side * 4.2, 1.65, 0]} material={materials.plaster} castShadow receiveShadow><boxGeometry args={[0.14, 3.3, 7.2]} /></mesh>
        <mesh position={[side * 4.105, 0.085, 0]} material={materials.trim} receiveShadow><boxGeometry args={[0.035, 0.13, 7.2]} /></mesh>
        <mesh position={[side * 4.095, 3.225, 0]} material={materials.trim} receiveShadow><boxGeometry args={[0.07, 0.05, 7.2]} /></mesh>
      </group>)}
      <mesh position={[0, 1.65, 3.6]} material={materials.plaster} castShadow receiveShadow><boxGeometry args={[8.4, 3.3, 0.14]} /></mesh>
      {[-1, 1].map((side) => <group key={side}>
        <mesh position={[0, 0.085, side * 3.5]} material={materials.trim} receiveShadow><boxGeometry args={[8.25, 0.13, 0.035]} /></mesh>
        <mesh position={[0, 3.225, side * 3.495]} material={materials.trim} receiveShadow><boxGeometry args={[8.25, 0.05, 0.07]} /></mesh>
      </group>)}
      <mesh position={[0, 3.32, 0]} material={materials.ceiling} castShadow receiveShadow><boxGeometry args={[8.4, 0.08, 7.2]} /></mesh>
      {[-2.25, 0.2, 2.48].map((z) => <PanelMoulding key={z} materials={materials} position={[-4.117, 1.94, z]} rotation={[0, Math.PI / 2, 0]} width={1.77} />)}
      {[-2.5, 0.1, 2.7].map((x) => <PanelMoulding key={x} materials={materials} position={[x, 1.93, 3.517]} width={1.95} />)}
      <WindowWall materials={materials} />
      <OutsideView />
      <group position={[-0.1, 0, 3.03]}>
        <Timber size={[1.9, 0.055, 0.42]} position={[0, 0.425, 0]} materials={materials} material={materials.walnut} />
        <Timber size={[1.78, 0.08, 0.37]} position={[0, 0.4825, 0]} radius={0.035} materials={materials} material={materials.linen} />
        {[-0.77, 0.77].map((x) => <Timber key={x} size={[0.052, 0.38, 0.3]} position={[x, 0.212, 0]} materials={materials} material={materials.walnut} />)}
      </group>
    </group>
  );
}
