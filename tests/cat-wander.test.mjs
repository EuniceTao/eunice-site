/** 地面巡游回归：家具间距、地面高度、暂停恢复及完整往返。 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { createWander, advanceWander } from '../src/pages/home/room/scene/cats/catWander.js';
import { isFloorClear } from '../src/pages/home/room/scene/cats/catNavigation.js';

test('full round trip remains clear of furniture, grounded and slow, with stationary rests', () => {
  const state = createWander(), visited = new Set(), stages = new Set();
  let returned = false;
  for (let frame = 0; frame < 36000; frame++) {
    const before = [...state.position], stage = state.stage;
    advanceWander(state, 1 / 60);
    visited.add(state.node); stages.add(state.stage);
    assert.ok(isFloorClear(state.position));
    assert.ok(state.position[1] >= 0.023 && state.position[1] <= 0.046);
    const travel = Math.hypot(state.position[0] - before[0], state.position[2] - before[2]);
    assert.ok(travel <= 0.13 / 60 + 1e-8);
    assert.ok(Math.abs(state.position[1] - before[1]) < 0.002);
    if (stage === 'rest') assert.deepEqual(state.position, before);
    assert.ok(state.stand >= 0 && state.stand <= 1);
    if (visited.size === 7 && state.node === 0) returned = true;
  }
  assert.equal(visited.size, 7); assert.ok(returned);
  assert.deepEqual([...stages].sort(), ['rest', 'rise', 'sit', 'turn', 'walk']);
});

test('paused activity does not advance and long resumed frame cannot teleport', () => {
  const state = createWander();
  for (let i = 0; i < 700; i++) advanceWander(state, 1 / 60);
  const paused = structuredClone(state);
  for (let i = 0; i < 100; i++) advanceWander(state, 0);
  assert.deepEqual(state, paused);
  advanceWander(state, 120);
  assert.ok(Math.hypot(state.position[0] - paused.position[0], state.position[2] - paused.position[2]) <= 0.00651);
});
