/**
 * @file guard-pages.mjs
 * @description 页面守护脚本：缓存关键页面文件，丢失时自动恢复，避免“白改/白屏”。
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd(); // 项目根目录
const CACHE_DIR = path.join(ROOT, '.guard-cache', 'pages'); // 缓存目录

/**
 * 需要守护的关键文件清单（按你项目路由依赖）。
 * 只守护“入口页/核心数据文件”，避免误伤其它内容。
 */
const GUARDED_FILES = [
  'src/pages/home/HomePage.jsx',
  'src/pages/about/AboutPage.jsx',
  'src/pages/now/NowPage.jsx',
  'src/pages/projects/ProjectsPage.jsx',
  'src/pages/projects/projectsData.js',
];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function fileExists(p) {
  try {
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

function readText(p) {
  return fs.readFileSync(p, 'utf8');
}

function writeText(p, content) {
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, content, 'utf8');
}

function cachePathFor(relFile) {
  // 在缓存中保持同样的相对路径结构
  return path.join(CACHE_DIR, relFile);
}

function cacheIfPresent(relFile) {
  const abs = path.join(ROOT, relFile);
  if (!fileExists(abs)) return false;

  const content = readText(abs);
  const cacheAbs = cachePathFor(relFile);
  writeText(cacheAbs, content);
  return true;
}

function restoreIfMissing(relFile) {
  const abs = path.join(ROOT, relFile);
  if (fileExists(abs)) return false;

  const cacheAbs = cachePathFor(relFile);
  if (!fileExists(cacheAbs)) return false;

  const content = readText(cacheAbs);
  writeText(abs, content);
  return true;
}

function main() {
  ensureDir(CACHE_DIR);

  const restored = [];
  const cached = [];
  const missing = [];

  for (const rel of GUARDED_FILES) {
    if (restoreIfMissing(rel)) restored.push(rel);
    if (cacheIfPresent(rel)) cached.push(rel);
    if (!fileExists(path.join(ROOT, rel)) && !fileExists(cachePathFor(rel))) {
      missing.push(rel);
    }
  }

  if (restored.length > 0) {
    console.log('[guard-pages] Restored missing files:');
    for (const r of restored) console.log(' -', r);
  }

  if (cached.length > 0) {
    console.log('[guard-pages] Cached files:');
    for (const c of cached) console.log(' -', c);
  }

  if (missing.length > 0) {
    console.warn('[guard-pages] Still missing (no cache available):');
    for (const m of missing) console.warn(' -', m);
  }
}

main();

