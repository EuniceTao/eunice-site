/**
 * @file publicUrl.js
 * @description public 目录静态资源 URL：拼接 Vite `base`（GitHub Pages 子路径部署必需）。
 */

/**
 * @mark publicUrl
 * @param {string} path - 文件名或 `/` 开头的路径
 * @returns {string} 可正确加载的绝对路径
 */
export function publicUrl(path) {
  const trimmed = path.startsWith('/') ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL || '/';
  const normalized = base.endsWith('/') ? base : `${base}/`;
  return `${normalized}${trimmed}`;
}
