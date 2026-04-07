/**
 * @file siteBlocksApi.js
 * @description site_blocks 的读写封装：保存草稿、发布、读取。
 */

import { supabase } from '../../lib/supabaseClient';

export async function getSiteBlockRow(key) {
  if (!supabase) throw new Error('Supabase 未配置');
  const { data, error } = await supabase
    .from('site_blocks')
    .select('key,draft,published,updated_at')
    .eq('key', key)
    .maybeSingle();
  if (error) throw error;
  return data ?? null;
}

export async function saveSiteBlockDraft(key, draft) {
  if (!supabase) throw new Error('Supabase 未配置');
  const payload = { key, draft, published: {} };
  const { data: existing } = await supabase
    .from('site_blocks')
    .select('key,published')
    .eq('key', key)
    .maybeSingle();

  const published = existing?.published ?? {};
  const { error } = await supabase.from('site_blocks').upsert({ ...payload, published }, { onConflict: 'key' });
  if (error) throw error;
}

export async function publishSiteBlock(key) {
  if (!supabase) throw new Error('Supabase 未配置');

  const { data, error } = await supabase
    .from('site_blocks')
    .select('draft')
    .eq('key', key)
    .maybeSingle();
  if (error) throw error;

  const draft = data?.draft ?? {};
  const { error: upErr } = await supabase
    .from('site_blocks')
    .upsert({ key, draft, published: draft }, { onConflict: 'key' });
  if (upErr) throw upErr;
}

