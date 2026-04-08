/**
 * @file ImageCropDialog.jsx
 * @description 图片裁剪弹窗：固定比例预览（cover），支持拖动定位 + 缩放，输出用于上传的参数。
 */

import React from 'react';
import { Button } from './Button';

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function toPercent(n) {
  return `${Math.round(n * 100)}%`;
}

export function ImageCropDialog({
  isOpen,
  file,
  title = '裁剪照片',
  description = '拖动图片调整构图，滑块控制放大。这个裁剪会直接决定上传后的展示效果。',
  outWidth = 2400,
  outHeight = 840,
  aspectLabel = '20:7（2400×840）',
  initial = { centerX01: 0.5, centerY01: 0.45, zoom: 1.1 },
  onCancel,
  onConfirm,
}) {
  const [centerX01, setCenterX01] = React.useState(initial.centerX01 ?? 0.5);
  const [centerY01, setCenterY01] = React.useState(initial.centerY01 ?? 0.45);
  const [zoom, setZoom] = React.useState(initial.zoom ?? 1.1);

  const previewRef = React.useRef(null);
  const [objectUrl, setObjectUrl] = React.useState('');

  React.useEffect(() => {
    if (!isOpen || !file) return;
    const url = URL.createObjectURL(file);
    setObjectUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [isOpen, file]);

  React.useEffect(() => {
    if (!isOpen) return;
    setCenterX01(initial.centerX01 ?? 0.5);
    setCenterY01(initial.centerY01 ?? 0.45);
    setZoom(initial.zoom ?? 1.1);
  }, [isOpen, initial.centerX01, initial.centerY01, initial.zoom]);

  const draggingRef = React.useRef(null);

  function onPointerDown(e) {
    if (!previewRef.current) return;
    previewRef.current.setPointerCapture?.(e.pointerId);
    draggingRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startCenterX01: centerX01,
      startCenterY01: centerY01,
    };
  }

  function onPointerMove(e) {
    if (!draggingRef.current || !previewRef.current) return;
    const rect = previewRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const dx = e.clientX - draggingRef.current.startX;
    const dy = e.clientY - draggingRef.current.startY;

    // 经验映射：拖动距离映射到 center 的变化；zoom 越大，拖动越“敏感”一点
    const scaleFactor = 1 / clamp(Number(zoom) || 1, 1, 3);
    const nextX = draggingRef.current.startCenterX01 - (dx / rect.width) * 0.9 * scaleFactor;
    const nextY = draggingRef.current.startCenterY01 - (dy / rect.height) * 0.9 * scaleFactor;

    setCenterX01(clamp(nextX, 0, 1));
    setCenterY01(clamp(nextY, 0, 1));
  }

  function onPointerUp() {
    draggingRef.current = null;
  }

  if (!isOpen) return null;

  const outAspect = outWidth / outHeight;
  const previewW = 600;
  const previewH = Math.round(previewW / outAspect);

  return (
    <>
      <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-6">
        <div className="w-full max-w-[720px] rounded-2xl bg-white p-6 shadow-xl">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-slate-900 leading-tight">{title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{description}</p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-slate-400">
                输出规格：{aspectLabel}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={onCancel}>
                取消
              </Button>
              <Button
                onClick={() =>
                  onConfirm?.({
                    centerX01,
                    centerY01,
                    zoom,
                    outWidth,
                    outHeight,
                  })
                }
              >
                确认裁剪并上传
              </Button>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-[auto_minmax(0,1fr)] md:items-start">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div
                ref={previewRef}
                className="relative overflow-hidden rounded-lg bg-black select-none touch-none"
                style={{ width: `${previewW}px`, height: `${previewH}px` }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
              >
                {objectUrl ? (
                  <img
                    src={objectUrl}
                    alt="crop preview"
                    draggable={false}
                    className="absolute inset-0 h-full w-full"
                    style={{
                      objectFit: 'cover',
                      // 用 zoom + center 做一个“可控 cover”：缩放后再平移
                      transform: `scale(${zoom}) translate(${(0.5 - centerX01) * 100}%, ${(0.5 - centerY01) * 100}%)`,
                      transformOrigin: 'center',
                      willChange: 'transform',
                      userSelect: 'none',
                      pointerEvents: 'none',
                    }}
                  />
                ) : null}

                <div className="pointer-events-none absolute inset-0 ring-1 ring-white/50" />
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80" />
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-500">
                操作：用鼠标/触控拖动定位；保证脸在中间附近更稳。
              </p>
            </div>

            <div className="min-w-0">
              <div className="grid gap-4">
                <label className="grid gap-2">
                  <span className="text-sm text-slate-600">
                    缩放（Zoom） <span className="font-mono text-xs text-slate-400">{zoom.toFixed(2)}×</span>
                  </span>
                  <input
                    type="range"
                    min={1}
                    max={2.2}
                    step={0.01}
                    value={zoom}
                    onChange={(e) => setZoom(clamp(Number(e.target.value), 1, 2.2))}
                  />
                </label>

                <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-slate-400">构图参数</p>
                  <div className="grid gap-2 text-sm text-slate-600">
                    <div className="flex items-center justify-between gap-3">
                      <span>X（水平）</span>
                      <span className="font-mono text-xs text-slate-500">{toPercent(centerX01)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span>Y（垂直）</span>
                      <span className="font-mono text-xs text-slate-500">{toPercent(centerY01)}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCenterX01(0.5);
                        setCenterY01(0.45);
                        setZoom(1.1);
                      }}
                    >
                      一键回到推荐
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setCenterY01(clamp(centerY01 + 0.03, 0, 1))}>
                      画面下移
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setCenterY01(clamp(centerY01 - 0.03, 0, 1))}>
                      画面上移
                    </Button>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-slate-500">
                  提示：Hero 左图桌面高度固定为 420px（cover 裁切）。推荐让主体（脸）落在水平居中附近、垂直略偏上。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

