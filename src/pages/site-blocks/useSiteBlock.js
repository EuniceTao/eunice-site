/**
 * @file useSiteBlock.js
 * @description Site blocks：前台读 published；管理员可切换读取 draft。
 */

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useAdminSession } from '../admin/useAdminSession';

export function useSiteBlock(key, { preferDraft = false, fallback = null } = {}) {
  const { session } = useAdminSession();
  const [row, setRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasTriedRemote, setHasTriedRemote] = useState(false);

  const canReadDraft = Boolean(session?.user);
  const mode = preferDraft && canReadDraft ? 'draft' : 'published';

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!supabase) return;
      if (!key) return;

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('site_blocks')
          .select('key,draft,published,updated_at')
          .eq('key', key)
          .maybeSingle();
        if (error) throw error;
        if (cancelled) return;
        setRow(data ?? null);
        setHasTriedRemote(true);
      } catch {
        // fallback handled below
        if (!cancelled) setHasTriedRemote(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [key]);

  const content = useMemo(() => {
    // 关键：避免“先显示默认文案，再闪成 Admin 编辑版”
    // - 有 supabase 且远程尚未尝试：先返回 null（页面可以选择不渲染/渲染骨架）
    // - 远程失败或没有数据：再 fallback
    if (supabase && !hasTriedRemote) return null;
    if (!row) return fallback;
    return row[mode] ?? fallback;
  }, [row, mode, fallback, hasTriedRemote]);

  return { row, content, loading, mode };
}

