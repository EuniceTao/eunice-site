/** 蓝白在沙发休息，虎斑沿安全地面路线慢走、停留；暂停冻结全部动作。 */
import React from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { publicUrl } from '../../../../../lib/publicUrl';
import { isObjectActivation } from '../roomNavigation';
import { createIdleRig } from './createIdleRig';
import { catIdlePose } from './catIdlePose';
import { createWander, advanceWander, STRIDE } from './catWander';

const residents = [
  { id: 'cat-blue', asset: 'cats/q-blue-white.glb', position: [-2.92, 0.56, 0.65], angle: 1.05 },
  { id: 'cat-tabby', asset: 'cats/q-tabby.glb', position: [-1.65, 0.046, 1.88], angle: 0.7 },
];

function SittingCat({ resident, index, onOpen, active }) {
  const { scene } = useGLTF(publicUrl(resident.asset));
  const rig = React.useMemo(() => createIdleRig(scene), [scene]);
  const time = React.useRef(1.2);
  const group = React.useRef();
  const wander = React.useRef(createWander());
  const invalidate = useThree((state) => state.invalidate);
  React.useEffect(() => () => rig.dispose(), [rig]);
  React.useEffect(() => { if (active) invalidate(); }, [active, invalidate]);
  useFrame((_, delta) => {
    if (!active) return;
    const dt = Math.min(delta, 0.05);
    time.current += dt;
    const pose = catIdlePose(time.current, index);
    if (index === 1) {
      const motion = advanceWander(wander.current, dt);
      group.current.position.fromArray(motion.position);
      group.current.rotation.y = motion.angle;
      Object.assign(pose, { stand: motion.stand, gait: motion.gait, phase: motion.distance / STRIDE });
      pose.head *= 1 - motion.stand * 0.7;
    }
    rig.update(pose);
    invalidate();
  });
  return <group ref={group} position={resident.position} rotation={[0, resident.angle, 0]} scale={0.4}
    onClick={(event) => {
      event.stopPropagation();
      if (isObjectActivation(event)) onOpen(resident.id);
    }}>
    <primitive object={rig.root} dispose={null} />
  </group>;
}

export function RoomCats({ onOpen, active }) {
  return <group>{residents.map((resident, index) => <SittingCat key={resident.id} resident={resident} index={index} onOpen={onOpen} active={active} />)}</group>;
}
