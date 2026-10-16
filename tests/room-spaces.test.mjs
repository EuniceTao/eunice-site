/** 空间回归：照片目录实际渲染、原链接兼容，以及进入后恢复真实镜头。 */
import assert from 'node:assert/strict';
import test from 'node:test';
import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';
import { build } from 'esbuild';
import { createRoomNavigation, FOCUS_VIEWS, CAMERA_BOUNDS } from '../src/pages/home/room/scene/roomNavigation.js';
const require = createRequire(import.meta.url);
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { MemoryRouter } = require('react-router-dom');
const result = await build({
  stdin: { contents: "export { HomeIndexView } from './src/pages/home/sections/HomeIndexView.jsx'; export { createRoomItems } from './src/pages/home/room/roomItems.js'; export { ExperimentSpace } from './src/pages/home/spaces/ExperimentSpace.jsx';", resolveDir: process.cwd() },
  bundle: true, write: false, platform: 'node', format: 'cjs', packages: 'external',
  define: { 'import.meta.env.BASE_URL': '"/"' },
  plugins: [{ name: 'ignore-css', setup(builder) { builder.onLoad({ filter: /\.css$/ }, () => ({ contents: '', loader: 'js' })); } }],
});
const module = { exports: {} };
new Function('require', 'module', 'exports', result.outputFiles[0].text)(require, module, module.exports);
const { HomeIndexView, createRoomItems, ExperimentSpace } = module.exports;
const items = createRoomItems({ latestNow: { title: 'A changing update' }, latestNote: { title: 'A changing note' } });

test('directory renders a real local photograph for every category and retains stable category names', () => {
  const html = renderToStaticMarkup(React.createElement(MemoryRouter, null, React.createElement(HomeIndexView, { items, onOpenSpace() {} })));
  assert.equal((html.match(/<img /g) || []).length, 7);
  for (const item of items) {
    assert.ok(existsSync(`public${item.image}`), item.image);
    assert.ok(html.includes(item.label));
  }
  assert.ok(!html.includes('<strong>A changing update'));
  for (const route of ['/now', '/blog', '/experience', '/contact']) assert.ok(html.includes(`href="${route}"`));
  assert.equal((html.match(/<button /g) || []).length, 3);
});

test('all categories have valid camera targets and original page destinations stay intact', () => {
  assert.deepEqual(items.filter((item) => item.space).map((item) => item.id).sort(), ['about', 'experiments', 'work']);
  assert.equal(items.find((item) => item.id === 'about').to, '/about');
  assert.equal(items.find((item) => item.id === 'work').to, '/work');
  for (const item of items) {
    assert.ok(FOCUS_VIEWS[item.id]);
    for (const point of Object.values(FOCUS_VIEWS[item.id])) point.forEach((n, i) => assert.ok(n >= CAMERA_BOUNDS.min[i] && n <= CAMERA_BOUNDS.max[i], item.id));
  }
});

test('return from a full space restores the actual pre-entry pose immediately and clears snapshot', () => {
  const calls = [];
  const controls = { camera: { position: { toArray: () => [1.2, 1.7, 2.8] } }, getTarget: (out) => out.set(-1, 1, 0), setLookAt: (...args) => calls.push(args), normalizeRotations() {} };
  const nav = createRoomNavigation(controls);
  nav.focus('about'); nav.focus('work'); nav.restore(false);
  assert.deepEqual(calls.at(-1), [1.2, 1.7, 2.8, -1, 1, 0, false]);
  const count = calls.length; nav.restore(); assert.equal(calls.length, count);
  nav.focus('experiments'); nav.restore(); assert.equal(calls.at(-1).at(-1), true);
});

test('game opens the exact supplied destination safely without replacing the house', () => {
  const html = renderToStaticMarkup(React.createElement(ExperimentSpace));
  assert.ok(html.includes('href="https://app-moma.ke.com/7e041044-98ae-45c6-b51c-5da5489c2c2a"'));
  assert.ok(html.includes('target="_blank"')); assert.ok(html.includes('rel="noopener noreferrer"'));
});
