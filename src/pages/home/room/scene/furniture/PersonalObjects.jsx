/** 沙发边的个人相框；相片仅从本地加载，失败不阻断整间小屋。 */
import React from 'react';
import { TextureLoader, SRGBColorSpace } from 'three';
import { publicUrl } from '../../../../../lib/publicUrl';
import { Timber } from './RoomDecor';

export function PortraitFrame({ materials }) {
  const [photo, setPhoto] = React.useState(null);
  React.useEffect(() => {
    let active = true;
    const texture = new TextureLoader().load(publicUrl('profile.png'), (loaded) => {
      loaded.colorSpace = SRGBColorSpace;
      if (active) setPhoto(loaded);
    }, undefined, () => { /* 相片失败时保留可点击的实体相框与文字入口。 */ });
    return () => { active = false; texture.dispose(); };
  }, []);
  return <group rotation={[-0.1, 0.52, 0]}>
    <Timber size={[0.5, 0.67, 0.045]} position={[0, 0.335, 0]} materials={materials} material={materials.walnut} radius={0.008} />
    <mesh position={[0, 0.335, 0.024]} material={materials.paper}><planeGeometry args={[0.45, 0.62]} /></mesh>
    {photo && <mesh position={[0, 0.335, 0.026]}><planeGeometry args={[0.386, 0.58]} /><meshBasicMaterial map={photo} toneMapped={false} /></mesh>}
    <Timber size={[0.34, 0.02, 0.19]} position={[0, 0.008, -0.035]} materials={materials} material={materials.walnut} />
  </group>;
}
export function PortraitTable({ materials }) {
  return <group position={[-2.8, 0, 1.85]}>
    <mesh position={[0, 0.32, 0]} material={materials.walnut} castShadow><cylinderGeometry args={[0.12, 0.17, 0.6, 32]} /></mesh>
    <Timber size={[0.7, 0.055, 0.54]} position={[0, 0.635, 0]} materials={materials} material={materials.walnut} />
  </group>;
}
