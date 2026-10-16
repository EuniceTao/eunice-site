/** 校验沙发实际几何支撑高度，避免更换模型后猫咪悬空或穿入坐垫。 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { Raycaster, Vector3, Box3 } from 'three';
import { createSofa } from '../src/pages/home/room/scene/furniture/sofa/createSofa.js';

test('accepted sofa supports static cat and stays within living-room footprint', () => {
  const sofa = createSofa();
  sofa.position.set(-3.06, .013, .3);
  sofa.rotation.y = Math.PI / 2;
  sofa.updateMatrixWorld(true);
  const bounds = new Box3().setFromObject(sofa);
  assert.ok(Math.abs(bounds.min.y - .023) < .001);
  assert.ok(bounds.max.x < -2.5 && bounds.min.x > -3.6);
  const ray = new Raycaster(new Vector3(-2.92, 1.3, .65), new Vector3(0, -1, 0));
  const surface = ray.intersectObject(sofa, true)[0];
  assert.ok(surface, 'seat must exist beneath cat');
  assert.ok(Math.abs(surface.point.y - .60) < .008, `cat/seat offset: ${surface.point.y}`);
  sofa.traverse(node => {
    if (node.isMesh) assert.ok(node.geometry.attributes.position.array.every(Number.isFinite));
  });
});
