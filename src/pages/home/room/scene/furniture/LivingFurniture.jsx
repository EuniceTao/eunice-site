/** 客厅以软沙发、酒红弧形椅与石质茶几成组；物件支撑高度与既有内容锚点一致。 */
import React from 'react';
import { RoundedBox } from '@react-three/drei';
import { CatmullRomCurve3, Shape, Vector2, Vector3 } from 'three';
import { Timber, Cup, Book, Plant, Flowers } from './RoomDecor';
import { Sofa } from './sofa/Sofa';

const chairBack = new Shape();
chairBack.absarc(0, 0, 0.47, -0.12, Math.PI + 0.12, false);
chairBack.absarc(0, 0, 0.35, Math.PI + 0.12, -0.12, true);
chairBack.closePath();
const tableProfile = [[0, 0], [0.658, 0], [0.696, 0.006], [0.705, 0.018], [0.705, 0.062], [0.696, 0.078], [0.66, 0.084], [0, 0.084]].map(([x, y]) => new Vector2(x, y));

function LoungeChair({ materials }) {
  return (
    <group position={[0.5, 0, 1.03]} rotation={[0, -1.68, 0]}>
      {[-0.31, 0.31].flatMap((x) => [-0.27, 0.27].map((z) => <mesh key={`${x}:${z}`} position={[x, 0.16, z]} material={materials.walnut} castShadow><cylinderGeometry args={[0.034, 0.027, 0.24, 16]} /></mesh>))}
      <mesh position={[0, 0.31, 0.015]} scale={[0.47, 0.09, 0.43]} material={materials.wine} castShadow receiveShadow><sphereGeometry args={[1, 48, 24]} /></mesh>
      <mesh position={[0, 0.425, 0.025]} scale={[0.355, 0.085, 0.34]} material={materials.wine} castShadow receiveShadow><sphereGeometry args={[1, 48, 24]} /></mesh>
      <mesh position={[0, 0.35, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.wine} castShadow receiveShadow>
        <extrudeGeometry args={[chairBack, { depth: 0.36, bevelEnabled: true, bevelSize: 0.035, bevelThickness: 0.045, bevelSegments: 5, steps: 1, curveSegments: 28 }]} />
      </mesh>
    </group>
  );
}

function ReadingLamp({ materials }) {
  const curve = React.useMemo(() => new CatmullRomCurve3([
    new Vector3(0, 0.05, 0), new Vector3(0, 0.8, 0), new Vector3(0, 1.7, 0),
    new Vector3(0.18, 1.94, -0.4), new Vector3(0.4, 1.85, -0.95),
  ]), []);
  return (
    <group position={[-2.57, 0, 2.53]}>
      <mesh position={[0, 0.05, 0]} material={materials.stone} castShadow receiveShadow><cylinderGeometry args={[0.23, 0.24, 0.055, 48]} /></mesh>
      <mesh material={materials.chrome} castShadow><tubeGeometry args={[curve, 40, 0.013, 10, false]} /></mesh>
      <mesh position={[0.4, 1.67, -0.95]} scale={[1, 0.6, 1]} material={materials.chrome} castShadow><sphereGeometry args={[0.3, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2]} /></mesh>
      <mesh position={[0.4, 1.669, -0.95]} rotation={[-Math.PI / 2, 0, 0]} material={materials.diffuser}><circleGeometry args={[0.288, 40]} /></mesh>
      <pointLight position={[0.4, 1.6, -0.95]} color={materials.diffuser.emissive} intensity={1.5} distance={3} decay={2} />
    </group>
  );
}

export function OpenNotebook({ materials }) {
  return (
    <group rotation={[0, -0.18, 0]}>
      <RoundedBox args={[0.4, 0.012, 0.28]} radius={0.005} smoothness={2} material={materials.leather} castShadow />
      {[-1, 1].map((side) => <group key={side} position={[side * 0.098, 0.012, 0]} rotation={[0, 0, -side * 0.025]}>
        <mesh material={materials.paper} receiveShadow><boxGeometry args={[0.188, 0.014, 0.266]} /></mesh>
        {Array.from({ length: 8 }, (_, index) => <mesh key={index} position={[0, 0.008, -0.082 + index * 0.023]} material={materials.clay}><boxGeometry args={[0.135 - (index % 3) * 0.018, 0.0008, 0.001]} /></mesh>)}
      </group>)}
      <mesh position={[0.25, 0.018, 0.02]} rotation={[Math.PI / 2, 0, -0.15]} material={materials.chrome} castShadow><cylinderGeometry args={[0.005, 0.005, 0.14, 12]} /></mesh>
    </group>
  );
}

export function LivingFurniture({ materials }) {
  return (
    <group>
      <mesh position={[-1.22, 0.034, 0.57]} material={materials.strap} receiveShadow><boxGeometry args={[4.5, 0.018, 3.38]} /></mesh>
      <mesh position={[-1.22, 0.044, 0.57]} rotation={[-Math.PI / 2, 0, 0]} material={materials.rug} receiveShadow><planeGeometry args={[4.4, 3.28]} /></mesh>
      <Sofa />
      <LoungeChair materials={materials} />
      <group position={[-1.2, 0, 0.44]}>
        <mesh name="coffee-table-top" position={[0, 0.412, 0]} scale={[1.12, 1, 0.7]} material={materials.stone} castShadow receiveShadow><latheGeometry args={[tableProfile, 72]} /></mesh>
        {[-0.4, 0.4].map((x) => <mesh key={x} position={[x, 0.228, 0]} material={materials.stone} castShadow receiveShadow><cylinderGeometry args={[0.19, 0.21, 0.368, 40]} /></mesh>)}
        <Book materials={materials} position={[-0.45, 0.523, -0.19]} rotation={[0, 0.12, Math.PI / 2]} width={0.05} height={0.3} depth={0.24} />
        <Cup materials={materials} position={[0.49, 0.496, -0.15]} />
      </group>
      <group position={[-3.03, 0, -1.54]}>
        <mesh position={[0, 0.3, 0]} material={materials.walnut} castShadow><cylinderGeometry args={[0.155, 0.17, 0.55, 48]} /></mesh>
        <Timber size={[0.51, 0.048, 0.51]} position={[0, 0.591, 0]} radius={0.02} materials={materials} material={materials.walnut} />
        <Flowers materials={materials} position={[0, 0.615, 0]} scale={0.8} />
      </group>
      <ReadingLamp materials={materials} />
      <Plant materials={materials} position={[-3.59, 0.023, -2.17]} scale={0.86} />
    </group>
  );
}
