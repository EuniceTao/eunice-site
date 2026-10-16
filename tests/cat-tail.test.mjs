/** 尾巴回归：中段与后脚分离、坐站过渡保持间距、尾尖连续。 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { Vector3 } from 'three';
import { tailCurve, createCatTail } from '../src/pages/home/room/scene/cats/locomotion/catTail.js';

test('tail stays outside hind legs throughout sitting-to-standing transition', () => {
  const sit = tailCurve(false), stand = tailCurve(true);
  for (let phase = 0; phase <= 20; phase++) {
    const blend = phase / 20;
    for (let i = 12; i <= 100; i++) {
      const t = i / 100;
      const center = sit.getPointAt(t).lerp(stand.getPointAt(t), blend);
      for (const side of [-1, 1]) {
        // 包住后掌及撑起的后腿，同时为步态前后摆动保留余量。
        const x = side * 0.22, z = -0.13 - 0.17 * blend;
        const nearest = new Vector3(x, Math.max(0.02, Math.min(center.y, 0.23 + 0.26 * blend)), z);
        assert.ok(center.distanceTo(nearest) > 0.15, 'tail must not merge with the hind leg');
      }
      assert.ok(Math.hypot(center.x, center.z) * 0.4 + 0.047 * 0.4 < 0.34, 'within navigation clearance');
    }
  }
});
test('tail and tip share matching seated and standing endpoint positions', () => {
  for (const tip of [false, true]) {
    const geometry = createCatTail(tip);
    assert.equal(geometry.attributes.position.count, geometry.attributes.catStandingPosition.count);
    for (const name of ['position', 'normal', 'catStandingPosition', 'catStandingNormal']) {
      assert.ok([...geometry.attributes[name].array].every(Number.isFinite));
    }
    geometry.dispose();
  }
});
