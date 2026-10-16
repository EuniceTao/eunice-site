/** 可动的圆润 3D 猫：蓝白色块与浅棕虎斑，关节围绕肩胯旋转。 */
import React from 'react';
import { useFrame } from '@react-three/fiber';
import { CatmullRomCurve3, Vector3 } from 'three';

function Ellipsoid({ position, scale, color, ...props }) {
  return <mesh position={position} scale={scale} castShadow receiveShadow {...props}>
    <sphereGeometry args={[1, 20, 14]} /><meshStandardMaterial color={color} roughness={0.94} />
  </mesh>;
}
export function CatModel({ motion, tabby = false }) {
  const body = React.useRef();
  const head = React.useRef();
  const legs = React.useRef([]);
  const tail = React.useRef();
  const eyes = React.useRef([]);
  const fur = tabby ? '#bca184' : '#637181';
  const cream = tabby ? '#dfcbb0' : '#f2eee6';
  const stripe = '#78614d';
  const tailCurve = React.useMemo(() => new CatmullRomCurve3([
    new Vector3(0, 0.28, -0.22), new Vector3(0, 0.38, -0.36),
    new Vector3(0.03, 0.61, -0.36), new Vector3(0.09, 0.65, -0.3),
  ]), []);
  useFrame(() => {
    const rest = motion.rest;
    const stretch = motion.stretch;
    const jump = motion.target && !motion.walking && motion.progress > 0;
    body.current.position.y = -0.10 * rest - stretch * 0.03 + (motion.walking ? Math.sin(motion.phase * 13) * 0.008 : 0);
    body.current.scale.z = 1 + stretch * 0.08;
    head.current.rotation.y = motion.walking || jump ? 0 : Math.sin(motion.phase * 0.7) * 0.19;
    head.current.rotation.x = rest * 0.12 + stretch * 0.25;
    legs.current.forEach((leg, i) => {
      leg.position.y = 0.245 - rest * 0.10;
      leg.rotation.x = rest * (i % 2 === 0 ? -1.1 : 1.1) + stretch * (i % 2 === 0 ? -0.4 : 0.1) + (jump ? 0.65 : motion.walking ? Math.sin(motion.phase * 9 + (i === 0 || i === 3 ? 0 : Math.PI)) * 0.48 : 0);
    });
    tail.current.rotation.y = Math.sin(motion.phase * 1.7) * 0.15;
    const blink = Math.sin(motion.phase * 0.8) > 0.995;
    eyes.current.forEach((eye) => { eye.scale.y = blink ? 0.08 : 1 - rest * 0.65; });
  });
  return <group scale={0.65}>
    <group ref={body}>
      <Ellipsoid position={[0, 0.29, -0.025]} scale={[tabby ? 0.15 : 0.18, 0.18, 0.27]} color={fur} />
      {!tabby && <Ellipsoid position={[0, 0.265, 0.15]} scale={[0.156, 0.17, 0.12]} color={cream} />}
      {tabby && [-0.18, -0.09, 0, 0.09].map((z) => <mesh key={z} position={[0, 0.29, z]} scale={[0.151 * Math.sqrt(1 - ((z + 0.025) / 0.28) ** 2), 0.181 * Math.sqrt(1 - ((z + 0.025) / 0.28) ** 2), 1]}>
        <torusGeometry args={[1, 0.035, 6, 24]} /><meshStandardMaterial color={stripe} roughness={1} />
      </mesh>)}
      <group ref={head} position={[0, 0.43, 0.2]}>
        <Ellipsoid scale={[tabby ? 0.16 : 0.19, 0.17, 0.16]} color={fur} />
        {[-1, 1].map((side, i) => <group key={side}>
          <mesh position={[side * 0.115, 0.15, -0.015]} rotation={[0.05, 0, -side * 0.2]} castShadow>
            <coneGeometry args={[0.078, 0.17, 3]} /><meshStandardMaterial color={fur} roughness={1} />
          </mesh>
          <mesh position={[side * 0.116, 0.153, 0.03]} rotation={[0, 0, -side * 0.2]}>
            <coneGeometry args={[0.044, 0.108, 3]} /><meshStandardMaterial color="#c8a89e" roughness={1} />
          </mesh>
          <Ellipsoid position={[side * 0.06, -0.065, 0.132]} scale={[0.079, 0.065, 0.06]} color={cream} />
          <group ref={(element) => { eyes.current[i] = element; }} position={[side * 0.082, 0.025, 0.137]}>
            <Ellipsoid scale={[0.046, 0.047, 0.019]} color="#433b30" />
            <Ellipsoid position={[0, 0, 0.009]} scale={[0.037, 0.039, 0.014]} color={tabby ? '#c9a757' : '#cf973d'} />
            <Ellipsoid position={[0, 0, 0.02]} scale={[0.014, 0.031, 0.006]} color="#25282a" />
            <Ellipsoid position={[-0.009, 0.015, 0.026]} scale={[0.009, 0.009, 0.004]} color="#ffffff" />
          </group>
          {tabby && [0, 1].map((n) => <Ellipsoid key={n} position={[side * (0.126 + n * 0.012), -0.015 - n * 0.032, 0.097]} scale={[0.035, 0.009, 0.012]} color={stripe} rotation={[0, side * 0.6, side * 0.3]} />)}
        </group>)}
        {!tabby && <Ellipsoid position={[0, -0.005, 0.145]} scale={[0.032, 0.081, 0.022]} color={cream} />}
        {tabby && [-1, 0, 1].map((i) => <Ellipsoid key={i} position={[i * 0.039, 0.093, 0.126]} scale={[0.012, 0.04, 0.013]} color={stripe} rotation={[0, 0, i * 0.3]} />)}
        <Ellipsoid position={[0, -0.054, 0.189]} scale={[0.024, 0.016, 0.012]} color={tabby ? '#684d43' : '#ba8786'} />
      </group>
    </group>
    {[-0.115, 0.115].flatMap((x, side) => [0.145, -0.18].map((z, end) => <group key={`${x}:${z}`} ref={(element) => { legs.current[side * 2 + end] = element; }} position={[x, 0.245 - motion.rest * 0.08, z]}>
      <Ellipsoid position={[0, -0.085, 0]} scale={[0.052, 0.12, 0.055]} color={fur} />
      <Ellipsoid position={[0, -0.195, 0.025]} scale={[0.059, 0.049, 0.075]} color={tabby ? fur : cream} />
    </group>))}
    <group ref={tail}><mesh castShadow><tubeGeometry args={[tailCurve, 20, tabby ? 0.034 : 0.043, 10, false]} /><meshStandardMaterial color={tabby ? stripe : fur} roughness={1} /></mesh></group>
  </group>;
}
