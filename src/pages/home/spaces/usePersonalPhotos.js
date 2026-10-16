/** 沿用 home.hero 照片契约，解析本地资源和私有存储，失败时保留本地照片。 */
import React from 'react';
import { publicUrl } from '../../../lib/publicUrl';
import { getSignedAssetUrl } from '../../../lib/signedAssetUrl';

export const PERSONAL_PHOTOS = ['hero-7.jpg', 'hero-6.jpg', 'hero-1.jpg', 'hero-5.jpg', 'hero-2.png'].map(publicUrl);

export function usePersonalPhotos(source) {
  const [photos, setPhotos] = React.useState(PERSONAL_PHOTOS);
  React.useEffect(() => {
    let cancelled = false;
    async function resolve() {
      const inputs = Array.isArray(source) && source.length ? source : PERSONAL_PHOTOS;
      const results = await Promise.allSettled(inputs.map(async (input) => {
        const value = String(input || '').trim();
        if (!value) return '';
        if (value.startsWith('storage:')) {
          const [bucket, ...parts] = value.slice(8).split('/');
          return await getSignedAssetUrl({ bucket, path: parts.join('/'), expiresInSec: 3600 }) || '';
        }
        if (/^https?:\/\//.test(value) || value.startsWith(import.meta.env.BASE_URL)) return value;
        return publicUrl(value);
      }));
      const resolved = [...new Set(results.filter((r) => r.status === 'fulfilled').map((r) => r.value).filter(Boolean))];
      if (!cancelled) setPhotos(resolved.length ? resolved : PERSONAL_PHOTOS);
    }
    resolve();
    return () => { cancelled = true; };
  }, [source]);
  return photos;
}
