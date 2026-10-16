/** 两只猫固定坐在原位，仅保留相册点击；不注册动画帧或更新姿态。 */
import React from 'react';
import { useGLTF } from '@react-three/drei';
import { publicUrl } from '../../../../../lib/publicUrl';
import { isObjectActivation } from '../roomNavigation';
import { createIdleRig } from './createIdleRig';

const residents = [
  { id: 'cat-blue', asset: 'cats/q-blue-white.glb', position: [-2.92, 0.56, 0.65], angle: 1.05 },
  { id: 'cat-tabby', asset: 'cats/q-tabby.glb', position: [-1.65, 0.046, 1.88], angle: 0.7 },
];

function SittingCat({ resident, onOpen }) {
  const { scene } = useGLTF(publicUrl(resident.asset));
  const rig = React.useMemo(() => createIdleRig(scene), [scene]);
  React.useEffect(() => () => rig.dispose(), [rig]);
  // 默认参数全部为零，保持坐姿；切换相册或重渲染也不启动任何猫咪动作。
  return <group position={resident.position} rotation={[0, resident.angle, 0]} scale={0.4}
    onClick={(event) => {
      event.stopPropagation();
      if (isObjectActivation(event)) onOpen(resident.id);
    }}>
    <primitive object={rig.root} dispose={null} />
  </group>;
}

export function RoomCats({ onOpen }) {
  return <group>{residents.map((resident) => <SittingCat key={resident.id} resident={resident} onOpen={onOpen} />)}</group>;
}
