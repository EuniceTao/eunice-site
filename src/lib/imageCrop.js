/**
 * @file imageCrop.js
 * @description 图片裁剪工具：把图片按指定中心点/缩放裁到固定比例，并导出为 JPEG Blob。
 */

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function loadImageFromObjectUrl(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('图片加载失败'));
    img.src = url;
  });
}

/**
 * @param {File} file
 * @param {{centerX01:number, centerY01:number, zoom:number, outWidth:number, outHeight:number, quality?:number}} params
 * zoom: 1 = 正好铺满（cover）；>1 = 放大裁更多细节
 */
export async function cropImageFileToJpegBlob(file, params) {
  const {
    centerX01 = 0.5,
    centerY01 = 0.5,
    zoom = 1,
    outWidth,
    outHeight,
    quality = 0.9,
  } = params || {};

  if (!file) throw new Error('缺少文件');
  if (!outWidth || !outHeight) throw new Error('缺少输出尺寸');

  const objectUrl = URL.createObjectURL(file);
  try {
    const img = await loadImageFromObjectUrl(objectUrl);

    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;
    if (!iw || !ih) throw new Error('图片尺寸读取失败');

    // baseScale: 让图片 cover 输出画布的最小比例
    const baseScale = Math.max(outWidth / iw, outHeight / ih);
    const scale = baseScale * clamp(Number(zoom) || 1, 1, 5);

    // 在输出画布坐标系中，图片尺寸
    const dw = iw * scale;
    const dh = ih * scale;

    // 以（centerX01, centerY01）作为裁剪中心
    const cx = clamp(Number(centerX01) || 0.5, 0, 1) * dw;
    const cy = clamp(Number(centerY01) || 0.5, 0, 1) * dh;

    // 画布左上角对应图片绘制坐标（把中心对齐到画布中心）
    let dx = outWidth / 2 - cx;
    let dy = outHeight / 2 - cy;

    // 限制：不能露出透明边（始终 cover）
    dx = clamp(dx, outWidth - dw, 0);
    dy = clamp(dy, outHeight - dh, 0);

    const canvas = document.createElement('canvas');
    canvas.width = outWidth;
    canvas.height = outHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 初始化失败');

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // 背景填充白色，避免 JPEG 透明通道变黑
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, outWidth, outHeight);

    ctx.drawImage(img, dx, dy, dw, dh);

    const blob = await new Promise((resolve) => {
      canvas.toBlob((b) => resolve(b), 'image/jpeg', clamp(quality, 0.6, 0.95));
    });
    if (!blob) throw new Error('导出失败');
    return blob;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

