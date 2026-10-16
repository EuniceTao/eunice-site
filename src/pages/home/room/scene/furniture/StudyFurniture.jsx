/** 窗边胡桃木工作桌与留白书架；金属细脚和弧形椅背区分于客厅软包。 */
import React from 'react';
import { RoundedBox } from '@react-three/drei';
import { CanvasTexture, CatmullRomCurve3, Shape, SRGBColorSpace, Vector3 } from 'three';
import { ROOM_PALETTE as C } from '../../../../../design-system/room/roomPalette';
import { Timber, Book, Vase, Cup } from './RoomDecor';

function screenTexture() {
  const canvas = document.createElement('canvas'); canvas.width = 800; canvas.height = 500;
  const c = canvas.getContext('2d');
  c.fillStyle = C.paper; c.fillRect(0, 0, 800, 500);
  c.fillStyle = C.trim; c.fillRect(0, 0, 800, 35);
  [C.wine, C.strap, C.sage].forEach((color, i) => { c.fillStyle = color; c.beginPath(); c.arc(22 + i * 20, 18, 5, 0, Math.PI * 2); c.fill(); });
  c.fillStyle = C.ink; c.font = '22px serif'; c.fillText('Eunice', 48, 90);
  c.font = '46px serif'; c.fillText('工作与创造', 48, 205);
  c.fillStyle = C.walnut; c.font = '18px sans-serif'; c.fillText('产品 · 研究 · 协作', 51, 250);
  c.strokeStyle = C.strap; c.lineWidth = 2; c.strokeRect(490, 150, 245, 250);
  c.fillStyle = C.sage; c.fillRect(513, 177, 110, 104); c.fillStyle = C.wine; c.fillRect(593, 263, 117, 108);
  c.fillStyle = C.strap; [330, 354, 378].forEach((y, i) => c.fillRect(50, y, 290 - i * 31, 5));
  const map = new CanvasTexture(canvas); map.colorSpace = SRGBColorSpace; return map;
}

export function Laptop({ materials }) {
  const screen = React.useMemo(() => screenTexture(), []);
  React.useEffect(() => () => screen.dispose(), [screen]);
  return (
    <group rotation={[0, 0.08, 0]}>
      <RoundedBox args={[0.51, 0.023, 0.34]} position={[0, 0.013, 0]} radius={0.01} smoothness={2} material={materials.chrome} castShadow />
      <mesh position={[0, 0.026, -0.04]} material={materials.ink}><boxGeometry args={[0.435, 0.003, 0.13]} /></mesh>
      {Array.from({ length: 5 }, (_, i) => <mesh key={i} position={[0, 0.028, -0.097 + i * 0.026]}><boxGeometry args={[0.43, 0.001, 0.002]} /><meshStandardMaterial color={C.chrome} roughness={0.7} /></mesh>)}
      {Array.from({ length: 12 }, (_, i) => <mesh key={i} position={[-0.207 + i * 0.0375, 0.028, -0.045]}><boxGeometry args={[0.002, 0.001, 0.125]} /><meshStandardMaterial color={C.chrome} roughness={0.7} /></mesh>)}
      <mesh position={[0, 0.026, 0.096]}><boxGeometry args={[0.16, 0.001, 0.073]} /><meshStandardMaterial color={C.chrome} metalness={0.3} roughness={0.55} /></mesh>
      <group position={[0, 0.022, -0.154]} rotation={[-0.16, 0, 0]}>
        <RoundedBox args={[0.51, 0.328, 0.017]} position={[0, 0.164, 0]} radius={0.007} smoothness={3} material={materials.ink} castShadow />
        <mesh position={[0, 0.165, 0.009]}><planeGeometry args={[0.473, 0.296]} /><meshStandardMaterial map={screen} emissiveMap={screen} emissive="#ffffff" emissiveIntensity={0.15} roughness={0.4} /></mesh>
      </group>
    </group>
  );
}

const deskBack = new Shape();
deskBack.absarc(0, 0, 0.29, 0, Math.PI, false);
deskBack.absarc(0, 0, 0.26, Math.PI, 0, true);
deskBack.closePath();

function DeskChair({ materials }) {
  return (
    <group position={[-1.67, 0, -1.79]} rotation={[0, Math.PI - 0.12, 0]}>
      {[-0.215, 0.215].flatMap((x) => [-0.2, 0.2].map((z) => <mesh key={`${x}:${z}`} position={[x, 0.257, z]} rotation={[z * 0.16, 0, -x * 0.18]} material={materials.chrome} castShadow><cylinderGeometry args={[0.012, 0.013, 0.465, 12]} /></mesh>))}
      <mesh position={[0, 0.47, 0]} material={materials.walnut} castShadow><cylinderGeometry args={[0.282, 0.277, 0.038, 48]} /></mesh>
      <mesh position={[0, 0.505, 0.012]} scale={[0.269, 0.044, 0.259]} material={materials.linen} castShadow receiveShadow><sphereGeometry args={[1, 40, 20]} /></mesh>
      {[-0.245, 0.245].map((x) => <mesh key={x} position={[x, 0.64, -0.12]} material={materials.chrome} castShadow><cylinderGeometry args={[0.01, 0.01, 0.29, 12]} /></mesh>)}
      <mesh position={[0, 0.704, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.walnut} castShadow receiveShadow><extrudeGeometry args={[deskBack, { depth: 0.16, bevelEnabled: true, bevelSize: 0.008, bevelThickness: 0.008, bevelSegments: 2, curveSegments: 24 }]} /></mesh>
    </group>
  );
}

function Bookshelf({ materials }) {
  const covers = [C.paper, C.book, C.strap, C.leather];
  return (
    <group position={[2.25, 0, -3.3]}>
      {[-1.02, 1.02].map((x) => <mesh key={x} position={[x, 1.14, 0]} material={materials.chrome} castShadow><cylinderGeometry args={[0.013, 0.013, 2.22, 12]} /></mesh>)}
      {[0.16, 0.67, 1.045, 1.58, 2.22].map((y) => <Timber key={y} size={[2.06, 0.032, 0.36]} position={[0, y, 0]} materials={materials} material={materials.walnut} />)}
      <Timber size={[2.0, 0.375, 0.29]} position={[0, 0.365, -0.023]} materials={materials} material={materials.walnut} />
      {[-0.5, 0.5].map((x) => <group key={x}>
        <Timber size={[0.974, 0.36, 0.015]} position={[x, 0.365, 0.137]} radius={0.006} materials={materials} material={materials.walnut} />
        <mesh position={[x * 0.26, 0.465, 0.155]} material={materials.brass}><sphereGeometry args={[0.012, 12, 8]} /></mesh>
      </group>)}
      {[0.67, 1.58].map((shelf, row) => <group key={shelf}>
        {Array.from({ length: row ? 5 : 7 }, (_, i) => <Book key={i} materials={materials} position={[-0.82 + i * 0.061, shelf + 0.016 + (0.24 + (i % 3) * 0.027) / 2, 0.045]} height={0.24 + (i % 3) * 0.027} width={0.05} color={covers[i % 4]} />)}
      </group>)}
      <Vase materials={materials} position={[0.62, 1.596, 0.015]} scale={1.15} />
      <Book materials={materials} position={[0.52, 0.7135, 0.02]} rotation={[0, 0.12, Math.PI / 2]} width={0.05} height={0.34} depth={0.23} color={C.paper} />
      <Vase materials={materials} position={[-0.64, 1.062, 0.025]} scale={0.7} />
      <mesh position={[0.49, 1.228, 0.03]} rotation={[0.1, 0.25, 0]} material={materials.stone} castShadow><torusGeometry args={[0.126, 0.04, 14, 48]} /></mesh>
    </group>
  );
}

export function StudyFurniture({ materials }) {
  const deskLegs = React.useMemo(() => [-0.82, 0.82].map((x) => new CatmullRomCurve3([
    new Vector3(x, 0.04, -0.29), new Vector3(x, 0.66, -0.29), new Vector3(x, 0.731, -0.2),
    new Vector3(x, 0.731, 0.2), new Vector3(x, 0.66, 0.29), new Vector3(x, 0.04, 0.29),
  ], false, 'centripetal')), []);
  return (
    <group>
      <group position={[-1.7, 0, -2.7]}>
        <Timber size={[2.02, 0.08, 0.84]} position={[0, 0.7625, 0]} materials={materials} material={materials.walnut} radius={0.037} />
        {deskLegs.map((curve, i) => <mesh key={i} material={materials.chrome} castShadow><tubeGeometry args={[curve, 32, 0.018, 10, false]} /></mesh>)}
        <Timber size={[0.52, 0.125, 0.59]} position={[0.57, 0.66, -0.01]} materials={materials} material={materials.walnut} />
        <mesh position={[0.57, 0.677, 0.293]} material={materials.chrome}><boxGeometry args={[0.1, 0.007, 0.014]} /></mesh>
        <Cup materials={materials} position={[0.68, 0.8025, -0.16]} />
        <group position={[-0.72, 0.8025, -0.13]}>
          <mesh position={[0, 0.014, 0]} material={materials.chrome} castShadow><cylinderGeometry args={[0.1, 0.103, 0.028, 40]} /></mesh>
          <mesh position={[0, 0.184, 0]} material={materials.chrome} castShadow><cylinderGeometry args={[0.009, 0.009, 0.34, 12]} /></mesh>
          <mesh position={[0, 0.307, 0]} scale={[1, 0.72, 1]} material={materials.chrome} castShadow><sphereGeometry args={[0.17, 40, 18, 0, Math.PI * 2, 0, Math.PI / 2]} /></mesh>
          <mesh position={[0, 0.307, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.diffuser}><circleGeometry args={[0.162, 32]} /></mesh>
          <pointLight position={[0, 0.288, 0]} intensity={0.55} distance={1.3} color={C.lamp} />
        </group>
      </group>
      <DeskChair materials={materials} />
      <Bookshelf materials={materials} />
    </group>
  );
}
