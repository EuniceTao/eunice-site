/** 沙发边的个人相框与作品展签；相片仅从本地加载，失败不阻断整间小屋。 */
import React from 'react';
import { CanvasTexture, TextureLoader, SRGBColorSpace } from 'three';
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
export function ExperimentExhibit({ materials }) {
  const title = React.useMemo(() => {
    // 展签文字直接绘制到实体表面，避免 HTML 透视层与相框产生视差。
    const canvas = document.createElement('canvas');
    canvas.width = 520; canvas.height = 660;
    const context = canvas.getContext('2d');
    context.fillStyle = '#743744'; context.fillRect(0, 0, 520, 660);
    context.fillStyle = '#fff3df'; context.textAlign = 'center';
    context.font = '90px "Songti SC", serif';
    context.fillText('吵吵', 260, 270); context.fillText('艺术馆', 260, 390);
    context.font = '22px serif'; context.fillText('BY EUNICE', 260, 530);
    const texture = new CanvasTexture(canvas); texture.colorSpace = SRGBColorSpace;
    return texture;
  }, []);
  React.useEffect(() => () => title.dispose(), [title]);
  return <group>
    <Timber size={[0.58, 0.72, 0.045]} position={[0, 0.36, 0]} materials={materials} material={materials.walnut} />
    <mesh position={[0, 0.36, 0.024]}><planeGeometry args={[0.52, 0.66]} /><meshBasicMaterial map={title} toneMapped={false} /></mesh>
  </group>;
}
