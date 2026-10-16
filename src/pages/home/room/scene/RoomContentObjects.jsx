/** 内容入口绑定真实生活物件；正文与路由来自 items，个人相框使用已确认的本地照片。 */
import React from 'react';
import { RoomInteractiveObject } from './RoomInteractiveObject';
import { LivingFurniture, OpenNotebook } from './furniture/LivingFurniture';
import { StudyFurniture, Laptop } from './furniture/StudyFurniture';
import { EntryFurniture, Letters, Suitcase } from './furniture/EntryFurniture';
import { PortraitFrame, PortraitTable } from './furniture/PersonalObjects';
import { ArtworkWall } from './furniture/ArtworkWall';
import { ARTWORK_WALL_POSITION } from '../artworks';
import { Plant } from './furniture/RoomDecor';

export function RoomContentObjects({ items, materials, onSelect, selectedId, htmlPortal }) {
  const byId = Object.fromEntries(items.map((item) => [item.id, item]));
  const objects = [
    { id: 'now', position: [-3.02, 1.024, -3.3], label: [0, 0.62, 0.17], object: <Plant materials={materials} scale={0.43} /> },
    { id: 'work', position: [-1.7, 0.805, -2.64], label: [0, 0.48, 0.04], object: <Laptop materials={materials} /> },
    { id: 'notes', position: [-1.12, 0.502, 0.44], label: [0, 0.2, 0], object: <OpenNotebook materials={materials} /> },
    { id: 'about', position: [-2.8, 0.663, 1.85], label: [0, 0.79, 0.08], object: <PortraitFrame materials={materials} /> },
    { id: 'experiments', position: ARTWORK_WALL_POSITION, rotation: [0, Math.PI / 2, 0], label: [0, 0.69, 0.12], object: <ArtworkWall materials={materials} /> },
    { id: 'experience', position: [3.59, 0.555, 2.0], label: [-0.19, 0.42, 0], object: <Suitcase materials={materials} /> },
    { id: 'contact', position: [3.53, 1.089, 1.61], label: [-0.1, 0.21, 0], object: <Letters materials={materials} /> },
  ];
  return (
    <group>
      <LivingFurniture materials={materials} />
      <PortraitTable materials={materials} />
      <StudyFurniture materials={materials} />
      <EntryFurniture materials={materials} />
      {objects.map(({ id, position, rotation, label, object }) => byId[id] ? (
        <group key={id} position={position} rotation={rotation}>
          <RoomInteractiveObject htmlPortal={htmlPortal} item={byId[id]} labelPosition={label} onSelect={onSelect} selected={selectedId === id}>
            {object}
          </RoomInteractiveObject>
        </group>
      ) : null)}
    </group>
  );
}
