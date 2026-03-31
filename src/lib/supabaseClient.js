/**
 * @file supabaseClient.js
 * @description Supabase 客户端：供前端安全使用 anon key。
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // Supabase URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // Supabase anon key

function isValidHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export const supabase =
  isValidHttpUrl(supabaseUrl) && typeof supabaseAnonKey === 'string' && supabaseAnonKey.length > 0
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

