/** 作品墙布局与数据扩展回归，保护真实作品及其外链。 */
import assert from 'node:assert/strict';
import test from 'node:test';
import { wallSlots, PERSONAL_ARTWORKS, ARTWORK_WALL_POSITION, ART_GAME_URL } from '../src/pages/home/room/artworks.js';

test('one published artwork is accompanied by explicitly empty frames', () => {
  const slots = wallSlots();
  assert.equal(slots.length, 3);
  assert.equal(slots[0].url, ART_GAME_URL);
  assert.equal(slots.filter(item => item.pending).length, 2);
  assert.equal(PERSONAL_ARTWORKS.length, 1);
});
test('new artworks fill frames without mutating the collection', () => {
  const future = [...PERSONAL_ARTWORKS, { id: 'test-second', title: 'Test', url: 'https://example.com' }];
  assert.equal(wallSlots(future)[1], future[1]);
  assert.equal(wallSlots(future).filter(item => item.pending).length, 1);
  assert.equal(future.length, 2);
});
test('gallery remains on sofa wall and away from the curtain plane', () => {
  const [x, y, z] = ARTWORK_WALL_POSITION;
  assert.ok(x > -4.13 && x < -4);
  assert.ok(y - 1.06 / 2 > 1.1);
  assert.ok(z - 1.04 - 0.42 > -3.0);
});
