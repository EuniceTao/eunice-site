/** 房间猫咪回归：身体余量、起落高度、双猫预约与长期活动。 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { EDGES, NODES, isJump, sampleMove, isFloorClear, canTravel, CAT_RADIUS, REST_NODES } from '../src/pages/home/room/scene/cats/catNavigation.js';
import { createCats, stepCats } from '../src/pages/home/room/scene/cats/catMotion.js';

test('every walking segment clears furniture and walls with the full body margin', () => {
  for (const [a, b] of EDGES.filter(([a, b]) => !isJump(a, b))) {
    for (let i = 0; i <= 200; i++) assert.ok(isFloorClear(sampleMove(a, b, i / 200)), `${a} -> ${b} at ${i / 200}`);
  }
});
test('jump paths meet their supports and clear furniture tops during traversal in both directions', () => {
  for (const [a, b] of EDGES.filter(([a, b]) => isJump(a, b))) {
    for (const [from, to] of [[a, b], [b, a]]) {
      for (const [i, p] of sampleMove(from, to, 0).entries()) assert.ok(Math.abs(p - NODES[from][i]) < 1e-8);
      for (const [i, p] of sampleMove(from, to, 1).entries()) assert.ok(Math.abs(p - NODES[to][i]) < 1e-8);
      for (let t = 0.25; t <= 0.75; t += 0.01) assert.ok(sampleMove(from, to, t)[1] > 1.1);
    }
  }
});
test('occupied landing points and opposing reservations cannot be selected', () => {
  assert.equal(canTravel({ node: 'front' }, 'sofa', [{ node: 'sofa', target: null }]), false);
  assert.equal(canTravel({ node: 'middle' }, 'front', [{ node: 'front', target: 'middle' }]), false);
});
test('two cats remain separate and visit every rest surface over seeded activity', () => {
  let seed = 92;
  const random = () => { seed = (1664525 * seed + 1013904223) >>> 0; return seed / 2 ** 32; };
  const cats = createCats(), visits = new Set();
  for (let frame = 0; frame < 36000; frame++) {
    stepCats(cats, 0.05, random);
    const [a, b] = cats.map((cat) => cat.position);
    assert.ok(Math.hypot(...a.map((value, i) => value - b[i])) > CAT_RADIUS * 2, `collision at ${frame}`);
    cats.forEach((cat) => { if (!cat.target) visits.add(cat.node); });
  }
  for (const id of REST_NODES) assert.ok(visits.has(id), `not reached: ${id}`);
});

test('jumping bodies clear neighboring furniture and tabletop objects', () => {
  // Independent measured envelopes: coffee table, desk chair, portrait stand,
  // laptop and mug. Radius encloses the rendered 0.65-scale cat and raised tail.
  const boxes = [
    [-2, -0.4, -0.06, 0.94, 0.65], [-2, -1.34, -2.12, -1.46, 0.89],
    [-3.21, -2.39, 1.51, 2.19, 1.45], [-1.98, -1.42, -2.84, -2.44, 1.18],
    [-1.08, -0.96, -2.92, -2.80, 0.94],
  ];
  for (const [a, b] of EDGES.filter(([a, b]) => isJump(a, b))) {
    for (let t = 0; t <= 1; t += 0.002) {
      const [x, y, z] = sampleMove(a, b, t);
      for (const [left, right, back, front, top] of boxes) {
        const gap = Math.hypot(x - Math.max(left, Math.min(x, right)), z - Math.max(back, Math.min(z, front)));
        assert.ok(gap > 0.27 || y >= top, `${a} -> ${b}: obstacle at t=${t}`);
      }
      assert.ok(y + 0.5 < 3.28, 'ceiling clearance');
    }
  }
});
