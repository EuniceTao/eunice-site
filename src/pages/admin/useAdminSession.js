/**
 * @file useAdminSession.js
 * @description Admin 会话：基于 Supabase Auth，提供 session/user 与登出方法。
 */

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export function useAdminSession() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function init() {
      if (!supabase) {
        if (mounted) {
          setSession(null);
          setLoading(false);
        }
        return;
      }

      const { data } = await supabase.auth.getSession();
      if (mounted) setSession(data?.session ?? null);
      if (mounted) setLoading(false);
    }

    init();

    if (!supabase) return () => {};

    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!mounted) return;
      setSession(nextSession ?? null);
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
  }

  return { session, user: session?.user ?? null, loading, signOut };
}

