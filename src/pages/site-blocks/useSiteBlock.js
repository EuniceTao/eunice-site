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
      } catch {
        // fallback handled below
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
    if (!row) return fallback;
    return row[mode] ?? fallback;
  }, [row, mode, fallback]);

  return { row, content, loading, mode };
}

