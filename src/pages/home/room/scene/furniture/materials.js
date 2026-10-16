/** 确定性本地纹理与共享物理材质；色彩图和表面数据分开，场景卸载统一释放。 */
import { DataTexture, DoubleSide, LinearFilter, LinearMipmapLinearFilter, MeshPhysicalMaterial, MeshStandardMaterial, RepeatWrapping, SRGBColorSpace } from 'three';
import { ROOM_PALETTE as C } from '../../../../../design-system/room/roomPalette';

function surfaceTexture(kind, colorMap = true, repeat = [1, 1]) {
  const width = 128, height = 256;
  const pixels = new Uint8Array(width * height * 4);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const seed = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      const noise = seed - Math.floor(seed);
      let value;
      if (kind === 'wood') {
        const grain = Math.sin(y * 0.49 + Math.sin(x * 0.019) * 2 + Math.sin(y * 0.054) * 1.3);
        value = 232 + grain * 9 + noise * 5;
      } else if (kind === 'stone') {
        const vein = Math.sin(x * 0.06 + y * 0.022 + Math.sin(y * 0.039) * 1.8);
        value = 239 + vein * 4 - (noise > 0.985 ? 21 : 0);
      } else if (kind === 'weave') {
        value = 215 + (x % 4 < 2 ? 12 : 0) + (y % 4 < 2 ? 9 : 0) + noise * 5;
      } else {
        value = 235 + noise * 10;
      }
      const offset = (y * width + x) * 4;
      pixels[offset] = pixels[offset + 1] = pixels[offset + 2] = Math.round(value);
      pixels[offset + 3] = 255;
    }
  }
  const map = new DataTexture(pixels, width, height);
  if (colorMap) map.colorSpace = SRGBColorSpace;
  map.wrapS = map.wrapT = RepeatWrapping;
  map.repeat.set(...repeat);
  map.magFilter = LinearFilter;
  map.minFilter = LinearMipmapLinearFilter;
  map.generateMipmaps = true;
  map.anisotropy = 4;
  map.needsUpdate = true;
  return map;
}

export function createRoomMaterials() {
  const wood = surfaceTexture('wood');
  const floorWood = surfaceTexture('wood', true, [1.5, 0.75]);
  const stone = surfaceTexture('stone');
  const weave = surfaceTexture('weave', false, [7, 7]);
  const plaster = surfaceTexture('grain', false, [5, 5]);
  const standard = (color, roughness = 0.8, extra = {}) => new MeshStandardMaterial({ color, roughness, ...extra });
  const fabric = (color) => new MeshPhysicalMaterial({ color, roughness: 0.94, sheen: 0.65, sheenRoughness: 0.85, sheenColor: color, bumpMap: weave, bumpScale: 0.002 });
  const materials = {
    oak: standard(C.oak, 0.53, { map: wood }), walnut: standard(C.walnut, 0.42, { map: wood }),
    floor: standard(C.floor, 0.6, { map: floorWood }), stone: standard(C.stone, 0.64, { map: stone }),
    linen: fabric(C.linen), sage: fabric(C.sage), wine: fabric(C.wine),
    rug: standard(C.rug, 1, { bumpMap: weave, bumpScale: 0.003 }),
    plaster: standard(C.plaster, 0.94, { bumpMap: plaster, bumpScale: 0.001 }),
    ceiling: standard(C.ceiling, 0.95), trim: standard(C.trim, 0.57),
    ceramic: new MeshPhysicalMaterial({ color: C.ceramic, roughness: 0.24, clearcoat: 0.24, clearcoatRoughness: 0.3 }),
    clay: standard(C.clay), brass: standard(C.brass, 0.34, { metalness: 0.76 }),
    chrome: standard(C.chrome, 0.25, { metalness: 0.94 }), ink: standard(C.ink, 0.57),
    leather: standard(C.leather, 0.55), strap: standard(C.strap, 0.8),
    paper: standard(C.paper, 0.98), book: standard(C.book), petal: standard(C.petal, 0.7),
    leaf: standard(C.leaf, 0.69, { side: DoubleSide }), stem: standard(C.moss, 0.88),
    soil: standard(C.soil, 1), curtain: standard(C.ceiling, 0.95, { bumpMap: weave, bumpScale: 0.001, side: DoubleSide }),
    diffuser: standard(C.paper, 0.5, { emissive: C.lamp, emissiveIntensity: 0.35, side: DoubleSide }),
  };
  return {
    ...materials,
    dispose() {
      Object.values(materials).forEach((material) => material.dispose());
      [wood, floorWood, stone, weave, plaster].forEach((map) => map.dispose());
    },
  };
}
