/**
 * @file signedAssetUrl.js
 * @description 通过 Edge Function 获取私有资源 Signed URL（带本地缓存）。
 */

const cache = new Map(); // key -> { url, expiresAtMs }

export async function getSignedAssetUrl({ bucket = 'site-assets', path, expiresInSec = 3600 } = {}) {
  if (!path) return '';
  const key = `${bucket}:${path}`;

  const now = Date.now();
  const hit = cache.get(key);
  if (hit && hit.url && hit.expiresAtMs > now + 10_000) return hit.url; // 留 10s 缓冲

  const base = import.meta.env.VITE_SUPABASE_URL;
  if (!base) return '';

  const fn = `${base}/functions/v1/get-signed-asset-url?bucket=${encodeURIComponent(bucket)}&path=${encodeURIComponent(path)}&expires=${encodeURIComponent(String(expiresInSec))}`;
  const res = await fetch(fn, { method: 'GET' });
  if (!res.ok) return '';
  const data = await res.json().catch(() => ({}));
  const url = data?.url || '';
  if (url) cache.set(key, { url, expiresAtMs: now + expiresInSec * 1000 });
  return url;
}

