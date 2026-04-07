// @ts-nocheck
import { createClient } from "npm:@supabase/supabase-js@2";

export const getSupabaseClient = () => {
    // Edge Function Secrets 中，`SUPABASE_` 前缀可能被限制新增；
    // 因此优先读取自定义前缀（SB_*），再回退到官方默认变量名。
    const url =
        Deno.env.get("SB_URL") ??
        Deno.env.get("SUPABASE_URL") ??
        "";
    const serviceKey =
        Deno.env.get("SB_SERVICE_ROLE_KEY") ??
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ??
        "";

    return createClient(
        url,
        serviceKey,
    );
};
