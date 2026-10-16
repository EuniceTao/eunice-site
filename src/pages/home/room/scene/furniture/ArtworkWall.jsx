/** 沙发主墙上的实体挂画组；真实作品与空画框区分，使用房间现有材质及配色。 */
import React from 'react';
import { CanvasTexture, SRGBColorSpace } from 'three';
import { ROOM_PALETTE as C } from '../../../../../design-system/room/roomPalette';
import { wallSlots } from '../../artworks';
import { Timber } from './RoomDecor';

function useArtworkTexture(artwork) {
  const texture = React.useMemo(() => {
    const canvas = document.createElement('canvas'); canvas.width = 600; canvas.height = 760;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = artwork.pending ? C.paper : C.wine; ctx.fillRect(0, 0, 600, 760);
    ctx.fillStyle = artwork.pending ? C.clay : C.paper; ctx.textAlign = 'center';
    if (artwork.pending) {
      ctx.strokeStyle = C.trim; ctx.lineWidth = 2; ctx.strokeRect(45, 45, 510, 670);
      ctx.font = '42px "Songti SC", serif'; ctx.fillText('待上墙', 300, 365);
      ctx.font = '22px sans-serif'; ctx.fillText('留给下一件作品', 300, 425);
    } else {
      ctx.font = '24px sans-serif'; ctx.fillText(artwork.kind, 300, 110);
      ctx.font = '94px "Songti SC", serif';
      artwork.titleLines.forEach((line, i) => ctx.fillText(line, 300, 320 + i * 115));
      ctx.font = '26px serif'; ctx.fillText('Eunice', 300, 645);
    }
    const result = new CanvasTexture(canvas); result.colorSpace = SRGBColorSpace; return result;
  }, [artwork]);
  React.useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}
function ArtworkFrame({ artwork, materials, position, scale }) {
  const texture = useArtworkTexture(artwork);
  return <group position={position} scale={scale}>
    <Timber size={[0.84, 1.06, 0.055]} materials={materials} material={materials.walnut} radius={0.008} />
    <mesh position={[0, 0, 0.029]} material={materials.paper}><planeGeometry args={[0.78, 1]} /></mesh>
    <mesh position={[0, 0, 0.031]}><planeGeometry args={[0.69, 0.88]} /><meshBasicMaterial map={texture} toneMapped={false} /></mesh>
  </group>;
}
const slots = wallSlots();
export function ArtworkWall({ materials }) {
  const twoRows = slots.length > 3;
  return <group>{slots.map((artwork, i) => <ArtworkFrame key={artwork.id} artwork={artwork} materials={materials}
    position={[[0, -1, 1][i % 3] * 1.04, twoRows ? 0.43 - Math.floor(i / 3) * 0.83 : 0, 0]}
    scale={twoRows ? 0.7 : artwork.pending ? 0.9 : 1.1} />)}</group>;
}
