/**
 * @file index.ts
 * @description 获取私有资源 Signed URL（用于前台展示私有 bucket 图片）。
 *
 * 目的：
 * - 你不想把图片放在 public bucket（永久公开直链）
 * - 但主页仍需展示图片给访客
 * - 所以：前台请求此函数 → 服务端用 Service Role 生成短时效 Signed URL → 前台用该 URL 加载图片
 *
 * 请求：
 * - GET /functions/v1/get-signed-asset-url?bucket=site-assets&path=hero/xxx.jpg&expires=3600
 *
 * 响应：
 * - { url: "https://...signed..." }
 */

import { serveEdgeFunction } from "../_shared/edgeFunction.ts";
import { corsHeaders } from "../_shared/cors.ts";

serveEdgeFunction(async ({ req, supabaseService }) => {
  const url = new URL(req.url);
  const bucket = url.searchParams.get("bucket") || "site-assets";
  const path = url.searchParams.get("path");
  const expiresRaw = url.searchParams.get("expires") || "3600";
  const expires = Math.max(60, Math.min(60 * 60 * 6, Number(expiresRaw) || 3600)); // 1min ~ 6h

  console.log("[get-signed-asset-url] bucket =", bucket);
  console.log("[get-signed-asset-url] path =", path);
  console.log("[get-signed-asset-url] expires =", expires);

  if (!path) throw new Error("缺少参数 path");

  const { data, error } = await supabaseService.storage
    .from(bucket)
    .createSignedUrl(path, expires);

  if (error) {
    console.error("[get-signed-asset-url] createSignedUrl error:", error);
    throw new Error(error.message || "生成签名链接失败");
  }

  return new Response(JSON.stringify({ url: data?.signedUrl }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}, { requireAuth: false });

