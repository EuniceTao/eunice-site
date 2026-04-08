/**
 * @file experienceFormUtils.js
 * @description Experience 表单：多行文本与列表互转（支持 Markdown 列表行首 `-`/`*`/序号）。
 */

/** @description 多行文本 → 字符串数组（去空行，剥列表前缀）。 */
export function textToLines(text) {
  return String(text || '')
    .split(/\r?\n/g)
    .map((line) => line.replace(/^\s*[-*•]\s+/, '').replace(/^\s*\d+\.\s+/, '').trim())
    .filter(Boolean);
}

/** @description 字符串数组 → 多行文本。 */
export function linesToText(lines) {
  return Array.isArray(lines) ? lines.join('\n') : '';
}

/** @description 生成简易 id（slug）。 */
export function slugId(raw) {
  const s = String(raw || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return s || `id-${Date.now()}`;
}
