/**
 * @file useNowEntries.js
 * @description Now 数据源：优先 Supabase（已发布），失败则 fallback 本地数据。
 */

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { nowEntries as localNowEntries } from './nowData';

function normalizeRow(row) {
  const body = Array.isArray(row.body)
    ? row.body.filter(Boolean).map(String)
    : typeof row.body === 'string'
      ? [row.body]
      : [];

  const date =
    typeof row.date === 'string'
      ? row.date
      : row.date instanceof Date
        ? row.date.toISOString().slice(0, 10)
        : '';

  return {
    id: String(row.id),
    date,
    mood: row.mood ? String(row.mood) : '',
    title: String(row.title || ''),
    body,
  };
}

export function useNowEntries({ includeDrafts = false } = {}) {
  const [entries, setEntries] = useState(localNowEntries);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!supabase) return;

      setLoading(true);
      try {
        let q = supabase
          .from('now_entries')
          .select('id,date,mood,title,body,published')
          .order('date', { ascending: false });

        if (!includeDrafts) q = q.eq('published', true);

        const { data, error } = await q;
        if (error) throw error;
        if (cancelled) return;

        if (Array.isArray(data) && data.length > 0) {
          setEntries(data.map(normalizeRow));
        }
      } catch {
        // fallback already set to local
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [includeDrafts]);

  const updatedAt = useMemo(() => entries?.[0]?.date || '', [entries]);

  return { entries, updatedAt, loading };
}

