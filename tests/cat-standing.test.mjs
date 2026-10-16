/** 保护后躯离地姿态，避免重新退回坐姿滑行。 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { standingPoint } from '../src/pages/home/room/scene/cats/locomotion/standingPose.js';

test('standing pelvis and underside rise while both rear paws support the body', () => {
  const belly = standingPoint(0, 0.04, -0.16);
  assert.ok(belly[1] > 0.32, 'abdomen must clear the ground');
  const pelvis = standingPoint(0, 0.3, -0.2);
  assert.ok(pelvis[1] > 0.59, 'hindquarters must rise');
  for (const side of [-1, 1]) {
    const paw = standingPoint(side * 0.22, 0.02, -0.13);
    assert.ok(Math.abs(paw[1] - 0.02) < 0.001, 'rear paw stays planted');
    assert.ok(paw[2] < -0.29, 'rear foot unfolds behind the shoulder');
  }
  const tailRoot = standingPoint(0.15, 0.19, -0.32, true);
  assert.ok(tailRoot[1] >= 0.47, 'tail root follows pelvis');
});
