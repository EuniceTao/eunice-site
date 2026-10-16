/** 可重复摆放的家居细节：木构件、书、杯、陶器和有叶片/枝干的植物。 */
import React from 'react';
import { RoundedBox } from '@react-three/drei';
import { CatmullRomCurve3, Shape, Vector2, Vector3 } from 'three';
import { ROOM_PALETTE as C } from '../../../../../design-system/room/roomPalette';

export function Timber({ size, position, rotation, materials, material = materials.oak, radius = 0.014 }) {
  // 薄层板也复用此构件；圆角必须小于最薄边的一半，避免挤出几何反转。
  const bevelRadius = Math.min(radius, Math.min(...size) * 0.48);
  return <RoundedBox args={size} position={position} rotation={rotation} radius={bevelRadius} smoothness={2} material={material} castShadow receiveShadow />;
}

export function Book({ materials, position, rotation, color = C.book, width = 0.045, height = 0.25, depth = 0.18 }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh material={materials.paper} castShadow><boxGeometry args={[width - 0.008, height - 0.012, depth - 0.015]} /></mesh>
      {[-1, 1].map((side) => <mesh key={side} position={[side * width / 2, 0, 0]} castShadow><boxGeometry args={[0.005, height, depth]} /><meshStandardMaterial color={color} roughness={0.92} /></mesh>)}
      <mesh position={[0, 0, depth / 2]} castShadow><boxGeometry args={[width, height, 0.008]} /><meshStandardMaterial color={color} roughness={0.92} /></mesh>
      {[-0.34, 0.3].map((offset) => <mesh key={offset} position={[0, height * offset, depth / 2 + 0.005]} material={materials.paper}><boxGeometry args={[width * 0.65, 0.004, 0.002]} /></mesh>)}
    </group>
  );
}

const cupProfile = [[0, 0], [0.035, 0], [0.044, 0.005], [0.05, 0.096], [0.048, 0.104], [0.041, 0.104], [0.037, 0.016], [0, 0.016]].map(([x, y]) => new Vector2(x, y));
export function Cup({ materials, position, rotation, scale = 1 }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh position={[0, 0.007, 0]} material={materials.ceramic} castShadow receiveShadow><latheGeometry args={[cupProfile, 32]} /></mesh>
      <mesh position={[0.052, 0.063, 0]} material={materials.ceramic} castShadow><torusGeometry args={[0.026, 0.007, 10, 24]} /></mesh>
      <mesh position={[0, 0.093, 0]} material={materials.leather}><cylinderGeometry args={[0.041, 0.041, 0.001, 32]} /></mesh>
      <mesh position={[0, 0.004, 0]} material={materials.ceramic} receiveShadow><cylinderGeometry args={[0.078, 0.072, 0.008, 40]} /></mesh>
    </group>
  );
}

const vaseProfile = [[0, 0], [0.054, 0], [0.079, 0.021], [0.101, 0.09], [0.094, 0.17], [0.049, 0.224], [0.036, 0.272], [0.038, 0.286], [0.033, 0.286], [0.032, 0.255]].map(([x, y]) => new Vector2(x, y));
export function Vase({ materials, position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh material={materials.ceramic} castShadow receiveShadow><latheGeometry args={[vaseProfile, 48]} /></mesh>
    </group>
  );
}

/** 花梗从花器内生长，弯向各自花头；不在桌面悬空拼接装饰球。 */
export function Flowers({ materials, position, scale = 1 }) {
  const stems = React.useMemo(() => Array.from({ length: 5 }, (_, i) => {
    const angle = i * 2.399, height = 0.48 + (i % 3) * 0.062;
    const tip = new Vector3(Math.cos(angle) * 0.095, height, Math.sin(angle) * 0.075);
    const curve = new CatmullRomCurve3([new Vector3(0, 0.16, 0), new Vector3(tip.x * 0.25, 0.35, tip.z * 0.25), tip]);
    return { tip, curve, angle };
  }), []);
  return (
    <group position={position} scale={scale}>
      <Vase materials={materials} />
      {stems.map(({ tip, curve, angle }, i) => <group key={i}>
        <mesh material={materials.stem} castShadow><tubeGeometry args={[curve, 12, 0.003, 5, false]} /></mesh>
        <mesh position={[tip.x * 0.4, 0.35, tip.z * 0.4]} rotation={[0.25, angle, -0.48]} scale={[0.018, 0.09, 0.004]} material={materials.stem}><sphereGeometry args={[1, 12, 10]} /></mesh>
        <group position={tip.toArray()} rotation={[0.16, angle, -0.17]}>
          {[0, 1, 2, 3, 4].map((petal) => <mesh key={petal} position={[Math.sin(petal * 1.257) * 0.017, 0.027, Math.cos(petal * 1.257) * 0.017]} rotation={[0.1, petal * 1.257, 0]} scale={[0.025, 0.041, 0.014]} material={i % 2 ? materials.ceramic : materials.petal} castShadow><sphereGeometry args={[1, 14, 12]} /></mesh>)}
        </group>
      </group>)}
    </group>
  );
}

const leafShape = new Shape();
leafShape.moveTo(0, 0);
leafShape.bezierCurveTo(-0.12, 0.12, -0.09, 0.23, 0, 0.34);
leafShape.bezierCurveTo(0.13, 0.22, 0.1, 0.08, 0, 0);
export function Plant({ materials, position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.16, 0]} material={materials.stone} castShadow receiveShadow><cylinderGeometry args={[0.17, 0.142, 0.32, 48]} /></mesh>
      <mesh position={[0, 0.313, 0]} material={materials.soil}><cylinderGeometry args={[0.156, 0.156, 0.004, 32]} /></mesh>
      <mesh position={[0, 0.322, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.stone}><torusGeometry args={[0.165, 0.006, 8, 40]} /></mesh>
      {Array.from({ length: 7 }, (_, index) => {
        const height = 0.33 + index * 0.078;
        return <group key={index} rotation={[0, index * 2.399, 0]}>
          <mesh position={[Math.sin(0.22) * height / 2, 0.315 + Math.cos(0.22) * height / 2, 0]} rotation={[0, 0, -0.22]} material={materials.stem} castShadow><cylinderGeometry args={[0.003, 0.005, height, 6]} /></mesh>
          <mesh position={[Math.sin(0.22) * height, 0.315 + Math.cos(0.22) * height, 0]} rotation={[0.2, 0.4, -0.68]} material={materials.leaf} castShadow receiveShadow><shapeGeometry args={[leafShape, 16]} /></mesh>
        </group>;
      })}
    </group>
  );
}
