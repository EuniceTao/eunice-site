/** 工作室独立场景，复用已有桌椅材质；按需渲染，离开时释放资源。 */
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { StudyFurniture, Laptop } from '../room/scene/furniture/StudyFurniture';
import { createRoomMaterials } from '../room/scene/furniture/materials';

function Studio() {
  const materials = React.useMemo(() => createRoomMaterials(), []);
  React.useEffect(() => () => materials.dispose(), [materials]);
  return <group>
    <color attach="background" args={['#e9e5dc']} />
    <ambientLight intensity={0.9} />
    <hemisphereLight args={['#eaf1f3', '#a4917c', 1.5]} />
    <directionalLight position={[-4, 7, 2]} intensity={2.5} castShadow shadow-mapSize={[1024, 1024]} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} material={materials.floor} receiveShadow><planeGeometry args={[18, 18]} /></mesh>
    <mesh position={[0, 2.4, -3.6]} material={materials.plaster} receiveShadow><boxGeometry args={[16, 4.8, 0.12]} /></mesh>
    <StudyFurniture materials={materials} />
    <group position={[-1.7, 0.805, -2.64]}><Laptop materials={materials} /></group>
    <ContactShadows position={[0, 0.025, 0]} frames={1} scale={12} opacity={0.35} blur={2.5} far={3} />
  </group>;
}
export function StudioScene() {
  return <Canvas shadows frameloop="demand" dpr={[1, 1.5]} camera={{ position: [4.2, 2.5, 3.6], fov: 42 }} onCreated={({ camera }) => camera.lookAt(-0.4, 1, -2.4)} fallback={<p>向下浏览工作档案。</p>}><Studio /></Canvas>;
}
