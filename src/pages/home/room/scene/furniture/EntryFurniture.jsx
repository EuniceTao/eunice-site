/** 玄关胡桃木收纳、皮质行李与信件；台下保持开放，进门处留出通行空间。 */
import React from 'react';
import { RoundedBox } from '@react-three/drei';
import { Timber, Vase } from './RoomDecor';

export function Suitcase({ materials }) {
  return (
    <group rotation={[0, -Math.PI / 2, 0]}>
      <RoundedBox args={[0.54, 0.63, 0.28]} radius={0.055} smoothness={4} material={materials.leather} castShadow receiveShadow />
      {[-0.16, 0.16].map((x) => <group key={x}>
        <RoundedBox args={[0.047, 0.64, 0.29]} radius={0.019} smoothness={2} position={[x, 0, 0]} material={materials.strap} castShadow />
        <mesh position={[x, -0.32, -0.06]} rotation={[0, 0, Math.PI / 2]} material={materials.ink} castShadow><cylinderGeometry args={[0.034, 0.034, 0.025, 16]} /></mesh>
      </group>)}
      <Timber size={[0.18, 0.028, 0.032]} position={[0, 0.35, 0]} materials={materials} material={materials.leather} />
      {[-0.075, 0.075].map((x) => <Timber key={x} size={[0.02, 0.046, 0.032]} position={[x, 0.329, 0]} materials={materials} material={materials.chrome} />)}
      <mesh position={[0.08, 0.22, 0.154]} material={materials.paper}><boxGeometry args={[0.08, 0.052, 0.001]} /></mesh>
    </group>
  );
}

export function Letters({ materials }) {
  return (
    <group rotation={[0, -0.2, 0]}>
      {[0, 1, 2].map((i) => <mesh key={i} position={[i * 0.005, i * 0.006, 0]} rotation={[0, i * 0.06, 0]} material={materials.paper} castShadow><boxGeometry args={[0.2, 0.005, 0.13]} /></mesh>)}
      <mesh position={[0.061, 0.016, -0.033]} material={materials.clay}><boxGeometry args={[0.025, 0.001, 0.03]} /></mesh>
      {[0, 1, 2].map((i) => <mesh key={i} position={[-0.024, 0.016, i * 0.016 - 0.01]} material={materials.strap}><boxGeometry args={[0.08 - i * 0.01, 0.001, 0.002]} /></mesh>)}
    </group>
  );
}

export function EntryFurniture({ materials }) {
  return (
    <group>
      {/* 台面高 1.0865 米，与既有信件锚点的纸张底面相接。 */}
      <group position={[3.72, 0, 1.92]} rotation={[0, -Math.PI / 2, 0]}>
        <Timber size={[1.44, 0.05, 0.45]} position={[0, 1.0615, 0]} materials={materials} material={materials.walnut} radius={0.023} />
        {[-0.62, 0.62].flatMap((x) => [-0.16, 0.16].map((z) => <Timber key={`${x}:${z}`} size={[0.026, 1.0135, 0.026]} position={[x, 0.52975, z]} materials={materials} material={materials.chrome} />))}
        <Timber size={[1.29, 0.022, 0.35]} position={[0, 0.19, 0]} materials={materials} material={materials.walnut} />
        <Vase materials={materials} position={[0.44, 1.0865, -0.01]} scale={0.9} />
        <mesh position={[-0.02, 1.0935, -0.07]} material={materials.ceramic}><cylinderGeometry args={[0.075, 0.068, 0.014, 32]} /></mesh>
        <mesh position={[-0.02, 1.1055, -0.07]} rotation={[Math.PI / 2, 0, 0]} material={materials.brass}><torusGeometry args={[0.022, 0.003, 8, 20]} /></mesh>
      </group>
      <group position={[4.11, 0, -0.5]} rotation={[0, -Math.PI / 2, 0]}>
        <Timber size={[1.05, 2.26, 0.055]} position={[0, 1.16, 0]} materials={materials} material={materials.trim} />
        {[0.63, 1.64].map((y) => <group key={y} position={[0, y, 0.032]}>
          {[-0.39, 0.39].map((x) => <mesh key={x} position={[x, 0, 0]} material={materials.plaster}><boxGeometry args={[0.018, 0.78, 0.012]} /></mesh>)}
          {[-0.39, 0.39].map((offset) => <mesh key={offset} position={[0, offset, 0]} material={materials.plaster}><boxGeometry args={[0.79, 0.018, 0.012]} /></mesh>)}
        </group>)}
        {[-0.556, 0.556].map((x) => <mesh key={x} position={[x, 1.2, 0.019]} material={materials.trim} castShadow><boxGeometry args={[0.065, 2.4, 0.11]} /></mesh>)}
        <mesh position={[0, 2.385, 0.019]} material={materials.trim} castShadow><boxGeometry args={[1.18, 0.065, 0.11]} /></mesh>
        <mesh position={[-0.38, 1.05, 0.062]} material={materials.brass}><cylinderGeometry args={[0.035, 0.035, 0.024, 24]} /></mesh>
        <mesh position={[-0.32, 1.05, 0.087]} material={materials.brass}><boxGeometry args={[0.14, 0.023, 0.03]} /></mesh>
      </group>
      <group position={[3.95, 1.66, 2.15]} rotation={[0, -Math.PI / 2, 0]}>
        <Timber size={[0.9, 0.052, 0.045]} materials={materials} material={materials.walnut} />
        {[-0.3, 0, 0.3].map((x) => <mesh key={x} position={[x, -0.02, 0.05]} rotation={[Math.PI / 2, 0, 0]} material={materials.brass}><cylinderGeometry args={[0.012, 0.012, 0.085, 12]} /></mesh>)}
      </group>
    </group>
  );
}
