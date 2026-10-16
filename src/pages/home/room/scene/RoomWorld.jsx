/** 柔和侧窗光与局部灯光统一室内材料；环境贴图本地生成，不请求外部 HDR。 */
import React from 'react';
import { Environment, Lightformer, ContactShadows } from '@react-three/drei';
import { ROOM_PALETTE as C } from '../../../../design-system/room/roomPalette';
import { RoomCats } from './cats/RoomCats';
import { RoomArchitecture } from './RoomArchitecture';
import { RoomContentObjects } from './RoomContentObjects';
import { createRoomMaterials } from './furniture/materials';

export function RoomWorld({ items, selectedId, onSelect, htmlPortal, onOpenCat }) {
  const materials = React.useMemo(() => createRoomMaterials(), []);
  React.useEffect(() => () => materials.dispose(), [materials]);
  return (
    <group>
      <ambientLight intensity={0.35} color={C.daylight} />
      <hemisphereLight args={[C.sky, C.bounce, 0.95]} />
      {/* 日光穿过真实窗洞；限制实时阴影光源数量，保持家具接地而非全场泛亮。 */}
      <directionalLight
        castShadow position={[-3.8, 5.8, -9.8]} intensity={3.1} color={C.daylight}
        shadow-mapSize={[2048, 2048]} shadow-camera-left={-7} shadow-camera-right={7}
        shadow-camera-top={7} shadow-camera-bottom={-7} shadow-camera-near={0.5} shadow-camera-far={22}
        shadow-bias={-0.00012} shadow-normalBias={0.018}
      />
      <Environment resolution={128} frames={1} environmentIntensity={0.55}>
        <Lightformer intensity={2.8} position={[-2, 2.5, -4]} scale={[4.3, 2.8, 1]} color={C.sky} />
        <Lightformer intensity={0.8} position={[0, 3, 1]} rotation={[Math.PI / 2, 0, 0]} scale={[5, 5, 1]} color={C.daylight} />
      </Environment>
      <RoomArchitecture materials={materials} />
      <RoomContentObjects htmlPortal={htmlPortal} items={items} materials={materials} selectedId={selectedId} onSelect={onSelect} />
      <React.Suspense fallback={null}><RoomCats onOpen={onOpenCat} /></React.Suspense>
      <ContactShadows position={[0, 0.023, 0]} frames={Infinity} resolution={256} scale={9} opacity={0.36} blur={2.4} far={2.5} color={C.shadow} />
    </group>
  );
}
